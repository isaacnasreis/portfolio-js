// === SCROLL PROGRESS BAR ===
function setupScrollProgress() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// === RIPPLE EFFECT ===
function addRipple(button) {
  button.classList.add('ripple-btn');
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

function setupMobileMenu() {
  const menuToggle = document.querySelector(".cabecalho__menu-toggle");
  const menuNav = document.querySelector(".cabecalho__menu-mobile--nav");
  const closeButton = document.querySelector(".cabecalho__menu-mobile--fechar");
  const navLinks = document.querySelectorAll(".cabecalho__navMobilelink");

  if (!menuToggle || !menuNav || !closeButton) return;

  const focusableElements = menuNav.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      toggleMenu();
    }

    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  const toggleMenu = () => {
    const isActive = menuNav.classList.toggle("active");
    document.body.classList.toggle("no-scroll", isActive);
    menuToggle.setAttribute("aria-expanded", isActive);
    menuNav.setAttribute("aria-hidden", !isActive);

    menuToggle.setAttribute(
      "aria-label",
      isActive ? "Fechar menu" : "Abrir menu",
    );

    if (isActive) {
      document.addEventListener("keydown", handleKeydown);
      closeButton.focus(); // Move o foco para o botão de fechar
    } else {
      document.removeEventListener("keydown", handleKeydown);
      menuToggle.focus(); // Retorna o foco para o botão que abriu o menu
    }
  };

  menuToggle.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", toggleMenu);
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuNav.classList.contains("active")) toggleMenu();
    });
  });
}

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (!this.form) return;
    this.originalButtonText = this.formButton.innerText;

    this.url = this.form.getAttribute("action");
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  resetFormButton() {
    if (!this.formButton) return;
    this.formButton.disabled = false;
    this.formButton.innerText = this.originalButtonText;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission() {
    this.formButton.disabled = true;
    this.formButton.innerText = "Enviando...";
  }

  showError(field, message) {
    const input = this.form.querySelector(`[name="${field}"]`);
    const errorSpan = this.form.querySelector(`#error-${field}`);
    if (input) input.classList.add("input-error");
    if (errorSpan) errorSpan.innerText = message;
  }

  clearErrors() {
    this.form
      .querySelectorAll(".input-error")
      .forEach((el) => el.classList.remove("input-error"));
    this.form
      .querySelectorAll(".error-message")
      .forEach((el) => (el.innerText = ""));
  }

  validateForm() {
    this.clearErrors();
    const fields = this.getFormObject();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (fields._honey) {
      console.log("Honeypot triggered. Likely a bot.");
      return false;
    }

    const submissionTime = new Date().getTime();
    const loadTime = parseInt(
      this.form.querySelector('[name="_time"]').value,
      10,
    );
    if (submissionTime - loadTime < 3000) {
      console.log("Form submitted too quickly. Likely a bot.");
      return false;
    }

    if (!fields.nome || fields.nome.trim() === "") {
      this.showError("nome", "O campo nome é obrigatório.");
      isValid = false;
    }

    if (!fields.email || fields.email.trim() === "") {
      this.showError("email", "O campo email é obrigatório.");
      isValid = false;
    } else if (!emailRegex.test(fields.email)) {
      this.showError("email", "Por favor, insira um email válido.");
      isValid = false;
    }

    if (!fields.mensagem || fields.mensagem.trim() === "") {
      this.showError("mensagem", "O campo de mensagem é obrigatório.");
      isValid = false;
    }

    return isValid;
  }

  async sendForm(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    try {
      this.onSubmission();
      const formData = this.getFormObject();
      delete formData._honey;
      delete formData._time;

      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        this.displaySuccess();
      } else {
        this.resetFormButton();
        throw new Error(
          `O servidor respondeu com o status: ${response.status}`,
        );
      }
    } catch (error) {
      this.displayError();
      this.resetFormButton();
      console.error("Houve um problema com a requisição fetch:", error);
    }
  }

  init() {
    if (this.formButton) {
      const timeField = this.form.querySelector('[name="_time"]');
      if (timeField) timeField.value = new Date().getTime();

      this.form.addEventListener("submit", this.sendForm);
    }
    return this;
  }
}

