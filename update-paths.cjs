const fs = require('fs');
const files = [
  'astro.config.mjs',
  'src/pages/index.astro',
  'src/pages/blog/[slug].astro',
  'src/pages/blog/index.astro',
  'src/layouts/Layout.astro',
  'src/components/Header.astro',
  'src/components/Footer.astro'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/"\/portfolio\//g, '"/portfolio-js/');
  content = content.replace(/base: "\/portfolio"/g, 'base: "/portfolio-js"');
  content = content.replace(/href="\/portfolio"/g, 'href="/portfolio-js"');
  fs.writeFileSync(f, content);
  console.log('Updated ' + f);
});
