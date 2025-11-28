Como dividir o tráfego e realizar testes A/B com diferentes layouts de página na mesma URL

O teste A/B é uma técnica de experimentação usada para dividir o tráfego de um site entre duas versões de uma página ou jornada do usuário para determinar qual delas apresenta melhor desempenho em termos de um objetivo predefinido, como taxa de cliques, cadastros ou conversões. Ao exibir uma versão diferente de uma página para diferentes grupos de usuários aleatoriamente e medir os resultados, o teste A/B pode fornecer informações valiosas sobre o comportamento e as preferências do usuário, ajudando você a tomar decisões baseadas em dados sobre design e conteúdo em um ambiente controlado.

Os testes A/B podem ser implementados de diversas maneiras e, frequentemente, envolvem o uso de ferramentas de terceiros para modificar páginas usando JavaScript do lado do cliente. Isso geralmente resulta em um indesejável "flash de conteúdo sem estilo" (FOUC, na sigla em inglês) — ou seja, uma breve exibição da página original — antes que o JavaScript seja carregado, o que muitas vezes significa uma experiência de navegação mais lenta e pode distorcer os resultados do teste.

Na Netlify, oferecemos uma maneira mais robusta para você executar testes A/B, sem usar ferramentas de terceiros para dividir os usuários em grupos de teste e exibir diferentes variantes, e sem JavaScript adicional no lado do cliente, uma técnica comum em outros serviços populares que pode afetar o desempenho e invalidar seus resultados.

Testes A/B com Netlify Edge Functions
Com o Netlify Edge Functions, você pode executar testes A/B definindo cookies no navegador para atribuir usuários a grupos de teste e modificando as solicitações de página em tempo real de acordo com esses cookies — antes mesmo de chegarem ao navegador. Os benefícios dessa abordagem incluem:

A possibilidade de modificar páginas pré-geradas estaticamente no momento da solicitação;
As variantes de teste (páginas, componentes etc.) e o código para dividir o tráfego são armazenados em seu repositório de código — não em uma ferramenta de terceiros sem controle de versão;
Os usuários no ambiente de teste não veem nenhum FOUC (Flash of Undefined Content) no navegador nem experimentam qualquer degradação no desempenho de renderização que possa influenciar os resultados dos testes;
Afinidade de variantes — os usuários terão uma experiência consistente durante suas sessões de navegação e visitas subsequentes enquanto um teste A/B estiver ativo;
A possibilidade de usar essa abordagem com qualquer framework de front-end ou mesmo sem nenhum framework! (Se você estiver usando o Next.js, recomendamos o uso do Next.js Advanced Middleware da Netlify, conforme descrito neste tutorial .)
Neste post, usaremos o Netlify Edge Functions para executar um teste A/B em diferentes layouts de página servidos a partir da mesma URL voltada para o usuário. Para saber mais sobre o Netlify Edge Functions antes de vermos o exemplo de uso, consulte a documentação do Edge Functions ou os benefícios de aprimorar suas páginas na borda .

Realize testes A/B com diferentes layouts de páginas de produtos no seu site de e-commerce.
Os testes A/B no e-commerce são uma ótima maneira de descobrir o que funciona melhor para seus clientes, ajudando, em última análise, a impulsionar as vendas. Talvez você queira testar quais mensagens reduzem as taxas de rejeição, ou talvez queira experimentar o quão inovador você pode ser com os layouts de suas páginas sem comprometer a conversão.

Vamos realizar um teste A/B em um novo layout de página de produto usando uma função de borda para dividir o tráfego com base em cookies do navegador, mantendo a URL original para o usuário. Os exemplos de código a seguir pressupõem:

Os URLs das páginas dos seus produtos seguem o formato /product/{productId}/:
Seu site está hospedado na Netlify;
Você está usando algum framework front-end (exceto o Next.js, conforme descrito acima);
Você criou um novo layout de página que gostaria de testar em comparação com um layout existente.
Na raiz do seu projeto, crie um netlifydiretório, caso ainda não exista, e dentro dele, crie outro edge-functionsdiretório. Dentro deste, adicione um novo arquivo chamado abtest.ts. Você pode escrever Edge Functions em JavaScript ou TypeScript; neste exemplo, usaremos TypeScript.

.
└── netlify
    └── edge-functions
        └── abtest.ts

Adicione o seguinte código a abtest.ts. Isso importa os tipos necessários e exporta a função de borda e um configobjeto, especificando em qual caminho o código será executado. Dado o formato assumido da URL ( /product/{productId}/), estamos usando um curinga ( *) para instruir a função de borda a ser executada em quaisquer caminhos filhos de /product.

