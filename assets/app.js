(() => {
  const frame = document.getElementById('viewFrame');
  const openBtn = document.getElementById('openStandalone');
  const tabs = Array.from(document.querySelectorAll('.tab'));

  const routes = {
    'value-chain': 'views/value-chain.html',
    'customer-journey': 'views/customer-journey.html',
  };

  function currentRoute() {
    const h = (location.hash || '').replace(/^#\/?/, '');
    const key = h.split('?')[0].trim();
    return routes[key] ? key : 'value-chain';
  }

  function setActiveTab(routeKey) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.view === routeKey));
  }

  function navigate() {
    const routeKey = currentRoute();
    setActiveTab(routeKey);

    // Always load from the same repo folder.
    // Both embedded views read the same data file at: ../data/data.json
    // To keep paths working, we append a query param that can be used later for cache busting.
    const src = routes[routeKey];
    frame.src = `${src}?v=${Date.now()}`;
  }

  openBtn.addEventListener('click', () => {
    const routeKey = currentRoute();
    const url = routes[routeKey];
    window.open(url, '_blank', 'noopener');
  });

  window.addEventListener('hashchange', navigate);

  // Default route
  if (!location.hash) location.hash = '#/value-chain';
  navigate();
})();
