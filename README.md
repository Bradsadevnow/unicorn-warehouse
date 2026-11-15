# Unicorn Warehouse

A little more comfort, a little more rest. Explore memberships for the things that make your day.

Unicorn Warehouse is a fictional membership company and a work of satire. Its catalog includes bottled mountain air, a full night of sleep, and warehouse shifts you can work to afford either. You can earn Tokens at one company, save them, and spend them at another. Nothing is for sale.

![The pastel Everair Alpine Lodge above the clouds](src/assets/everair-alpine-hq.webp)

- **Everair Lodge Collection** · Four seasonal air blends and Summit Reserve, the lodge's signature unscented oxygen.
- **Token Economy** · Pick up a shift at Goodshift or make a sponsored clip with Brightside. Tokens carry over and never expire.
- **Token Redemption** · Spend 5 Tokens to boost a clip, 60 for a premium Lodge Collection canister, or 500 a day for a full night with Dreamwell Complete.

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Open [the homepage](http://localhost:3000), [the Lodge Collection](http://localhost:3000/aerovitalux/lodge-collection), or [Token Redemption](http://localhost:3000/redemption).

Run `npm run lint` to check the source. To preview a production build, run `npm run build` followed by `npm start`. Next.js downloads the site's fonts from Google Fonts during compilation.

## Project layout

- `src/app` contains the site routes, including Token Economy and Token Redemption.
- `src/content` contains the product catalog and page copy.
- `src/assets` and `public` contain the illustrations and other site artwork.

The site uses Next.js and TypeScript, with GSAP for motion and React Three Fiber for the product scenes.
