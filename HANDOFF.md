# Unicorn Warehouse handoff

The Next.js app lives in `web`. Unicorn Warehouse has grown from a membership company into a company town, Unicornopolis, where every business parodies an industry. As of commit `00afb76` every business in the registry has its own page, everything is pushed to `main`, and `npm run lint` and `tsc` pass with no warnings.

Read these alongside this file:

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

The homepage groups every business, and `/businesses` redirects there. Outline pages remain at `/businesses/[slug]`.

**Unicornopolis.** `/map` is a 20 × 20 town grid with named streets, an address for every lot, Living rents on residential blocks, delivery routes, and the Clover Loop bus. Lot data is in `src/content/unicornopolis.ts`. A 3D view of the town exists in `src/app/map/TownScene.tsx`, using `public/unicornopolis/town.glb` with clickable regions from `src/content/unicornopolisScene.json`, but no page renders it yet, so `/map` shows only the 2D grid. The Blender source files and renders sit in the project root.

**Work boards.** Goodshift (21 office postings, `src/content/goodshiftPostings.ts`) and HelpingHand (54 on-site postings, `src/content/helpingHandPostings.ts`) share the two-pane board layout at `/demandeternal/jobs` and `/sublaborix/jobs`. Business careers pages link each role to its listing.

**Careers.** `/careers` is "Become a Unicorn" with the five-rung horn ladder in `src/content/careers.ts`. Each business has a careers page under `/careers/<business>`. Applying for Unicorn Trainee takes 40 accepted assignments from herd-eligible postings (`src/server/herdEligibility.ts`).

**Member data.** Poppy (`UW-0482`) and Juniper (`UW-0716`) live in `src/content/memberAccount.ts`. The ledger is authoritative. Bank balances (`src/server/bankAccount.ts`), Fun Hours (`src/server/funHours.ts`, also shown in the account portal), and Trainee progress are derived from it and add no entries of their own.

**Support unicorn.** `/api/support` gives the model account evidence `[A:…]`, Terms `[T:…]`, Product Details `[P:…]`, postings `[J:…]`, and careers roles `[C:…]`. A chat can open from a transaction, a posting (`/support?posting=<slug>`, or `helpinghand:<slug>` for HelpingHand), or a role (`/support?role=<slug>`).

## Open threads

- **HelpingHand does not count toward Trainee.** No HelpingHand posting is marked herd-eligible, and eligibility only checks Goodshift postings. Juniper is at 0 of 40 and Poppy is at 1 of 40.
- **Poppy's history predates the current prices.** Her weekly reports paid 140 Tokens each, while that posting now pays 84 under ECONOMY.md. Reconcile this when member histories are reseeded.
- **The next phase is records, not pages.** The roadmap's "After the pages" section covers it: give orders, leases, assignments, and service records IDs, link them to the ledger, show them in Account and Support, then seed histories with fees, renewals, refunds, and holds.
- **Charges shown but not posted.** Bank fees are waived through December 31, 2026, and scheduled Fun Hours show as a future 60-Token charge. Neither is on the ledger. Posting them means adding ledger entries.
- **Unchecked.** Support chats about the Bank, Fun Hours, and HelpingHand postings have not been run. Replies with Gemma have taken 90–115 seconds as the reference material has grown.
- **3D town view.** `TownScene.tsx` is built but not mounted on `/map`. It has not been checked in a browser.
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
