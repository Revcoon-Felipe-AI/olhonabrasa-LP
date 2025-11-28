# COMPONENT SPECS - Olho na Brasa

## 1. CARROSSEL INFINITO (Componente Crítico)

### Requisitos Técnicos

**Funcionalidades Obrigatórias:**
- ✅ Scroll horizontal automático e infinito
- ✅ Loop seamless (sem quebras visíveis)
- ✅ Pausa ao hover (desktop only)
- ✅ Gradiente fade lateral
- ✅ Performance otimizada (sem jank)

### Implementação Recomendada

**HTML Structure:**
```html
<div class="carousel-wrapper" id="products-carousel">
  <div class="carousel-container">
    <div class="carousel-track" id="carousel-track">
      <!-- SET 1: Imagens originais -->
      <div class="carousel-item">
        <img src="produto-1.png" alt="Produto 1" loading="lazy" />
      </div>
      <div class="carousel-item">
        <img src="produto-2.png" alt="Produto 2" loading="lazy" />
      </div>
      <!-- ... até produto-12 -->
      
      <!-- SET 2: Duplicata para loop infinito -->
      <div class="carousel-item">
        <img src="produto-1.png" alt="Produto 1" loading="lazy" />
      </div>
      <!-- ... repetir todos -->
    </div>
  </div>
</div>
```

**CSS Completo:**
```css
.carousel-wrapper {
  width: 100%;
  margin: 50px 0;
  overflow: hidden;
}

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
}

/* Gradientes laterais (efeito fade) */
.carousel-container::before,
.carousel-container::after {
  content: '';
  position: absolute;
  top: 0;
  width: 150px;
  height: 100%;
  z-index: 10;
  pointer-events: none;
}

.carousel-container::before {
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(30, 30, 30, 1) 0%,
    rgba(30, 30, 30, 0.8) 30%,
    transparent 100%
  );
}

.carousel-container::after {
  right: 0;
  background: linear-gradient(
    270deg,
    rgba(30, 30, 30, 1) 0%,
    rgba(30, 30, 30, 0.8) 30%,
    transparent 100%
  );
}

/* Track do carrossel */
.carousel-track {
  display: flex;
  gap: 30px;
  width: max-content;
  animation: scroll-left 40s linear infinite;
}

.carousel-track:hover {
  animation-play-state: paused;
}

.carousel-item {
  flex-shrink: 0;
}

.carousel-item img {
  height: 200px;
  width: auto;
  object-fit: contain;
  display: block;
  border-radius: 8px;
}

/* Animação */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Mobile ajustes */
@media (max-width: 767px) {
  .carousel-item img {
    height: 150px;
  }
  
  .carousel-container::before,
  .carousel-container::after {
    width: 60px;
  }
  
  .carousel-track {
    gap: 20px;
  }
}
```

**JavaScript (Opcional - para suavizar ainda mais):**
```javascript
// Garantir loop perfeito
const track = document.getElementById('carousel-track');
const items = track.children;
const itemWidth = items[0].offsetWidth + 30; // largura + gap
const totalItems = items.length / 2; // dividido porque duplicamos

// Reset seamless quando chegar no meio
track.addEventListener('animationiteration', () => {
  // Opcional: lógica adicional se necessário
});
```

---

## 2. FORMULÁRIO DE CONTATO

### Integração Sellflux

