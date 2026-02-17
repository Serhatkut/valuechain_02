(() => {
  const frame = document.getElementById('viewFrame');
  const openBtn = document.getElementById('openStandalone');
  const tabs = Array.from(document.querySelectorAll('.tab'));

  const routes = {
    'value-chain': 'views/value-chain.html',
    'customer-journey': 'views/customer-journey.html',
  };

  function parseHash() {
    const h = (location.hash || '').replace(/^#\/?/, '');
    const [rawKey, rawQuery] = h.split('?');
    const key = (rawKey || '').trim();
    return {
      key: routes[key] ? key : 'value-chain',
      query: (rawQuery || '').trim(),
    };
  }

  function setActiveTab(routeKey) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.view === routeKey));
  }

  function navigate() {
    const { key: routeKey, query } = parseHash();
    setActiveTab(routeKey);

    // Always load from the same repo folder.
    // Both embedded views read the same data file at: ../data/data.json
    // To keep paths working, we append a query param that can be used later for cache busting.
    const src = routes[routeKey];
    const q = query ? `&${query}` : '';
    frame.src = `${src}?v=${Date.now()}${q}`;
  }

  openBtn.addEventListener('click', () => {
    const { key: routeKey, query } = parseHash();
    const url = routes[routeKey];
    const q = query ? `?${query}` : '';
    window.open(`${url}${q}`, '_blank', 'noopener');
  });

  window.addEventListener('hashchange', navigate);

  // Default route
  if (!location.hash) location.hash = '#/value-chain';
  navigate();

  // Bridge: customer-journey view can request opening the Value Chain and focusing an ID.
  window.addEventListener('message', (ev) => {
    const msg = ev?.data;
    if (!msg || typeof msg !== 'object') return;
    if (msg.type === 'VC_NAVIGATE' && msg.id) {
      const id = encodeURIComponent(String(msg.id));
      location.hash = `#/value-chain?focus=${id}`;
    }
  });
})();
