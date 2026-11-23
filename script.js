/* ==========================================================================
   Initial Data: Projects (Paste copied JSON here to make new projects permanent)
   ========================================================================== */
const DEFAULT_PROJECTS = [
  {
    id: "budget-planner-python",
    title: "Budget Planner with Monthly Analysis",
    category: "Full-Stack & Data Visualization",
    summary:
      "Full-stack personal finance tracker to record income and expenses by category, calculate monthly spending & remaining budget, visualize category breakdowns, and persist data locally in SQLite.",
    problemStatement:
      "Managing monthly expenses across multiple spending categories without real-time visibility often leads to budget overruns. This application solves that by providing a structured, persistent ledger paired with visual monthly analytics.",
    architecture:
      "Built on a Python & Flask backend exposing clean RESTful routes connected to a normalized SQLite database. The frontend uses semantic HTML5, responsive CSS3, and Chart.js to dynamically render monthly spending distributions and remaining budget thresholds.",
    features: [
      "Categorized income and expense logging with instant balance recalculation",
      "Monthly spending breakdown and remaining budget analytics",
      "Interactive Chart.js category visualizations for spending patterns",
      "Lightweight, reliable local data persistence powered by SQLite"
    ],
    techStack: [
      "Python",
      "Flask",
      "SQLite",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Chart.js"
    ],
    githubUrl: "https://github.com/yashgajbhiye017-png/budget-planner-python",
    liveUrl: "",
    isPlaceholder: false
  },
  {
    id: "slot-project-2",
    title: "Upcoming AI / ML Engineering Build",
    category: "AI / ML & Python",
    summary:
      "Slot ready for upcoming Machine Learning / NLP application. Click '+ Add Project' above to populate this slot live and export updated JSON.",
    problemStatement:
      "Reserved project slot for an upcoming end-to-end Machine Learning or LLM-powered developer tool currently in active development.",
    architecture:
      "Planned architecture featuring Python data preprocessing (Pandas, NumPy), Scikit-Learn or LLM API integration, and a clean web interface.",
    features: [
      "Modular data pipeline and model inference backend",
      "Clean REST API endpoints for real-time predictions",
      "Interactive frontend dashboard"
    ],
    techStack: ["Python", "Scikit-Learn", "Pandas", "Flask", "REST API"],
    githubUrl: "https://github.com/yashgajbhiye017-png",
    liveUrl: "",
    isPlaceholder: true
  },
  {
    id: "slot-project-3",
    title: "Upcoming Full-Stack / Core CS Build",
    category: "Systems & Backend",
    summary:
      "Slot ready for upcoming full-stack web application or Java/SQL systems project. Use '+ Add Project' to customize anytime.",
    problemStatement:
      "Reserved project slot for a full-stack database-backed system showcasing relational schema design, authentication, and algorithmic optimization.",
    architecture:
      "Designed around clean separation of concerns, indexed relational storage (MySQL / MongoDB), and responsive client UI.",
    features: [
      "Structured relational/NoSQL schema with optimized queries",
      "Responsive interface with zero-bloat Vanilla JavaScript",
      "Full Git version control and comprehensive documentation"
    ],
    techStack: ["Java", "JavaScript", "MySQL", "MongoDB", "HTML5/CSS3"],
    githubUrl: "https://github.com/yashgajbhiye017-png",
    liveUrl: "",
    isPlaceholder: true
  }
];

const STORAGE_KEYS = {
  THEME: "yg_portfolio_theme",
  PROJECTS: "yg_portfolio_projects_v1"
};

/* ==========================================================================
   State Management
   ========================================================================== */
let projects = loadProjects();
let activeCmdIndex = 0;

function loadProjects() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn("Could not read projects from localStorage:", err);
  }
  return [...DEFAULT_PROJECTS];
}

function saveProjects() {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.warn("Could not save projects to localStorage:", err);
  }
}

/* ==========================================================================
   Initialization
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTypingEffect();
  initNavigationAndScrollSpy();
  initSkillFilters();
  renderProjects();
  initModals();
  initCommandPalette();
  initCopyActions();
  initContactForm();

  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* ==========================================================================
   1. Dark / Light Theme Toggle (Persisted in localStorage)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const toggleBtn = document.getElementById("themeToggle");
  toggleBtn?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEYS.THEME, next);
    showToast(`Switched to ${next === "dark" ? "Dark" : "Light"} Mode`);
  });
}

/* ==========================================================================
   2. Hero Typing Subtitle Effect
   ========================================================================== */
function initTypingEffect() {
  const target = document.getElementById("typingText");
  if (!target) return;

  const roles = [
    "Software Developer",
    "AI / ML Enthusiast",
    "Java & Python Problem Solver",
    "Full-Stack Web Builder"
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = false;

  function tick() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      target.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      target.textContent = currentRole.substring(0, charIndex);
    }

    let delay = isDeleting ? 45 : 85;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 1900;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 1800);
}

