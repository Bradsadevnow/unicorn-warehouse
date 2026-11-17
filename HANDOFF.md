# Unicorn Warehouse handoff

The Next.js app lives in `web`. Unicorn Warehouse has grown from a membership company into a company town, Unicornopolis, where every business parodies an industry. Every business in the registry has its own page, the 3D town is the homepage navigation, and `npm run lint` and `tsc` pass with no warnings.

Read these alongside this file:

- [ROADMAP.md](ROADMAP.md) sequences the next phase: career tracks and horn ranks, the game engine and action layer, onboarding, PDF saves, walkable Blender interiors, the quest engine, and the support agent bar. Start there.

- [BUSINESS-ROADMAP.md](BUSINESS-ROADMAP.md) is the per-business checklist and the record of what is built. Its "After the pages" section is the next phase.
- [ECONOMY.md](ECONOMY.md) is the pricing standard: 1 Token is roughly $1 of purchasing power, wages by career rung, household budgets, and how offers are priced and settled.
- [AGENTS.md](AGENTS.md) has the model-call rules for support and department deliverables.

## What exists

**Businesses.** `src/content/businesses.ts` is the registry, and each business has its own content module in `src/content` and a public page:

| Area | Businesses and routes |
| --- | --- |
| Personal essentials | Market `/market`, Everair `/aerovitalux` (Lodge Collection, Grand Alpine Resort `/alpine-resort` and Casino `/alpine-resort/casino`), Dreamwell `/somnara`, Softspace `/comfortflow` |
| Work and attention | Goodshift `/demandeternal`, HelpingHand `/sublaborix`, Brightside `/termiflux` |
| Town businesses | Horn & Fries `/quickserve`, Fulfillment `/fulfillment`, Dispatch `/dispatch`, Gatherings `/gatherings`, Funplex `/funplex`, Construction `/construction`, Living `/living` and Homes `/businesses/homes`, Motorworks `/motorworks`, Wellness `/wellness` with its pharmacy, Cloverfield School `/school`, Public Works `/public-works`, Flock `/flock` |
| Money | Token Economy `/tokens` with the Bank on the same page (`/bank` redirects there), Redemption `/redemption` |
| Company | Governance `/governance`, Careers `/careers`, Terms `/terms`, Product Details `/product-details` |

Outline pages remain at `/businesses/[slug]`, and `/businesses` redirects to the homepage.

**Unicornopolis is the site navigation.** The homepage's "The good stuff" section is a 3D model of the town (`#town`). Clicking a building opens a card with its art, address, description, a link to the business, and a careers link. A List toggle shows every address by neighborhood, with homes collapsed to one entry per plan. The list is also the fallback when WebGL is unavailable.

- Components live in `src/components/town`: `TownNavigator.tsx` (section, cards, list, lazy loading) and `TownScene.tsx` (React Three Fiber scene). The model is `public/unicornopolis/town.glb`, and its clickable regions are in `src/content/unicornopolisScene.json`. The 3D scene loads only when the section nears the viewport, with `public/unicornopolis/town-preview.webp` as the poster.
- Card data comes from `src/content/townPreviews.ts`, shaped for the page by `src/content/townDirectory.ts`. Lot positions, addresses, and districts are in `src/content/unicornopolis.ts`.
- Link to a place with `townPath(id)`, which builds `/home?lot=<id>#town`. Selecting a place updates the URL so it can be shared.
- Wheel zoom is off so the page scrolls over the map. The + and − buttons zoom.
- `/map` redirects to `/home#town`. The Clover Loop bus and the civic places that lived on `/map` (Town Hall, Clover Commons, the marina) are now on Public Works.
- The Blender source files and renders sit in the project root.

**Work boards.** Goodshift (21 office postings, `src/content/goodshiftPostings.ts`) and HelpingHand (54 on-site postings, `src/content/helpingHandPostings.ts`) share the two-pane board layout at `/demandeternal/jobs` and `/sublaborix/jobs`. Business careers pages link each role to its listing.

