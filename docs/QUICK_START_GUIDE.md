# QUICK START GUIDE - Para o Agente

## 🎯 Objetivo
Criar landing page Olho na Brasa seguindo rigorosamente a documentação fornecida.

---

## 📚 Ordem de Leitura (OBRIGATÓRIA)

Leia na seguinte ordem antes de começar a codificar:

1. **PROJECT_BRIEF.md** - Entenda o projeto e regras invioláveis
2. **BRAND_IDENTITY.md** - Absorva cores, tipografia e assets
3. **CONTENT_COPY.md** - Memorize todo o conteúdo textual
4. **MEDIA_ASSETS.md** - Conheça todas as imagens e vídeos
5. **LAYOUT_STRUCTURE.md** - Compreenda a arquitetura visual
6. **COMPONENT_SPECS.md** - Estude especificações técnicas
7. **AGENT_CHECKLIST.md** - Use como validação contínua

**TEMPO ESTIMADO DE LEITURA:** 20-30 minutos
**NÃO PULE ESTA ETAPA** - A qualidade final depende disso.

---

## 🚀 Fluxo de Desenvolvimento

### FASE 1: Estrutura Base (30min)
```
1. Criar HTML semântico básico
2. Implementar background fixo (desktop/mobile)
3. Criar coluna principal centralizada
4. Adicionar backdrop-blur
5. Importar Alfa Slab One (Google Fonts)
6. Configurar CSS reset/normalize
7. Definir variáveis CSS para cores
```

### FASE 2: Seções de Conteúdo (1h)
```
1. Header com logo
2. Hero (Headline + Subheadline)
3. Seção Transformação (Antes/Depois)
4. Seção Oferta + Garantia
5. FAQ Accordion
6. Footer
```

### FASE 3: Componentes Críticos (1h30min)
```
1. Carrossel de Produtos (CRÍTICO - 45min)
   - Estrutura HTML com duplicação
   - CSS animação infinita
   - Gradientes laterais
   - Teste em loop

2. Carrossel de Projetos (30min)
   - Similar ao de produtos OU grid
   - Imagens responsivas

3. Formulário Sellflux (15min)
   - HTML com save_sfx="true"
   - Campos obrigatórios
   - Validação básica
```

### FASE 4: Responsividade (45min)
```
1. Testar mobile (375px)
2. Testar tablet (768px)
3. Testar desktop (1920px)
4. Ajustar breakpoints
5. Verificar carrosséis mobile
6. Verificar formulário mobile
```

### FASE 5: Polimento (30min)
```
1. Hover states
2. Focus states
3. Transições suaves
4. Lazy loading imagens
5. Performance check
6. Validação HTML/CSS
```

### FASE 6: Validação Final (30min)
```
1. Percorrer AGENT_CHECKLIST.md completo
2. Corrigir itens faltantes
3. Testar em múltiplos browsers
4. Validação final de conteúdo
```

**TEMPO TOTAL ESTIMADO:** 4-5 horas

---

## ⚠️ REGRAS DE OURO (Repetindo porque é CRÍTICO)

### 🔴 NUNCA:
1. Criar mais de uma coluna principal
2. Usar backgrounds incorretos (desktop/mobile)
3. Alterar cores fora da paleta
4. Mudar ordem das seções
5. Fazer carrosséis estáticos
6. Omitir gradientes laterais
7. Usar imagens não documentadas

