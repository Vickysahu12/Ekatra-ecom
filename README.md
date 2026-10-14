# Ekatra storefront (demo)

Frontend for Ekatra, a handwoven saree and suit-set brand. Vite + React 19 + Tailwind CSS v4 + React Router 7.
Everything works end to end in the browser: browse, filter, product page, bag, coupons, checkout, order confirmation and order history.
There is no backend yet; data lives in `src/data` and orders / cart / wishlist are saved in localStorage.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero slider, occasions, curated collections, artisan story, promos, complete-the-look, styling guide, offers, testimonials |
| `/shop`, `/shop/sarees`, `/shop/suit-sets` | Listing with filters (fabric, occasion, colour, price, sale), sort, search (`?q=`), load more. Filters live in the URL |
| `/product/:slug` | Gallery with zoom, colour siblings, blouse / size options, add to bag, buy now, pincode check, details, reviews, related |
| `/cart` | Bag with quantity, move to wishlist, undo remove, coupons, price breakdown |
| `/checkout` | Address (validated, pincode autofill) then payment (UPI, card, net banking, COD) |
| `/order/:id` | Confirmation |
| `/wishlist`, `/account` | Saved pieces, order history with tracking |
| `/about`, `/help` | Brand story, FAQs and contact |

Demo coupons: `FESTIVE10`, `WELCOME15` (min ₹2,999), `FLAT500` (min ₹3,999).

## Structure

```
src/
  app/            Router, root layout, providers
  pages/          One file per route
  sections/home/  Home page sections, in page order
  features/       cart, checkout, product, shop (filters), search, wishlist, toast
  components/     layout (header, footer, menu) and ui primitives (Button, Img, Icon, Modal, SideDrawer, Accordion...)
  services/       catalog.js, orders.js, newsletter.js. Swap these for API calls when the backend exists
  data/           products.js (41 products), content.js (page copy), media.js (image placeholders)
  config/site.js  Brand name, nav, announcements, coupons, fees, footer
  styles/         Tailwind entry + design tokens
public/media/products/  p01-1.webp ... p41-2.webp (1000px) + -sm (480px), all 4:5
src/assets/image/       Original client photos (not bundled)
```

## Adding or changing products

1. Export two photos per product as 4:5 WebP into `public/media/products` (`pNN-1.webp` front, `pNN-2.webp` back / detail, plus `-sm` versions).
2. Add an entry to `src/data/products.js` and its placeholder colour in `src/data/media.js`.
3. Products with the same `family` show as colour options of each other.

## Design rules

- Colours, fonts, radius, shadows and easing live only in `src/styles/index.css` (`@theme`).
- Palette: ivory base, maroon brand colour, antique gold accents. Cormorant Garamond for display, Jost for everything else.
- One 4px radius (`rounded-soft`), uppercase tracked labels for buttons and nav, the gold diamond ornament under section titles.
- Motion is small and purposeful (hover photo swap, heart pop, bag bump, button states, drawers, accordions, toasts) and respects `prefers-reduced-motion`.