**HTML com Classes Tailwind:**
```html
<form 
  id="contact-form" 
  class="flex flex-col gap-4 p-6 bg-white/5 rounded-2xl backdrop-blur-sm" 
  method="POST" 
  save_sfx="true"
>
  <!-- Título -->
  <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-2">
    Converse com Nosso Especialista
  </h2>
  
  <p class="text-gray-300 text-center mb-4">
    Preencha o formulário e receba um orçamento personalizado
  </p>
  
  <!-- Campo Nome -->
  <div class="form-group">
    <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
      Nome Completo*
    </label>
    <input 
      id="name"
      type="text" 
      name="name" 
      placeholder="Seu nome completo"
      class="w-full px-4 py-3 bg-white/10 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#eb6538] focus:outline-none focus:ring-2 focus:ring-[#eb6538]/20 transition-all"
      required
    />
  </div>
  
  <!-- Campo Telefone com DDI -->
  <div class="form-group">
    <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">
      Telefone*
    </label>
    <div class="flex border-2 border-gray-600 rounded-lg overflow-hidden focus-within:border-[#eb6538] transition-colors">
      <button 
        type="button" 
        class="flex items-center px-3 py-3 bg-gray-700 hover:bg-gray-600 text-white transition-colors"
      >
        <span class="mr-2">🇧🇷</span>
        <span class="font-medium">+55</span>
      </button>
      <input 
        id="phone"
        type="tel" 
        name="phone" 
        placeholder="(00) 00000-0000"
        class="flex-1 px-4 py-3 bg-white/10 text-white placeholder-gray-400 border-0 focus:outline-none"
        required
      />
    </div>
  </div>
  
  <!-- Campo Medida (Opcional) -->
  <div class="form-group">
    <label for="medida" class="block text-sm font-medium text-gray-300 mb-2">
      Medida ou Descrição do Espaço <span class="text-gray-500">(opcional)</span>
    </label>
    <textarea 
      id="medida"
      name="medida" 
      placeholder="Ex: 1,20m x 0,60m ou descreva seu espaço disponível"
      rows="3"
      class="w-full px-4 py-3 bg-white/10 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#eb6538] focus:outline-none focus:ring-2 focus:ring-[#eb6538]/20 transition-all resize-none"
    ></textarea>
  </div>
  
  <!-- Botão Submit -->
  <button 
    type="submit" 
    class="w-full bg-[#eb6538] hover:bg-[#d45528] text-white font-bold py-4 px-6 rounded-lg uppercase tracking-wide transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#eb6538]/30 active:scale-[0.98]"
  >
    <span class="flex items-center justify-center gap-2">
      <span>Falar com Setor de Projetos</span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
      </svg>
    </span>
  </button>
  
  <!-- Privacy Notice -->
  <p class="text-xs text-gray-400 text-center mt-2">
    🔒 Seus dados estão protegidos. Não compartilhamos com terceiros.
  </p>
</form>
```

### Validação JavaScript (Opcional)

```javascript
document.getElementById('contact-form').addEventListener('submit', function(e) {
  // Validação de telefone brasileiro
  const phoneInput = document.getElementById('phone');
  const phone = phoneInput.value.replace(/\D/g, '');
  
  if (phone.length < 10 || phone.length > 11) {
    e.preventDefault();
    alert('Por favor, insira um telefone válido');
    phoneInput.focus();
    return false;
  }
  
  // Continuar com submit normal (Sellflux handle)
});

// Máscara de telefone (opcional)
document.getElementById('phone').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  
  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  e.target.value = value;
});
```

---

## 3. FAQ ACCORDION

### HTML Structure

