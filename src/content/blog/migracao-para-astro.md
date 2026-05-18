---
title: "Reestruturando meu Portfólio: De Vanilla JS para Astro"
description: "Descubra os motivos que me levaram a migrar meu portfólio de JavaScript Vanilla para o framework Astro, trazendo mais performance e um novo blog focado em conteúdo."
pubDate: 2026-05-18
tags: ["Astro", "JavaScript", "Desenvolvimento Web", "Performance"]
---

## O Início: JavaScript Vanilla e a Simplicidade

Quando construí a primeira versão do meu portfólio, minha principal meta era ter algo no ar rapidamente, que fosse leve, direto ao ponto e não dependesse de ferramentas complexas. Por isso, a escolha mais natural foi usar **HTML puro, CSS e JavaScript Vanilla**.

Sem frameworks pesados como React ou Angular, o site era extremamente veloz e os scripts cuidavam perfeitamente da lógica da página: a barra de progresso no topo, as animações ao rolar a tela, o modal de projetos, etc. Essa abordagem garantiu uma performance excelente (com pontuações quase perfeitas no Lighthouse) e foi fundamental para consolidar meus conhecimentos nos pilares fundamentais da web.

No entanto, à medida que eu precisava evoluir a arquitetura do site, algumas limitações dessa abordagem se tornaram nítidas.

## O Desafio: A Necessidade de um Blog e a Escalabilidade

Recentemente, decidi que o portfólio precisava não só mostrar os projetos, mas também documentar os meus aprendizados e reflexões sobre a área de tecnologia. Era hora de **adicionar um blog**.

Tentar implementar um sistema de blog estático puramente com JavaScript Vanilla, no qual os arquivos Markdown precisariam ser renderizados dinamicamente pelo lado do cliente (ou através de scripts complexos de Node.js que eu mesmo precisaria criar e manter), provou ser uma reinvenção desnecessária da roda. 

Foi aí que surgiu a necessidade de modernizar a stack.

## Por que o Astro?

Para quem ainda não conhece, o Astro é um framework moderno focado primariamente em entregar sites rápidos focados em conteúdo. Algumas características foram definitivas para essa escolha:

1. **Zero JavaScript por padrão:** O Astro gera HTML estático sem enviar um kilobyte de JS para o navegador, a não ser que você precise. Ou seja, eu continuaria com a performance insana que o Vanilla me proporcionava.
2. **Sistema de Componentes Integrado:** Eu poderia quebrar partes da página (como `Header`, `Footer` e `Layout`) em arquivos `.astro` reutilizáveis, reduzindo a duplicação de código no `index.html`.
3. **Coleções de Conteúdo (Content Collections):** O suporte nativo do Astro ao Markdown e ao MDX resolveu instantaneamente o problema do blog. Com o módulo nativo `astro:content` e validação via `Zod`, passei a criar novos artigos com facilidade, garantia de tipagem e geração automática de rotas.

## O Processo de Migração

A migração em si foi incrivelmente suave:

*   **HTML para `.astro`:** A maior parte do arquivo `index.html` virou o componente pai `index.astro`, e as seções comuns viraram `Header.astro`, `Footer.astro`, etc.
*   **Preservação da Lógica Legada:** Em vez de reescrever todas as minhas animações que funcionavam muito bem em Vanilla, o Astro me permitiu apenas referenciar meus scripts originais (`app.js`, `projects-data.js`) e eles funcionaram perfeitamente no novo ambiente de build sem precisar de nenhuma adaptação.
*   **A Criação do Blog:** Criei o diretório `src/content/blog` e comecei a escrever os artigos. Agora, quando eu rodo `npm run build`, o Astro cria automaticamente as páginas estáticas para cada post do blog com um tempo de build de menos de 5 segundos.

## Conclusão

Embora começar com Vanilla JS tenha sido uma excelente decisão técnica e didática que fortaleceu minha base, migrar para o **Astro** abriu novas portas.

Essa reestruturação não só deixou o código mais limpo, componentizado e sustentável, mas também permitiu o nascimento desse blog que você está lendo agora! A melhor parte? Tudo isso mantendo a performance da aplicação no topo e a arquitetura devidamente preparada para o futuro.
