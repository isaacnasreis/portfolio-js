import fs from 'fs';

let html = fs.readFileSync('src/pages/index.astro', 'utf8');

// Extract head
const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
const headContent = headMatch ? headMatch[1] : '';

// Extract header
const headerMatch = html.match(/<header class="cabecalho section">([\s\S]*?)<\/header>/);
const headerContent = headerMatch ? headerMatch[0] : '';

// Extract footer
const footerMatch = html.match(/<footer class="rodape"[^>]*>([\s\S]*?)<\/footer>/);
const footerContent = footerMatch ? footerMatch[0] : '';

// Extract scripts
const scriptsMatch = html.match(/(<script[^>]*><\/script>\s*)+<\/body>/);
const scriptsContent = scriptsMatch ? scriptsMatch[0].replace('</body>', '') : '';

// Extract main content
let mainContent = html;
mainContent = mainContent.replace(/<!doctype html>[\s\S]*?<body[^>]*>/, '');
mainContent = mainContent.replace(/<a href="#sobreMim" class="skip-link">.*?<\/a>/, '');
mainContent = mainContent.replace(/<div class="scroll-progress-bar".*?<\/div>/, '');
mainContent = mainContent.replace(headerContent, '');
mainContent = mainContent.replace(footerContent, '');
mainContent = mainContent.replace(scriptsContent, '');
mainContent = mainContent.replace(/<\/body>\s*<\/html>/, '');

const layoutAstro = `---
import '../styles/global.css'; // Just in case we need it, but we use public/assets
const { title = "Portfólio | Isaac N Reis - Desenvolvedor Full-Stack", description = "Portfólio de Isaac N Reis, desenvolvedor Full-Stack especializado na criação de aplicações web modernas e de alta qualidade, com foco em performance, responsividade e experiência do usuário." } = Astro.props;
---
<!doctype html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="author" content="Isaac N Reis" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <meta name="keywords" content="sites, web, desenvolvimento, programador, frontend, front-end, fullstack, full stack, freelancer, freela, website, portfólio" />
  <title>{title}</title>
  <link rel="shortcut icon" href="/assets/img/logo.webp" type="image/x-icon" />
  <link rel="canonical" href="https://isaacnasreis.github.io/portfolio/" />
  <link rel="icon" href="/assets/img/logo.webp" />
  <link rel="apple-touch-icon" href="/assets/img/logo.webp" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/css/style.css" />
</head>
<body>
  <a href="#sobreMim" class="skip-link">Pular para conteúdo principal</a>
  <div class="scroll-progress-bar" id="scrollProgressBar" aria-hidden="true"></div>
  <slot />
  ${scriptsContent}
</body>
</html>
`;

const headerAstro = `---
---
${headerContent.replace(/href="#/g, 'href="/#')}
`;

const footerAstro = `---
---
${footerContent}
`;

const indexAstro = `---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---
<Layout>
  <Header />
  ${mainContent}
  <Footer />
</Layout>
`;

fs.writeFileSync('src/layouts/Layout.astro', layoutAstro);
fs.writeFileSync('src/components/Header.astro', headerAstro);
fs.writeFileSync('src/components/Footer.astro', footerAstro);
fs.writeFileSync('src/pages/index.astro', indexAstro);

// remove the import line from layout as we don't have styles/global.css yet
let layout = fs.readFileSync('src/layouts/Layout.astro', 'utf8');
layout = layout.replace("import '../styles/global.css';", "");
fs.writeFileSync('src/layouts/Layout.astro', layout);