// === STAGGER + FLIP ANIMATION SYSTEM ===
function setupScrollAnimation() {
  const selector = '.animate, .animate-flip';
  const animatedElements = document.querySelectorAll(selector);
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    },
    { threshold: 0.08 }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// Apply stagger delays to a list of elements
function applyStaggerDelays(elements, maxDelay = 6) {
  elements.forEach((el, i) => {
    const delayClass = `animate-delay-${Math.min(i + 1, maxDelay)}`;
    el.classList.add('animate-flip', delayClass);
  });
}

function createSkillElement(skill) {
  const skillCard = document.createElement("div");
  skillCard.className = "skills__card";
  if (skill.customCardStyle) {
    skillCard.style.cssText = skill.customCardStyle;
  }

  const normalizedSvg = skill.svg
    .replace(/fill="#212529"/gi, 'fill="currentColor"')
    .replace(/stroke="#212529"/gi, 'stroke="currentColor"');

  skillCard.innerHTML = `
    ${normalizedSvg}
    <h3 class="skills__cardTitulo" style="${skill.customTitleStyle || ""}">${skill.title
    }</h3>
  `;

  const icon = skillCard.querySelector("svg");
  if (icon) {
    icon.classList.add("skills__icon");
  }

  return skillCard;
}

function createEducationElement(education) {
  const educationArticle = document.createElement("article");
  educationArticle.className = "formacao";
  educationArticle.innerHTML = `
    <div class="formacao__header">
      <div style="display: flex; gap: 2rem; align-items: center">
        <div class="${education.logoClass}"></div>
        <h3 class="formacao__titulo">${education.title}</h3>
      </div>
      <h3 class="formacao__periodo">${education.period}</h3>
    </div>
    <div class="formacao__body">
      <p>${education.description}</p>
    </div>
  `;
  return educationArticle;
}

const linkSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.8333 9.16658L17.6667 2.33325" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.3333 5.66675V1.66675H14.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.16667 1.66675H7.5C3.33333 1.66675 1.66667 3.33341 1.66667 7.50008V12.5001C1.66667 16.6667 3.33333 18.3334 7.5 18.3334H12.5C16.6667 18.3334 18.3333 16.6667 18.3333 12.5001V10.8334" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

const figmaSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path>
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path>
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path>
    <path d="M5 19.5l7-3.5v-4"></path>
  </svg>
