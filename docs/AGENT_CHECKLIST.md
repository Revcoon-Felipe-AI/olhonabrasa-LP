# AGENT CHECKLIST - Olho na Brasa Landing Page

## ✅ PRÉ-DESENVOLVIMENTO

### Leitura de Documentação
- [ ] Li completamente PROJECT_BRIEF.md
- [ ] Li completamente BRAND_IDENTITY.md
- [ ] Li completamente CONTENT_COPY.md
- [ ] Li completamente MEDIA_ASSETS.md
- [ ] Li completamente LAYOUT_STRUCTURE.md
- [ ] Li completamente COMPONENT_SPECS.md
- [ ] Compreendi todas as regras invioláveis
- [ ] Identifiquei componentes críticos

---

## ✅ ESTRUTURA E LAYOUT

### Background
- [ ] Background desktop implementado (N6HpIndC89mw7HY22YjehZarhadB1GUP.jpg)
- [ ] Background mobile implementado (hEij1r7dW0NcdINwBWCtfD2AEkgvTK9z.jpg)
- [ ] Background fixo (fixed) no desktop
- [ ] Background scroll otimizado no mobile
- [ ] Breakpoint correto em 768px (md:)
- [ ] Background cobre 100% viewport

### Coluna Principal
- [ ] UMA ÚNICA coluna centralizada
- [ ] Max-width: 600px
- [ ] Backdrop-blur aplicado
- [ ] Background semi-transparente rgba(30, 30, 30, 0.85)
- [ ] Border-radius: 24px (desktop) / 16px (mobile)
- [ ] Box-shadow adequado
- [ ] Padding interno correto
- [ ] Margin vertical adequada
- [ ] Responsiva mobile (90% largura)

---

## ✅ IDENTIDADE VISUAL

### Cores
- [ ] Cor principal #eb6538 aplicada corretamente
- [ ] Nenhuma cor fora da paleta definida
- [ ] Overlay escuro sobre background
- [ ] Gradientes usando cores aprovadas
- [ ] Contraste adequado (acessibilidade)

### Tipografia
- [ ] Alfa Slab One importada e funcionando
- [ ] Headlines usando Alfa Slab One
- [ ] Hierarquia tipográfica correta (H1 > H2 > H3)
- [ ] Tamanhos responsivos (desktop/mobile)
- [ ] Line-height adequado
- [ ] Letter-spacing nos títulos

### Logo e Ícones
- [ ] Logo no header (60px desktop / 40px mobile)
- [ ] Logo no footer (50px)
- [ ] Logo não distorcida
- [ ] Fire icon disponível para uso
- [ ] Alt text em todas as imagens

---

## ✅ CONTEÚDO (COPY)

