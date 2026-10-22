"use strict";

(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  const profilePhoto = document.querySelector(".profile-photo");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeToggleLabel = themeToggle.querySelector(".theme-toggle-label");
  const menuTalk = document.querySelector(".menu-talk");
  const accentTrigger = document.querySelector(".accent-studio-trigger");
  const accentOptions = document.querySelector(".accent-studio-options");
  const accentChoices = [...document.querySelectorAll("[data-accent-choice]")];
  const accentStorageKey = "shvan-portfolio-accent";
  const copyWebsiteButton = document.querySelector(".copy-website-link");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const colorScheme = window.matchMedia("(prefers-color-scheme: light)");
  const cursorGlow = document.querySelector(".cursor-glow");
  const navigationLinks = [...navigation.querySelectorAll("a")];
  const toastRegion = document.querySelector(".toast-region");
  const progressBar = document.querySelector(".scroll-progress-bar");
  const progressTrack = document.querySelector(".scroll-progress");
  const readingPercent = document.querySelector(".reading-percent");
  const readingSectionName = document.querySelector(".reading-section-name");
  const readingBackToTop = document.querySelector(".reading-back-to-top");
  const readingModeToggle = document.querySelector(".reading-mode-toggle");
  const searchDialog = document.querySelector(".quick-search-dialog");
  const searchTrigger = document.querySelector(".quick-search-trigger");
  const searchClose = document.querySelector(".quick-search-close");
  const searchInput = document.querySelector(".quick-search-input");
  const searchResults = document.querySelector(".quick-search-results");
  const searchEmpty = document.querySelector(".quick-search-empty");
  const terminalForm = document.querySelector(".terminal-form");
  const terminalInput = document.querySelector("#terminal-input");
  const terminalOutput = document.querySelector(".terminal-output");
  const projectDialog = document.querySelector(".project-preview-dialog");
  const projectPreviewClose = document.querySelector(".project-preview-close");
  const projectPreviewImage = document.querySelector(".project-preview-image");
  const projectPreviewCategory = document.querySelector(".project-preview-category");
  const projectPreviewTitle = document.querySelector("#project-preview-title");
  const projectPreviewDescription = document.querySelector(".project-preview-description");
  const projectPreviewLink = document.querySelector(".project-preview-link");
  const projectPreviewTechNote = document.querySelector(".project-tech-note");
  const projectPreviewTechTags = document.querySelector(".project-preview-tech-tags");
  const heroVisual = document.querySelector(".hero-visual");
  const previewFrame = document.querySelector(".project-live-frame");
  const previewImageWrap = document.querySelector(".device-screen .project-preview-image-wrap");
  const previewLoading = document.querySelector(".preview-loading");
  const previewLoadingSpinner = previewLoading.querySelector("span[aria-hidden]");
  const previewLoadingLabel = document.querySelector(".preview-loading-label");
  const assistantToggle = document.querySelector(".assistant-toggle");
  const assistantPanel = document.querySelector(".assistant-panel");
  const assistantClose = document.querySelector(".assistant-close");
  const assistantMessages = document.querySelector(".assistant-messages");
  const assistantForm = document.querySelector(".assistant-form");
  const assistantInput = document.querySelector("#assistant-input");
  const settingsDialog = document.querySelector(".settings-dialog");
  const shareDialog = document.querySelector(".share-dialog");
  const commandCenterDialog = document.querySelector(".command-center-dialog");
  const cosmicDialog = document.querySelector(".cosmic-dialog");
  const playgroundDialog = document.querySelector(".playground-dialog");
  const resumeDialog = document.querySelector(".resume-dialog");
  const comparisonDialog = document.querySelector(".comparison-dialog");
  const shortcutsDialog = document.querySelector(".shortcuts-dialog");
  const playgroundHtml = document.querySelector(".playground-html");
  const playgroundCss = document.querySelector(".playground-css");
  const playgroundFrame = document.querySelector(".playground-frame");
  const comparisonProjects = [];
  const availabilityConfig = { state: "unconfirmed" };
  const journeyEntries = [];
  const appearanceStorageKey = "shvan-portfolio-display";
  const themeStorageKey = "shvan-portfolio-theme";
  const testimonials = [];
  const writingEntries = [];
  const verifiedProjectTechnologies = {};
  let shortcutsReturnFocus = null;
  let sessionInsightsEnabled = false;
  let contactFocusActive = false;
  const sessionInsightCounts = {
    projects: 0,
    links: 0,
    contact: 0,
    submissions: 0,
  };
  let toastTimer = 0;
  let previewLoadingTimer = 0;
  let scrollFrame = 0;
  let cursorFrame = 0;
  let pendingCursorPoint = null;
  let searchReturnFocus = null;
  let activeSearchIndex = -1;
  let textScale = 1;
  const searchDestinations = [
    { id: "home", title: "Home", description: "Introduction and profile" },
    { id: "about", title: "About", description: "Approach and principles" },
    { id: "services", title: "Services", description: "Website development and technology solutions" },
    { id: "tech-stack", title: "Tech Stack", description: "Technologies and practices used in this site" },
    { id: "projects", title: "Projects", description: "Selected work and live project links" },
    { id: "faq", title: "FAQ", description: "Answers about services, projects, availability, and contact" },
    { id: "contact", title: "Contact", description: "Get in touch" },
    { id: "command", title: "Open Command Center", description: "Quick access, appearance, and portfolio tools", action: "command" },
    { id: "cosmic", title: "Cosmic Navigation", description: "Open the constellation navigation map", action: "cosmic" },
    { id: "playground", title: "Code Playground", description: "Experiment safely with HTML and CSS", action: "playground" },
    { id: "resume", title: "Resume and Print", description: "Open a verified portfolio summary", action: "resume" },
    { id: "appearance", title: "Display Settings", description: "Change text size, spacing, contrast, and effects", action: "appearance" },
    { id: "reading-mode", title: "Toggle Reading Mode", description: "Reduce visual distractions for this visit", action: "reading" },
    { id: "creator", title: "Creator Mode", description: "Toggle the visual design overlay", action: "creator" },
    { id: "project-preview", title: "Preview a Project", description: "Open the first project presentation", action: "project" },
    { id: "design-system", title: "Design System", description: "Show live design token samples", action: "design" },
    { id: "theme", title: "Toggle Theme", description: "Switch between dark and light themes", action: "theme" },
    { id: "top", title: "Back to Top", description: "Return to the beginning of the page" },
  ];
  let settingsReturnFocus = null;
  let shareReturnFocus = null;
  let commandCenterReturnFocus = null;
  let cosmicReturnFocus = null;
  let playgroundReturnFocus = null;
  let resumeReturnFocus = null;
  let comparisonReturnFocus = null;

  function showToast(message) {
    window.clearTimeout(toastTimer);
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.setAttribute("role", "status");
    const text = document.createElement("span");
    text.textContent = message;
    const dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.className = "toast-dismiss";
    dismiss.setAttribute("aria-label", "Dismiss notification");
    dismiss.textContent = "×";
    dismiss.addEventListener("click", () => toast.remove(), { once: true });
    toast.append(text, dismiss);
    toastRegion.replaceChildren(toast);
    toastTimer = window.setTimeout(() => toast.remove(), 3200);
  }

  function recordSessionInsight(name) {
    if (!sessionInsightsEnabled || !Object.prototype.hasOwnProperty.call(sessionInsightCounts, name)) return;
    sessionInsightCounts[name] += 1;
    const count = document.querySelector(`[data-insight-count="${name}"]`);
    if (count) count.textContent = String(sessionInsightCounts[name]);
  }

  function savePreference(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Could not save the ${key} preference.`, error);
      return false;
    }
  }

  function readAppearance() {
    try {
      const stored = window.localStorage.getItem(appearanceStorageKey);
      if (!stored) return {};
      const appearance = JSON.parse(stored);
      return appearance && typeof appearance === "object" ? appearance : {};
    } catch (error) {
      console.warn("Could not read display preferences.", error);
      return {};
    }
  }

  function applyAppearance(appearance, persist = false) {
    const scale = [0.9, 1, 1.1, 1.2].includes(appearance.textScale) ? appearance.textScale : 1;
    const spacing = appearance.spacing === "compact" ? "compact" : "comfortable";
    const cardStyle = appearance.cardStyle === "flat" ? "flat" : "glass";
    const atmosphere = appearance.atmosphere === "aurora" ? "aurora" : "midnight";
    const contrast = appearance.contrast === true;
    const effects = appearance.effects === "reduced" ? "reduced" : "subtle";
    textScale = scale;
    document.documentElement.style.setProperty("--text-scale", String(scale));
    document.documentElement.dataset.spacing = spacing;
    document.documentElement.dataset.cards = cardStyle;
    document.documentElement.dataset.atmosphere = atmosphere;
    document.documentElement.dataset.contrast = contrast ? "high" : "normal";
    document.documentElement.dataset.effects = effects;
    document.querySelectorAll("[data-appearance-toggle]").forEach(button => {
      const isPressed = button.dataset.appearanceToggle === "contrast"
        ? contrast
        : effects === "reduced";
      button.setAttribute("aria-pressed", String(isPressed));
    });
    document.querySelectorAll("button[data-spacing]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.spacing === spacing));
    });
    document.querySelectorAll("[data-card-style]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.cardStyle === cardStyle));
    });
    document.querySelectorAll("button[data-atmosphere]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.atmosphere === atmosphere));
    });
    if (persist && !savePreference(appearanceStorageKey, { textScale: scale, spacing, cardStyle, atmosphere, contrast, effects })) {
      showToast("Appearance updated for this visit. Browser storage is unavailable.");
    }
  }

  function currentAppearance() {
    return {
      textScale,
      spacing: document.documentElement.dataset.spacing,
      cardStyle: document.documentElement.dataset.cards,
      atmosphere: document.documentElement.dataset.atmosphere,
      contrast: document.documentElement.dataset.contrast === "high",
      effects: document.documentElement.dataset.effects,
    };
  }

  function updateAppearance(update) {
    applyAppearance({ ...currentAppearance(), ...update }, true);
  }

  applyAppearance(readAppearance());

  document.querySelectorAll("[data-text-size]").forEach(button => {
    button.addEventListener("click", () => {
      const nextScale = button.dataset.textSize === "reset"
        ? 1
        : Math.min(1.2, Math.max(.9, textScale + (button.dataset.textSize === "larger" ? .1 : -.1)));
      updateAppearance({ textScale: nextScale });
    });
  });
  document.querySelectorAll("button[data-spacing]").forEach(button => {
    button.addEventListener("click", () => updateAppearance({ spacing: button.dataset.spacing }));
  });
  document.querySelectorAll("[data-card-style]").forEach(button => {
    button.addEventListener("click", () => updateAppearance({ cardStyle: button.dataset.cardStyle }));
  });
  document.querySelectorAll("button[data-atmosphere]").forEach(button => {
    button.addEventListener("click", () => updateAppearance({ atmosphere: button.dataset.atmosphere }));
  });
  document.querySelectorAll("button[data-theme-choice]").forEach(button => {
    button.addEventListener("click", () => setTheme(button.dataset.themeChoice, true));
  });
  document.querySelectorAll("button[data-quick-accent]").forEach(button => {
    button.addEventListener("click", () => applyAccent(button.dataset.quickAccent, true));
  });
  document.querySelectorAll("[data-appearance-toggle]").forEach(button => {
    button.addEventListener("click", () => {
      const pressed = button.getAttribute("aria-pressed") === "true";
      if (button.dataset.appearanceToggle === "contrast") {
        updateAppearance({ contrast: !pressed });
      } else {
        updateAppearance({ effects: pressed ? "subtle" : "reduced" });
      }
    });
  });

  document.querySelector(".open-accessibility").addEventListener("click", event => {
    settingsReturnFocus = event.currentTarget;
    settingsDialog.showModal();
    document.querySelector(".settings-close").focus();
  });
  document.querySelector(".settings-close").addEventListener("click", () => settingsDialog.close());
  settingsDialog.addEventListener("click", event => {
    if (event.target === settingsDialog) settingsDialog.close();
  });
  settingsDialog.addEventListener("close", () => {
    if (settingsReturnFocus instanceof HTMLElement) settingsReturnFocus.focus();
  });
  const openShortcutsButton = document.querySelector(".open-shortcuts");
  const shortcutsCloseButton = document.querySelector(".shortcuts-close");
  openShortcutsButton.addEventListener("click", () => openShortcuts(openShortcutsButton));
  shortcutsCloseButton.addEventListener("click", () => shortcutsDialog.close());
  shortcutsDialog.addEventListener("click", event => {
    if (event.target === shortcutsDialog) shortcutsDialog.close();
  });
  shortcutsDialog.addEventListener("close", () => {
    if (shortcutsReturnFocus instanceof HTMLElement) shortcutsReturnFocus.focus();
  });
  document.querySelector(".reset-appearance").addEventListener("click", () => {
    applyAppearance({}, true);
    applyAccent("blue", true);
    try {
      window.localStorage.removeItem(themeStorageKey);
      savedTheme = null;
    } catch (error) {
      console.warn("Could not reset the saved theme preference.", error);
      showToast("Appearance reset for this visit; the theme could not be saved.");
      return;
    }
    applyTheme(colorScheme.matches ? "light" : "dark");
    showToast("Appearance reset to defaults.");
  });

  const insightsDialog = document.querySelector(".insights-dialog");
  const insightsTrigger = document.querySelector(".open-session-insights");
  const insightsClose = document.querySelector(".insights-close");
  const insightsToggle = document.querySelector(".insights-toggle");
  const insightsState = document.querySelector(".insights-state");
  insightsTrigger.addEventListener("click", () => {
    insightsDialog.showModal();
    insightsClose.focus();
  });
  insightsClose.addEventListener("click", () => insightsDialog.close());
  insightsDialog.addEventListener("click", event => {
    if (event.target === insightsDialog) insightsDialog.close();
  });
  insightsDialog.addEventListener("close", () => insightsTrigger.focus());
  insightsToggle.addEventListener("click", () => {
    sessionInsightsEnabled = !sessionInsightsEnabled;
    insightsToggle.textContent = sessionInsightsEnabled ? "Stop local tracking" : "Start local tracking";
    insightsToggle.setAttribute("aria-pressed", String(sessionInsightsEnabled));
    insightsState.textContent = sessionInsightsEnabled
      ? "Local activity tracking is on for this tab. Counts are not sent or saved."
      : "Local activity tracking is off.";
  });
  document.querySelector(".insights-reset").addEventListener("click", () => {
    Object.keys(sessionInsightCounts).forEach(name => {
      sessionInsightCounts[name] = 0;
      document.querySelector(`[data-insight-count="${name}"]`).textContent = "0";
    });
    insightsState.textContent = sessionInsightsEnabled
      ? "Counters reset. Local activity tracking remains on for this tab."
      : "Counters reset. Local activity tracking is off.";
  });

  const commandCenterTrigger = document.querySelector(".open-command-center");
  commandCenterTrigger.addEventListener("click", event => openCommandCenter(event.currentTarget));
  document.querySelector(".command-center-close").addEventListener("click", () => commandCenterDialog.close());
  commandCenterDialog.addEventListener("close", () => {
    if (commandCenterReturnFocus instanceof HTMLElement) commandCenterReturnFocus.focus();
  });
  document.querySelectorAll(".command-destinations a").forEach(link => {
    link.addEventListener("click", () => commandCenterDialog.close());
  });
  document.querySelectorAll("[data-command-action]").forEach(button => {
    button.addEventListener("click", () => {
      if (button.disabled) return;
      const action = button.dataset.commandAction;
      const opener = commandCenterReturnFocus;
      commandCenterDialog.close();
      window.setTimeout(() => runCommandAction(action, opener), 0);
    });
  });

  document.querySelector(".cosmic-close").addEventListener("click", () => cosmicDialog.close());
  document.querySelectorAll(".constellation-node").forEach(link => {
    link.addEventListener("click", () => cosmicDialog.close());
  });
  cosmicDialog.addEventListener("close", () => {
    if (cosmicReturnFocus instanceof HTMLElement) cosmicReturnFocus.focus();
  });

  document.querySelector(".playground-close").addEventListener("click", () => playgroundDialog.close());
  document.querySelector(".playground-reset").addEventListener("click", () => {
    playgroundHtml.value = defaultPlaygroundHtml;
    playgroundCss.value = defaultPlaygroundCss;
    updatePlaygroundPreview();
    document.querySelector(".playground-status").textContent = "Example reset. Preview updated.";
    playgroundHtml.focus();
  });
  playgroundDialog.addEventListener("close", () => {
    if (playgroundReturnFocus instanceof HTMLElement) playgroundReturnFocus.focus();
  });

  document.querySelector(".print-resume").addEventListener("click", () => window.print());
  document.querySelector(".resume-close").addEventListener("click", () => resumeDialog.close());
  resumeDialog.addEventListener("close", () => {
    if (resumeReturnFocus instanceof HTMLElement) resumeReturnFocus.focus();
  });

  document.querySelector(".creator-mode-toggle").addEventListener("click", toggleCreatorMode);
  document.querySelector(".creator-close").addEventListener("click", () => setCreatorMode(false));
  document.querySelector("[data-design-theme]").addEventListener("click", () => themeToggle.click());

  function updateAvailability() {
    const availability = document.querySelector("[data-availability]");
    const validStates = {
      available: "Available for Opportunities",
      selected: "Open to Selected Projects",
      unavailable: "Currently Unavailable",
      unconfirmed: "Availability not confirmed",
    };
    const state = Object.prototype.hasOwnProperty.call(validStates, availabilityConfig.state)
      ? availabilityConfig.state
      : "unconfirmed";
    availability.dataset.state = state;
    availability.querySelector(".availability-label").textContent = validStates[state];
  }

  updateAvailability();

  if (journeyEntries.length) {
    const journeySection = document.querySelector("#journey");
    const journeyList = document.querySelector(".journey-list");
    journeyEntries.forEach(entry => {
      if (!entry || !entry.title || !entry.description) return;
      const item = document.createElement("li");
      const title = document.createElement("h3");
      const description = document.createElement("p");
      title.textContent = entry.title;
      description.textContent = entry.description;
      item.append(title, description);
      if (entry.date) {
        const date = document.createElement("time");
        date.textContent = entry.date;
        item.prepend(date);
      }
      journeyList.append(item);
    });
    if (journeyList.children.length) journeySection.hidden = false;
  }

  function readSavedTheme() {
    try {
      const savedTheme = window.localStorage.getItem(themeStorageKey);
      return savedTheme === "dark" || savedTheme === "light" ? savedTheme : null;
    } catch (error) {
      console.warn("Could not read the saved theme preference.", error);
      return null;
    }
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    document.querySelectorAll("button[data-theme-choice]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
    });
    const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
    themeToggle.setAttribute("aria-label", label);
    themeToggleLabel.textContent = label;
    updateDesignTokenSamples();
  }

  function applyAccent(accent, persist = false) {
    document.documentElement.dataset.accent = accent;
    updateDesignTokenSamples();
    accentChoices.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.accentChoice === accent));
    });
    document.querySelectorAll("button[data-quick-accent]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.quickAccent === accent));
    });
    if (!persist) return;
    try {
      window.localStorage.setItem(accentStorageKey, accent);
      showToast(`${accentChoices.find(button => button.dataset.accentChoice === accent)?.textContent.trim() || "Accent"} applied.`);
    } catch (error) {
      console.warn("Could not save the accent color preference.", error);
      showToast("Accent applied for this visit. Browser storage is unavailable.");
    }
  }

  function readSavedAccent() {
    try {
      const savedAccent = window.localStorage.getItem(accentStorageKey);
      return ["blue", "violet", "cyan"].includes(savedAccent) ? savedAccent : "blue";
    } catch (error) {
      console.warn("Could not read the saved accent color preference.", error);
      return "blue";
    }
  }

  let savedTheme = readSavedTheme();
  applyTheme(savedTheme || (colorScheme.matches ? "light" : "dark"));
  applyAccent(readSavedAccent());

  const localHour = new Date().getHours();
  const welcomeGreeting = localHour < 12 ? "Good morning" : localHour < 18 ? "Good afternoon" : "Good evening";
  document.querySelector("[data-welcome-greeting]").textContent = welcomeGreeting;
  document.documentElement.dataset.daypart = localHour < 12 ? "morning" : localHour < 18 ? "afternoon" : "evening";

  accentTrigger.addEventListener("click", () => {
    const isExpanded = accentTrigger.getAttribute("aria-expanded") === "true";
    accentTrigger.setAttribute("aria-expanded", String(!isExpanded));
    accentOptions.hidden = isExpanded;
  });
  accentChoices.forEach(button => {
    button.addEventListener("click", () => {
      applyAccent(button.dataset.accentChoice, true);
      accentOptions.hidden = true;
      accentTrigger.setAttribute("aria-expanded", "false");
      accentTrigger.focus();
    });
  });
  document.querySelector(".accent-reset").addEventListener("click", () => {
    applyAccent("blue", true);
    accentOptions.hidden = true;
    accentTrigger.setAttribute("aria-expanded", "false");
    accentTrigger.focus();
  });

  document.addEventListener("pointerdown", event => {
    if (!(event.target instanceof Element) || !event.target.closest(".accent-studio")) {
      accentOptions.hidden = true;
      accentTrigger.setAttribute("aria-expanded", "false");
    }
  });

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme, true);
  });

  function setTheme(theme, persist = false) {
    applyTheme(theme);
    if (!persist) return;
    savedTheme = theme;
    try {
      window.localStorage.setItem(themeStorageKey, theme);
      showToast(`Switched to ${theme} theme.`);
    } catch (error) {
      console.warn("Could not save the theme preference.", error);
      showToast(`Switched to ${theme} theme for this visit. Browser storage is unavailable.`);
    }
  }

  colorScheme.addEventListener?.("change", event => {
    if (!savedTheme) applyTheme(event.matches ? "light" : "dark");
  });

  function setMenuOpen(isOpen) {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", isOpen);
  }

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  const heroLoveMessage = document.querySelector(".hero-love-message");
  let heroLoveAnimationTimeout;
  heroLoveMessage.addEventListener("click", () => {
    if (reducedMotion.matches) return;
    window.clearTimeout(heroLoveAnimationTimeout);
    heroLoveMessage.classList.remove("is-animating");
    void heroLoveMessage.offsetWidth;
    heroLoveMessage.classList.add("is-animating");
    heroLoveAnimationTimeout = window.setTimeout(() => {
      heroLoveMessage.classList.remove("is-animating");
    }, 3000);
    heroLoveMessage.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.12) rotate(-2deg)", offset: .45 },
        { transform: "scale(1)" }
      ],
      { duration: 520, easing: "cubic-bezier(.2,.8,.3,1)" }
    );
    heroLoveMessage.querySelector(".hero-love-heart").animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.55) rotate(12deg)", offset: .5 },
        { transform: "scale(1)" }
      ],
      { duration: 520, easing: "cubic-bezier(.2,.8,.3,1)" }
    );
  });

  navigationLinks.forEach(link => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  menuTalk.addEventListener("click", () => setMenuOpen(false));

  document.addEventListener("pointerdown", event => {
    if (menuToggle.getAttribute("aria-expanded") === "true"
      && !navigation.contains(event.target)
      && !menuToggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1400) setMenuOpen(false);
  });

  const updateHeaderScrollState = () => {
    document.querySelector(".site-header").classList.toggle("is-scrolled", window.scrollY > 12);
  };
  updateHeaderScrollState();
  window.addEventListener("scroll", updateHeaderScrollState, { passive: true });

  function updateScrollProgress() {
    scrollFrame = 0;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight)) : 0;
    const percentage = Math.round(progress * 100);
    progressBar.style.transform = `scaleX(${progress})`;
    progressTrack.setAttribute("aria-valuenow", String(percentage));
    readingPercent.textContent = `${percentage}%`;
    const activeSection = [...document.querySelectorAll("main section[id]")]
      .filter(section => !section.hidden && section.getBoundingClientRect().top <= window.innerHeight * .38)
      .pop();
    const activeLink = activeSection && document.querySelector(
      `.primary-nav a[href="#${activeSection.id}"], .footer-nav a[href="#${activeSection.id}"]`
    );
    readingSectionName.textContent = activeLink?.textContent.trim()
      || activeSection?.querySelector("h1, h2")?.textContent.trim()
      || "Home";
  }

  function scheduleScrollProgress() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollProgress);
  }

  scheduleScrollProgress();
  window.addEventListener("scroll", scheduleScrollProgress, { passive: true });
  window.addEventListener("resize", scheduleScrollProgress, { passive: true });
  readingBackToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
  });
  readingModeToggle.addEventListener("click", () => {
    const enabled = document.documentElement.dataset.readingMode !== "true";
    if (enabled) document.documentElement.dataset.readingMode = "true";
    else document.documentElement.removeAttribute("data-reading-mode");
    readingModeToggle.setAttribute("aria-pressed", String(enabled));
    readingModeToggle.textContent = enabled ? "Exit Reading Mode" : "Reading Mode";
    if (enabled && !assistantPanel.hidden) closeAssistant(false);
    showToast(enabled ? "Reading mode enabled for this visit." : "Reading mode disabled.");
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !assistantPanel.hidden) {
      closeAssistant(true);
      return;
    }
    if (event.key === "Escape" && shortcutsDialog.open) {
      shortcutsDialog.close();
      return;
    }
    if (event.key === "Escape" && settingsDialog.open) {
      settingsDialog.close();
      return;
    }
    if (event.key === "Escape" && shareDialog.open) {
      shareDialog.close();
      return;
    }
    if (event.key === "Escape" && commandCenterDialog.open) {
      commandCenterDialog.close();
      return;
    }
    if (event.key === "Escape" && cosmicDialog.open) {
      cosmicDialog.close();
      return;
    }
    if (event.key === "Escape" && playgroundDialog.open) {
      playgroundDialog.close();
      return;
    }
    if (event.key === "Escape" && resumeDialog.open) {
      resumeDialog.close();
      return;
    }
    if (event.key === "Escape" && comparisonDialog.open) {
      comparisonDialog.close();
      return;
    }
    if (event.key === "Escape" && document.documentElement.dataset.creatorMode === "true") {
      setCreatorMode(false);
      return;
    }
    if (event.key === "Escape" && !accentOptions.hidden) {
      accentOptions.hidden = true;
      accentTrigger.setAttribute("aria-expanded", "false");
      accentTrigger.focus();
      return;
    }
    if (event.key === "Escape" && projectDialog.open && !projectComparePanel.hidden) {
      projectComparePanel.hidden = true;
      projectCompareToggle.setAttribute("aria-expanded", "false");
      projectCompareToggle.focus();
      return;
    }
    if (event.key === "Escape" && projectDialog.open) {
      projectDialog.close();
      return;
    }
    if (event.key === "Escape" && searchDialog.open) {
      searchDialog.close();
      return;
    }
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
    const isEditingText = event.target instanceof Element
      && Boolean(event.target.closest("input, textarea, select, [contenteditable='true']"));
    const anyDialogOpen = [...document.querySelectorAll("dialog")].some(dialog => dialog.open);
    if (!isEditingText && !event.ctrlKey && !event.metaKey && !event.altKey
      && event.key === "?" && !anyDialogOpen && assistantPanel.hidden) {
      event.preventDefault();
      openShortcuts(document.activeElement);
      return;
    }
    if (!isEditingText && !anyDialogOpen && assistantPanel.hidden
      && (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openQuickSearch();
      return;
    }
    if (!isEditingText && !anyDialogOpen && assistantPanel.hidden
      && event.altKey && event.shiftKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      openCommandCenter(document.activeElement);
      return;
    }
    if (!isEditingText && !anyDialogOpen && assistantPanel.hidden
      && event.altKey && event.shiftKey && event.key.toLowerCase() === "d") {
      event.preventDefault();
      toggleCreatorMode();
    }
  });

  function setActiveSearchResult(index) {
    const buttons = [...searchResults.querySelectorAll("button")];
    if (!buttons.length) {
      activeSearchIndex = -1;
      searchInput.removeAttribute("aria-activedescendant");
      return;
    }
    activeSearchIndex = (index + buttons.length) % buttons.length;
    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === activeSearchIndex);
      button.setAttribute("aria-selected", String(buttonIndex === activeSearchIndex));
    });
    searchInput.setAttribute("aria-activedescendant", buttons[activeSearchIndex].id);
  }

  function updateDesignTokenSamples() {
    const styles = getComputedStyle(document.documentElement);
    document.querySelectorAll("[data-token-color]").forEach(sample => {
      const property = sample.dataset.tokenColor;
      sample.style.backgroundColor = styles.getPropertyValue(property).trim();
      sample.setAttribute("aria-label", `${property}: ${styles.getPropertyValue(property).trim()}`);
      const label = sample.parentElement.querySelector("code");
      if (label) label.textContent = `${label.dataset.tokenName || label.textContent.split(" · ")[0]} · ${styles.getPropertyValue(property).trim()}`;
    });
    const radius = document.querySelector("[data-token-value='--radius-card']");
    if (radius) radius.textContent = `--radius-card: ${styles.getPropertyValue("--radius-card").trim()}`;
  }

  function openCommandCenter(opener = document.querySelector(".open-command-center")) {
    commandCenterReturnFocus = opener instanceof HTMLElement ? opener : document.activeElement;
    commandCenterDialog.showModal();
    document.querySelector(".command-center-close").focus();
  }

  function openShortcuts(opener = document.activeElement) {
    if (shortcutsDialog.open) return;
    shortcutsReturnFocus = opener instanceof HTMLElement ? opener : document.activeElement;
    shortcutsDialog.showModal();
    shortcutsCloseButton.focus();
  }

  function setCreatorMode(enabled) {
    document.documentElement.dataset.creatorMode = String(enabled);
    document.querySelector(".creator-panel").hidden = !enabled;
    document.querySelectorAll(".creator-mode-toggle, [data-command-action='creator']").forEach(button => {
      button.setAttribute("aria-pressed", String(enabled));
    });
    document.querySelector("[data-creator-accent]").textContent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    document.querySelector("[data-creator-radius]").textContent = getComputedStyle(document.documentElement).getPropertyValue("--radius-card").trim();
    document.querySelector("[data-creator-motion]").textContent = reducedMotion.matches || document.documentElement.dataset.effects === "reduced" ? "Reduced" : "Subtle";
    if (!enabled && document.activeElement === document.querySelector(".creator-close")) {
      document.querySelector(".creator-mode-toggle").focus();
    }
  }

  function toggleCreatorMode() {
    const enabled = document.documentElement.dataset.creatorMode !== "true";
    setCreatorMode(enabled);
    if (enabled) document.querySelector(".creator-close").focus();
    showToast(enabled ? "Creator Mode enabled." : "Creator Mode disabled.");
  }

  function toggleDesignShowcase() {
    const showcase = document.querySelector(".design-showcase-section");
    if (showcase.hidden) {
      showcase.hidden = false;
      updateDesignTokenSamples();
      window.location.hash = "design-system";
      showcase.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
      showToast("Design system showcase opened.");
    } else {
      showcase.hidden = true;
      window.location.hash = "tech-stack";
      document.querySelector("#tech-stack").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
      showToast("Design system showcase hidden.");
    }
    document.querySelector("[data-command-action='design']").textContent = showcase.hidden
      ? "Show design system"
      : "Hide design system";
  }

  function openCosmicNavigation(opener = document.querySelector(".open-command-center")) {
    cosmicReturnFocus = opener instanceof HTMLElement ? opener : document.activeElement;
    cosmicDialog.showModal();
    document.querySelector(".constellation-node").focus();
  }

  const defaultPlaygroundHtml = '<article class="sample-card"><span class="sample-mark">SJ.</span><h2>A thoughtful idea.</h2><p>Shape this small card with your own HTML and CSS.</p><a href="#preview">Explore the details</a></article>';
  const defaultPlaygroundCss = 'body { font-family: Arial, sans-serif; padding: 24px; background: #080b14; color: #f4f7ff; }\n.sample-card { max-width: 340px; margin: 12px auto; padding: 24px; border: 1px solid #354361; border-radius: 18px; background: #11182a; }\n.sample-mark { color: #8b5cf6; font-weight: 700; }\na { color: #8eb0ff; }';

  function updatePlaygroundPreview() {
    const policy = "default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'; script-src 'none';";
    const previewDocument = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${policy}"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${playgroundCss.value}</style></head><body>${playgroundHtml.value}</body></html>`;
    try {
      playgroundFrame.srcdoc = previewDocument;
      document.querySelector(".playground-status").textContent = "Preview updated. Scripts and external resources are blocked.";
    } catch (error) {
      console.error("Could not update the isolated code preview.", error);
      document.querySelector(".playground-status").textContent = "Preview could not be updated. Reset the example and try again.";
    }
  }

  playgroundHtml.value = defaultPlaygroundHtml;
  playgroundCss.value = defaultPlaygroundCss;
  playgroundHtml.addEventListener("input", updatePlaygroundPreview);
  playgroundCss.addEventListener("input", updatePlaygroundPreview);
  updatePlaygroundPreview();

  function openPlayground(opener = document.querySelector(".open-command-center")) {
    playgroundReturnFocus = opener instanceof HTMLElement ? opener : document.activeElement;
    playgroundDialog.showModal();
    playgroundHtml.focus();
  }

  function renderResumeProjects() {
    const list = document.querySelector(".resume-project-list");
    list.replaceChildren();
    document.querySelectorAll(".project-card").forEach(card => {
      const title = card.querySelector(".project-copy h3");
      const link = card.querySelector(".project-link");
      if (!title || !link || !/^https:\/\//i.test(link.href)) return;
      const item = document.createElement("li");
      const projectLink = document.createElement("a");
      projectLink.href = link.href;
      projectLink.target = "_blank";
      projectLink.rel = "noopener noreferrer";
      projectLink.textContent = title.textContent.trim();
      item.append(projectLink);
      list.append(item);
    });
  }

  function openResume(opener = document.querySelector(".open-command-center")) {
    resumeReturnFocus = opener instanceof HTMLElement ? opener : document.activeElement;
    renderResumeProjects();
    resumeDialog.showModal();
    document.querySelector(".print-resume").focus();
  }

  document.querySelectorAll("[data-resume-input]").forEach(input => {
    input.addEventListener("input", () => {
      const sectionName = input.dataset.resumeInput;
      const section = document.querySelector(`[data-resume-section="${sectionName}"]`);
      const value = document.querySelector(`[data-resume-value="${sectionName}"]`);
      value.textContent = input.value.trim();
      section.hidden = !input.value.trim();
    });
  });

  const projectCards = [...document.querySelectorAll(".project-card[data-project-category]")];
  const projectGrid = document.querySelector("#project-grid");
  const projectOrder = [...projectCards];
  const favoritesStorageKey = "shvan-portfolio-favorites";
  const projectNotesStorageKey = "shvan-portfolio-project-notes";
  const favoriteProjects = new Set();
  const projectNotes = new Map();

  try {
    const savedFavorites = JSON.parse(window.localStorage.getItem(favoritesStorageKey) || "[]");
    if (Array.isArray(savedFavorites)) {
      savedFavorites.filter(value => typeof value === "string").forEach(value => favoriteProjects.add(value));
    }
  } catch (error) {
    console.warn("Could not read saved project favorites.", error);
  }

  try {
    const savedNotes = JSON.parse(window.localStorage.getItem(projectNotesStorageKey) || "{}");
    if (savedNotes && typeof savedNotes === "object" && !Array.isArray(savedNotes)) {
      Object.entries(savedNotes).forEach(([key, value]) => {
        if (typeof value === "string" && value.trim()) projectNotes.set(key, value.slice(0, 500));
      });
    }
  } catch (error) {
    console.warn("Could not read saved project notes.", error);
  }

  function projectKey(card) {
    return card.querySelector(".project-link")?.href || "";
  }

  function updateFavoriteButton(button, card) {
    const projectName = card.querySelector(".project-copy h3")?.textContent.trim() || "project";
    const saved = favoriteProjects.has(projectKey(card));
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${projectName} ${saved ? "from" : "to"} favorites`);
    button.textContent = saved ? "Saved to favorites" : "Save to favorites";
  }

  function persistFavorites() {
    try {
      window.localStorage.setItem(favoritesStorageKey, JSON.stringify([...favoriteProjects]));
      return true;
    } catch (error) {
      console.warn("Could not save project favorites.", error);
      return false;
    }
  }

  projectCards.forEach(card => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-favorite";
    button.addEventListener("click", () => {
      const key = projectKey(card);
      if (!key) {
        console.error("Cannot save a project without its verified URL.");
        showToast("This project cannot be saved right now.");
        return;
      }
      if (favoriteProjects.has(key)) favoriteProjects.delete(key);
      else favoriteProjects.add(key);
      updateFavoriteButton(button, card);
      updateProjectResults();
      showToast(persistFavorites()
        ? favoriteProjects.has(key) ? "Project saved to favorites." : "Project removed from favorites."
        : "Favorite updated for this visit; browser storage is unavailable.");
    });
    card.querySelector(".project-copy").append(button);
    updateFavoriteButton(button, card);

    const noteToggle = document.createElement("button");
    noteToggle.type = "button";
    noteToggle.className = "project-note-toggle";
    noteToggle.textContent = "Private project note";
    noteToggle.setAttribute("aria-expanded", "false");
    const notePanel = document.createElement("div");
    notePanel.className = "project-note-panel";
    notePanel.hidden = true;
    const noteLabel = document.createElement("label");
    const noteId = `project-note-${projectCards.indexOf(card) + 1}`;
    noteLabel.htmlFor = noteId;
    noteLabel.textContent = "Note (saved only on this device)";
    const noteField = document.createElement("textarea");
    noteField.id = noteId;
    noteField.maxLength = 500;
    noteField.rows = 3;
    noteField.placeholder = "Add a private reminder about this project…";
    noteField.value = projectNotes.get(projectKey(card)) || "";
    noteField.setAttribute("aria-describedby", `${noteId}-status`);
    const noteStatus = document.createElement("p");
    noteStatus.className = "project-note-status";
    noteStatus.id = `${noteId}-status`;
    noteStatus.setAttribute("role", "status");
    noteStatus.textContent = noteField.value ? "A note is saved on this device." : "No note saved.";
    const noteActions = document.createElement("div");
    noteActions.className = "project-note-actions";
    const noteSave = document.createElement("button");
    noteSave.type = "button";
    noteSave.textContent = "Save note";
    const noteDelete = document.createElement("button");
    noteDelete.type = "button";
    noteDelete.textContent = "Delete note";
    noteActions.append(noteSave, noteDelete);
    notePanel.append(noteLabel, noteField, noteStatus, noteActions);
    noteToggle.addEventListener("click", () => {
      const expanded = noteToggle.getAttribute("aria-expanded") === "true";
      noteToggle.setAttribute("aria-expanded", String(!expanded));
      notePanel.hidden = expanded;
      if (!expanded) noteField.focus();
    });
    noteSave.addEventListener("click", () => {
      const note = noteField.value.trim();
      const key = projectKey(card);
      if (!key) {
        console.error("Cannot save a project note without a project URL.");
        noteStatus.textContent = "This note could not be saved because the project link is unavailable.";
        return;
      }
      if (note) projectNotes.set(key, note);
      else projectNotes.delete(key);
      try {
        window.localStorage.setItem(projectNotesStorageKey, JSON.stringify(Object.fromEntries(projectNotes)));
        noteStatus.textContent = note ? "Note saved on this device." : "Empty note removed.";
      } catch (error) {
        console.warn("Could not save the project note.", error);
        noteStatus.textContent = "Could not save this note in browser storage.";
      }
    });
    noteDelete.addEventListener("click", () => {
      const key = projectKey(card);
      projectNotes.delete(key);
      noteField.value = "";
      try {
        window.localStorage.setItem(projectNotesStorageKey, JSON.stringify(Object.fromEntries(projectNotes)));
        noteStatus.textContent = "Saved note deleted from this device.";
      } catch (error) {
        console.warn("Could not delete the project note.", error);
        noteStatus.textContent = "Could not delete the saved note from browser storage.";
      }
      noteField.focus();
    });
    card.querySelector(".project-copy").append(noteToggle, notePanel);
  });

  function verifiedTechnologiesFor(card) {
    const title = card.querySelector(".project-copy h3")?.textContent.trim().toLocaleLowerCase();
    const technologies = title ? verifiedProjectTechnologies[title] : null;
    return Array.isArray(technologies)
      ? [...new Set(technologies.filter(item => typeof item === "string" && item.trim()).map(item => item.trim()))]
      : [];
  }

  function renderTechnologyTags(list, technologies) {
    list.replaceChildren();
    technologies.forEach(technology => {
      const item = document.createElement("li");
      item.textContent = technology;
      list.append(item);
    });
    list.hidden = technologies.length === 0;
  }

  projectCards.forEach(card => {
    const tags = card.querySelector(".project-tech-tags");
    if (tags) renderTechnologyTags(tags, verifiedTechnologiesFor(card));
  });
  document.querySelector("#project-grid").addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const projectLink = event.target.closest("a.project-visual, a.project-link");
    if (projectLink instanceof HTMLAnchorElement) recordSessionInsight("links");
  });
  const projectFilterStatus = document.querySelector(".project-filter-status");
  const projectSearchInput = document.querySelector(".project-search-input");
  const projectEmptyState = document.querySelector(".project-empty-state");
  let activeProjectCategory = "all";

  function updateProjectResults() {
    const query = projectSearchInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;
    projectCards.forEach(card => {
      const matchesCategory = activeProjectCategory === "all"
        || (activeProjectCategory === "favorites" ? favoriteProjects.has(projectKey(card))
          : card.dataset.projectCategory === activeProjectCategory);
      const searchableText = [
        card.querySelector("h3")?.textContent,
        card.querySelector(".card-kicker")?.textContent,
        card.querySelector(".project-copy > p:not(.card-kicker)")?.textContent,
        card.dataset.projectCategory.replace(/-/g, " "),
      ].join(" ").toLocaleLowerCase();
      const visible = matchesCategory && (!query || searchableText.includes(query));
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    projectEmptyState.hidden = visibleCount > 0;
    projectEmptyState.textContent = activeProjectCategory === "favorites" && !favoriteProjects.size && !query
      ? "No saved favorites yet. Use “Save to favorites” on any project to build your list."
      : "No projects match your search. Try another term or choose a different category.";
    projectFilterStatus.textContent = query
      ? `Showing ${visibleCount} ${visibleCount === 1 ? "project" : "projects"} for “${projectSearchInput.value.trim()}”.`
      : activeProjectCategory === "all"
        ? `Showing all ${visibleCount} projects.`
        : `Showing ${visibleCount} of ${projectCards.length} projects.`;
    document.querySelector(".project-count").textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
  }

  document.querySelectorAll("[data-project-filter]").forEach(button => {
    button.addEventListener("click", () => {
      activeProjectCategory = button.dataset.projectFilter;
      document.querySelectorAll("[data-project-filter]").forEach(filter => {
        const selected = filter === button;
        filter.classList.toggle("is-active", selected);
        filter.setAttribute("aria-pressed", String(selected));
      });
      updateProjectResults();
    });
  });
  projectSearchInput.addEventListener("input", updateProjectResults);
  const projectSortSelect = document.querySelector(".project-sort-select");
  projectSortSelect.addEventListener("change", () => {
    const sortMode = projectSortSelect.value;
    const sorted = [...projectOrder];
    if (sortMode === "name") {
      sorted.sort((a, b) => a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent));
    } else if (sortMode === "category") {
      sorted.sort((a, b) => a.dataset.projectCategory.localeCompare(b.dataset.projectCategory)
        || a.querySelector("h3").textContent.localeCompare(b.querySelector("h3").textContent));
    }
    sorted.forEach(card => projectGrid.append(card));
  });
  document.querySelector(".project-reset").addEventListener("click", () => {
    activeProjectCategory = "all";
    projectSearchInput.value = "";
    projectSortSelect.value = "featured";
    projectOrder.forEach(card => projectGrid.append(card));
    document.querySelectorAll("[data-project-filter]").forEach(button => {
      const selected = button.dataset.projectFilter === "all";
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    updateProjectResults();
    projectSearchInput.focus();
  });
  document.querySelector(".project-print").addEventListener("click", () => {
    document.body.dataset.printMode = "projects";
    const clearPrintMode = () => {
      delete document.body.dataset.printMode;
      window.removeEventListener("afterprint", clearPrintMode);
    };
    window.addEventListener("afterprint", clearPrintMode);
    try {
      window.print();
    } catch (error) {
      clearPrintMode();
      console.error("Could not open the project print dialog.", error);
      showToast("Could not open the print dialog. Please try your browser's print command.");
    }
  });

  const contactForm = document.querySelector(".contact-form");
  const contactMessage = document.querySelector("#contact-message");
  const contactMessageCount = document.querySelector(".contact-message-count");
  const contactFormNote = document.querySelector(".contact-form-note");
  const copyContactMessage = document.querySelector(".contact-copy-message");
  const contactDraftSave = document.querySelector(".contact-draft-save");
  const contactDraftRestore = document.querySelector(".contact-draft-restore");
  const contactDraftDelete = document.querySelector(".contact-draft-delete");
  const contactDraftStorageKey = "shvan-portfolio-contact-draft";
  const contactDraftFields = {
    name: document.querySelector("#contact-name"),
    email: document.querySelector("#contact-email"),
    topic: document.querySelector("#contact-topic"),
    message: contactMessage,
  };
  function readContactDraft() {
    try {
      const saved = window.localStorage.getItem(contactDraftStorageKey);
      if (!saved) return null;
      const draft = JSON.parse(saved);
      if (!draft || typeof draft !== "object") throw new Error("Saved contact draft has an invalid format.");
      return Object.fromEntries(Object.keys(contactDraftFields).map(key => [
        key,
        typeof draft[key] === "string" ? draft[key] : "",
      ]));
    } catch (error) {
      console.warn("Could not read the saved contact draft.", error);
      contactFormNote.textContent = "A saved draft could not be read. You can still complete this form normally.";
      return null;
    }
  }

  const initialContactDraft = readContactDraft();
  contactDraftRestore.hidden = !initialContactDraft;
  contactDraftDelete.hidden = !initialContactDraft;

  function updateContactDraftActions() {
    contactDraftSave.disabled = !Object.values(contactDraftFields).some(field => field.value.trim());
  }

  function syncContactMessageControls() {
    contactMessageCount.textContent = `${contactMessage.value.length} / ${contactMessage.maxLength}`;
    contactMessageCount.toggleAttribute("data-near-limit", contactMessage.value.length >= contactMessage.maxLength * .9);
    copyContactMessage.disabled = !contactMessage.value.trim();
  }

  contactForm.addEventListener("focusin", () => {
    if (contactFocusActive) return;
    contactFocusActive = true;
    recordSessionInsight("contact");
  });
  contactForm.addEventListener("invalid", event => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) {
      event.target.setAttribute("aria-invalid", "true");
      contactFormNote.textContent = "Please review the highlighted fields before sending.";
    }
  }, true);
  contactForm.addEventListener("focusout", event => {
    if (!contactForm.contains(event.relatedTarget)) contactFocusActive = false;
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) {
      event.target.setAttribute("aria-invalid", String(!event.target.checkValidity()));
    }
  });
  contactForm.addEventListener("input", event => {
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement)) return;
    if (event.target.checkValidity()) event.target.removeAttribute("aria-invalid");
    updateContactDraftActions();
  });
  contactMessage.addEventListener("input", () => {
    syncContactMessageControls();
  });
  contactDraftSave.addEventListener("click", () => {
    const draft = Object.fromEntries(Object.entries(contactDraftFields).map(([key, field]) => [key, field.value]));
    try {
      window.localStorage.setItem(contactDraftStorageKey, JSON.stringify(draft));
      contactDraftRestore.hidden = false;
      contactDraftDelete.hidden = false;
      contactFormNote.textContent = "Draft saved in this browser on this device. It has not been sent.";
    } catch (error) {
      console.warn("Could not save the contact draft.", error);
      contactFormNote.textContent = "The draft could not be saved in browser storage. Keep this page open or copy your message.";
    }
  });
  contactDraftRestore.addEventListener("click", () => {
    const draft = readContactDraft();
    if (!draft) {
      contactDraftRestore.hidden = true;
      contactDraftDelete.hidden = true;
      contactFormNote.textContent = "No readable saved draft is available.";
      return;
    }
    Object.entries(contactDraftFields).forEach(([key, field]) => {
      field.value = draft[key];
      field.removeAttribute("aria-invalid");
    });
    syncContactMessageControls();
    updateContactDraftActions();
    contactFormNote.textContent = "Saved draft restored. Review it before sending.";
  });
  contactDraftDelete.addEventListener("click", () => {
    try {
      window.localStorage.removeItem(contactDraftStorageKey);
      contactDraftRestore.hidden = true;
      contactDraftDelete.hidden = true;
      contactFormNote.textContent = "Saved draft deleted from this browser.";
    } catch (error) {
      console.warn("Could not delete the saved contact draft.", error);
      contactFormNote.textContent = "The saved draft could not be deleted. Check browser storage permissions.";
    }
  });
  contactForm.addEventListener("reset", () => {
    window.setTimeout(() => {
      syncContactMessageControls();
      contactForm.querySelectorAll("[aria-invalid]").forEach(field => field.removeAttribute("aria-invalid"));
      updateContactDraftActions();
      contactFormNote.textContent = "Form cleared. Submitting opens WhatsApp with your message ready to send.";
    }, 0);
  });
  copyContactMessage.addEventListener("click", async () => {
    const message = contactMessage.value.trim();
    if (!message) return;
    if (!navigator.clipboard?.writeText) {
      contactFormNote.textContent = "Clipboard access is unavailable. Select the message text and copy it manually.";
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      contactFormNote.textContent = "Message copied to the clipboard.";
    } catch (error) {
      console.warn("Could not copy the contact message.", error);
      contactFormNote.textContent = "The message could not be copied. Select the text and copy it manually.";
    }
  });
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    recordSessionInsight("submissions");
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      contactForm.querySelector(":invalid")?.focus();
      contactFormNote.textContent = "Please review the highlighted fields before sending.";
      return;
    }
    const formData = new FormData(contactForm);
    const message = [
      "Portfolio contact message",
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Topic: ${formData.get("topic")}`,
      "",
      String(formData.get("message"))
    ].join("\n");
    const whatsappUrl = `https://wa.me/9647503643253?text=${encodeURIComponent(message)}`;
    window.location.assign(whatsappUrl);
  });

  function renderOptionalContent() {
    const testimonialSection = document.querySelector(".testimonial-section");
    const testimonialList = document.querySelector(".testimonial-list");
    const verifiedTestimonials = testimonials.filter(entry =>
      typeof entry.quote === "string" && entry.quote.trim()
      && typeof entry.name === "string" && entry.name.trim()
    );
    testimonialList.replaceChildren();
    verifiedTestimonials.forEach(entry => {
      const figure = document.createElement("figure");
      figure.className = "testimonial-card";
      const quote = document.createElement("blockquote");
      quote.textContent = entry.quote.trim();
      const caption = document.createElement("figcaption");
      const author = document.createElement("cite");
      author.textContent = entry.name.trim();
      caption.append(author);
      if (typeof entry.context === "string" && entry.context.trim()) {
        caption.append(document.createTextNode(` · ${entry.context.trim()}`));
      }
      figure.append(quote, caption);
      testimonialList.append(figure);
    });
    testimonialSection.hidden = verifiedTestimonials.length === 0;
    if (verifiedTestimonials.length > 0) {
      document.querySelector('[data-optional-target="testimonials"]').hidden = false;
      searchDestinations.push({ id: "testimonials", title: "Testimonials", description: "Verified client feedback" });
    }

    const writingSection = document.querySelector(".writing-section");
    const writingList = document.querySelector(".writing-list");
    const publishedEntries = writingEntries.filter(entry =>
      typeof entry.title === "string" && entry.title.trim()
      && typeof entry.summary === "string" && entry.summary.trim()
      && typeof entry.url === "string"
    ).flatMap(entry => {
      try {
        const url = new URL(entry.url);
        return url.protocol === "https:" ? [{ ...entry, url }] : [];
      } catch (error) {
        console.warn("A writing entry has an invalid URL and was omitted.", error);
        return [];
      }
    });
    writingList.replaceChildren();
    publishedEntries.forEach(entry => {
      const article = document.createElement("article");
      article.className = "writing-card";
      const title = document.createElement("h3");
      title.textContent = entry.title.trim();
      const summary = document.createElement("p");
      summary.textContent = entry.summary.trim();
      const link = document.createElement("a");
      link.href = entry.url.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Read article ↗";
      article.append(title, summary, link);
      writingList.append(article);
    });
    writingSection.hidden = publishedEntries.length === 0;
    if (publishedEntries.length > 0) {
      document.querySelector('[data-optional-target="writing"]').hidden = false;
      searchDestinations.push({ id: "writing", title: "Writing", description: "Published articles and notes" });
    }
  }

  renderOptionalContent();

  const faqSearchInput = document.querySelector(".faq-search-input");
  const faqItems = [...document.querySelectorAll(".faq-item")];
  const faqResults = document.querySelector(".faq-results");
  const faqEmpty = document.querySelector(".faq-empty");
  const faqExpandAll = document.querySelector(".faq-expand-all");

  function updateFaqResults() {
    const query = faqSearchInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;
    faqItems.forEach(item => {
      const visible = !query || item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !visible;
      if (!visible) item.open = false;
      if (visible) visibleCount += 1;
    });
    faqEmpty.hidden = visibleCount > 0;
    faqResults.textContent = query
      ? `Showing ${visibleCount} of ${faqItems.length} answers.`
      : `Showing all ${faqItems.length} answers.`;
    const visibleItems = faqItems.filter(item => !item.hidden);
    const expanded = visibleItems.length > 0 && visibleItems.every(item => item.open);
    faqExpandAll.setAttribute("aria-pressed", String(expanded));
    faqExpandAll.textContent = expanded ? "Collapse all" : "Expand all";
  }

  faqSearchInput.addEventListener("input", updateFaqResults);
  faqItems.forEach(item => {
    item.addEventListener("toggle", updateFaqResults);
  });
  faqExpandAll.addEventListener("click", () => {
    const visibleItems = faqItems.filter(item => !item.hidden);
    const shouldExpand = visibleItems.some(item => !item.open);
    visibleItems.forEach(item => item.open = shouldExpand);
    updateFaqResults();
  });

  function openComparison(trigger = document.querySelector("[data-command-action='compare']")) {
    if (!comparisonProjects.length) return;
    const project = comparisonProjects[0];
    let beforeUrl;
    let afterUrl;
    try {
      beforeUrl = new URL(project.before);
      afterUrl = new URL(project.after);
    } catch (error) {
      console.error("Before-and-after image URLs are invalid.", error);
      showToast("The comparison images could not be loaded.");
      return;
    }
    if (beforeUrl.protocol !== "https:" || afterUrl.protocol !== "https:") {
      console.error("Before-and-after images must use verified HTTPS URLs.");
      showToast("The comparison images could not be loaded.");
      return;
    }
    comparisonReturnFocus = trigger instanceof HTMLElement ? trigger : document.activeElement;
    document.querySelector(".comparison-project-title").textContent = project.title;
    document.querySelector(".comparison-status").textContent = "Use the slider to compare the verified images.";
    const before = document.querySelector(".comparison-before");
    const after = document.querySelector(".comparison-after");
    before.src = beforeUrl.href;
    after.src = afterUrl.href;
    before.alt = `${project.title} before`;
    after.alt = `${project.title} after`;
    document.querySelector(".comparison-range").value = "50";
    comparisonDialog.showModal();
    updateComparisonProgress(50);
    document.querySelector(".comparison-range").focus();
  }

  function updateComparisonProgress(value) {
    const stage = document.querySelector(".comparison-stage");
    stage.style.setProperty("--comparison-progress", `${value}%`);
    stage.style.setProperty("--comparison-stage-width", `${stage.clientWidth}px`);
  }

  const compareAction = document.querySelector("[data-command-action='compare']");
  if (comparisonProjects.length) {
    compareAction.disabled = false;
    compareAction.textContent = "Before / after comparison";
    document.querySelector(".command-center-note").textContent = "A verified project image comparison is available.";
  }

  document.querySelector(".comparison-range").addEventListener("input", event => {
    updateComparisonProgress(event.currentTarget.value);
  });
  window.addEventListener("resize", () => {
    if (comparisonDialog.open) updateComparisonProgress(document.querySelector(".comparison-range").value);
  });
  [document.querySelector(".comparison-before"), document.querySelector(".comparison-after")].forEach(image => {
    image.addEventListener("error", () => {
      console.error("A configured project comparison image could not be loaded.");
      document.querySelector(".comparison-status").textContent = "A comparison image could not be loaded. Check its verified image URL.";
    });
  });
  document.querySelector(".comparison-close").addEventListener("click", () => comparisonDialog.close());
  comparisonDialog.addEventListener("close", () => {
    document.querySelector(".comparison-before").removeAttribute("src");
    document.querySelector(".comparison-after").removeAttribute("src");
    if (comparisonReturnFocus instanceof HTMLElement) comparisonReturnFocus.focus();
  });

  function runCommandAction(action, opener) {
    switch (action) {
      case "theme":
        themeToggle.click();
        break;
      case "appearance":
        document.querySelector(".open-accessibility").click();
        break;
      case "reading":
        readingModeToggle.click();
        break;
      case "cosmic":
        openCosmicNavigation(opener);
        break;
      case "playground":
        openPlayground(opener);
        break;
      case "resume":
        openResume(opener);
        break;
      case "creator":
        toggleCreatorMode();
        break;
      case "design":
        toggleDesignShowcase();
        break;
      case "project":
        document.querySelector(".project-details-trigger")?.click();
        break;
      case "compare":
        openComparison(opener);
        break;
      case "command":
        openCommandCenter(opener);
        break;
      default:
        console.error(`Unknown portfolio command: ${action}`);
    }
  }

  function navigateToSearchResult(destination) {
    if (destination.action === "theme") {
      searchDialog.close();
      themeToggle.click();
      return;
    }
    if (destination.action) {
      const opener = searchReturnFocus;
      searchDialog.close();
      window.setTimeout(() => runCommandAction(destination.action, opener), 0);
      return;
    }
    const target = document.getElementById(destination.id);
    if (!target) return;
    searchDialog.close();
    window.location.hash = destination.id;
    target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    showToast(`${destination.title} section selected.`);
  }

  function renderSearchResults(query = "") {
    const normalizedQuery = query.trim().toLowerCase();
    const matches = searchDestinations.filter(destination =>
      `${destination.title} ${destination.description}`.toLowerCase().includes(normalizedQuery));
    searchResults.replaceChildren();
    matches.forEach((destination, index) => {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.id = `quick-result-${destination.id}`;
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", "false");
      const title = document.createElement("span");
      title.className = "quick-result-title";
      title.textContent = destination.title;
      const description = document.createElement("span");
      description.className = "quick-result-description";
      description.textContent = destination.description;
      const shortcut = document.createElement("span");
      shortcut.className = "quick-result-shortcut";
      shortcut.setAttribute("aria-hidden", "true");
      shortcut.textContent = "↵";
      button.append(title, description, shortcut);
      button.addEventListener("mouseenter", () => setActiveSearchResult(index));
      button.addEventListener("click", () => navigateToSearchResult(destination));
      item.append(button);
      searchResults.append(item);
    });
    searchEmpty.hidden = matches.length > 0;
    setActiveSearchResult(matches.length ? 0 : -1);
  }

  function openQuickSearch() {
    if (menuToggle.getAttribute("aria-expanded") === "true") setMenuOpen(false);
    accentOptions.hidden = true;
    accentTrigger.setAttribute("aria-expanded", "false");
    if (searchDialog.open) {
      searchInput.focus();
      return;
    }
    searchReturnFocus = document.activeElement === document.body ? searchTrigger : document.activeElement;
    searchInput.value = "";
    renderSearchResults();
    if (typeof searchDialog.showModal === "function") {
      searchDialog.showModal();
      searchInput.focus();
    }
  }

  searchTrigger.addEventListener("click", openQuickSearch);
  searchClose.addEventListener("click", () => searchDialog.close());
  searchDialog.addEventListener("close", () => {
    if (searchReturnFocus instanceof HTMLElement) searchReturnFocus.focus();
  });
  searchDialog.addEventListener("click", event => {
    if (event.target === searchDialog) searchDialog.close();
  });
  searchInput.addEventListener("input", () => renderSearchResults(searchInput.value));
  searchInput.addEventListener("keydown", event => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSearchResult(activeSearchIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSearchResult(activeSearchIndex - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const destination = searchDestinations.find(item => `quick-result-${item.id}` === searchInput.getAttribute("aria-activedescendant"));
      if (destination) navigateToSearchResult(destination);
    }
  });

  copyWebsiteButton.addEventListener("click", async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText("https://iamshvan266.github.io/shvanjamal/");
      } else if (!fallbackCopy("https://iamshvan266.github.io/shvanjamal/")) {
        throw new Error("Clipboard access is unavailable.");
      }
      showToast("Website link copied.");
    } catch (error) {
      console.warn("Could not copy the website link.", error);
      showToast("Could not copy the link. Please check browser permissions.");
    }
  });

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }

  const openShareButton = document.querySelector(".open-share");
  const shareCloseButton = document.querySelector(".share-close");
  const copyPortfolioButton = document.querySelector(".copy-portfolio");
  const nativeShareButton = document.querySelector(".native-share");
  const shareQrToggle = document.querySelector(".share-qr-toggle");
  const shareQrContent = document.querySelector(".share-qr-content");
  const shareQrImage = document.querySelector(".share-qr-image");
  const shareQrStatus = document.querySelector(".share-qr-status");
  const shareQrRetry = document.querySelector(".share-qr-retry");
  const portfolioUrl = "https://iamshvan266.github.io/shvanjamal/";
  function loadPortfolioQr(retry = false) {
    shareQrStatus.textContent = "Loading QR code…";
    shareQrRetry.hidden = true;
    const qrUrl = new URL("https://api.qrserver.com/v1/create-qr-code/");
    qrUrl.searchParams.set("size", "180x180");
    qrUrl.searchParams.set("data", portfolioUrl);
    if (retry) qrUrl.searchParams.set("retry", String(Date.now()));
    shareQrImage.src = qrUrl.href;
  }
  shareQrImage.addEventListener("load", () => {
    shareQrStatus.textContent = "QR code ready. Scan it to open the portfolio.";
    shareQrRetry.hidden = true;
  });
  shareQrImage.addEventListener("error", () => {
    shareQrStatus.textContent = "The QR code could not be loaded. The portfolio link above is still available.";
    shareQrRetry.hidden = false;
  });
  shareQrToggle.addEventListener("click", () => {
    const expanded = shareQrToggle.getAttribute("aria-expanded") === "true";
    shareQrToggle.setAttribute("aria-expanded", String(!expanded));
    shareQrContent.hidden = expanded;
    shareQrToggle.textContent = expanded ? "Show portfolio QR code" : "Hide portfolio QR code";
    if (!expanded && !shareQrImage.hasAttribute("src")) loadPortfolioQr();
  });
  shareQrRetry.addEventListener("click", () => loadPortfolioQr(true));
  openShareButton.addEventListener("click", () => {
    shareReturnFocus = openShareButton;
    shareDialog.showModal();
    shareCloseButton.focus();
  });
  shareCloseButton.addEventListener("click", () => shareDialog.close());
  shareDialog.addEventListener("click", event => {
    if (event.target === shareDialog) shareDialog.close();
  });
  shareDialog.addEventListener("close", () => {
    if (shareReturnFocus instanceof HTMLElement) shareReturnFocus.focus();
  });
  if (!navigator.share) nativeShareButton.hidden = true;

  copyPortfolioButton.addEventListener("click", async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(portfolioUrl);
      } else if (!fallbackCopy(portfolioUrl)) {
        throw new Error("Clipboard access is unavailable.");
      }
      showToast("Portfolio link copied.");
    } catch (error) {
      console.warn("Could not copy the portfolio link.", error);
      showToast("Could not copy the portfolio link. Please check browser permissions.");
    }
  });

  nativeShareButton.addEventListener("click", async () => {
    if (!navigator.share) {
      showToast("Native sharing is not available in this browser.");
      return;
    }
    try {
      await navigator.share({
        title: "Shvan Jamal | Web Developer & Digital Creator",
        text: "Explore Shvan Jamal's portfolio.",
        url: portfolioUrl,
      });
      showToast("Portfolio shared.");
    } catch (error) {
      if (error.name === "AbortError") {
        showToast("Sharing cancelled.");
        return;
      }
      console.warn("Could not share the portfolio.", error);
      showToast("Could not share the portfolio. Try copying the link instead.");
    }
  });

  const assistantAnswers = [
    { terms: ["who", "about", "shvan", "intro"], text: "Shvan Jamal is a Web Developer & Digital Creator who is passionate about building modern websites and useful digital experiences with clean design and thoughtful technology.", destination: "about", label: "Explore About" },
    { terms: ["service", "offer"], text: "The portfolio highlights Website Development and Modern Technology Solutions. Explore the Services section for details.", destination: "services", label: "View Services" },
    { terms: ["project", "work", "portfolio"], text: "The portfolio features selected project links. Open the Projects section to browse them.", destination: "projects", label: "Show Projects" },
    { terms: ["contact", "touch", "reach", "email"], text: "Use the contact section or visit Shvan's website to get in touch.", destination: "contact", label: "Go to Contact" },
  ];
  let assistantTimer = 0;
  let assistantWaitingMessage = null;

  function addAssistantMessage(text, type, destination, label) {
    const message = document.createElement("div");
    message.className = `assistant-message assistant-${type}`;
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    message.append(paragraph);
    if (destination && label) {
      const link = document.createElement("a");
      link.href = `#${destination}`;
      link.className = "assistant-destination";
      link.textContent = label;
      link.addEventListener("click", () => closeAssistant(true));
      message.append(link);
    }
    assistantMessages.append(message);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }

  function closeAssistant(restoreFocus = false) {
    assistantPanel.hidden = true;
    assistantToggle.setAttribute("aria-expanded", "false");
    assistantToggle.setAttribute("aria-label", "Open portfolio assistant");
    if (restoreFocus) assistantToggle.focus();
  }

  function openAssistant() {
    assistantPanel.hidden = false;
    assistantToggle.setAttribute("aria-expanded", "true");
    assistantToggle.setAttribute("aria-label", "Close portfolio assistant");
    assistantInput.focus();
  }

  function submitAssistantQuestion(question) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || assistantTimer) return;
    addAssistantMessage(cleanQuestion, "visitor");
    const normalizedQuestion = cleanQuestion.toLowerCase();
    const answer = assistantAnswers.find(item => item.terms.some(term => normalizedQuestion.includes(term)));
    assistantWaitingMessage = document.createElement("p");
    assistantWaitingMessage.className = "assistant-typing";
    assistantWaitingMessage.setAttribute("role", "status");
    assistantWaitingMessage.textContent = "Preparing a portfolio answer…";
    assistantMessages.append(assistantWaitingMessage);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
    assistantForm.querySelector("button[type=submit]").disabled = true;
    document.querySelectorAll("[data-assistant-question]").forEach(button => button.disabled = true);
    assistantTimer = window.setTimeout(() => {
      assistantWaitingMessage.remove();
      assistantWaitingMessage = null;
      if (answer) {
        addAssistantMessage(answer.text, "reply", answer.destination, answer.label);
      } else {
        addAssistantMessage("I can answer questions about Shvan, the services, projects, and contact details. Try one of the suggested questions.", "reply");
      }
      assistantForm.querySelector("button[type=submit]").disabled = false;
      document.querySelectorAll("[data-assistant-question]").forEach(button => button.disabled = false);
      assistantTimer = 0;
    }, 320);
  }

  assistantToggle.addEventListener("click", () => {
    if (assistantPanel.hidden) openAssistant();
    else closeAssistant();
  });
  assistantClose.addEventListener("click", () => closeAssistant(true));
  assistantForm.addEventListener("submit", event => {
    event.preventDefault();
    submitAssistantQuestion(assistantInput.value);
    assistantInput.value = "";
  });
  document.querySelectorAll("[data-assistant-question]").forEach(button => {
    button.addEventListener("click", () => submitAssistantQuestion(button.dataset.assistantQuestion));
  });

  let projectReturnFocus = null;
  let activeProjectGalleryCard = null;
  const projectGalleryPosition = document.querySelector(".project-gallery-position");
  const projectGalleryStatus = document.querySelector(".project-gallery-status");
  const projectFullscreenButton = document.querySelector(".project-image-fullscreen");
  const projectCompareToggle = document.querySelector(".project-compare-toggle");
  const projectComparePanel = document.querySelector(".project-side-compare");
  const projectCompareImagePrimary = document.querySelector(".project-compare-image-primary");
  const projectCompareImageSecondary = document.querySelector(".project-compare-image-secondary");
  const projectCompareStatus = document.querySelector(".project-compare-status");

  function galleryProjectCards() {
    return [...projectGrid.children].filter(card => card.matches(".project-card") && !card.hidden);
  }

  function populateProjectPreview(card) {
    const image = card.querySelector(".project-visual img");
    const liveLink = card.querySelector(".project-link");
    const title = card.querySelector(".project-copy h3");
    const category = card.querySelector(".project-copy .card-kicker");
    const description = card.querySelector(".project-copy > p:not(.card-kicker)");
    if (!image || !liveLink || !title || !category || !description) {
      console.error("The project preview could not be opened because project details are incomplete.");
      return;
    }

    activeProjectGalleryCard = card;
    projectPreviewImage.src = image.currentSrc || image.src;
    const imagePreview = document.querySelector(".project-preview-image-wrap");
    imagePreview.dataset.imageState = "loading";
    if (projectPreviewImage.complete) {
      imagePreview.dataset.imageState = projectPreviewImage.naturalWidth ? "loaded" : "error";
    }
    projectPreviewImage.alt = `${title.textContent.trim()} project preview`;
    projectPreviewCategory.textContent = category.textContent.trim();
    projectPreviewTitle.textContent = title.textContent.trim();
    projectPreviewDescription.textContent = description.textContent.trim();
    const technologies = verifiedTechnologiesFor(card);
    renderTechnologyTags(projectPreviewTechTags, technologies);
    projectPreviewTechNote.hidden = technologies.length > 0;
    projectPreviewLink.href = liveLink.href;
    const galleryCards = galleryProjectCards();
    const galleryIndex = galleryCards.indexOf(card);
    projectGalleryPosition.textContent = `Project ${galleryIndex + 1} of ${galleryCards.length}: ${title.textContent.trim()}`;
    document.querySelector(".project-gallery-previous").disabled = galleryCards.length < 2;
    document.querySelector(".project-gallery-next").disabled = galleryCards.length < 2;
    projectCompareToggle.disabled = galleryCards.length < 2;
    projectGalleryStatus.textContent = "";
    projectFullscreenButton.disabled = false;
    projectFullscreenButton.setAttribute("aria-pressed", "false");
    projectFullscreenButton.textContent = "View image fullscreen";
    projectComparePanel.hidden = true;
    projectCompareToggle.setAttribute("aria-expanded", "false");
    previewFrame.title = `${title.textContent.trim()} live website preview`;
    previewFrame.removeAttribute("src");
    window.clearTimeout(previewLoadingTimer);
    previewFrame.hidden = true;
    previewLoading.hidden = true;
    previewLoadingSpinner.hidden = false;
    previewLoadingLabel.textContent = "Loading preview…";
    previewImageWrap.hidden = false;
    document.querySelector(".device-stage").dataset.device = "desktop";
    document.querySelectorAll("[data-device]").forEach(button => {
      if (button instanceof HTMLButtonElement) button.setAttribute("aria-pressed", String(button.dataset.device === "desktop"));
    });
    document.querySelectorAll("[data-preview-source]").forEach(button => {
      const selected = button.dataset.previewSource === "image";
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    return true;
  }

  function openProjectPreview(card, trigger) {
    if (!populateProjectPreview(card)) return;
    recordSessionInsight("projects");
    projectReturnFocus = trigger;
    projectDialog.showModal();
    projectPreviewClose.focus();
  }

  function moveProjectGallery(direction) {
    const galleryCards = galleryProjectCards();
    if (!galleryCards.length) return;
    const currentIndex = galleryCards.indexOf(activeProjectGalleryCard);
    const nextIndex = (currentIndex + direction + galleryCards.length) % galleryCards.length;
    populateProjectPreview(galleryCards[nextIndex]);
  }

  document.querySelector(".project-gallery-previous").addEventListener("click", () => moveProjectGallery(-1));
  document.querySelector(".project-gallery-next").addEventListener("click", () => moveProjectGallery(1));

  projectFullscreenButton.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement === previewImageWrap) {
        await document.exitFullscreen();
      } else if (typeof previewImageWrap.requestFullscreen === "function") {
        await previewImageWrap.requestFullscreen();
      } else {
        throw new Error("Fullscreen is not supported.");
      }
    } catch (error) {
      console.warn("Could not change project image fullscreen state.", error);
      projectGalleryStatus.textContent = "Fullscreen is unavailable in this browser or context.";
    }
  });
  document.addEventListener("fullscreenchange", () => {
    const fullscreen = document.fullscreenElement === previewImageWrap;
    projectFullscreenButton.setAttribute("aria-pressed", String(fullscreen));
    projectFullscreenButton.textContent = fullscreen ? "Exit image fullscreen" : "View image fullscreen";
  });

  function updateProjectComparison() {
    const galleryCards = galleryProjectCards();
    if (galleryCards.length < 2) {
      projectCompareStatus.textContent = "At least two visible projects are needed for a comparison.";
      return;
    }
    const currentIndex = galleryCards.indexOf(activeProjectGalleryCard);
    const primaryCard = galleryCards[currentIndex < 0 ? 0 : currentIndex];
    const secondaryCard = galleryCards[((currentIndex < 0 ? 0 : currentIndex) + 1) % galleryCards.length];
    const cards = [primaryCard, secondaryCard];
    const images = [projectCompareImagePrimary, projectCompareImageSecondary];
    const captions = [
      document.querySelector(".project-compare-title-primary"),
      document.querySelector(".project-compare-title-secondary"),
    ];
    cards.forEach((card, index) => {
      const source = card.querySelector(".project-visual img");
      const title = card.querySelector(".project-copy h3").textContent.trim();
      images[index].src = source.currentSrc || source.src;
      images[index].alt = `${title} portfolio screenshot`;
      captions[index].textContent = title;
    });
    projectCompareStatus.textContent = "Loading the selected project screenshots…";
  }

  projectCompareToggle.addEventListener("click", () => {
    const expanded = projectCompareToggle.getAttribute("aria-expanded") === "true";
    projectCompareToggle.setAttribute("aria-expanded", String(!expanded));
    projectComparePanel.hidden = expanded;
    if (!expanded) updateProjectComparison();
  });
  document.querySelector(".project-compare-close").addEventListener("click", () => {
    projectComparePanel.hidden = true;
    projectCompareToggle.setAttribute("aria-expanded", "false");
    projectCompareToggle.focus();
  });
  [projectCompareImagePrimary, projectCompareImageSecondary].forEach(image => {
    image.addEventListener("load", () => {
      if (projectCompareImagePrimary.complete && projectCompareImageSecondary.complete
        && projectCompareImagePrimary.naturalWidth && projectCompareImageSecondary.naturalWidth) {
        projectCompareStatus.textContent = "Both portfolio screenshots are ready.";
      }
    });
    image.addEventListener("error", () => {
      projectCompareStatus.textContent = "A screenshot could not be loaded. The regular project preview remains available.";
    });
  });

  function showProjectLivePreview() {
    if (!projectPreviewLink.href) {
      showToast("A verified live project link is not available.");
      return;
    }
    previewImageWrap.hidden = true;
    previewFrame.hidden = false;
    previewLoading.hidden = false;
    previewLoadingSpinner.hidden = false;
    previewLoadingLabel.textContent = "Loading preview…";
    window.clearTimeout(previewLoadingTimer);
    previewFrame.src = projectPreviewLink.href;
    previewLoadingTimer = window.setTimeout(() => {
      if (!previewFrame.hidden && previewFrame.hasAttribute("src")) {
        previewLoadingSpinner.hidden = true;
        previewLoadingLabel.textContent = "Preview may be blocked. Use Visit Live Project below.";
      }
    }, 10000);
    document.querySelectorAll("[data-preview-source]").forEach(button => {
      const selected = button.dataset.previewSource === "live";
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  document.querySelectorAll("[data-preview-source]").forEach(button => {
    button.addEventListener("click", () => {
      if (button.dataset.previewSource === "live") {
        showProjectLivePreview();
      } else {
        window.clearTimeout(previewLoadingTimer);
        previewFrame.removeAttribute("src");
        previewFrame.hidden = true;
        previewLoading.hidden = true;
        previewImageWrap.hidden = false;
        document.querySelectorAll("[data-preview-source]").forEach(sourceButton => {
          const selected = sourceButton.dataset.previewSource === "image";
          sourceButton.classList.toggle("is-selected", selected);
          sourceButton.setAttribute("aria-pressed", String(selected));
        });
      }
    });
  });

  document.querySelectorAll(".device-switch [data-device]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelector(".device-stage").dataset.device = button.dataset.device;
      document.querySelectorAll(".device-switch [data-device]").forEach(deviceButton => {
        deviceButton.setAttribute("aria-pressed", String(deviceButton === button));
      });
    });
  });

  previewFrame.addEventListener("load", () => {
    window.clearTimeout(previewLoadingTimer);
    previewLoadingSpinner.hidden = false;
    previewLoadingLabel.textContent = "Loading preview…";
    previewLoading.hidden = true;
  });

  document.querySelectorAll(".project-card").forEach(card => {
    const liveLink = card.querySelector(".project-link");
    if (!liveLink) return;
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "project-details-trigger";
    trigger.textContent = "Preview Details";
    trigger.setAttribute("aria-label", `Preview ${card.querySelector(".project-copy h3")?.textContent.trim() || "project"} details`);
    trigger.addEventListener("click", () => openProjectPreview(card, trigger));
    liveLink.after(trigger);
  });

  projectPreviewClose.addEventListener("click", () => projectDialog.close());
  document.querySelector(".copy-project-link").addEventListener("click", async () => {
    const link = projectPreviewLink.href;
    if (!/^https:\/\//i.test(link)) {
      showToast("A verified HTTPS project link is not available.");
      return;
    }
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(link);
      else if (!fallbackCopy(link)) throw new Error("Clipboard access is unavailable.");
      showToast("Project link copied.");
    } catch (error) {
      console.warn("Could not copy the project link.", error);
      showToast("Could not copy the project link. Please check browser permissions.");
    }
  });
  document.querySelector(".share-project-link").addEventListener("click", async () => {
    const link = projectPreviewLink.href;
    const title = projectPreviewTitle.textContent.trim();
    const description = projectPreviewDescription.textContent.trim();
    if (!/^https:\/\//i.test(link)) {
      showToast("A verified HTTPS project link is not available.");
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: link });
        showToast("Project shared.");
      } catch (error) {
        if (error.name === "AbortError") {
          showToast("Sharing cancelled.");
          return;
        }
        console.warn("Could not share the project.", error);
        showToast("Could not share the project. Try copying the link instead.");
      }
      return;
    }
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(link);
      else if (!fallbackCopy(link)) throw new Error("Clipboard access is unavailable.");
      showToast("Project link copied; native sharing is not available here.");
    } catch (error) {
      console.warn("Could not copy the project link as a share fallback.", error);
      showToast("Could not share or copy the project link.");
    }
  });
  projectPreviewImage.addEventListener("load", () => {
    document.querySelector(".project-preview-image-wrap").dataset.imageState = "loaded";
    projectGalleryStatus.textContent = "";
    projectFullscreenButton.disabled = false;
  });
  projectPreviewImage.addEventListener("error", () => {
    document.querySelector(".project-preview-image-wrap").dataset.imageState = "error";
    projectGalleryStatus.textContent = "This screenshot could not be loaded. Try another project image or open the project link.";
    projectFullscreenButton.disabled = true;
  });
  projectDialog.addEventListener("click", event => {
    if (event.target === projectDialog) projectDialog.close();
  });
  projectDialog.addEventListener("close", () => {
    if (document.fullscreenElement === previewImageWrap) {
      document.exitFullscreen().catch(error => console.warn("Could not exit project image fullscreen.", error));
    }
    projectPreviewImage.removeAttribute("src");
    window.clearTimeout(previewLoadingTimer);
    previewFrame.removeAttribute("src");
    previewFrame.hidden = true;
    previewLoading.hidden = true;
    previewImageWrap.hidden = false;
    if (projectReturnFocus instanceof HTMLElement) projectReturnFocus.focus();
  });

  const terminalCommands = {
    help: () => "Available commands: help, about, projects, contact, clear.",
    about: () => "Shvan Jamal is a web developer passionate about modern websites and useful digital experiences.",
    projects: () => {
      document.getElementById("projects").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
      window.location.hash = "projects";
      return "Opening the selected projects section.";
    },
    contact: () => {
      document.getElementById("contact").scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
      window.location.hash = "contact";
      return "Opening the contact section.";
    },
  };

  function appendTerminalLine(command, message) {
    const line = document.createElement("p");
    line.className = "terminal-line";
    const prompt = document.createElement("span");
    prompt.className = "terminal-prompt";
    prompt.setAttribute("aria-hidden", "true");
    prompt.textContent = "visitor@shvan:~$";
    const enteredCommand = document.createElement("span");
    enteredCommand.textContent = ` ${command}`;
    const output = document.createElement("span");
    output.className = "terminal-response";
    output.textContent = message;
    line.append(prompt, enteredCommand, output);
    terminalOutput.append(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function runTerminalCommand(rawCommand) {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      terminalOutput.replaceChildren();
      return;
    }
    const action = Object.prototype.hasOwnProperty.call(terminalCommands, command)
      ? terminalCommands[command]
      : null;
    appendTerminalLine(command, action ? action() : "Command not recognized. Type help to see the available commands.");
  }

  terminalForm.addEventListener("submit", event => {
    event.preventDefault();
    runTerminalCommand(terminalInput.value);
    terminalInput.value = "";
  });
  document.querySelectorAll("[data-command]").forEach(button => {
    button.addEventListener("click", () => {
      runTerminalCommand(button.dataset.command);
      terminalInput.value = "";
      terminalInput.focus();
    });
  });

  profilePhoto.addEventListener("error", () => {
    profilePhoto.hidden = true;
    profilePhoto.nextElementSibling.hidden = false;
  });
  document.querySelectorAll(".project-visual img").forEach(image => {
    const visual = image.closest(".project-visual");
    const showFallback = () => {
      visual.dataset.imageState = "error";
      image.alt = "";
    };
    image.addEventListener("load", () => visual.dataset.imageState = "loaded", { once: true });
    image.addEventListener("error", showFallback, { once: true });
    if (image.complete) {
      if (image.naturalWidth) visual.dataset.imageState = "loaded";
      else showFallback();
    } else {
      visual.dataset.imageState = "loading";
    }
  });
  if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
    profilePhoto.dispatchEvent(new Event("error"));
  }

  document.getElementById("current-year").textContent = new Date().getFullYear();

  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    document.documentElement.classList.add("has-reveal");
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
  }

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
      if (!visibleSections.length) return;

      const activeId = visibleSections[0].target.id;
      navigationLinks.forEach(link => {
        if (link.getAttribute("href") === `#${activeId}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.25, 0.5] });

    ["home", "about", "services", "projects", "tech-stack", "contact"].forEach(id => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (finePointer.matches && !reducedMotion.matches) {
    heroVisual.addEventListener("pointermove", event => {
      const bounds = heroVisual.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
      heroVisual.style.setProperty("--pointer-x", Math.max(-1, Math.min(1, x)).toFixed(3));
      heroVisual.style.setProperty("--pointer-y", Math.max(-1, Math.min(1, y)).toFixed(3));
      heroVisual.classList.add("is-tilting");
    }, { passive: true });
    heroVisual.addEventListener("pointerleave", () => {
      heroVisual.style.setProperty("--pointer-x", "0");
      heroVisual.style.setProperty("--pointer-y", "0");
      heroVisual.classList.remove("is-tilting");
    });
  }

  if (finePointer.matches && !reducedMotion.matches) {
    document.addEventListener("pointermove", event => {
      pendingCursorPoint = { x: event.clientX, y: event.clientY };
      if (cursorFrame) return;
      cursorFrame = window.requestAnimationFrame(() => {
        cursorFrame = 0;
        if (!pendingCursorPoint) return;
        cursorGlow.style.transform = `translate3d(${pendingCursorPoint.x}px, ${pendingCursorPoint.y}px, 0)`;
        cursorGlow.classList.add("is-visible");
      });
    }, { passive: true });
    document.addEventListener("pointerleave", () => cursorGlow.classList.remove("is-visible"));
  }
})();
