# LAYOUT STRUCTURE - Olho na Brasa

## Conceito Visual Geral

A landing page segue o padrão **"Coluna Flutuante sobre Background Fixo"**:
- Background de alta qualidade fixo (parallax effect)
- UMA ÚNICA coluna centralizada
- Coluna com backdrop-blur e semi-transparência
- Todo conteúdo dentro da coluna

---

## Arquitetura HTML (Estrutura Base)

```html
<body>
  <!-- Background Layer -->
  <div class="fixed-background">
    <!-- Background desktop/mobile alternado via CSS -->
  </div>

  <!-- Main Content Column -->
  <main class="main-column">
    <header>Logo</header>
    
    <section id="hero">Hero Content</section>
    <section id="products-carousel">Carrossel Produtos</section>
    <section id="transformation">Antes/Depois</section>
    <section id="projects-gallery">Galeria Projetos</section>
    <section id="offer">Oferta + Garantia</section>
    <section id="contact-form">Formulário</section>
    <section id="faq">FAQ</section>
    
    <footer>Rodapé</footer>
  </main>
</body>
```

---

## Especificações de Layout

### Background Layer

**Desktop (>= 768px):**
```css
.fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background-image: url('N6HpIndC89mw7HY22YjehZarhadB1GUP.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}
```

**Mobile (< 768px):**
```css
@media (max-width: 767px) {
  .fixed-background {
    background-image: url('hEij1r7dW0NcdINwBWCtfD2AEkgvTK9z.jpg');
    background-attachment: scroll; /* Melhor performance mobile */
  }
}
```

---

### Main Column (Coluna Principal)

**Desktop:**
```css
.main-column {
  position: relative;
  max-width: 600px;
  margin: 40px auto;
  padding: 40px 30px;
  background: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  min-height: calc(100vh - 80px);
}
```

**Mobile:**
```css
@media (max-width: 767px) {
  .main-column {
    max-width: 90%;
    margin: 20px auto;
    padding: 30px 20px;
    border-radius: 16px;
  }
}
```

**Tailwind Classes Equivalentes:**
```html
<main class="relative max-w-[600px] mx-auto my-10 md:my-20 px-5 md:px-8 py-8 md:py-10 bg-[rgba(30,30,30,0.85)] backdrop-blur-lg rounded-3xl shadow-2xl">
```

---

## Seções Internas (Dentro da Coluna)

### 1. Header (Logo)

**Desktop:**
```css
header {
  text-align: center;
  margin-bottom: 40px;
}

header img {
  max-height: 60px;
  margin: 0 auto;
}
```

**Mobile:**
```css
@media (max-width: 767px) {
  header {
    margin-bottom: 30px;
  }
  
  header img {
    max-height: 40px;
  }
}
```

---

### 2. Hero Section

**Layout:**
```css
#hero {
  text-align: center;
  margin-bottom: 60px;
}

#hero h1 {
  font-family: 'Alfa Slab One', serif;
  font-size: 3.5rem;
  color: #eb6538;
  line-height: 1.2;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

#hero h2 {
  font-family: 'Alfa Slab One', serif;
  font-size: 2rem;
  color: #ffffff;
  line-height: 1.3;
  margin-bottom: 30px;
}
```

**Mobile:**
```css
@media (max-width: 767px) {
  #hero h1 {
    font-size: 2rem;
  }
  
  #hero h2 {
    font-size: 1.5rem;
  }
}
```

---

### 3. Carrossel de Produtos

**CRÍTICO - Estrutura do Carrossel Infinito:**

```html
<div class="carousel-container">
  <div class="carousel-track">
    <!-- Imagens duplicadas para loop infinito -->
    <img src="produto-1.png" />
    <img src="produto-2.png" />
    <!-- ... todas as 12 imagens ... -->
    <!-- DUPLICAR novamente para loop seamless -->
    <img src="produto-1.png" />
    <img src="produto-2.png" />
    <!-- ... -->
  </div>
</div>
```

**CSS do Carrossel:**
```css
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 40px 0;
  
  /* Gradientes laterais (efeito fade) */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    height: 100%;
    background: linear-gradient(90deg, rgba(30,30,30,1) 0%, transparent 100%);
    z-index: 2;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 150px;
    height: 100%;
    background: linear-gradient(270deg, rgba(30,30,30,1) 0%, transparent 100%);
    z-index: 2;
    pointer-events: none;
  }
}

.carousel-track {
  display: flex;
  gap: 30px;
  animation: scroll-infinite 40s linear infinite;
  
  &:hover {
    animation-play-state: paused; /* Desktop only */
  }
}

.carousel-track img {
  height: 200px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
}

@keyframes scroll-infinite {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* Metade porque duplicamos */
  }
}

@media (max-width: 767px) {
  .carousel-track img {
    height: 150px;
  }
  
  .carousel-container::before,
  .carousel-container::after {
    width: 80px;
  }
}
```

**Tailwind + Classes Personalizadas:**
```html
<div class="relative w-full overflow-hidden my-10">
  <!-- Usar CSS customizado para gradientes e animação -->
  <div class="flex gap-8 animate-scroll-infinite hover:pause">
    <!-- Imagens aqui -->
  </div>
</div>
```

---

### 4. Seção Transformação (Antes/Depois)

**Layout Desktop (2 Colunas):**
```css
#transformation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin: 60px 0;
}

.before-column {
  background: rgba(139, 0, 0, 0.1);
  border-left: 4px solid #dc2626;
  padding: 30px;
  border-radius: 12px;
}

.after-column {
  background: rgba(235, 101, 56, 0.1);
  border-left: 4px solid #eb6538;
  padding: 30px;
  border-radius: 12px;
}

.transformation-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.transformation-item .icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}
```

