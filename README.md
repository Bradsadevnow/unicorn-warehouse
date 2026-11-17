# Unicorn Warehouse

A little more comfort, a little more rest. Explore memberships for the things that make your day.

Unicorn Warehouse is a fictional membership company and a work of satire. Its catalog includes bottled mountain air, a full night of sleep, and warehouse shifts you can work to afford either. You can earn Tokens at one company, save them, and spend them at another. Nothing is for sale.

![The pastel Everair Alpine Lodge above the clouds](src/assets/everair-alpine-hq.webp)

## This branch is the teaser site

`teaser` is the public, in-universe website for Unicornopolis while the game is in development. It's the company's own site: every business, its careers, its Terms, and its Token economy. Member enrollment is shown as opening soon.

The game lives elsewhere. It's being built in Unity. The `main` branch keeps the web prototype of the game: onboarding, the day loop, survival stats, the 3D town map, walkable interiors, quests, member sign-in, and the Support unicorn. This branch removes all of it:

- No member sign-in, accounts, saves, or Member Records PDFs. `/welcome` is an "Enrollment opens soon" page, and `/` opens the homepage.
- No Support chat, so the site makes no language-model calls and needs no API keys or secrets.
- No 3D town map, interiors, or quests. The homepage's "The good stuff" is the grouped business directory again. The small 3D product objects on each business page stay; they've been part of the site from the start.

Nearly every page prerenders as static HTML.

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Run `npm run lint` to check the source. To preview a production build, run `npm run build` followed by `npm start`. Next.js downloads the site's fonts from Google Fonts during compilation.

## Deploy

The site is a standard Next.js app with no environment variables. On Vercel, import the GitHub repository, set the production branch to `teaser`, and keep the default build settings (`npm run build`). Any host that runs Next.js works the same way.

## Project layout

- `src/app` contains the site routes: every business page, careers and career tracks, the two job boards, governance, Terms, Product Details, and the Token Economy.
- `src/content` contains the product catalog and page copy.
- `src/components` contains the shared page chrome, the homepage, and the 3D product objects (`components/house`).
- `src/assets` and `public` contain the illustrations and other site artwork.

The site uses Next.js and TypeScript, with GSAP for motion and React Three Fiber for the product objects.

## Further reading

- [ECONOMY.md](ECONOMY.md) · Wage anchors, household scenarios, and pricing rules.
- [BUSINESS-ROADMAP.md](BUSINESS-ROADMAP.md) · The checklist for each business.
- [HANDOFF.md](HANDOFF.md) and [ROADMAP.md](ROADMAP.md) describe the game prototype on `main`. Much of what they cover is not on this branch.
