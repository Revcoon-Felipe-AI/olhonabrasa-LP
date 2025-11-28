# BRAND IDENTITY - Olho na Brasa

## Paleta de Cores

### Cor Principal
```css
--primary-orange: #eb6538
```
**Uso:** CTAs, headlines de destaque, hover states, ícones importantes

### Cores Complementares Permitidas
```css
--dark-overlay: rgba(0, 0, 0, 0.7)      /* Overlay sobre backgrounds */
--light-overlay: rgba(0, 0, 0, 0.5)     /* Overlay mais suave */
--text-white: #ffffff                    /* Textos sobre fundos escuros */
--text-gray: #e5e7eb                     /* Textos secundários */
--border-gray: #4b5563                   /* Bordas de formulários */
--bg-card: rgba(30, 30, 30, 0.85)       /* Background da coluna principal */
```

### Gradientes Permitidos
```css
/* Gradiente lateral para carrosséis */
background: linear-gradient(
  90deg, 
  rgba(0,0,0,0.8) 0%, 
  rgba(0,0,0,0) 10%, 
  rgba(0,0,0,0) 90%, 
  rgba(0,0,0,0.8) 100%
);

/* Gradiente hover para botões */
background: linear-gradient(135deg, #eb6538 0%, #d45528 100%);
```

---

## Tipografia

### Font Stack
```css
/* Headlines e títulos principais */
font-family: 'Alfa Slab One', serif;

/* Textos corridos e parágrafos */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Hierarquia Tipográfica

**H1 - Headline Principal**
```css
font-family: 'Alfa Slab One', serif;
font-size: 3.5rem;        /* Desktop */
font-size: 2rem;          /* Mobile */
color: #eb6538;
line-height: 1.2;
text-transform: uppercase;
letter-spacing: -0.02em;
```

**H2 - Subheadline**
```css
font-family: 'Alfa Slab One', serif;
font-size: 2rem;          /* Desktop */
font-size: 1.5rem;        /* Mobile */
color: #ffffff;
line-height: 1.3;
```

**H3 - Títulos de Seção**
```css
font-family: 'Alfa Slab One', serif;
font-size: 1.75rem;       /* Desktop */
font-size: 1.25rem;       /* Mobile */
color: #ffffff;
text-transform: uppercase;
letter-spacing: 0.05em;
```

**Body Text**
```css
font-size: 1.125rem;      /* Desktop */
font-size: 1rem;          /* Mobile */
color: #e5e7eb;
line-height: 1.6;
```

**Small Text / Captions**
```css
font-size: 0.875rem;
color: #9ca3af;
line-height: 1.5;
```

---

## Assets da Marca

### Logo
**URL:** `https://s3.1app.com.br/master/project_24727/t0S1gqPQHXVGj8qyYZkhv3LXPfZcpQPI.png`

**Especificações de Uso:**
- Altura máxima no header: 60px (desktop) / 40px (mobile)
- Sempre em fundo escuro ou com contraste adequado
- Margem mínima ao redor: 20px
- Não distorcer proporções

### Fire Icon (Elemento Decorativo)
**URL:** `https://s3.1app.com.br/master/project_24727/9GfHWwfYXkqRRNxbuUWN0egO0m6AtTLZ.png`

**Uso Sugerido:**
- Bullet points especiais
- Separadores de seção
- Elementos de destaque
- Tamanho: 24px-32px

---

## Backgrounds

### Desktop Background
**URL:** `https://s3.1app.com.br/master/project_24727/N6HpIndC89mw7HY22YjehZarhadB1GUP.jpg`

**Especificações CSS:**
```css
background-image: url('...');
background-size: cover;
background-position: center;
background-attachment: fixed;
background-repeat: no-repeat;
```

### Mobile Background
**URL:** `https://s3.1app.com.br/master/project_24727/hEij1r7dW0NcdINwBWCtfD2AEkgvTK9z.jpg`

**Especificações CSS:**
```css
@media (max-width: 767px) {
  background-image: url('...');
  background-size: cover;
  background-position: center;
  background-attachment: scroll; /* Melhor performance mobile */
}
```

---

## Componentes Visuais

### Coluna Principal (Card Container)
```css
max-width: 600px;
margin: 0 auto;
background: rgba(30, 30, 30, 0.85);
backdrop-filter: blur(10px);
border-radius: 24px;
padding: 40px 30px;
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
```

### Botões CTA
```css
/* Primary Button */
background: #eb6538;
color: #ffffff;
padding: 16px 32px;
border-radius: 12px;
font-weight: 700;
font-size: 1.125rem;
transition: all 0.3s ease;
text-transform: uppercase;
letter-spacing: 0.05em;

/* Hover State */
background: linear-gradient(135deg, #eb6538 0%, #d45528 100%);
transform: translateY(-2px);
box-shadow: 0 10px 30px rgba(235, 101, 56, 0.4);
```

### Input Fields
```css
background: rgba(255, 255, 255, 0.1);
border: 2px solid #4b5563;
color: #ffffff;
padding: 14px 18px;
border-radius: 8px;
font-size: 1rem;

/* Focus State */
border-color: #eb6538;
outline: none;
box-shadow: 0 0 0 3px rgba(235, 101, 56, 0.2);
```

---

## Ícones e Elementos Visuais

### Checkmarks (Listas de Benefícios)
```html
<!-- Usar o fire icon ou checkmark simples -->
<span class="text-green-400">✓</span>
<!-- ou -->
<img src="fire-icon-url" class="w-5 h-5" />
```

### Separadores de Seção
```css
border-top: 2px solid rgba(235, 101, 56, 0.3);
margin: 60px 0;
```

---

## Diretrizes de Uso

### ✅ Permitido
- Variações de opacidade das cores definidas
- Gradientes usando as cores da paleta
- Sombras e efeitos com as cores base
- Alfa Slab One para todos os títulos

### ❌ Proibido
- Cores fora da paleta definida
- Fontes diferentes das especificadas
- Distorcer a logo
- Usar imagens de background não aprovadas
- Criar novos gradientes com cores externas

---

## Acessibilidade

### Contraste Mínimo
- Texto branco em fundo escuro: ratio 7:1 ✅
- Orange (#eb6538) em fundo escuro: ratio 4.5:1 ✅
- Todos os textos devem ser legíveis

### Tamanho Mínimo de Texto
- Desktop: 16px (1rem) mínimo
- Mobile: 14px (0.875rem) mínimo para captions
