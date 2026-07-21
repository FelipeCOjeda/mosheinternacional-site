(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  const setHeaderState = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.classList.toggle('is-open', !open);
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.classList.remove('is-open');
      nav.classList.remove('is-open');
    }));
  }

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const form = document.querySelector('[data-lead-form]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      const data = new FormData(form);
      const required = ['nome', 'email', 'telefone'];
      const missing = required.some((field) => !String(data.get(field) || '').trim());

      if (missing) {
        if (status) status.textContent = 'Preencha os campos obrigatórios para continuar.';
        return;
      }

      const message = [
        'Olá, Moshe! Quero receber um contato sobre internacionalização.',
        '',
        `Nome: ${data.get('nome')}`,
        `E-mail: ${data.get('email')}`,
        `Telefone: ${data.get('telefone')}`,
        `Interesse: ${data.get('interesse') || 'Não informado'}`
      ].join('\n');

      const url = `https://t.me/ojedabot?text=${encodeURIComponent(message)}`;
      if (status) status.textContent = 'Abrindo o Telegram com sua solicitação…';
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
})();