/* ==========================================================================
   3. Sticky Navbar, Mobile Drawer & Active Scroll-Spy
   ========================================================================== */
function initNavigationAndScrollSpy() {
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinksContainer = document.getElementById("navLinks");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  mobileBtn?.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("open");
    mobileBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("open");
      mobileBtn?.setAttribute("aria-expanded", "false");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* ==========================================================================
   4. Interactive Skill Filter Tabs
   ========================================================================== */
function initSkillFilters() {
  const tabs = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".skill-category-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter;
      filterSkillsByCategory(filter);
    });
  });

  window.filterSkillsByCategory = function (filter) {
    tabs.forEach((t) => {
      const active = t.dataset.filter === filter;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
    });

    cards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !shouldShow);
    });
  };
}

/* ==========================================================================
   5. Dynamic Projects Grid, Case-Study Modal & "+ Add Project"
   ========================================================================== */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = `bento-card project-card${project.isPlaceholder ? " placeholder-card" : ""}`;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Inspect case study for ${project.title}`);

    const techHtml = project.techStack
      .map((tech) => `<span class="tech-chip">${escapeHtml(tech)}</span>`)
      .join("");

    const liveLinkHtml = project.liveUrl
      ? `<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" onclick="event.stopPropagation()">
           <i data-lucide="external-link" class="icon-xs"></i> Live
         </a>`
      : "";

    card.innerHTML = `
      <div class="project-card-top">
        <span class="badge ${project.isPlaceholder ? "" : "badge-accent"}">${escapeHtml(project.category)}</span>
        <i data-lucide="${project.isPlaceholder ? "clock" : "folder-git-2"}" class="icon-sm accent"></i>
      </div>
      <h3>${escapeHtml(project.title)}</h3>
      <p class="project-summary">${escapeHtml(project.summary)}</p>
      <div class="project-tech-list">${techHtml}</div>
      <div class="project-card-actions">
        <div class="project-links-inline">
          <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" onclick="event.stopPropagation()">
            <i data-lucide="github" class="icon-xs"></i> Code
          </a>
          ${liveLinkHtml}
        </div>
        <span class="case-study-hint">Details <i data-lucide="arrow-up-right" class="icon-xs"></i></span>
      </div>
    `;

    card.addEventListener("click", () => openCaseStudyModal(project));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCaseStudyModal(project);
      }
    });

    grid.appendChild(card);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function openCaseStudyModal(project) {
  const modal = document.getElementById("caseStudyModal");
  const titleEl = document.getElementById("caseStudyTitle");
  const catEl = document.getElementById("caseStudyCategory");
  const bodyEl = document.getElementById("caseStudyBody");
  const footerEl = document.getElementById("caseStudyFooter");

  titleEl.textContent = project.title;
  catEl.textContent = project.category;

  const featuresList = (project.features || [])
    .map((f) => `<li>${escapeHtml(f)}</li>`)
    .join("");

  const techBadges = project.techStack
    .map((t) => `<span class="tech-chip">${escapeHtml(t)}</span>`)
    .join("");

  bodyEl.innerHTML = `
    <div class="case-block">
      <h4>Overview</h4>
      <p>${escapeHtml(project.summary)}</p>
    </div>
    <div class="case-block">
      <h4>Problem Statement</h4>
      <p>${escapeHtml(project.problemStatement || project.summary)}</p>
    </div>
    <div class="case-block">
      <h4>Architecture &amp; Implementation</h4>
      <p>${escapeHtml(project.architecture || "Modular architecture with clean separation of concerns.")}</p>
    </div>
    ${
      featuresList
        ? `<div class="case-block">
             <h4>Key Highlights</h4>
             <ul class="case-list">${featuresList}</ul>
           </div>`
        : ""
    }
    <div class="case-block">
      <h4>Technology Stack</h4>
      <div class="project-tech-list">${techBadges}</div>
    </div>
  `;

  footerEl.innerHTML = `
    <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
      <i data-lucide="github" class="icon-sm"></i>
      <span>View GitHub Repository</span>
    </a>
    ${
      project.liveUrl
        ? `<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
             <i data-lucide="external-link" class="icon-sm"></i>
             <span>Open Live Demo</span>
           </a>`
        : ""
    }
  `;

  openModal(modal);
  if (window.lucide) window.lucide.createIcons();
}

function initModals() {
  const caseStudyModal = document.getElementById("caseStudyModal");
  const addProjectModal = document.getElementById("addProjectModal");
  const cmdModal = document.getElementById("cmdModal");

  document.getElementById("closeCaseStudyBtn")?.addEventListener("click", () => closeModal(caseStudyModal));
  document.getElementById("openAddProjectBtn")?.addEventListener("click", () => openModal(addProjectModal));
  document.getElementById("closeAddProjectBtn")?.addEventListener("click", () => closeModal(addProjectModal));
  document.getElementById("cancelAddProjectBtn")?.addEventListener("click", () => closeModal(addProjectModal));

  [caseStudyModal, addProjectModal, cmdModal].forEach((backdrop) => {
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      [caseStudyModal, addProjectModal, cmdModal].forEach(closeModal);
    }
  });

  // Handle "+ Add Project" Form Submit
  const addForm = document.getElementById("addProjectForm");
  addForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("projTitle").value.trim();
    const category = document.getElementById("projCategory").value.trim();
    const summary = document.getElementById("projSummary").value.trim();
    const architecture = document.getElementById("projArchitecture").value.trim();
    const techRaw = document.getElementById("projTech").value.trim();
    const githubUrl = document.getElementById("projGithub").value.trim();
    const liveUrl = document.getElementById("projLive").value.trim();

    if (!title || !category || !summary || !architecture || !techRaw || !githubUrl) {
      showToast("Please fill in all required fields.");
      return;
    }

    const techStack = techRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newProject = {
      id: `proj-${Date.now()}`,
      title,
      category,
      summary,
      problemStatement: summary,
      architecture,
      features: [
        "Built and structured for maintainability and performance",
        `Core stack: ${techStack.join(", ")}`
      ],
      techStack,
      githubUrl,
      liveUrl,
      isPlaceholder: false
    };

    // Replace the first placeholder slot if available, otherwise prepend
    const placeholderIdx = projects.findIndex((p) => p.isPlaceholder);
    if (placeholderIdx !== -1) {
      projects[placeholderIdx] = newProject;
    } else {
      projects.unshift(newProject);
    }

    saveProjects();
    renderProjects();
    addForm.reset();
    closeModal(addProjectModal);
    showToast(`Added "${title}"! Click "Copy Updated Projects JSON" to save permanently.`);
  });

  // Copy Updated Projects JSON Button
  document.getElementById("copyProjectsJsonBtn")?.addEventListener("click", () => {
    const formatted = `const DEFAULT_PROJECTS = ${JSON.stringify(projects, null, 2)};`;
    copyToClipboard(formatted, "Copied updated DEFAULT_PROJECTS JSON! Paste into script.js.");
  });
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add("open");
  modalEl.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove("open");
  modalEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* ==========================================================================
   6. Command Palette (Cmd+K / Ctrl+K)
   ========================================================================== */
function initCommandPalette() {
  const cmdModal = document.getElementById("cmdModal");
  const cmdInput = document.getElementById("cmdInput");
  const cmdList = document.getElementById("cmdList");
  const openBtn = document.getElementById("openCmdBtn");

  const commands = [
    { label: "Go to About & Proof of Work", group: "Navigation", icon: "user", action: () => scrollToSection("#about") },
    { label: "Go to Technical Skills", group: "Navigation", icon: "cpu", action: () => scrollToSection("#skills") },
    { label: "Go to Projects", group: "Navigation", icon: "folder-git-2", action: () => scrollToSection("#projects") },
    { label: "Go to Education Timeline", group: "Navigation", icon: "graduation-cap", action: () => scrollToSection("#education") },
    { label: "Go to Contact Form", group: "Navigation", icon: "mail", action: () => scrollToSection("#contact") },
    {
      label: "Filter Skills: AI / ML & Data",
      group: "Skills",
      icon: "sparkles",
      action: () => {
        scrollToSection("#skills");
        window.filterSkillsByCategory?.("ai-ml");
      }
    },
    {
      label: "Filter Skills: Web & Backend",
      group: "Skills",
      icon: "server",
      action: () => {
        scrollToSection("#skills");
        window.filterSkillsByCategory?.("web-backend");
      }
    },
    {
      label: "Filter Skills: Core CS & Tools",
      group: "Skills",
      icon: "binary",
      action: () => {
        scrollToSection("#skills");
        window.filterSkillsByCategory?.("core-tools");
      }
    },
    {
      label: "Open Featured Project: Budget Planner",
      group: "Projects",
      icon: "pie-chart",
      action: () => {
        const featured = projects[0];
        if (featured) openCaseStudyModal(featured);
      }
    },
    {
      label: "Add New Project (+)",
      group: "Projects",
      icon: "plus-circle",
      action: () => openModal(document.getElementById("addProjectModal"))
    },
    {
      label: "Copy Email Address (yashgajbhiye017@gmail.com)",
      group: "Actions",
      icon: "copy",
      action: () => copyToClipboard("yashgajbhiye017@gmail.com", "Email copied to clipboard!")
    },
    {
      label: "Open GitHub Profile",
      group: "Links",
      icon: "github",
      action: () => window.open("https://github.com/yashgajbhiye017-png", "_blank", "noopener")
    },
    {
      label: "Download Resume (PDF)",
      group: "Actions",
      icon: "download",
      action: () => {
        const link = document.createElement("a");
        link.href = "assets/resume.pdf";
        link.download = "Yash_Gajbhiye_Resume.pdf";
        link.click();
      }
    },
    {
      label: "Toggle Dark / Light Theme",
      group: "Preferences",
      icon: "sun-moon",
      action: () => document.getElementById("themeToggle")?.click()
    }
  ];

  function renderCmdList(query = "") {
    const q = query.toLowerCase().trim();
    const filtered = commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    );

    activeCmdIndex = 0;
    cmdList.innerHTML = "";

    if (filtered.length === 0) {
      cmdList.innerHTML = `<li class="cmd-item"><span class="cmd-item-left">No matching commands found.</span></li>`;
      return;
    }

    filtered.forEach((cmd, idx) => {
      const li = document.createElement("li");
      li.className = `cmd-item${idx === 0 ? " selected" : ""}`;
      li.setAttribute("role", "option");
      li.innerHTML = `
        <span class="cmd-item-left">
          <i data-lucide="${cmd.icon}" class="icon-sm"></i>
          <span>${escapeHtml(cmd.label)}</span>
        </span>
        <span class="cmd-item-group">${escapeHtml(cmd.group)}</span>
      `;
      li.addEventListener("click", () => {
        closeModal(cmdModal);
        cmd.action();
      });
      cmdList.appendChild(li);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function openPalette() {
    openModal(cmdModal);
    cmdInput.value = "";
    renderCmdList("");
    setTimeout(() => cmdInput.focus(), 40);
  }

  openBtn?.addEventListener("click", openPalette);

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdModal.classList.contains("open")) {
        closeModal(cmdModal);
      } else {
        openPalette();
      }
    }
  });

  cmdInput?.addEventListener("input", (e) => renderCmdList(e.target.value));

  cmdInput?.addEventListener("keydown", (e) => {
    const items = cmdList.querySelectorAll(".cmd-item");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[activeCmdIndex]?.classList.remove("selected");
      activeCmdIndex = (activeCmdIndex + 1) % items.length;
      items[activeCmdIndex]?.classList.add("selected");
      items[activeCmdIndex]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[activeCmdIndex]?.classList.remove("selected");
      activeCmdIndex = (activeCmdIndex - 1 + items.length) % items.length;
      items[activeCmdIndex]?.classList.add("selected");
      items[activeCmdIndex]?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      items[activeCmdIndex]?.click();
    }
  });
}

function scrollToSection(hash) {
  const el = document.querySelector(hash);
  el?.scrollIntoView({ behavior: "smooth" });
}

/* ==========================================================================
   7. One-Click Email Copy & Toast Notifications
   ========================================================================== */
function initCopyActions() {
  const copyButtons = [
    document.getElementById("heroCopyEmailBtn"),
    document.getElementById("contactCopyEmailBtn")
  ];

  copyButtons.forEach((btn) => {
    btn?.addEventListener("click", () => {
      const email = btn.dataset.email || "yashgajbhiye017@gmail.com";
      copyToClipboard(email, `Copied ${email} to clipboard!`);
    });
  });
}

function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast(successMessage))
      .catch(() => fallbackCopy(text, successMessage));
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showToast(successMessage);
  } catch {
    showToast("Copy failed. Please copy manually.");
  }
  document.body.removeChild(textarea);
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i data-lucide="check-circle-2" class="icon-sm accent"></i><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 220);
  }, 3200);
}

/* ==========================================================================
   8. Client-Side Contact Form Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("senderName").value.trim();
    const email = document.getElementById("senderEmail").value.trim();
    const subject = document.getElementById("senderSubject").value.trim();
    const message = document.getElementById("senderMessage").value.trim();

    let isValid = true;

    document.getElementById("nameError").textContent = name.length < 2 ? "Please enter your name." : "";
    if (name.length < 2) isValid = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    document.getElementById("emailError").textContent = !emailRegex.test(email)
      ? "Please enter a valid email address."
      : "";
    if (!emailRegex.test(email)) isValid = false;

    document.getElementById("subjectError").textContent =
      subject.length < 3 ? "Please enter a brief subject." : "";
    if (subject.length < 3) isValid = false;

    document.getElementById("messageError").textContent =
      message.length < 10 ? "Please write a message (at least 10 characters)." : "";
    if (message.length < 10) isValid = false;

    if (!isValid) return;

    showToast(`Thanks ${name}! Your message has been queued.`);
    form.reset();
  });
}

/* ==========================================================================
   Utility: HTML Escaping for Safe Dynamic Rendering
   ========================================================================== */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}