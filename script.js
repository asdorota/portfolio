(function () {
  var FILTER_MAP = {
    all:             null,
    app:             ['app'],
    web:             ['web'],
    'design-system': ['design-system']
  };

  var tabs  = document.querySelectorAll('.filter-tab[data-filter]');
  var cards = document.querySelectorAll('.project-card[data-filter]');

  function applyFilter(key) {
    var allowed = FILTER_MAP[key];

    tabs.forEach(function (tab) {
      var active = tab.dataset.filter === key;
      tab.classList.toggle('filter-tab--active',   active);
      tab.classList.toggle('filter-tab--inactive', !active);
    });

    cards.forEach(function (card) {
      var matches = allowed === null || allowed.indexOf(card.dataset.filter) !== -1;
      if (matches) {
        card.classList.remove('project-card--visible');
        card.hidden = false;
        void card.offsetWidth; // force reflow so animation replays
        card.classList.add('project-card--visible');
      } else {
        card.hidden = true;
        card.classList.remove('project-card--visible');
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      applyFilter(tab.dataset.filter);
    });
  });
}());

(function () {
  var cards = document.querySelectorAll('.project-card');

  cards.forEach(function (card) {
    var title = card.querySelector('.project-card__title');
    var body  = card.querySelector('.project-card__body');
    if (title) title.classList.add('card-animate');
    if (body)  body.classList.add('card-animate', 'card-animate--body');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var card  = entry.target;
      var title = card.querySelector('.project-card__title');
      var body  = card.querySelector('.project-card__body');
      if (title) title.classList.add('card-animate--visible');
      if (body)  body.classList.add('card-animate--visible');
      observer.unobserve(card);
    });
  }, { threshold: 0.2 });

  cards.forEach(function (card) {
    observer.observe(card);
  });
}());

(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  var trailer = document.createElement('div');
  trailer.className = 'cursor-trailer';
  document.body.appendChild(trailer);

  var mouseX = -100;
  var mouseY = -100;
  var trailerX = -100;
  var trailerY = -100;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animate() {
    trailerX = lerp(trailerX, mouseX, 0.15);
    trailerY = lerp(trailerY, mouseY, 0.15);
    trailer.style.transform =
      'translate(' + (trailerX - 5) + 'px, ' + (trailerY - 5) + 'px)';
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}());

(function () {
  var title = document.getElementById('ds-solution-title');
  var body  = document.getElementById('ds-solution-body');
  var img3  = document.getElementById('ds-img-3');
  if (!title || !body || !img3) return;

  var defaultTitle = 'Use of components';
  var defaultBody  = 'Together with iOS and Android engineers, we have established a base system of UI components, using the atomic principles and adapting them where necessary.';
  var altTitle     = 'Variations';
  var altBody      = 'Noticing few repeating patterns in a financial app environment, we’ve developed a few more complex components. These spanned across multiple user journeys.';

  var observer = new IntersectionObserver(function (entries) {
    var isVisible = entries[0].isIntersecting;
    title.textContent = isVisible ? altTitle : defaultTitle;
    body.textContent  = isVisible ? altBody  : defaultBody;
  }, { threshold: 0.5 });

  observer.observe(img3);
}());

(function () {
  var meta = document.querySelector('meta[name="theme-color"]');
  var hero = document.querySelector('.section--hero');
  if (!meta || !hero) return;

  var observer = new IntersectionObserver(function (entries) {
    meta.content = entries[0].isIntersecting ? '#fffb91' : '#ffffff';
  }, { threshold: 0 });

  observer.observe(hero);
}());

