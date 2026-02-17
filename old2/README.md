# Value Chain + Customer Journey (single app shell)

This repo is a **lightweight v0.9 consolidation** of your two existing HTML apps:

- `views/value-chain.html` (your fixed `index.html`)
- `views/customer-journey.html` (`cj.html`)

Both views read the **same dataset**:

- `data/data.json`

## How it works (v0.9)

- `index.html` is a shell with tabs.
- The shell loads each view in an `<iframe>`.
- The only change made to the embedded views is updating the dataset path from `data.json` → `../data/data.json`.

## Run locally

From the repo folder:

```bash
python -m http.server 8000
```

Then open:

- `http://localhost:8000/`

## Deploy (GitHub Pages)

- Enable Pages for the repo.
- Use the root as the Pages source.

## Next step (v1.0 refactor)

If you want this to be a *true* single app (no iframes) with shared state:

1. Extract a shared **data loader** + **store** (`dataStore.js`).
2. Convert each view to a module that renders into a container (`renderValueChain(root, store)` and `renderCustomerJourney(root, store)`).
3. Add a simple router (`#/value-chain`, `#/customer-journey`).
4. Optional: implement cross-view selection sync (e.g., choose L1/L2 in one view and highlight the same in the other).

