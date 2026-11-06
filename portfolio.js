(() => {
  const menuButton = document.querySelector("#menubtn");
  const navigation = document.querySelector("#navlinks");
  const themeButton = document.querySelector("#theme");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll(".project[data-type]");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    navigation?.classList.toggle("is-open", !isOpen);
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((filterButton) => {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("active", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
      });

      projects.forEach((project) => {
        const categories = (project.dataset.type || "").split(/\s+/);
        project.hidden = selectedFilter !== "all" && !categories.includes(selectedFilter);
      });
    });
  });

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    if (!themeButton) return;
    const isLight = theme === "light";
    themeButton.textContent = isLight ? "\u263e" : "\u263c";
    themeButton.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    themeButton.setAttribute("aria-pressed", String(isLight));
  };

  try {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") applyTheme(savedTheme);
  } catch {
    // Theme switching still works for this visit if browser storage is unavailable.
  }

  themeButton?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // Keep the selected theme for this page view when storage is unavailable.
    }
  });
})();
