(() => {
  const requested = new URLSearchParams(window.location.search).get('lang');
  const normalize = value => {
    const tag = (value || '').toLowerCase();
    if (/^zh-(hant|tw|hk|mo)(-|$)/.test(tag)) return 'zh-Hant';
    if (tag === 'zh' || /^zh-(hans|cn|sg)(-|$)/.test(tag)) return 'zh-Hans';
    return 'en';
  };
  const lang = normalize(requested === null ? navigator.language : requested);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-lang]').forEach(section => { section.hidden = section.dataset.lang !== lang; });
  const heading = document.querySelector('[data-lang="' + lang + '"] h1');
  if (heading) document.title = document.body.dataset.product + ' · ' + heading.textContent;
  document.querySelectorAll('[data-policy]').forEach(link => {
    const url = new URL(link.getAttribute('href'), location.href);
    url.searchParams.set('lang', lang);
    link.href = url.href;
  });
  document.querySelectorAll('[data-switch]').forEach(link => {
    const url = new URL(location.href);
    url.searchParams.set('lang', link.dataset.switch);
    link.href = url.href;
    link.setAttribute('aria-current', String(link.dataset.switch === lang));
  });
})();