**Careers.** `/careers` is "Become a Unicorn" with the five-rung horn ladder in `src/content/careers.ts`. Each business has a careers page under `/careers/<business>`. Applying for Unicorn Trainee takes 40 accepted assignments from herd-eligible postings (`src/server/herdEligibility.ts`).

**Member data.** Poppy (`UW-0482`) and Juniper (`UW-0716`) live in `src/content/memberAccount.ts`. The ledger is authoritative. Bank balances (`src/server/bankAccount.ts`), Fun Hours (`src/server/funHours.ts`, also shown in the account portal), and Trainee progress are derived from it and add no entries of their own.

**Support unicorn.** `/api/support` gives the model account evidence `[A:…]`, Terms `[T:…]`, Product Details `[P:…]`, postings `[J:…]`, and careers roles `[C:…]`. A chat can open from a transaction, a posting (`/support?posting=<slug>`, or `helpinghand:<slug>` for HelpingHand), or a role (`/support?role=<slug>`).

## Open threads

- **HelpingHand does not count toward Trainee.** No HelpingHand posting is marked herd-eligible, and eligibility only checks Goodshift postings. Juniper is at 0 of 40 and Poppy is at 1 of 40.
- **Poppy's history predates the current prices.** Her weekly reports paid 140 Tokens each, while that posting now pays 84 under ECONOMY.md. Reconcile this when member histories are reseeded.
- **The next phase is the game.** ROADMAP.md replaces BUSINESS-ROADMAP.md's "After the pages" section. Poppy and Juniper are retired at onboarding (M4), and member history comes from play instead of seeded records.
- **Charges shown but not posted.** Bank fees are waived through December 31, 2026, and scheduled Fun Hours show as a future 60-Token charge. Neither is on the ledger. Posting them means adding ledger entries.
- **Unchecked.** Support chats about the Bank, Fun Hours, and HelpingHand postings have not been run. Replies with Gemma have taken 90–115 seconds as the reference material has grown.
- **Town map on phones.** The map works on a phone-sized screen but the town sits small in the frame, and dragging on the map rotates it rather than scrolling the page. Checked in an emulated phone viewport, not on a real device.
- **Art.** The Careers hero and posters still use type and the mascot rather than original art.

## Project decisions to carry forward

- **Voice and art.** Unicorn Warehouse sells everything with adorable unicorns, cheerful copy, and a straight face. Let the nastiest jokes surface in the Terms, Product Details, fees, fine print, employer and buyer experiences, and support answers grounded in policy. The public pitch should stay inviting. Ordinary purchases, refunds, and payouts should behave like real account history.
- **Industries, not companies.** Each business parodies an industry. Do not use real company names, people, or lookalike branding.
- **Economy.** Employers and buyers pay dollars. Members earn, save, and spend Tokens. Tokens carry over and never expire. The ledger is authoritative. Pending payouts and held Tokens have distinct states, and account views derive totals from the same records.
- **Member data.** Resolve the active member through the server session. Keep member records and internal records in separate server-side modules. Use stable IDs and correlation IDs for cross-service events. When adding history, reconcile refunds and payouts and apply household eligibility consistently.
- **Support and AI.** Demo questions go to the model. In the trace, account evidence establishes what happened, posting evidence establishes what a listing offers, and policy evidence establishes what the company can do. Give each distinct department deliverable its own model call, including with Gemma in LM Studio.
- **Terms order.** Support cites clauses by position, such as `[T:13.2]`. Add new Terms and Product Details sections at the end of their lists, and add clauses at the end of a section, so existing citations keep their numbers.
- **Publishing.** Keep provider credentials out of Git and client code. Review the working tree before committing or pushing. The repository's `.git` belongs to a different Windows user, so run git with `-c safe.directory=<path>`.

## Run the local preview

From the workspace root, run:

```powershell
npm.cmd --prefix web run build
npm.cmd --prefix web run start -- --port 3150
```

If an earlier Unicorn Warehouse preview owns port 3150, stop that instance before starting the new one. For development, `npm.cmd --prefix web run dev` serves on port 3000.
