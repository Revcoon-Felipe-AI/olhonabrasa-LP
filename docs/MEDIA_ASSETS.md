# MEDIA ASSETS - Olho na Brasa

## BACKGROUNDS

### Desktop Background
**URL:** 
```
https://s3.1app.com.br/master/project_24727/N6HpIndC89mw7HY22YjehZarhadB1GUP.jpg
```
**Uso:** Background principal da página para viewport >= 768px

**Especificações:**
- Position: fixed
- Size: cover
- Attachment: fixed
- Repeat: no-repeat

---

### Mobile Background
**URL:**
```
https://s3.1app.com.br/master/project_24727/hEij1r7dW0NcdINwBWCtfD2AEkgvTK9z.jpg
```
**Uso:** Background principal da página para viewport < 768px

**Especificações:**
- Position: fixed (ou scroll para performance)
- Size: cover
- Attachment: scroll
- Repeat: no-repeat

---

## LOGO E ÍCONES

### Logo Principal
**URL:**
```
https://s3.1app.com.br/master/project_24727/t0S1gqPQHXVGj8qyYZkhv3LXPfZcpQPI.png
```
**Uso:** 
- Header (topo da coluna)
- Footer (rodapé)

**Tamanhos:**
- Desktop header: max-height 60px
- Mobile header: max-height 40px
- Footer: max-height 50px

---

### Fire Icon (Elemento Decorativo)
**URL:**
```
https://s3.1app.com.br/master/project_24727/9GfHWwfYXkqRRNxbuUWN0egO0m6AtTLZ.png
```
**Uso:**
- Bullet points especiais
- Separadores visuais
- Ícones de destaque

**Tamanho:** 24px - 32px

---

## CARROSSEL 1: KIT SUPORTE SUSPENSO (Produtos)

**Objetivo:** Mostrar todos os componentes e acessórios do kit em carrossel infinito

**Ordem sequencial das imagens:**

1. `https://s3.1app.com.br/master/project_24727/mrMhKZJUcDeGizxZ2zDqyFu52MbCiyBu.png`
2. `https://s3.1app.com.br/master/project_24727/yBEDX7LqEcSUjMORFVSteUapTqxD3wKC.png`
3. `https://s3.1app.com.br/master/project_24727/j1EBAHtTDrvgITyg4BrKScTfwiTIErpV.png`
4. `https://s3.1app.com.br/master/project_24727/24XzlU2g30rakcdYlw3X11qlzQBCtatb.png`
5. `https://s3.1app.com.br/master/project_24727/YCmbx8VIb5eQucVOpIpjS8s4cNRk7Ynb.png`
6. `https://s3.1app.com.br/master/project_24727/f6dE3DHFX3rXVGbBm3bPd2kSY4TEGD3Q.png`
7. `https://s3.1app.com.br/master/project_24727/UDxmEiYi2ChKrOVr9X6J0CBR4Lcyhk3n.png`
8. `https://s3.1app.com.br/master/project_24727/DWQVzRBny3JsuUM10wUFqgmu7XnxDsa8.png`
9. `https://s3.1app.com.br/master/project_24727/K3WSvrFc7GeEe03TFomurGPoyBywwY1S.png`
10. `https://s3.1app.com.br/master/project_24727/i79dvJm1KdpEWEIPgByvhVeg4UWiDm78.png`
11. `https://s3.1app.com.br/master/project_24727/pjWshnlndKTdX8yppLs2LPbvn5XUzksu.png`
12. `https://s3.1app.com.br/master/project_24727/U374feRcLmG3o7dLFkT8g0h9TmjjZaU9.png`

**Especificações do Carrossel:**
- Animação: scroll horizontal infinito
- Velocidade: ~30-40s para ciclo completo
- Pausa ao hover (desktop)
- Gradiente lateral com blur para efeito fade
- Gap entre imagens: 20px - 30px
- Altura das imagens: 200px (desktop) / 150px (mobile)
- Object-fit: contain ou cover (testar qual fica melhor)

**Gradiente Lateral (CSS):**
```css
&::before, &::after {
  content: '';
  position: absolute;
  top: 0;
  width: 150px;
  height: 100%;
  z-index: 2;
}
&::before {
  left: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.9) 0%, transparent 100%);
}
&::after {
  right: 0;
  background: linear-gradient(270deg, rgba(0,0,0,0.9) 0%, transparent 100%);
}
```

---

## CARROSSEL 2: PROJETOS REALIZADOS (Galeria)

**Objetivo:** Prova social - mostrar instalações reais já concluídas

**Ordem sequencial das imagens:**

