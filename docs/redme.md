# 📋 DOCUMENTAÇÃO COMPLETA - Landing Page Olho na Brasa

## 🎯 Sobre Este Projeto

Sistema completo de documentação para desenvolvimento da landing page **Olho na Brasa** - churrasqueiras sob medida com garantia de 15 anos.

Este conjunto de documentos foi estruturado para permitir que um agente de IA (ou desenvolvedor) execute o projeto de forma **metodológica, precisa e sem ambiguidades**.

---

## 📚 ARQUIVOS DO PROJETO

### 1️⃣ **PROJECT_BRIEF.md** ⚠️ (LEIA PRIMEIRO)
**O que é:** Visão geral do projeto e regras absolutamente invioláveis

**Conteúdo:**
- Objetivo do projeto
- Regras que NUNCA podem ser quebradas
- Estrutura visual obrigatória
- Ordem das seções (imutável)
- Checklist do que o agente NUNCA deve fazer

**Quando usar:** Antes de iniciar o projeto e sempre que tiver dúvida sobre limites

---

### 2️⃣ **BRAND_IDENTITY.md**
**O que é:** Identidade visual completa da marca

**Conteúdo:**
- Paleta de cores exatas (#eb6538)
- Tipografia (Alfa Slab One)
- Assets da marca (logo, ícones)
- Backgrounds desktop/mobile
- Especificações de botões, inputs, cards
- Diretrizes de uso (permitido/proibido)

**Quando usar:** Para definir qualquer elemento visual (cores, fontes, espaçamentos)

---

### 3️⃣ **CONTENT_COPY.md**
**O que é:** TODO o conteúdo textual da landing page

**Conteúdo:**
- Headlines e subheadlines exatas
- Copy de todas as seções
- Textos do formulário
- Perguntas e respostas do FAQ
- Tom de voz e palavras-chave

**Quando usar:** Para inserir qualquer texto na página (copiar/colar direto)

---

### 4️⃣ **MEDIA_ASSETS.md**
**O que é:** Organização completa de imagens e vídeos

**Conteúdo:**
- URLs de backgrounds (desktop/mobile)
- Logo e ícones
- **Carrossel 1:** Kit Suporte Suspenso (12 imagens em ordem)
- **Carrossel 2:** Projetos realizados (10 imagens em ordem)
- Vídeos demonstrativos
- Especificações técnicas de cada asset

**Quando usar:** Para inserir qualquer imagem ou vídeo (URLs prontas)

---

### 5️⃣ **LAYOUT_STRUCTURE.md**
**O que é:** Arquitetura visual e comportamento da página

**Conteúdo:**
- Estrutura HTML base
- Especificações de layout (background fixo, coluna central)
- CSS de cada seção
- Responsividade (breakpoints)
- Espaçamentos padrão

**Quando usar:** Para entender COMO montar a estrutura visual

---

### 6️⃣ **COMPONENT_SPECS.md**
**O que é:** Especificações técnicas detalhadas de componentes

**Conteúdo:**
- **Carrossel infinito** (HTML + CSS + JS completo)
- **Formulário Sellflux** (integração completa)
- **FAQ Accordion** (código pronto)
- **Seção Transformação** (Antes/Depois)
- **Box de Garantia**
- Código copy-paste pronto

**Quando usar:** Para implementar componentes específicos (código pronto)

---

### 7️⃣ **AGENT_CHECKLIST.md** ✅
**O que é:** Checklist completo de validação

**Conteúdo:**
- Checklist de pré-desenvolvimento
- Validação de estrutura e layout
- Validação de identidade visual
- Validação de conteúdo
- Validação de componentes críticos
- Validação de responsividade
- Validação de performance
- Critérios de sucesso

**Quando usar:** Durante E após o desenvolvimento para validar tudo

---

### 8️⃣ **QUICK_START_GUIDE.md** 🚀
**O que é:** Guia rápido de execução

**Conteúdo:**
- Ordem de leitura obrigatória
- Fluxo de desenvolvimento (fases)
- Regras de ouro
- Boilerplate copy-paste
- Debugging checklist
- Dicas de produtividade

**Quando usar:** Como guia durante todo o desenvolvimento

---

### 9️⃣ **ORGANOGRAMA.md** 📊
**O que é:** Representação visual da estrutura

**Conteúdo:**
- Organograma ASCII da página completa
- Hierarquia Z-index
- Fluxo de scroll do usuário
- Mapa de cores por seção
- Breakpoints responsivos
- Animações e interações
- Assets por seção

**Quando usar:** Para visualizar a estrutura completa de uma vez

---

## 🎓 COMO USAR ESTA DOCUMENTAÇÃO

### Para Agentes de IA:

1. **Leia na ordem:**
   1. PROJECT_BRIEF.md
   2. BRAND_IDENTITY.md
   3. CONTENT_COPY.md
   4. MEDIA_ASSETS.md
   5. LAYOUT_STRUCTURE.md
   6. COMPONENT_SPECS.md
   7. AGENT_CHECKLIST.md

2. **Durante desenvolvimento:**
   - QUICK_START_GUIDE.md como referência
   - ORGANOGRAMA.md para visualizar estrutura
   - COMPONENT_SPECS.md para código pronto

3. **Validação final:**
   - AGENT_CHECKLIST.md completo

---

### Para Desenvolvedores Humanos:

1. **Overview rápido:**
   - ORGANOGRAMA.md (visual completo)
   - PROJECT_BRIEF.md (regras principais)

2. **Implementação:**
   - QUICK_START_GUIDE.md (fluxo de trabalho)
   - COMPONENT_SPECS.md (código pronto)
   - BRAND_IDENTITY.md (cores/fontes)
   - MEDIA_ASSETS.md (URLs de imagens)

3. **Conteúdo:**
   - CONTENT_COPY.md (todo texto)

4. **Validação:**
   - AGENT_CHECKLIST.md (verificar tudo)

---

## ⚠️ REGRAS CRÍTICAS (Resumo)

### NUNCA:
❌ Criar mais de uma coluna principal
❌ Usar backgrounds incorretos
❌ Cores fora da paleta
❌ Alterar ordem das seções
❌ Carrosséis estáticos
❌ Omitir gradientes laterais

### SEMPRE:
✅ Background fixo (desktop/mobile switch)
✅ UMA coluna com backdrop-blur
✅ Carrosséis infinitos
✅ Formulário com save_sfx="true"
✅ Cores exatas (#eb6538)
✅ Alfa Slab One nos títulos

---

## 📁 ESTRUTURA DE ARQUIVOS

```
landing-page-olho-na-brasa/
│
├── README.md (este arquivo)
│
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── BRAND_IDENTITY.md
│   ├── CONTENT_COPY.md
│   ├── MEDIA_ASSETS.md
│   ├── LAYOUT_STRUCTURE.md
│   ├── COMPONENT_SPECS.md
│   ├── AGENT_CHECKLIST.md
│   ├── QUICK_START_GUIDE.md
│   └── ORGANOGRAMA.md
│
└── src/ (a ser criado)
    ├── index.html
    ├── styles.css
    └── script.js
```

---

## 🎯 OBJETIVO FINAL

Criar uma landing page que:

✅ Converta visitantes em leads qualificados
✅ Comunique a essência da Olho na Brasa
✅ Destaque a garantia de 15 anos
✅ Seja responsiva e performática
✅ Siga rigorosamente a identidade visual
✅ Funcione perfeitamente em mobile e desktop

---

## 📊 MÉTRICAS DE SUCESSO

- ✅ Tempo de carregamento < 3s
- ✅ Taxa de preenchimento formulário > 15%
- ✅ Visualização completa até FAQ > 40%
- ✅ 100% responsivo (mobile-first)
- ✅ Zero console errors
- ✅ AGENT_CHECKLIST.md 100% completo

---

## 🔗 RECURSOS EXTERNOS

**Tailwind CSS:**
- https://tailwindcss.com/docs

**Google Fonts (Alfa Slab One):**
- https://fonts.goo gle.com/specimen/Alfa+Slab+One

**CSS Animations:**
- https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes

---

## 👤 CONTATO

**Projeto:** Landing Page Olho na Brasa
**Cliente:** Olho na Brasa - Churrasqueiras Sob Medida
**Localização:** São José - SC
**Desenvolvedor:** [A definir]

---

## 📝 NOTAS IMPORTANTES

1. **Leia TODA a documentação antes de começar** - São ~30min de leitura que economizam horas de retrabalho

2. **Use AGENT_CHECKLIST.md religiosamente** - Cada item não marcado é um potencial bug

3. **Não improvise nas cores** - Use EXATAMENTE #eb6538 e as cores definidas

4. **Carrosséis são CRÍTICOS** - Devem ser infinitos, suaves e com gradientes laterais

5. **Formulário precisa de save_sfx="true"** - Sem isso, não integra com Sellflux

6. **Mobile-first sempre** - Teste mobile ANTES de desktop

7. **Performance importa** - Lazy loading, otimização de imagens

---

## ✅ PRONTO PARA COMEÇAR?

Se você:
- [ ] Leu este README
- [ ] Entendeu a estrutura dos arquivos
- [ ] Sabe onde encontrar cada informação
- [ ] Tem ambiente de desenvolvimento pronto

**ENTÃO COMECE POR:**
1. QUICK_START_GUIDE.md
2. Ler documentação na ordem sugerida
3. Implementar seguindo COMPONENT_SPECS.md
4. Validar com AGENT_CHECKLIST.md

---

**BOA SORTE! VOCÊ TEM TUDO QUE PRECISA.** 💪🚀

_Última atualização: Novembro 2024_