### Seção Hero
- [ ] Headline: "O Rei do Churrasco garantido por 15 Anos"
- [ ] Subheadline completa presente
- [ ] Texto centralizado
- [ ] Cores corretas (#eb6538 no headline)

### Seção Transformação
- [ ] Título "A TRANSFORMAÇÃO" presente
- [ ] Coluna ANTES com 4 itens
- [ ] Coluna DEPOIS com 4 itens
- [ ] Ícones ✗ (antes) e ✓ (depois)
- [ ] Layout 2 colunas desktop / stack mobile
- [ ] Bordas laterais coloridas (vermelho/laranja)

### Seção Oferta
- [ ] Título "Qualquer Medida que Sua Alvenaria Precisar"
- [ ] 3 benefícios listados
- [ ] Box de garantia "15 Anos"
- [ ] "10x Menos Dor de Cabeça"

### FAQ
- [ ] Título "Perguntas que Nossos Clientes Mais Fazem"
- [ ] 5 perguntas implementadas
- [ ] Accordion funcional
- [ ] Textos completos das respostas
- [ ] Animação de abertura/fechamento

### Footer
- [ ] Logo presente
- [ ] "Olho na Brasa"
- [ ] "São José - SC"
- [ ] Copyright (opcional)

---

## ✅ COMPONENTES CRÍTICOS

### Carrossel de Produtos (CRÍTICO)
- [ ] 12 imagens na ordem correta
- [ ] Imagens duplicadas para loop infinito
- [ ] Animação scroll-left funcionando
- [ ] Duração ~40s para ciclo completo
- [ ] Pausa ao hover (desktop)
- [ ] Gradiente lateral ESQUERDA implementado
- [ ] Gradiente lateral DIREITA implementado
- [ ] Gap entre imagens: 30px (desktop) / 20px (mobile)
- [ ] Altura imagens: 200px (desktop) / 150px (mobile)
- [ ] Sem quebras visíveis no loop
- [ ] Performance otimizada (sem jank)

### Carrossel de Projetos
- [ ] 10 imagens de projetos na ordem
- [ ] Layout grid OU carrossel implementado
- [ ] Imagens responsivas
- [ ] Hover effect (se grid)
- [ ] Border-radius nas imagens

### Formulário (CRÍTICO)
- [ ] Atributo save_sfx="true" presente
- [ ] Campo Nome (required)
- [ ] Campo Telefone com DDI +55 (required)
- [ ] Campo Medida/Descrição (opcional)
- [ ] Botão CTA "Falar com Setor de Projetos"
- [ ] Cor do botão: #eb6538
- [ ] Hover state no botão
- [ ] Focus state nos inputs
- [ ] Border-color #eb6538 no focus
- [ ] Validação básica funcionando
- [ ] Privacy notice presente
- [ ] Layout responsivo

---

## ✅ RESPONSIVIDADE

### Breakpoints
- [ ] Mobile first approach
- [ ] Breakpoint principal em 768px (md:)
- [ ] Background switch funcionando
- [ ] Coluna ajustada para mobile
- [ ] Carrosséis responsivos
- [ ] Formulário usável em mobile
- [ ] FAQ accordion mobile-friendly
- [ ] Transformação stack em mobile
- [ ] Tipografia escalada corretamente

### Touch & Mobile UX
- [ ] Carrosséis com touch scroll (mobile)
- [ ] Botões com área de toque adequada (min 44px)
- [ ] Formulário com zoom disabled (font-size >= 16px)
- [ ] FAQ fácil de expandir em touch
- [ ] Scroll suave
- [ ] Sem elementos cortados

---

## ✅ PERFORMANCE

### Imagens
- [ ] Lazy loading em imagens não-críticas
- [ ] Alt text descritivo em todas
- [ ] Aspect ratio preservado
- [ ] Object-fit adequado
- [ ] Carregamento progressivo

### Animações
- [ ] Animações suaves (60fps)
- [ ] Sem jank ou stuttering
- [ ] CSS transforms ao invés de position
- [ ] Will-change usado com parcimônia
- [ ] Redução de movimento respeitada (opcional)

### Geral
- [ ] HTML semântico
- [ ] CSS otimizado (sem duplicações)
- [ ] JavaScript mínimo necessário
- [ ] Sem console.errors
- [ ] Tempo de carregamento < 3s

---

## ✅ FUNCIONALIDADES

### Interatividade
- [ ] Links funcionais
- [ ] Botões clicáveis
- [ ] Formulário submete corretamente
- [ ] FAQ abre/fecha suavemente
- [ ] Carrosséis pausam ao hover
- [ ] Hover states implementados
- [ ] Focus states para acessibilidade

### Navegação
- [ ] Scroll suave (opcional)
- [ ] Âncoras funcionando (se houver)
- [ ] Nenhum link quebrado
- [ ] CTAs destacados
- [ ] Ordem lógica de tabulação

---

## ✅ ACESSIBILIDADE

### Básico
- [ ] Contraste mínimo WCAG AA
- [ ] Texto alternativo em imagens
- [ ] Labels em inputs do formulário
- [ ] Foco visível em elementos interativos
- [ ] Tamanho mínimo de fonte (14px mobile)
- [ ] Hierarquia de headings correta (H1 > H2 > H3)

### Formulário
- [ ] Labels associados aos inputs
- [ ] Required fields marcados
- [ ] Mensagens de erro claras (se houver validação)
- [ ] Placeholder não substitui label

---

## ✅ SEO BÁSICO (Opcional)

- [ ] Title tag presente
- [ ] Meta description presente
- [ ] Heading hierarchy correta
- [ ] Alt text descritivo
- [ ] Semantic HTML5 tags
- [ ] URLs de imagens acessíveis

---

## ✅ VALIDAÇÃO FINAL

### Testes Visuais
- [ ] Desktop (1920x1080) renderiza perfeitamente
- [ ] Laptop (1366x768) renderiza perfeitamente
- [ ] Tablet (768x1024) renderiza perfeitamente
- [ ] Mobile (375x667) renderiza perfeitamente
- [ ] Mobile landscape testado

### Testes de Browser (Principais)
- [ ] Chrome/Edge funciona
- [ ] Firefox funciona
- [ ] Safari funciona (se possível)
- [ ] Mobile browsers funcionam

### Testes de Conteúdo
- [ ] Nenhum texto cortado
- [ ] Todas as imagens carregam
- [ ] Vídeos reproduzem (se incluídos)
- [ ] Nenhum texto em Lorem Ipsum
- [ ] Ortografia verificada

### Testes de Funcionalidade
- [ ] Formulário submete
- [ ] Carrosséis animam
- [ ] FAQ expande/colapsa
- [ ] Todos os links funcionam
- [ ] Nenhum JavaScript error

---

## ✅ REGRAS INVIOLÁVEIS (CRÍTICO)

### NUNCA FAZER:
- [ ] ❌ Criar múltiplas colunas
- [ ] ❌ Usar background incorreto (desktop/mobile)
- [ ] ❌ Ignorar cores da marca
- [ ] ❌ Alterar ordem das seções
- [ ] ❌ Criar carrosséis estáticos
- [ ] ❌ Omitir gradientes laterais
- [ ] ❌ Usar imagens não listadas
- [ ] ❌ Distorcer logo
- [ ] ❌ Usar fontes não aprovadas
- [ ] ❌ Quebrar responsividade

### SEMPRE FAZER:
- [ ] ✅ Background fixo desktop/mobile
- [ ] ✅ UMA coluna centralizada
- [ ] ✅ Backdrop-blur na coluna
- [ ] ✅ Carrosséis infinitos
- [ ] ✅ Gradientes laterais fade
- [ ] ✅ Formulário com save_sfx="true"
- [ ] ✅ Cores exatas da marca
- [ ] ✅ Alfa Slab One nos títulos
- [ ] ✅ Ordem correta das seções

---

## ✅ ENTREGA

### Arquivos Finais
- [ ] HTML validado
- [ ] CSS organizado
- [ ] JavaScript funcional (se houver)
- [ ] Todos os assets linkados corretamente
- [ ] Código comentado (onde necessário)
- [ ] README com instruções (opcional)

### Documentação
- [ ] Alterações documentadas (se houver)
- [ ] Problemas conhecidos listados (se houver)
- [ ] Sugestões de melhoria (se houver)

---

## 🎯 CRITÉRIOS DE SUCESSO

A landing page está pronta quando:

1. ✅ Todos os itens deste checklist estão marcados
2. ✅ Nenhuma regra inviolável foi quebrada
3. ✅ Carrosséis funcionam perfeitamente
4. ✅ Formulário submete corretamente
5. ✅ Responsividade perfeita mobile/desktop
6. ✅ Performance adequada (< 3s load)
7. ✅ Nenhum console error
8. ✅ Copy completa e correta
9. ✅ Identidade visual preservada
10. ✅ Experiência do usuário fluida

---

## 📝 NOTAS FINAIS

**Se algum item não puder ser completado:**
- Documentar o motivo
- Propor solução alternativa
- Marcar como "pendente" com explicação

**Prioridades em caso de conflito:**
1. Regras invioláveis (nunca quebrar)
2. Componentes críticos (carrosséis, formulário)
3. Responsividade (mobile-first)
4. Performance
5. Detalhes estéticos

**Lembrete Final:**
Esta landing page é a vitrine da Olho na Brasa. Cada detalhe conta. Qualidade > Velocidade.

---

## ✍️ ASSINATURA DO AGENTE

Ao completar este checklist, o agente confirma que:
- Leu toda a documentação
- Seguiu todas as especificações
- Testou em múltiplos dispositivos
- Validou todos os componentes
- Nenhuma regra foi violada
- O projeto está pronto para produção

**Data de Conclusão:** _________________

**Observações Finais:** _________________