**Mobile (Stack Vertical):**
```css
@media (max-width: 767px) {
  #transformation {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
```

---

### 5. Galeria de Projetos

**Opção A - Grid:**
```css
#projects-gallery {
  margin: 60px 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.projects-grid img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.projects-grid img:hover {
  transform: scale(1.05);
}

@media (max-width: 767px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
```

**Opção B - Carrossel (Similar ao de Produtos):**
- Usar mesma estrutura do carrossel de produtos
- Imagens maiores (300px altura)
- Velocidade mais lenta (60s)

---

### 6. Oferta + Garantia

**Layout:**
```css
#offer {
  margin: 60px 0;
  text-align: center;
}

.offer-benefits {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px 0;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.guarantee-box {
  background: linear-gradient(135deg, rgba(235, 101, 56, 0.2) 0%, rgba(235, 101, 56, 0.05) 100%);
  border: 2px solid #eb6538;
  border-radius: 16px;
  padding: 30px;
  margin-top: 40px;
}

.guarantee-box h3 {
  font-family: 'Alfa Slab One', serif;
  font-size: 2rem;
  color: #eb6538;
  margin-bottom: 10px;
}
```

---

### 7. Formulário de Contato

**Usar estrutura Sellflux como base:**

```html
<form id="contact-form" method="POST" save_sfx="true" class="flex flex-col gap-4">
  <h2 class="text-2xl font-bold text-white mb-2">
    Converse com Nosso Especialista
  </h2>
  
  <input 
    type="text" 
    name="name" 
    placeholder="Seu nome completo"
    class="w-full px-4 py-3 bg-white/10 border-2 border-gray-600 rounded-lg text-white focus:border-[#eb6538] focus:outline-none"
    required
  />
  
  <div class="flex border-2 border-gray-600 rounded-lg overflow-hidden focus-within:border-[#eb6538]">
    <button type="button" class="px-3 bg-gray-700 text-white">
      <span class="mr-2">🇧🇷</span>
      <span>+55</span>
    </button>
    <input 
      type="tel" 
      name="phone" 
      placeholder="(00) 00000-0000"
      class="flex-1 px-4 py-3 bg-white/10 text-white border-0 focus:outline-none"
      required
    />
  </div>
  
  <textarea 
    name="medida" 
    placeholder="Ex: 1,20m x 0,60m ou descreva seu espaço"
    class="w-full px-4 py-3 bg-white/10 border-2 border-gray-600 rounded-lg text-white focus:border-[#eb6538] focus:outline-none resize-none"
    rows="3"
  ></textarea>
  
  <button 
    type="submit" 
    class="w-full bg-[#eb6538] hover:bg-[#d45528] text-white font-bold py-4 px-6 rounded-lg uppercase tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#eb6538]/50"
  >
    Falar com Setor de Projetos
  </button>
  
  <p class="text-xs text-gray-400 text-center">
    Seus dados estão protegidos. Não compartilhamos com terceiros.
  </p>
</form>
```

---

### 8. FAQ (Accordion)

**Estrutura:**
```html
<div id="faq" class="my-16">
  <h2 class="text-3xl font-bold text-white text-center mb-8">
    Perguntas que Nossos Clientes Mais Fazem
  </h2>
  
  <div class="faq-accordion space-y-4">
    <details class="faq-item bg-white/5 rounded-lg p-4">
      <summary class="font-bold text-white cursor-pointer flex justify-between items-center">
        Quanto tempo dura a entrega?
        <span class="text-[#eb6538]">+</span>
      </summary>
      <p class="text-gray-300 mt-3 pl-4">
        Entre 7-15 dias úteis, conforme demanda do projeto e fila.
      </p>
    </details>
    
    <!-- Repetir para cada pergunta -->
  </div>
</div>
```

**CSS para Accordion:**
```css
.faq-item[open] summary span {
  transform: rotate(45deg);
}

.faq-item summary {
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}
```

---

### 9. Footer

**Layout:**
```css
footer {
  margin-top: 80px;
  padding-top: 40px;
  border-top: 2px solid rgba(235, 101, 56, 0.3);
  text-align: center;
}

footer img {
  max-height: 50px;
  margin: 0 auto 20px;
}

footer p {
  color: #9ca3af;
  font-size: 0.875rem;
}
```

---

## Responsividade - Breakpoints

```css
/* Mobile First */
/* xs: 0-639px (padrão) */

/* sm: 640px+ */
@media (min-width: 640px) {
  /* Ajustes pequenos */
}

/* md: 768px+ (Principal breakpoint) */
@media (min-width: 768px) {
  /* Desktop layout */
  /* Background switch */
  /* Coluna mais larga */
  /* Carrosséis maiores */
}

/* lg: 1024px+ */
@media (min-width: 1024px) {
  /* Refinamentos para telas grandes */
}
```

---

## Espaçamentos Padrão

```css
/* Seções */
section {
  margin: 60px 0;
}

@media (max-width: 767px) {
  section {
    margin: 40px 0;
  }
}

/* Títulos de Seção */
section h2 {
  margin-bottom: 30px;
}

/* Elementos internos */
.element {
  gap: 20px; /* Entre items */
  padding: 20px; /* Interno */
}
```

---

## Checklist de Implementação

- [ ] Background fixo desktop/mobile funcionando
- [ ] Coluna centralizada com backdrop-blur
- [ ] Logo no header e footer
- [ ] Carrosséis com animação infinita
- [ ] Gradientes laterais nos carrosséis
- [ ] Transformação (2 colunas desktop / stack mobile)
- [ ] Formulário com estrutura Sellflux
- [ ] FAQ em accordion funcional
- [ ] Todos os espaçamentos consistentes
- [ ] Responsivo em todos os breakpoints
- [ ] Performance otimizada (lazy loading)