1. `https://s3.1app.com.br/master/project_24727/eWKPhLCE9Wyv0jTal6z0VIIqSe0EoCb5.png`
2. `https://s3.1app.com.br/master/project_24727/aPuWmsTfsR8hkecUJ22UgXKtxU7dxCus.png`
3. `https://s3.1app.com.br/master/project_24727/xsTiZsSo2QHlnwP3Myx8VrHPUi9f4rSs.png`
4. `https://s3.1app.com.br/master/project_24727/iG7c4sRHhpJaVu8Zf4PE5jd2j7HOv7BA.png`
5. `https://s3.1app.com.br/master/project_24727/CspayYidMTYAythLoy2Hps5rW1Cllxjm.png`
6. `https://s3.1app.com.br/master/project_24727/rQ4KJ4HJBrbN38sGkkSwFvdP6Xqs6UVt.png`
7. `https://s3.1app.com.br/master/project_24727/cGJ7Wp496hGSYtAS0vMecL08GtHSDUfW.png`
8. `https://s3.1app.com.br/master/project_24727/WfajzTkmvOLAcyn3iFdpV7mGevW7pa7Z.png`
9. `https://s3.1app.com.br/master/project_24727/huNqrh3gE9kbkPU0Fe4e3elwT5HdUWtd.png`
10. `https://s3.1app.com.br/master/project_24727/AJC4pJqqaxYxksYdicwukqh1A6SLUHgV.png`

**Opções de Layout:**

**Opção A - Grid Estático:**
- Desktop: grid 3 colunas
- Mobile: grid 2 colunas ou carrossel
- Mostrar 6-9 imagens principais

**Opção B - Carrossel (Recomendado):**
- Similar ao carrossel de produtos
- Velocidade mais lenta (50-60s ciclo)
- Imagens maiores
- Altura: 300px (desktop) / 200px (mobile)

---

## CHURRASQUEIRA AUTOMATIZADA (Opcional - Premium)

**Uso:** Seção especial ou modal/lightbox mostrando produto premium

**Imagens:**
1. `https://s3.1app.com.br/master/project_24727/e1hbBcNmmouVQx4o9hXyRI9yTyTp3Jqi.png`
2. `https://s3.1app.com.br/master/project_24727/vR6tv8Oo2rb5229zqzSG5dCE8eJgflx7.png`
3. `https://s3.1app.com.br/master/project_24727/7XEKwLLfJn4fTG9UlU8tLLpOttat8Dbh.png`

**Sugestão:** Pode ser usado como upsell ou seção adicional "Conheça Nosso Modelo Premium"

---

## VÍDEOS

### Vídeo 1: Kit Suporte Suspenso + Acessórios
**URL:**
```
https://s3.1app.com.br/master/project_24727/0ABeB7uwAwQObCwbQASFbkDAfOVgpK8m.mp4
```
**Formato:** 1920x1080 (Landscape/Desktop)

**Uso Sugerido:**
- Seção dedicada "Veja Como Funciona"
- Após o formulário ou FAQ
- Player com controles
- Autoplay muted (opcional)
- Poster frame: primeiro frame do vídeo

---

### Vídeo 2: Kit Completo Montagem Prática
**URL:**
```
https://s3.1app.com.br/master/project_24727/EOF8bmeNobyQjfoswgzRjfEqslGTnjZd.mp4
```
**Formato:** 1080x1920 (Portrait/Mobile Stories)

**Uso Sugerido:**
- Versão mobile do vídeo demonstrativo
- Pode substituir vídeo 1 em telas pequenas
- Boa opção para seção de instalação rápida

---

## ESPECIFICAÇÕES TÉCNICAS GERAIS

### Otimização de Imagens
- Lazy loading: todas as imagens exceto hero
- Alt text descritivo em todas
- Aspect ratio preservado
- Compressão adequada (WebP se possível)

### Performance
- Prioridade de carregamento:
  1. Background (crítico)
  2. Logo
  3. Hero content
  4. Carrosséis
  5. Vídeos (último)

### Responsividade
- Todas as imagens devem ser responsivas
- Use object-fit adequado (cover, contain)
- Teste em diferentes viewports

---

## CHECKLIST DE USO

Antes de implementar, verificar:
- [ ] Todas as URLs estão corretas e acessíveis
- [ ] Ordem sequencial dos carrosséis preservada
- [ ] Gradientes laterais aplicados nos carrosséis
- [ ] Lazy loading implementado (exceto hero)
- [ ] Alt texts descritivos
- [ ] Aspect ratios preservados
- [ ] Mobile/Desktop backgrounds corretos
- [ ] Vídeos com fallback para imagem estática

---

## ASSETS NÃO DEVEM SER ALTERADOS

⚠️ **IMPORTANTE:** O agente não deve:
- Reordenar as imagens dos carrosséis
- Usar imagens não listadas neste documento
- Modificar URLs
- Criar novos assets sem aprovação
- Omitir imagens da sequência


Logo Five con Branca :

https://s3.1app.com.br/master/project_24727/p0aphQWQlv6SWVtppzpNyNRYjPVBpjl9.png
