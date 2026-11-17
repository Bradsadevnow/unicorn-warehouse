# Unicorn Warehouse

A little more comfort, a little more rest. Explore memberships for the things that make your day.

Unicorn Warehouse is a fictional membership company and a work of satire. Its catalog includes bottled mountain air, a full night of sleep, and warehouse shifts you can work to afford either. You can earn Tokens at one company, save them, and spend them at another. Nothing is for sale.

It is also a game. You sign on in Unicornopolis, the company town, take an entry-level job, move into a starter home, and try to stay breathing, fed, rested, comfortable, and engaged on an entry-level wage.

![The pastel Everair Alpine Lodge above the clouds](src/assets/everair-alpine-hq.webp)

- **Everair Lodge Collection** · Four seasonal air blends and Summit Reserve, the lodge's signature unscented oxygen.
- **Token Economy** · Pick up a shift at Goodshift or make a sponsored clip with Brightside. Tokens carry over and never expire.
- **Token Redemption** · Spend 5 Tokens to commission a clip, 60 for a premium Lodge Collection canister, or 20 a day for a full night with Dreamwell Complete.

## Playing

Open [member sign-in](http://localhost:3000), enter a name, and allow the account connection. Then choose:

1. **A career track and an entry job.** Pay follows the position. Horn ranks are recognition and pay nothing.
2. **A starter home.** The Employee Bunkhouse, The Fryer Loft above Horn & Fries, or The Potting Shed behind The Garden Residence. Rent bills weekly. The home is your address on the town map and for deliveries.
3. **Your wellbeing memberships.** Everair AirLink Premium and Softspace Daily Balance are included for your first 14 days and then renew.

From there, **My account** is where you play a day: meet your manager, collect your Pathway Kit, work your shift, take extra shifts, shop at Market, eat at Horn & Fries or at home, nap, attend Fun Hours, pay rent, and finish the day. Every action takes time on the game clock, and the **Calendar** tab shows everything already scheduled, including bills you can't yet cover.

The **My day** panel in the corner of every page shows your stats, today's schedule, your home, your wallet, and the Support unicorn.

### Stats and consequences

Five stats run continuously on the game clock: **Oxygen**, **Satiety**, **Energy**, **Comfort**, and **Morale**. Work drains them. Meals, sleep, your home, your memberships, and Fun Hours restore them. Low stats bring conditions such as Sleep Deprived or Malnourished, and they lower the productivity score Goodshift takes when you clock in. Reduced scores bring coaching sessions on your own time, and clients don't accept extra-shift work below 40. Running out of satiety or oxygen brings a billed intervention rather than the end of the run.

Starting wages are set so a member who works every shift, eats, and keeps both memberships clears only a few Tokens a day. Renewal weeks leave bills outstanding unless you take on extra work. If an AirLink renewal fails, Everair Sync keeps ambient air from substituting, and a reserve orb is delivered to your home address.

### Saving

**Member Records** downloads a PDF Token statement with your signed save inside it. On the sign-in screen, **Resume from a statement** opens the account saved in that PDF. The live save is a signed cookie, so closing the browser pauses the game.

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Set a shared, random `UW_SESSION_SECRET` in the server environment for production. Member Records uses `UW_RECORDS_SECRET` when set, or `UW_SESSION_SECRET` otherwise. Keep the records signing key stable across deployments and workers so existing PDFs remain valid. Local development creates a gitignored signing key on the first download. Keep that file to restore local saves after restarting the server.

Support replies use a language model. See [AGENTS.md](AGENTS.md) for how model calls are structured. Keep provider credentials in the server environment, out of Git and client code.

Run `npm run lint` to check the source. To preview a production build, run `npm run build` followed by `npm start`. Next.js downloads the site's fonts from Google Fonts during compilation.

## Project layout

- `src/app` contains the site routes. `src/app/account` is the playable day, and `src/app/welcome` is onboarding.
- `src/content` contains the catalog, page copy, and game data: career tracks, starter homes (`living.ts`), memberships, survival tuning (`survival.ts`), and the town map (`unicornopolis.ts`).
- `src/server` contains the game engine. `gameState.ts` defines the save, `gameActions.ts` applies player actions, `gameEvents.ts` runs the clock and its scheduled events, `survival.ts` moves the stats, and `gameCalendar.ts` projects the calendar.
- `src/components` contains shared UI, including the member panel (`SupportBar.tsx`) and the town map.
- `src/assets` and `public` contain the illustrations, the town model, and other artwork.

The site uses Next.js and TypeScript, with GSAP for motion and React Three Fiber for the town and product scenes.

## Further reading

- [HANDOFF.md](HANDOFF.md) · Where the build stands and what's next.
- [ROADMAP.md](ROADMAP.md) · The plan for the game, milestone by milestone.
- [BUSINESS-ROADMAP.md](BUSINESS-ROADMAP.md) · The checklist for each business.
- [ECONOMY.md](ECONOMY.md) · Wage anchors, household scenarios, game prices, and pricing rules.
- [INTERIORS.md](INTERIORS.md) · The walkable interior pipeline.