(function () {
  var csSelectors = [
    '.cs-intro__columns',
    '.cs-card',
    '.cs-solution-intro',
    '.cs-solution__right',
    '.cs-centered-section',
    '.cs-full-section',
    '.cs-related__card'
  ].join(', ');

  var sections = document.querySelectorAll(csSelectors);
  if (!sections.length) return;

  sections.forEach(function (el) {
    el.classList.add('card-animate');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('card-animate--visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  sections.forEach(function (el) {
    observer.observe(el);
  });
}());

(function () {
  var overlayHTML =
    '<div class="about-overlay" id="aboutOverlay" role="dialog" aria-label="About Dorota Bojarovic">' +
    '<div class="about-overlay__header">' +
    '<p class="text-h3 header__logo">Dorota Bojarovic</p>' +
    '<p class="text-h3">About</p>' +
    '</div>' +
    '<div class="about-overlay__inner">' +
    '<div class="about-overlay__left">' +
    '<h2 class="about-overlay__heading">I’m Dorota — Product Designer with 3+ years experience working across product, UX/UI, and branding</h2>' +
    '<div class="about-overlay__body">' +
    '<p>I’ve spent the last few years designing and shipping products in a small, fast-moving fintech team.</p>' +
    '<p>Previous career ventures include editorial design at a rug magazine and architectural design for a small residential architecture firm. I enjoy learning new design skills and have done it all — 3D modelling, motion, branding, packaging, editorial, but I’m most passionate about solving real life problems for every day user with simple but effective design solutions.</p>' +
    '</div>' +
    '<a class="button-link about-overlay__cv" href="assets/dorota-bojarovic-cv.pdf">' +
    '<span class="text-button">Download my CV</span>' +
    '<span class="icon icon--chevron-right" aria-hidden="true">' +
    '<img src="images/chevron-right.svg" alt="" width="24" height="24" />' +
    '</span>' +
    '</a>' +
    '</div>' +
    '<div class="about-overlay__right">' +
    '<div class="about-overlay__entry">' +
    '<span>2024–now</span>' +
    '<span>FREELANCE, MOONPIE STUDIO</span>' +
    '<span>Branding</span>' +
    '</div>' +
    '<div class="about-overlay__entry">' +
    '<span>2021–2024</span>' +
    '<span>PRODUCT DESIGNER, ELFIN MARKET</span>' +
    '<span>UI/UX Design, Product Management</span>' +
    '</div>' +
    '<div class="about-overlay__entry">' +
    '<span>2019–2021</span>' +
    '<span>GRAPHIC DESIGNER, HALI PUBLICATIONS</span>' +
    '<span>Editorial and books, UI/UX Design</span>' +
    '</div>' +
    '<div class="about-overlay__entry">' +
    '<span>2016–2018</span>' +
    '<span>ARCHITECTURAL ASSISTANT, ALU</span>' +
    '<span>Visualisations, 3D modelling, Presentations</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', overlayHTML);

  var overlay = document.getElementById('aboutOverlay');
  var trigger = document.querySelector('.header__right .text-h3');
  var closeCursor = document.getElementById('closeCursor');
  var cursorTrailer = document.querySelector('.cursor-trailer');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var savedThemeColor = '';

  function onCloseCursorMove(e) {
    if (closeCursor) {
      closeCursor.style.transform = 'translate(' + (e.clientX - 36) + 'px, ' + (e.clientY - 11.5) + 'px)';
      var under = document.elementFromPoint(e.clientX, e.clientY);
      closeCursor.style.opacity = (under && under.closest('.about-overlay__cv')) ? '0' : '1';
    }
  }

  function openOverlay() {
    overlay.classList.add('about-overlay--open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (closeCursor) {
      closeCursor.classList.add('close-cursor--visible');
      document.addEventListener('mousemove', onCloseCursorMove);
    }
    if (cursorTrailer) cursorTrailer.style.opacity = '0';
    if (themeMeta) { savedThemeColor = themeMeta.content; themeMeta.content = '#fffb91'; }
    if (trigger) {
      trigger.textContent = '×';
      trigger.removeEventListener('click', openOverlay);
      trigger.addEventListener('click', closeOverlay);
    }
  }

  function closeOverlay() {
    overlay.classList.remove('about-overlay--open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    if (closeCursor) {
      closeCursor.classList.remove('close-cursor--visible');
      document.removeEventListener('mousemove', onCloseCursorMove);
    }
    if (cursorTrailer) cursorTrailer.style.opacity = '';
    if (themeMeta && savedThemeColor) themeMeta.content = savedThemeColor;
    if (trigger) {
      trigger.textContent = 'About';
      trigger.removeEventListener('click', closeOverlay);
      trigger.addEventListener('click', openOverlay);
    }
  }

  if (trigger) {
    trigger.addEventListener('click', openOverlay);
  }

  overlay.addEventListener('click', function (e) {
    if (!e.target.closest('.about-overlay__cv')) {
      closeOverlay();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeOverlay(); }
  });
}());
