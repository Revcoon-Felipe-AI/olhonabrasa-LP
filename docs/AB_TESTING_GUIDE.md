# Guia de Testes A/B com Netlify Edge Functions

Este guia explica como criar e gerenciar testes A/B no projeto usando Netlify Edge Functions e Cookies.

## Estrutura
O projeto está preparado para usar Edge Functions localizadas em `netlify/edge-functions`.

## Como Criar um Novo Teste A/B

### 1. Criar a Nova Página (Variante B)
1.  Duplique o arquivo `index.html` (ou a página que deseja testar).
2.  Renomeie para algo como `index-b.html` ou crie uma pasta `variante-b/index.html`.
3.  Faça as alterações de design/copy na nova página.

### 2. Criar a Edge Function
Crie um arquivo em `netlify/edge-functions/abtest.ts` (ou `.js`) com o seguinte código base:

```typescript
import { Config, Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  // Nome do cookie que vai guardar a variante do usuário
  const bucketName = "ab_test_variant";
  const bucket = context.cookies.get(bucketName);

  // Se o usuário já tem um cookie, respeite a variante dele
  if (bucket) {
    if (bucket === "variant_b") {
      return new URL("/index-b", request.url); // Redireciona (rewrite) para a variante B
    }
    return; // Mantém na original (A)
  }

  // Se não tem cookie, sorteia (50/50)
  const weighting = 0.5;
  const random = Math.random();
  const newBucketValue = random <= weighting ? "original" : "variant_b";

  // Salva o cookie para a próxima visita
  context.cookies.set({
    name: bucketName,
    value: newBucketValue,
  });

  // Aplica o redirecionamento se caiu na B
  if (newBucketValue === "variant_b") {
    return new URL("/index-b", request.url);
  }
  
  return; // Mantém na A
};

// Configuração: Onde essa função vai rodar?
export const config: Config = {
  path: "/", // Roda na home page
};
```

### 3. Deploy
Ao fazer o deploy no Netlify, a Edge Function será ativada automaticamente.

## Monitoramento
Para saber qual variante converteu mais, você pode enviar o valor do cookie `ab_test_variant` junto com o formulário (adicionando mais um campo hidden no `index.html` e `index-b.html` e capturando via JS, similar ao que fizemos com UTMs).

## Dicas
*   **Split Testing Nativo:** O Netlify também possui uma feature de "Split Testing" baseada em Git Branches, que pode ser mais simples se você preferir gerenciar variantes por branches do Git em vez de arquivos separados.
*   **Performance:** Edge Functions rodam na borda (CDN), então são extremamente rápidas e não causam "pisca" na tela (FOUC).
