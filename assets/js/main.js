/* ==========================================================================
   Despensa System — comportamiento
   ========================================================================== */

(function () {
  // Menú mobile
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    const close = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    };
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        close();
        toggle.focus();
      }
    });
  }

  // Año actual en el footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Pestañas del mockup del panel (sin JS se ven las tres pantallas una debajo de otra)
  const tablist = document.querySelector('[role="tablist"]');
  if (tablist) {
    const tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    const sideItems = document.querySelectorAll(".side-item[data-side]");

    const select = function (tab, focus) {
      tabs.forEach(function (t) {
        const selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
      });
      const key = tab.id.replace("tab-", "");
      sideItems.forEach(function (item) {
        item.classList.toggle("active", item.getAttribute("data-side") === key);
      });
      if (focus) tab.focus();
    };

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        let next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") next = tabs[0];
        else if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          select(next, true);
        }
      });
    });

    select(tabs[0], false);
  }

  // Validación del formulario de contacto
  const form = document.querySelector("form.form");
  if (form) {
    const messages = {
      nombre: "Contanos cómo te llamás.",
      comercio: "Contanos el nombre de tu comercio.",
      contacto: "Dejanos un email o un WhatsApp válido para responderte."
    };

    const looksLikeContact = function (value) {
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const digits = value.replace(/[^\d]/g, "");
      return email.test(value) || (/^[\d\s()+-]+$/.test(value) && digits.length >= 8);
    };

    const check = function (input) {
      const value = input.value.trim();
      let ok = value.length > 0;
      if (ok && input.name === "contacto") ok = looksLikeContact(value);
      const error = document.getElementById("e-" + input.name);
      input.setAttribute("aria-invalid", String(!ok));
      if (error) error.textContent = ok ? "" : messages[input.name];
      return ok;
    };

    const fields = Array.prototype.slice.call(form.querySelectorAll("input[required]"));
    fields.forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value.trim() !== "" || input.hasAttribute("aria-invalid")) check(input);
      });
    });

    form.addEventListener("submit", function (e) {
      const invalid = fields.filter(function (input) { return !check(input); });
      if (invalid.length) {
        e.preventDefault();
        invalid[0].focus();
      }
    });
  }
})();
