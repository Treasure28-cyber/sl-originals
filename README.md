# SL ORIGINALS

Next.js 14 App Router, Tailwind CSS, Zustand cart, Sanity catalogue and server-side Paystack checkout.

Run `npm install` then `npm run dev`. Production: `npm run build` then `npm start`.

Copy `.env.example` to `.env.local` and configure your Sanity project and Paystack secret. The secret stays on the server. Import `sanity/product.ts` into your Sanity Studio schema types; publish products with both images, unique slugs, NGN prices, valid sizes and colour hex values. Without a project ID the site uses the clearly marked preview catalogue in `lib/data.ts`.

Checkout intentionally remains unavailable until `CHECKOUT_ENABLED=true`, Sanity and Paystack are configured. Confirm delivery pricing/policies before enabling. The server calculates totals from the CMS, validates variants and quantities and verifies Paystack payment status. Payment metadata contains order lines and delivery details. Production fulfilment still needs durable order records and an authenticated, idempotent Paystack webhook; do not use the browser return page as a fulfilment trigger.

## Client content

Search `TODO:` for replacement points. Sample product names, prices, descriptions, sizing, contact details, brand story and policies require approval. Finished image placeholders are editable SVGs under `public/products`, using #1C1C1C backgrounds and #E8FF00 item labels. Mockups are selected from the supplied local assets. The original DRIPHAUS prototype was not provided as an accessible link, so exact visual parity is unverified. Videos have not been used as product photos.

Contact/custom forms prepare copyable messages locally; they do not submit to a remote inbox until real contact details or a submission service is configured. Client checklist: `CLIENT-CHECKLIST.txt`.

## Front and back product views

Rareform 99, Utility Cargo and Members Only Rugby now use verified separate front/back images. Tracksuit and rugby views were cropped from the supplied combined sheets; the cargo images use the matching supplied front/back files. Original images remain intact. Product cards show fronts initially and backs on mouse hover or keyboard focus. The view button supports touch screens, and product pages provide explicit front/back tabs. Other products retain their single verified view. Sanity fields `front` and `back` support future paired photography.

## Complete local catalogue and category navigation

The preview catalogue now contains 21 pieces. The complete 60-file folder at `public/SL_Originals_images` is represented in `/lookbook`, with optimized thumbnails and full-resolution originals. Duplicates, campaigns and brand graphics remain available in this archive; distinct clothing designs appear in the shop and related original images appear in product galleries.

Shop filters use `/shop?category=Tees` (and equivalent categories), with `sort=low` or `sort=high`. They work through normal URL navigation even without client JavaScript. The sort form also has an explicit Apply action. Category and sort logic is in `lib/catalogue.ts`. Prices and new product names still require client approval. Run `node scripts/check-local-store.cjs` against the running local server to check routes and page bundles.

## White catalogue backgrounds

Product card canvases are pure white. Background-cleaned assets and masks live in `public/products/white`; originals remain untouched. Overrides are in `lib/shop-image-overrides.json`. Most cleaned products display the original pixels using a separate SVG background matte; four snapback views use inspected transparent cutouts for cleaner edges. Product and archive metadata now map by filenames instead of filesystem sort positions.

Image editing used the built-in ImageGen tool. Prompt: remove only the background outside the supplied garment or cap, preserve all physical items, silhouettes, fabrics, colours, proportions, printed artwork and typography, and return a transparent cutout without added shadows or text. The masks were reviewed on white.