```html
<section id="faq" class="my-16">
  <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-8 font-['Alfa_Slab_One']">
    Perguntas que Nossos Clientes Mais Fazem
  </h2>
  
  <div class="faq-accordion space-y-3">
    
    <!-- FAQ Item 1 -->
    <details class="faq-item group bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10">
      <summary class="flex justify-between items-center p-5 cursor-pointer select-none">
        <span class="font-bold text-white text-lg">
          Quanto tempo dura a entrega?
        </span>
        <span class="text-2xl text-[#eb6538] transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div class="px-5 pb-5">
        <p class="text-gray-300 leading-relaxed pl-4 border-l-2 border-[#eb6538]">
          Entre 7-15 dias úteis, conforme demanda do projeto e fila.
        </p>
      </div>
    </details>
    
    <!-- FAQ Item 2 -->
    <details class="faq-item group bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10">
      <summary class="flex justify-between items-center p-5 cursor-pointer select-none">
        <span class="font-bold text-white text-lg">
          Vocês fazem medidas especiais?
        </span>
        <span class="text-2xl text-[#eb6538] transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div class="px-5 pb-5">
        <p class="text-gray-300 leading-relaxed pl-4 border-l-2 border-[#eb6538]">
          Sim! Qualquer medida que sua alvenaria precisar.
        </p>
      </div>
    </details>
    
    <!-- FAQ Item 3 -->
    <details class="faq-item group bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10">
      <summary class="flex justify-between items-center p-5 cursor-pointer select-none">
        <span class="font-bold text-white text-lg">
          Por que Inox 304?
        </span>
        <span class="text-2xl text-[#eb6538] transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div class="px-5 pb-5">
        <p class="text-gray-300 leading-relaxed pl-4 border-l-2 border-[#eb6538]">
          Único que não enferruja no litoral e que é obrigatório, pelos órgãos de regulamentação, na produção de alimentos por não oferecer risco à saúde. Garantimos 15 anos.
        </p>
      </div>
    </details>
    
    <!-- FAQ Item 4 -->
    <details class="faq-item group bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10">
      <summary class="flex justify-between items-center p-5 cursor-pointer select-none">
        <span class="font-bold text-white text-lg">
          Precisa de pedreiro para instalar?
        </span>
        <span class="text-2xl text-[#eb6538] transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div class="px-5 pb-5">
        <p class="text-gray-300 leading-relaxed pl-4 border-l-2 border-[#eb6538]">
          O Kit Suporte Suspenso é instalado em 15 minutos necessitando apenas de 4 parafusos... Não há necessidade. Já projetos automatizados ou revestimentos de placa de inox, sim... Mas não se preocupe, nosso time irá te orientar.
        </p>
      </div>
    </details>
    
    <!-- FAQ Item 5 -->
    <details class="faq-item group bg-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/10">
      <summary class="flex justify-between items-center p-5 cursor-pointer select-none">
        <span class="font-bold text-white text-lg">
          E se não couber na minha churrasqueira?
        </span>
        <span class="text-2xl text-[#eb6538] transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div class="px-5 pb-5">
        <p class="text-gray-300 leading-relaxed pl-4 border-l-2 border-[#eb6538]">
          Devolvemos 100% do seu dinheiro. Isso nunca aconteceu. Temos um setor de projetos alinhado para solucionar sua necessidade.
        </p>
      </div>
    </details>
    
  </div>
</section>
```

### CSS Adicional

```css
/* Remove marcadores padrão */
.faq-item summary {
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

/* Animação suave de abertura */
.faq-item[open] {
  background: rgba(255, 255, 255, 0.08);
}

.faq-item[open] summary span:last-child {
  transform: rotate(45deg);
}
```

---

## 4. SEÇÃO TRANSFORMAÇÃO (Antes/Depois)

### HTML Structure