`;

function createProjectElement(project) {
  const projectArticle = document.createElement('article');
  projectArticle.className = 'projeto animate-flip';

  if (project.featured) {
    projectArticle.classList.add('projeto--featured');
  }

  let categoryBadge = '';
  if (project.category && project.category.length > 0) {
    const categories = Array.isArray(project.category) ? project.category : [project.category];
    categoryBadge = categories.map(cat => `<span class="projeto__category-badge">${cat}</span>`).join('');
  }

  let linksHtml = '';
  if (project.customLinks) {
    linksHtml = project.customLinks
      .map(
        (link) =>
          `<a class="projeto__link" href="${link.url}" target="_blank" rel="noopener noreferrer">
        ${linkSVG} ${link.text}
      </a>`,
      )
      .join('');
  } else {
    linksHtml = `
      <a class="projeto__link" href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">
        ${linkSVG} Demo
      </a>
      <a class="projeto__link" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">
        ${linkSVG} Repositório
      </a>`;

    if (project.figmaUrl) {
      linksHtml += `
        <a class="projeto__link figma-link" href="${project.figmaUrl}" target="_blank" rel="noopener noreferrer">
          ${figmaSVG} Figma
        </a>`;
    }
  }

  let tagsHtml = '';
  if (project.tags && project.tags.length > 0) {
    tagsHtml = `<div class="projeto__tags">${project.tags.map(tag => `<span class="projeto__tag">${tag}</span>`).join('')}</div>`;
  }

  const imageContainer = `<div class="projeto__imagemContainer ${project.imageClass}">
    <img src="${project.imageSrc}" alt="Screenshot do projeto ${project.title}" 
         class="projeto__imagem" loading="lazy" decoding="async" />
    <div class="projeto__imagemOverlay">
      <button class="projeto__botao-modal" data-project-title="${project.title}">Ver Detalhes</button>
    </div>
  </div>`;

  const textContainer = `
    <div class="projeto__textoContainer">
      <div class="projeto__header">${categoryBadge}</div>
      <h3 class="projeto__titulo">${project.title}</h3>
      ${tagsHtml}
      <p class="projeto__descricao">${project.description}</p>
      <div class="projeto__linksContainer">${linksHtml}</div>
    </div>
  `;

  projectArticle.innerHTML = imageContainer + textContainer;

  // Modal button
  const modalButton = projectArticle.querySelector('.projeto__botao-modal');
  if (modalButton) {
    modalButton.addEventListener('click', () => openModal(project));
  }

  return projectArticle;
}

// Modal Logic
let lastFocusedElement = null;

function setupModal() {
  const modal = document.getElementById("projetoModal");
  if (!modal) return;
  const closeButtons = modal.querySelectorAll("[data-close-modal]");

  closeButtons.forEach(btn => {
    btn.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") !== "true") {
      closeModal();
    }

    // Focus trap
    if (e.key === "Tab" && modal.getAttribute("aria-hidden") !== "true") {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    }
  });
}

function openModal(project) {
  const modal = document.getElementById("projetoModal");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalDescricao = document.getElementById("modalDescricao");
  const modalTags = document.getElementById("modalTags");
  const modalLinks = document.getElementById("modalLinks");
  const modalGaleria = document.getElementById("modalGaleria");

  if (!modal) return;

  // Save the element that triggered the modal
  lastFocusedElement = document.activeElement;

  // Populate data
  modalTitulo.textContent = project.title;
  modalDescricao.innerHTML = project.fullDescription || project.description;

  // Tags
  if (project.tags) {
    modalTags.innerHTML = project.tags.map(tag => `<span class="projeto__tag">${tag}</span>`).join("");
  } else {
    modalTags.innerHTML = "";
  }

  // Links
  let linksHtml = "";
  if (project.customLinks) {
    linksHtml = project.customLinks.map(link => `<a class="projeto__link" href="${link.url}" target="_blank" rel="noopener noreferrer">${linkSVG} ${link.text}</a>`).join("");
  } else {
    linksHtml = `
      <a class="projeto__link" href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">${linkSVG} Demo</a>
      <a class="projeto__link" href="${project.repoUrl}" target="_blank" rel="noopener noreferrer">${linkSVG} Repositório</a>
    `;
    if (project.figmaUrl) {
      linksHtml += `<a class="projeto__link figma-link" href="${project.figmaUrl}" target="_blank" rel="noopener noreferrer">${figmaSVG} Figma</a>`;
    }
  }
  modalLinks.innerHTML = linksHtml;

  // Gallery
  modalGaleria.innerHTML = "";
  if (project.gallery && project.gallery.length > 0) {
    project.gallery.forEach(imgSrc => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = `Screenshot do projeto ${project.title}`;
      img.className = "projeto-modal__imagem";
      img.loading = "lazy";
      img.decoding = "async";
      modalGaleria.appendChild(img);
    });
  } else if (project.imageSrc) {
    const img = document.createElement("img");
    img.src = project.imageSrc;
    img.alt = `Screenshot do projeto ${project.title}`;
    img.className = "projeto-modal__imagem";
    modalGaleria.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = `projeto-modal__imagem-placeholder ${project.imageClass}`;
    modalGaleria.appendChild(placeholder);
  }

  // Open modal
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  // Move focus to close button
  const closeBtn = modal.querySelector(".projeto-modal__fechar");
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const modal = document.getElementById("projetoModal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");

  // Return focus to the element that opened the modal
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function setupProjectsToggle(projects) {
  const container = document.querySelector('.projetos__container');
  const toggleButton = document.querySelector('.projetos__toggle');
  if (!container || !toggleButton || !Array.isArray(projects)) return;

  const initialVisibleProjects = 5;
  let isExpanded = false;
  let activeFilter = 'all';

  const getFilteredProjects = () =>
    activeFilter === 'all'
      ? projects
      : projects.filter(p => {
        const cats = Array.isArray(p.category) ? p.category : [p.category];
        return cats.includes(activeFilter);
      });

  const renderProjects = () => {
    const filtered = getFilteredProjects();
    const projectsToRender = isExpanded ? filtered : filtered.slice(0, initialVisibleProjects);

    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    projectsToRender.forEach((project, index) => {
      const el = createProjectElement(project);
      // Apply stagger delay
      const delay = Math.min(index + 1, 6);
      el.classList.add(`animate-delay-${delay}`);
      fragment.appendChild(el);
    });
    container.appendChild(fragment);

    toggleButton.textContent = isExpanded ? 'Ver menos projetos' : 'Ver mais projetos';
    toggleButton.setAttribute('aria-expanded', String(isExpanded));

    const hasMore = getFilteredProjects().length > initialVisibleProjects;
    toggleButton.hidden = !hasMore || isExpanded === false && getFilteredProjects().length <= initialVisibleProjects;
    if (getFilteredProjects().length <= initialVisibleProjects) toggleButton.hidden = true;

    setupScrollAnimation();
  };

  toggleButton.addEventListener('click', () => {
    isExpanded = !isExpanded;
    renderProjects();
  });

  addRipple(toggleButton);

  // === CATEGORY FILTER ===
  const filterButtons = document.querySelectorAll('.projetos__filtro');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeFilter = btn.dataset.filter;
      isExpanded = false;
      renderProjects();
    });
  });

  renderProjects();
}

function renderContent({ containerSelector, data, renderItem, errorMsg }) {
  const container = document.querySelector(containerSelector);
  if (!container || typeof data === "undefined") {
    console.error(errorMsg);
    return;
  }

  container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    const element = renderItem(item);
    if (element) {
      fragment.appendChild(element);
    }
  });

  container.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', () => {
  setupScrollProgress();
  setupMobileMenu();

  renderContent({
    containerSelector: '.skills__cards',
    data: skillsData,
    renderItem: createSkillElement,
    errorMsg: 'Container de habilidades ou dados das habilidades não encontrados.',
  });

  // Apply stagger delays to skill cards
  const skillCards = document.querySelectorAll('.skills__card');
  skillCards.forEach((card, i) => {
    const delay = Math.min(i + 1, 6);
    card.classList.add('animate-flip', `animate-delay-${delay}`);
  });

  renderContent({
    containerSelector: '.formacoes__container',
    data: educationsData,
    renderItem: createEducationElement,
    errorMsg: 'Container de formações ou dados das formações não encontrados.',
  });

  setupProjectsToggle(projectsData);
  setupModal();
  setupScrollAnimation();

  // Ripple on primary buttons
  document.querySelectorAll('.cabecalho__botao-container, .cta-button, .form__submitButton, .projetos__toggle').forEach(addRipple);

  // Gradient title on hero — apply to 'Isaac Reis.' (bold, no outline conflict)
  const heroIsaac = document.querySelector('.banner__titulo-row:first-child .banner__titulo-fw800');
  if (heroIsaac) heroIsaac.classList.add('gradient-title');

  const formSubmit = new FormSubmit({
    form: '[data-form]',
    button: '[data-button]',
    success:
      "<h1 class='success'>Mensagem enviada!</h1><p>Obrigado pelo seu contato. Retornarei em breve.</p>",
    error:
      "<h1 class='error'>Não foi possível enviar.</h1><p>Por favor, tente novamente mais tarde ou entre em contato por outro meio.</p>",
  });
  formSubmit.init();
});

