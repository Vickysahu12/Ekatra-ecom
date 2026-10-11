# Ekatra storefront

Landing page for the Ekatra denim store. Vite + React 19 + Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Structure

```
src/
  app/            App shell (App.jsx) and Providers.jsx (cart, wishlist, toast, quick view, search)
  config/site.js  Brand name, nav, announcements, footer links, currency
  data/           Placeholder content: products, page copy, media + cut-out manifests
  services/       Data access (catalog, search, newsletter). Components only call these
  features/       Stateful features: cart, wishlist, quick view, search, toast, product card, lightbox
  sections/       One file per landing-page section, in page order
  components/
    layout/       Header, mobile menu, mobile tab bar, announcement bar, newsletter, footer
    ui/           Primitives: Img, Button, Icon, SectionHeading, SideDrawer
  hooks/          useReveal, useAsync, useOverlay (Esc + scroll lock + focus), useMediaQuery
  lib/            Price formatting, discount, class-name helper
  styles/         Tailwind entry + design tokens
public/media/looks/     Photos, look-01.webp ... look-40.webp (+ -sm variants)
public/media/cutouts/   Background-removed models for the hero slider, fit finder, club card
```

Page order: announcement bar, header, hero slider, category circles, trending now (filter chips),
promo pair, fit finder, dress for the day, #ekatragirls lookbook (40 photos), reviews, perks,
club signup, footer. On phones a floating tab bar gives Home, Shop, Search, Wishlist and Bag.

## Connecting a backend

`src/services/catalog.js` and `src/services/newsletter.js` currently read local data.
Replace their bodies with API calls and keep the return shapes the same
(see `src/data/products.js` for the product shape). The cart stores only
`{ productId, size, qty }` and looks up prices from the catalogue, so it
never trusts prices from the browser.

## Swapping in the client's photos

The 40 current photos are **temporary placeholders from Unsplash** (free licence).
Some show third-party graphics on clothing. Replace all of them before launch:

1. Export each photo as WebP at 1200px wide (`look-NN.webp`) and 640px wide (`look-NN-sm.webp`).
2. Drop them into `public/media/looks/`, keeping the same names.
3. Update `w`, `h` and `tone` (average colour, used while loading) in `src/data/media.js`.
4. Adjust which photo goes where in `src/data/content.js` and `src/data/products.js`.

## Design rules

- Audience: women's denim. Soft, premium, app-like on phones.
- Colours, font, radii, shadows and easing live only in `src/styles/index.css` (`@theme`).
- Type: Plus Jakarta Sans throughout. Lowercase heavy wordmark.
- Colour: soft white base, pastel tints (blush, powder, lilac) for panels, soft black for buttons,
  rose as the single accent (hearts, sale, badges).
- Shape: cards 24px (`rounded-card`), images 18px (`rounded-media`), buttons / chips / inputs are pills.
- Motion: hero autoplay with progress, sliding chip indicators, heart pop, badge bump, quick-view
  sheet, drawers, toast, fade-up on scroll. All of it respects `prefers-reduced-motion`.

## Cut-outs (hero, fit finder, club card)

These are generated from the studio photos with background removal (rembg, isnet model),
then cropped tight and saved as transparent WebP. Redo them from the client's own studio
shots; plain backgrounds give the cleanest edges. Update sizes in `src/data/cutouts.js`.