netlify/edge-functions/abtest.ts
import { Config, Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {}

export const config: Config = {
  path: "/product/*",
};

Atribua usuários a grupos de teste usando cookies do navegador.
O código a seguir estabelece as bases para usar um cookie com o nome `product_layout` layout_testpara dividir o tráfego em diferentes layouts de página de produto. Primeiro, procure o cookie usando a API de Contexto do Netlify . context.cookies.get()Se não houver um cookie existente, atribua um usando ` context.cookies.set()get_product_layout`, com base na ponderação desejada, usando um número aleatório entre 0 e 1.

Este exemplo básico demonstra uma ponderação de 50/50 combinada com um número aleatório gerado por JavaScript. Você pode configurar a ponderação ou a geração de números aleatórios de acordo com suas necessidades específicas.

netlify/edge-functions/abtest.ts
import type { Config, Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  // look for existing "layout_test" cookie
  const bucketName = "layout_test";
  const bucket = context.cookies.get(bucketName);

  // return here if we find a cookie
  if (bucket) {
   //...
  }

  // if no "layout_test" cookie is found, assign the user to a bucket
  // in this example we're using two buckets (default, new)
  // with an equal weighting of 50/50
  const weighting = 0.5;
  // get a random number between (0-1)
  const random = Math.random();
  const newBucketValue = random <= weighting ? "default" : "new";

  // set the new "layout_test" cookie
  context.cookies.set({
    name: bucketName,
    value: newBucketValue,
  });

  // ...
};

export const config: Config = {
  path: "/product/*",
};

Dividir o tráfego entre diferentes layouts de página no mesmo URL
Em seguida, use o layout_testcookie para decidir qual layout de página será exibido aos clientes. Dado o formato presumido da URL ( /product/{productId}/), o exemplo de código abaixo contém um código para analisar o productIdda URL, e seu método pode variar.

Se um cookie com o valor newfor encontrado, retorne uma nova URL com o caminho para uma nova página de layout. Isso reescreve a resposta HTTP da solicitação original nos bastidores, para que os clientes vejam o novo layout da página do produto na URL original .

Se um cookie com o valor `false` defaultfor encontrado, retorne uma resposta vazia returnpara ignorar a função atual e continuar a cadeia de requisições. Isso fornece ao usuário a resposta HTTP original e não modificada. Para mais informações, consulte a documentação da Netlify sobre reescrita de URLs .

netlify/edge-functions/abtest.ts
  import type { Config, Context } from "https://edge.netlify.com";

  export default async (request: Request, context: Context) => {
    const bucketName = "layout_test";
    const bucket = context.cookies.get(bucketName);

+     // get productId from URL
+     // assuming URL format is https://domain.tld/product/productId
+     const url = new URL(request.url);
+     const pathParts = url.pathname.split('/');
+     const productId = pathParts[2];

    if (bucket) {
+     if (bucket === "default") {
+       // better performance than returning context.next()!
+       return;
+     }
+
+     // rewrite to a new page behind the scenes
+     // browser URL stays the same
+     return new URL(`/new-product-page-layout/${productId}/`, request.url);
    }

    const weighting = 0.5;
    const random = Math.random();
    const newBucketValue = random <= weighting ? "default" : "new";

    context.cookies.set({
      name: bucketName,
      value: newBucketValue,
    });

+   if (newBucketValue === "default") {
+     return;
+   }
+
+   return new URL(`/new-product-page-layout/${productId}/`, request.url);
  };

  export const config: Config = {
    path: "/product/*",
  };

Acompanhe as variantes dos seus testes na sua ferramenta de análise.
Para rastrear qual layout de página de produto os clientes estão visualizando ao clicar no botão "Adicionar ao carrinho", você precisará adicionar algumas informações extras às suas ferramentas de análise. Existem várias maneiras de fazer isso, dependendo da sua arquitetura e das suas ferramentas, mas se você estiver usando o Google Analytics (GA), pode usar JavaScript do lado do cliente para verificar a existência de um cookie no navegador (por exemplo, `/` layout_test) e passar as informações relevantes para o seu script de rastreamento do GA.

<!-- install Google Analytics’ JS tracker before using this code -->
<script>
  // get all cookies from document as a string separating cookies with ;
  // eg: `layout_test=new; another_cookie=value;`
  const cookies = document.cookie;

  // search cookies string for the "layout_test" string
  // split and grab the value
  const pageLayout = cookies
  .split("; ")
  .find((row) => row.startsWith("layout_test="))
  ?.split("=")[1];

  ga('send', 'add_to_cart', {
    // ...
    'Layout': pageLayout
  });
</script>

Os testes A/B não precisam ser testes de estresse.
Com apenas uma função de borda e uma pequena adição à sua configuração de análise, você pode efetivamente dividir o tráfego para realizar testes A/B em diferentes layouts de página sem a sobrecarga de gerenciar ferramentas de terceiros. Usando os métodos acima, esse tipo de teste A/B também pode ser implementado em toda a jornada do usuário, da página inicial ao checkout.

Para implementar testes A/B no Netlify utilizando cookies para separar as variantes e facilitar a adição de novas páginas, a melhor abordagem, conforme as fontes oficiais, é:

1. Organização das Variantes
Crie cada variante (A, B, C, etc.) como um branch separado no seu repositório Git.
O Netlify facilita a implantação de filiais, permitindo que cada filial tenha sua própria URL e implante isolada. Isso torna a manutenção e a adição de novas variantes muito mais simples, bastando criar uma nova branch e configurar o teste dividido para incluir o  Split Testing .
2. Gerenciamento de Roteamento por Cookie
Utilize o cookie de teste A/B para direcionar o usuário à variante correta.
O Netlify Split Testing já faz isso automaticamente usando o cookie nf_ab, mas se você quiser um controle manual ou customizado, pode usar o cabeçalho Netlify-Varypara garantir que o cache seja separado por valor de cookie, por exemplo:
Netlify-Vary: cookie=ab_test
Isso garante que cada valor do cookie ab_testtenha seu próprio cache, facilitando a adição de novas variantes sem impactar as existentes  Vary by cookie .
3. Facilidade para Inserção de Novas Páginas
Para máxima facilidade, documente o processo de criação de uma nova variante:

Crie uma nova branch no repositório.
Adicione ou modifique as páginas desejadas nessa filial.
Faça o deploy da branch no Netlify.
No painel do Netlify, adicione um novo branch ao Split Testing e defina a porcentagem de tráfego.
(Opcional) Se usar cookies personalizados, ajuste o valor do cookie no frontend conforme necessário.
O Netlify ajusta automaticamente a distribuição de controle e gerenciamento de cookies para garantir a consistência da experiência do usuário.  Execute um teste baseado em filial .

4. Documentação Recomendada
Documente internamente o fluxo acima, incluindo exemplos de como criar um branch, como adicionar uma nova página e como configurar o Split Testing no painel do Netlify.
Inclui instruções sobre como usar o cookie de teste A/B, caso queira personalizar o comportamento além do padrão do Netlify.
Observação Importante
O Split Testing do Netlify é recomendado apenas para sites estáticos. Não é indicado para sites que necessitem de funções serverless, proxies ou Edge Functions, pois podem causar experiências inconsistentes  em Split Testing .
Resumo:
Utilize ramificações para cada variante, aproveite o Split Testing do Netlify para gerenciar cookies e cache, e documente o processo de criação e implantação de novas variantes para garantir facilidade e escalabilidade.

---
title: "Split Testing"
description: "Divide traffic to your site between different deploys without performance impact. Use Split Testing for A/B testing or private beta releases."
---

> **Pricing Information:** This feature is in [Beta](https://docs.netlify.com/release-phases/#beta) and is available on all pricing plans.

Netlify's Split Testing lets you divide traffic to your site between different deploys, straight from our CDN, without losing any download performance, and without installing any third party JavaScript library. You can use this for A/B testing, or for [launching private beta releases](https://www.netlify.com/blog/2019/09/11/netlify-pro-tip-using-split-testing-to-power-private-beta-releases/).

You can use any client-side analytics library to [track visitors](/manage/monitoring/split-testing/#set-up-client-side-analytics-tracking) across different versions of your site.

## Requirements and limitations

Branch Split Testing divides traffic to static files on your site between two or more deployed Git branches. This has the following implications:

- Your site must [deploy from a connected Git repository](/deploy/create-deploys/#deploy-with-git).
- You must enable [branch deploys](/deploy/deploy-overview/#branch-deploy-controls).
- If you created a deploy using the [Netlify CLI's `--alias` flag](/api-and-cli-guides/cli-guides/get-started-with-cli/#draft-deploys), be aware that this isn't a branch deploy and isn't supported for Split Testing.
- Split Testing doesn't work properly for responses from [proxies](/manage/routing/redirects/rewrites-proxies/) or [functions](/build/functions/overview/). We don't recommend using Split Testing with sites that use functions or proxies to generate site content as your visitors may end up with inconsistent experiences. This can be a concern for sites that use server-side rendering (SSR) or incremental static regeneration (ISR).
- Split Testing doesn't work with [Scheduled Functions](/build/functions/scheduled-functions/) because Split Testing relies on branch deploys and scheduled functions only run on your site's published deploy.

In addition, if a site has Split Testing enabled, requests to that site will not execute [Edge Functions](/build/edge-functions/overview/).

## Run a branch-based test

1. Once you have at least one branch deployed in addition to your production branch, go to 
### NavigationPath Component:

Project configuration > Build & deploy > Split Testing
 in the Netlify UI.

2. Choose the branches you want to perform the test with, assign the percentage of traffic you want to send to each branch, and select **Start test**.

   ![](/images/site-deploys-split-test-change-dist.png)

   As soon as that's done, we'll start dividing traffic to your site according to the percentages you set. If you change the percentages, we'll automatically readjust the traffic again.

3. If needed, you can add more deployed branches to the test by selecting **Add another branch**. Traffic distribution percentages will automatically adjust so they always add up to 100%.

   ![](/images/site-deploys-split-test-add-branch.png)

   You can also remove extra branches from the test by using the cross button in each branch row.

   ![](/images/site-deploys-split-test-remove-branch.png)

4. When you're done with your test, you can stop it by selecting **Stop test**.

   ![](/images/site-deploys-split-test-stop.png)

Only one test can be enabled at a time. If you want to start a new test, you'll need to stop the current test you're running and start a new one.

We set a cookie called `nf_ab` to ensure that the same visitor always gets the same branch. By default, the value of the cookie is a random number between zero and one and is configured out of the box to ensure that your site visitors have a consistent experience. If you'd like your visitors to manually opt in to a split test, you can also use client-side JavaScript to manually set the value of the `nf_ab` cookie to a branch name, which Netlify's CDN will read and serve accordingly.

### Tip - Whatever you include on your branch will be part of the test

Keep in mind that variations between branches will factor into your split test. So, for example, if you have a serverless function on one branch and not the other, the function will only run for one of the tests.

## Set up client-side analytics tracking

You can use any client-side analytics library, like Google Analytics or Segment, to track visitor behavior in a split test.

### Expose branch information in your site

The most important piece of information you probably want is the branch a visitor is seeing. You can access branch information from the build environment when we build your site, and inject the name into your site.

For example, if your site uses Hugo to generate pages from templates, you can use the `getenv` function to retrieve this value:
```
{{ getenv "BRANCH" }}
```

If you use React, you can access the same variable from the process environment at build time:
```
process.env.BRANCH
```

You can read more about this environment variable and many others in our [environment variables documentation](/build/environment-variables/overview/).

### Send to Google Analytics

[Google Analytics](https://www.google.com/analytics/) supports [dimensional data](https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets) that can be associated to events. You can use this feature to send the split test information that you compiled in the previous build.

For example, if you're using Google Analytics in a site built with Hugo, you can use this template to track the branch a visitor is seeing:

```html
<!-- install Google Analytics' JS tracker before using this code -->
<!-- https://developers.google.com/analytics/devguides/collection/analyticsjs/ -->
<script>
  ga('send', 'pageview', {
    'Branch':  '{{ getenv "BRANCH" }}'
  });
</script>
```

### Send to Segment

[Segment](https://segment.com) is a platform that allows you to multiplex tracking information and send it to different services at the same time. Their JavaScript library also supports dimensional data that you can use to send the split test information.

To follow Google Analytics' example, you can track the testing branch every time someone visits your site with a snippet like this one:

```html
<!-- install Segment's JS tracker before using this code -->
<!-- https://segment.com/docs/sources/website/analytics.js/quickstart/#step-1-copy-the-snippet -->
<script>
  analytics.track('pageview', {
    'Branch': '{{ getenv "BRANCH" }}'
  });
</script>
```

### Use snippet injection for more flexibility

You might want those analytics scripts only in your production environment. After all, you don't want to send tracking information when you're developing your site.

You can use Netlify's [snippet injection](/build/post-processing/snippet-injection/) to add those scripts right when we deploy your site. Snippet injection uses [Liquid](https://shopify.dev/api/liquid) templates to expose environment variables to your snippets. This gives you the ability to inject the testing branch value without having to worry about which build tool you're using.

To inject analytics scripts using Netlify's snippet injection, go to 
### NavigationPath Component:

Project configuration > Build & deploy > Post processing
, find the **Snippet injection** section, and select **Add Snippet**.

Following the previous Google Analytics example, you can inject this template as a snippet:

```html
<!-- install Google Analytics' JS tracker before using this code -->
<!-- https://developers.google.com/analytics/devguides/collection/analyticsjs/ -->
<script>
  ga('send', 'pageview', {
    'Branch':  '{{ BRANCH }}'
  });
</script>
```

In that same way, you can inject this template as a snippet to use Segment:

```html
<!-- install Segment's JS tracker before using this code -->
<!-- https://segment.com/docs/sources/website/analytics.js/quickstart/#step-1-copy-the-snippet-->
<script>
  analytics.track('pageview', {
    'Branch': '{{ BRANCH }}'
  });
</script>
```