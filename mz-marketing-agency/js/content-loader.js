/* =========================================================
   MZ MARKETING AGENCY — CONTENT LOADER
   Fetches the JSON files the Admin Panel edits and applies
   them to whichever page is currently loaded. If a fetch
   fails (offline, first deploy, etc.) the page simply keeps
   showing the text/images already written into the HTML, so
   nothing ever breaks.
   ========================================================= */
(function () {
  "use strict";

  var ICONS = {
    website: '<rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="4" x2="8" y2="9"/>',
    medical: '<path d="M19 14c1.5-2 2-4.5 1-7-1-2.3-3.5-4-6.5-4-4 0-7 3-7 7 0 5 6 10 6 10s2.1-1.8 3.7-4"/><circle cx="12" cy="10" r="2"/>',
    legal: '<path d="M12 3l8 4v2H4V7zM4 21h16M6 10v8M10 10v8M14 10v8M18 10v8"/>',
    solar: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.2" y1="4.2" x2="5.6" y2="5.6"/><line x1="18.4" y1="18.4" x2="19.8" y2="19.8"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.2" y1="19.8" x2="5.6" y2="18.4"/><line x1="18.4" y1="5.6" x2="19.8" y2="4.2"/>',
    portfolio: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    landing: '<path d="M13 2 3 14h7l-1 8 10-12h-7z"/>',
    static: '<path d="M4 4h16v16H4z"/><path d="M4 9h16"/>',
    responsive: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="18" x2="19" y2="18"/>',
    speed: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    seo: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    form: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    whatsapp: '<path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.36A10 10 0 1 0 12 2z"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.7 13.5 7 22l5-3 5 3-1.7-8.5"/>',
    generic: '<circle cx="12" cy="12" r="9"/>'
  };

  function iconSvg(key, orange) {
    var d = ICONS[key] || ICONS.generic;
    return '<div class="icon-tile' + (orange ? ' orange' : '') + '"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + d + '</svg></div>';
  }

  function locationSvg() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
  }

  function externalSvg() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
  }

  function fetchJSON(path) {
    return fetch(path, { cache: "no-cache" })
      .then(function (res) { if (!res.ok) throw new Error(path + " " + res.status); return res.json(); })
      .catch(function (err) { console.warn("Content Loader: could not load", path, err); return null; });
  }

  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return (o && o[k] !== undefined) ? o[k] : undefined; }, obj);
  }

  function applyTheme(themeData) {
    var theme = (themeData && themeData.active_theme) || "midnight-blue";
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("mz-theme", theme); } catch (e) {}
  }

  function applyTextAndImages(site) {
    if (!site) return;
    document.querySelectorAll("[data-cms]").forEach(function (el) {
      var value = get(site, el.getAttribute("data-cms"));
      if (value !== undefined && value !== null && value !== "") {
        el.textContent = value;
      }
    });
    document.querySelectorAll("[data-cms-img]").forEach(function (el) {
      var value = get(site, el.getAttribute("data-cms-img"));
      if (value) el.setAttribute("src", value);
    });
    document.querySelectorAll("[data-cms-href]").forEach(function (el) {
      var key = el.getAttribute("data-cms-href");
      var value;
      if (key === "whatsapp_link") {
        var num = get(site, "contact.whatsapp_number");
        value = num ? "https://wa.me/" + num : undefined;
      } else if (key === "tel_link") {
        var telNum = get(site, "contact.whatsapp_number");
        value = telNum ? "tel:+" + telNum : undefined;
      } else if (key === "mailto") {
        var email = get(site, "contact.email");
        value = email ? "mailto:" + email : undefined;
      } else {
        value = get(site, key);
      }
      if (value) el.setAttribute("href", value);
    });
  }

  function renderServices(services) {
    var grid = document.getElementById("services-grid");
    if (!grid || !services || !services.length) return;
    grid.innerHTML = services.map(function (s) {
      return '' +
        '<div class="card">' +
          iconSvg(s.icon, false) +
          '<h3>' + escapeHtml(s.title) + '</h3>' +
          '<p>' + escapeHtml(s.description) + '</p>' +
          (s.price ? '<span class="service-price">' + escapeHtml(s.price) + '</span>' : '') +
        '</div>';
    }).join("");
  }

  function renderAwards(awards) {
    var section = document.getElementById("awards-section");
    var grid = document.getElementById("awards-grid");
    if (!section || !grid) return;
    if (!awards || !awards.length) {
      section.style.display = "none";
      return;
    }
    section.style.display = "";
    grid.innerHTML = awards.map(function (a) {
      return '' +
        '<div class="card">' +
          iconSvg("award", true) +
          '<h3>' + escapeHtml(a.title) + (a.year ? ' <span class="award-year">' + escapeHtml(String(a.year)) + '</span>' : '') + '</h3>' +
          '<p>' + escapeHtml(a.description || "") + '</p>' +
        '</div>';
    }).join("");
  }

  function projCard(p) {
    return '' +
      '<div class="proj-card">' +
        '<div class="proj-img"><img src="' + escapeAttr(p.image) + '" alt="' + escapeAttr(p.title) + ' website preview" loading="lazy" width="800" height="500"></div>' +
        '<div class="proj-body">' +
          '<span class="proj-cat">' + escapeHtml(p.category) + '</span>' +
          '<h3>' + escapeHtml(p.title) + '</h3>' +
          '<span class="proj-location">' + locationSvg() + ' ' + escapeHtml(p.location) + '</span>' +
          '<p>' + escapeHtml(p.description) + '</p>' +
          '<a href="' + escapeAttr(p.link) + '" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Live Preview ' + externalSvg() + '</a>' +
        '</div>' +
      '</div>';
  }

  function renderPortfolio(portfolio) {
    if (!portfolio || !portfolio.length) return;

    var fullGrid = document.getElementById("portfolio-grid");
    if (fullGrid) {
      fullGrid.innerHTML = portfolio.map(projCard).join("") + fullGrid.getAttribute("data-extra-card-html-store");
    }

    var featuredGrid = document.getElementById("featured-work-grid");
    if (featuredGrid) {
      var featured = portfolio.filter(function (p) { return p.featured; });
      if (!featured.length) featured = portfolio.slice(0, 3);
      featuredGrid.innerHTML = featured.slice(0, 3).map(projCard).join("");
    }
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function escapeAttr(str) { return escapeHtml(str); }

  function init() {
    // Preserve the hand-written "Your Next Project" CTA card at the end of the
    // full portfolio grid (if present) so it survives the JSON re-render.
    var fullGrid = document.getElementById("portfolio-grid");
    if (fullGrid) {
      var extra = fullGrid.querySelector(".proj-card[data-static-card]");
      fullGrid.setAttribute("data-extra-card-html-store", extra ? extra.outerHTML : "");
    }

    Promise.all([
      fetchJSON("content/theme.json"),
      fetchJSON("content/site.json"),
      fetchJSON("content/services.json"),
      fetchJSON("content/awards.json"),
      fetchJSON("content/portfolio.json")
    ]).then(function (results) {
      var theme = results[0], site = results[1];
      var services = results[2] && results[2].services;
      var awards = results[3] && results[3].awards;
      var portfolio = results[4] && results[4].projects;
      applyTheme(theme);
      applyTextAndImages(site);
      renderServices(services);
      renderAwards(awards);
      renderPortfolio(portfolio);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