### 🟢 SEMPRE:
1. Background fixo com switch desktop/mobile
2. UMA coluna centralizada com backdrop-blur
3. Carrosséis infinitos com loop seamless
4. Formulário com save_sfx="true"
5. Alfa Slab One nos títulos
6. Cores exatas (#eb6538)
7. Seguir AGENT_CHECKLIST.md

---

## 🎨 Copy-Paste Rápido (Boilerplate)

### HTML Base
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Olho na Brasa - Churrasqueiras Sob Medida</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN (opcional) -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Background Layer -->
  <div class="fixed-background"></div>
  
  <!-- Main Column -->
  <main class="main-column">
    <!-- Conteúdo aqui -->
  </main>
  
  <script src="script.js"></script>
</body>
</html>
```

### CSS Variáveis
```css
:root {
  --primary-orange: #eb6538;
  --dark-overlay: rgba(30, 30, 30, 0.85);
  --text-white: #ffffff;
  --text-gray: #e5e7eb;
  --border-gray: #4b5563;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #000;
  color: var(--text-white);
}

.font-alfa {
  font-family: 'Alfa Slab One', serif;
}
```

---

## 🔍 Debugging Checklist Rápido

**Se carrossel não funciona:**
- [ ] Imagens duplicadas? (precisa 2 sets para loop)
- [ ] Transform: translateX(-50%)? (porque duplicou)
- [ ] Animation: linear infinite?
- [ ] Gradientes laterais aplicados?

**Se formulário não submete:**
- [ ] Atributo save_sfx="true" presente?
- [ ] Method="POST"?
- [ ] Name attributes nos inputs?
- [ ] Required nos campos obrigatórios?

**Se background não aparece:**
- [ ] URL correto?
- [ ] Position: fixed?
- [ ] Z-index: -1?
- [ ] Background-size: cover?
- [ ] Media query para mobile?

**Se responsividade quebra:**
- [ ] Breakpoint em 768px?
- [ ] Max-width na coluna?
- [ ] Grid/Flex responsivo?
- [ ] Font-sizes escalados?

---

## 📦 Estrutura de Arquivos Sugerida

```
projeto/
├── index.html
├── styles.css
├── script.js (opcional)
├── README.md (opcional)
└── docs/
    ├── PROJECT_BRIEF.md
    ├── BRAND_IDENTITY.md
    ├── CONTENT_COPY.md
    ├── MEDIA_ASSETS.md
    ├── LAYOUT_STRUCTURE.md
    ├── COMPONENT_SPECS.md
    └── AGENT_CHECKLIST.md
```

---

## 💡 Dicas de Produtividade

1. **Use comentários no código** para marcar seções
2. **Valide constantemente** com AGENT_CHECKLIST.md
3. **Teste mobile desde o início** (mobile-first)
4. **Commit incremental** se usando Git
5. **Screenshot de cada etapa** para comparação
6. **Console.log para debug** de JavaScript

---

## 🎓 Recursos Úteis

### Tailwind CSS
- Documentação: https://tailwindcss.com/docs
- Cheat sheet: https://nerdcave.com/tailwind-cheat-sheet

### CSS Animations
- Keyframes: https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
- Transform: https://developer.mozilla.org/en-US/docs/Web/CSS/transform

### Backdrop Filter
- https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter

---

## ✅ Pronto para Começar?

Antes de digitar a primeira linha de código:

- [ ] Li todos os 7 arquivos de documentação
- [ ] Entendi as regras invioláveis
- [ ] Identifiquei os componentes críticos
- [ ] Tenho o AGENT_CHECKLIST.md aberto
- [ ] Configurei ambiente de desenvolvimento
- [ ] Testei que consigo acessar URLs das imagens

**Se marcou tudo: PODE COMEÇAR!** 🚀

**Se faltou algo: VOLTE e leia!** 📚

---

## 🆘 Em Caso de Dúvida

1. Consulte o arquivo específico:
   - Cores? → BRAND_IDENTITY.md
   - Copy? → CONTENT_COPY.md
   - Layout? → LAYOUT_STRUCTURE.md
   - Imagens? → MEDIA_ASSETS.md

2. Verifique COMPONENT_SPECS.md para código pronto

3. Use AGENT_CHECKLIST.md para validar

4. Releia PROJECT_BRIEF.md para regras invioláveis

---

## 🎯 Critério de Sucesso Final

A landing page está 100% pronta quando:

✅ AGENT_CHECKLIST.md está completamente marcado
✅ Todas as regras invioláveis foram seguidas
✅ Carrosséis infinitos funcionam perfeitamente
✅ Formulário submete com save_sfx="true"
✅ Responsivo mobile/desktop sem quebras
✅ Performance < 3s de load
✅ Zero console errors
✅ Copy 100% fiel ao CONTENT_COPY.md
✅ Cores exatas da marca
✅ Tipografia correta (Alfa Slab One)

---

**BOA SORTE! VOCÊ TEM TUDO QUE PRECISA.** 💪

**LEMBRE-SE:** Qualidade > Velocidade. É melhor levar 5h e entregar perfeito do que 2h e entregar quebrado.