```html
<section id="transformation" class="my-16">
  <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-10 font-['Alfa_Slab_One'] uppercase">
    A Transformação
  </h2>
  
  <div class="grid md:grid-cols-2 gap-6">
    
    <!-- Coluna ANTES -->
    <div class="before-column bg-red-900/10 border-l-4 border-red-600 rounded-lg p-6">
      <h3 class="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
        <span>❌</span>
        <span>Antes:</span>
      </h3>
      
      <ul class="space-y-4">
        <li class="flex items-start gap-3 text-gray-300">
          <span class="text-red-500 text-xl flex-shrink-0">✗</span>
          <span>Não fazia churrasco com controle diferente</span>
        </li>
        <li class="flex items-start gap-3 text-gray-300">
          <span class="text-red-500 text-xl flex-shrink-0">✗</span>
          <span>Sofria com limpeza que durava horas</span>
        </li>
        <li class="flex items-start gap-3 text-gray-300">
          <span class="text-red-500 text-xl flex-shrink-0">✗</span>
          <span>Perdia churrasqueiras para a ferrugem</span>
        </li>
        <li class="flex items-start gap-3 text-gray-300">
          <span class="text-red-500 text-xl flex-shrink-0">✗</span>
          <span>Nunca acertava o ponto da carne</span>
        </li>
      </ul>
    </div>
    
    <!-- Coluna DEPOIS -->
    <div class="after-column bg-[#eb6538]/10 border-l-4 border-[#eb6538] rounded-lg p-6">
      <h3 class="text-xl font-bold text-[#eb6538] mb-6 flex items-center gap-2">
        <span>✓</span>
        <span>Depois:</span>
      </h3>
      
      <ul class="space-y-4">
        <li class="flex items-start gap-3 text-gray-300">
          <span class="text-green-400 text-xl flex-shrink-0">✓</span>
          <div>
            <strong class="text-white">Status:</strong> Todos elogiam seu churrasco perfeito
          </div>
        </li>
        <li class="flex items-start gap-3 text-gray-300">
          <span class="text-green-400 text-xl flex-shrink-0">✓</span>
          <div>
            <strong class="text-white">Praticidade:</strong> Limpeza em 15 minutos, não horas
          </div>
        </li>
        <li class="flex items-start gap-3 text-gray-300">
          <span class="text-green-400 text-xl flex-shrink-0">✓</span>
          <div>
            <strong class="text-white">Durabilidade:</strong> Inox 304 - não enferruja no litoral
          </div>
        </li>
        <li class="flex items-start gap-3 text-gray-300">
          <span class="text-green-400 text-xl flex-shrink-0">✓</span>
          <div>
            <strong class="text-white">Precisão:</strong> Controle de altura - ponto perfeito sempre
          </div>
        </li>
      </ul>
    </div>
    
  </div>
</section>
```

---

## 5. BOX DE GARANTIA

### HTML Structure

```html
<div class="guarantee-box my-12 bg-gradient-to-br from-[#eb6538]/20 to-[#eb6538]/5 border-2 border-[#eb6538] rounded-2xl p-8 text-center">
  <div class="inline-block bg-[#eb6538] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
    GARANTIA
  </div>
  
  <h3 class="text-3xl md:text-4xl font-bold text-[#eb6538] mb-3 font-['Alfa_Slab_One']">
    15 Anos de Garantia
  </h3>
  
  <p class="text-xl md:text-2xl text-white font-bold">
    10x Menos Dor de Cabeça
  </p>
  
  <p class="text-gray-300 mt-4 max-w-md mx-auto">
    Nosso compromisso com qualidade é sério. Inox 304 de verdade, que resiste ao litoral e ao tempo.
  </p>
</div>
```

---

## 6. VÍDEO EMBED (Opcional)

### HTML Structure

```html
<section id="video-demo" class="my-16">
  <h2 class="text-3xl font-bold text-white text-center mb-8">
    Veja Como Funciona
  </h2>
  
  <div class="video-container relative rounded-2xl overflow-hidden shadow-2xl">
    <video 
      class="w-full h-auto"
      controls
      poster="thumbnail.jpg"
      preload="metadata"
    >
      <source src="https://s3.1app.com.br/master/project_24727/0ABeB7uwAwQObCwbQASFbkDAfOVgpK8m.mp4" type="video/mp4">
      Seu navegador não suporta vídeo.
    </video>
  </div>
</section>
```

---

## Checklist de Componentes

- [ ] Carrossel infinito funcionando perfeitamente
- [ ] Gradientes laterais aplicados
- [ ] Formulário com integração Sellflux
- [ ] Validação de campos funcionando
- [ ] FAQ accordion responsivo
- [ ] Transformação em 2 colunas (desktop)
- [ ] Box de garantia destacado
- [ ] Vídeo com controles nativos
- [ ] Todos os links e CTAs funcionais
- [ ] Hover states implementados
- [ ] Mobile touch-friendly
