# Unicorn Warehouse handoff

The Next.js app lives in `web`. At handoff, the local production preview was running at http://localhost:3150/tokens.

## Where we left off

The user approved the Token Economy redesign and its original art. No next feature is queued.

- The local `semantic-hallucination-generators/crystal.html` was the layout reference. The new `/tokens` has a split hero, member banking accounts, and three illustrated cards for earning, saving, and spending. The page and styles live in `src/app/tokens/page.tsx` and `src/app/tokens/tokens.module.css`.
- The original illustrations in `src/assets` are `tokens-earn.webp` (mint payroll window), `tokens-save.webp` (lavender piggy bank), and `tokens-spend.webp` (pink grocery cart). The hero uses `public/token-economy.webp`.
- The Bank reads the active fictional member session on the server and derives the balances from the ledger. Everyday Tokens links to the wallet statement. Signed-out visitors see a sign-in link.
- Earn links to HelpingHand, Goodshift, and Brightside. Spend links to Market, A Little Clip, and Dreamwell subscriptions. Save links to the 10,000-Token Saturday Suite.

The production build passed after the art was added. The preview was restarted and all three image URLs returned HTTP 200. The signed-in wallet rendered in a smoke test before the art change. Browser layout review and publishing are unverified.

## Goodshift postings (in progress)

Goodshift is becoming a real job board. Each posting is one record in `src/content/goodshiftPostings.ts` (16 so far, seeded from the old catalog), with its own page at `/demandeternal/jobs/[slug]`. The jobs routes share a two-pane layout: a persistent listings panel on the left and the selected posting on the right. The board and the employer marketplace derive their listings from those records.

- Member assignments link to a posting through `postingId` in `src/content/memberAccount.ts`. Poppy's two weekly reports point at `GS-P-2001`.
- The support unicorn receives postings as `[J:<posting id>]` references: the posting the chat was opened from (`/support?posting=<slug>`) plus any posting tied to the member's assignments. The answer trace shows them as Posting evidence.
- Checked in the dev preview signed in as Poppy with Gemma. The production build has not been run with these changes, and they are uncommitted.

## Careers (in progress)

`/careers` is the "Become a Unicorn" recruitment page for employment at Unicorn Warehouse itself. Role records live in `src/content/careers.ts` (five rungs from Unicorn Trainee to Executive Unicorn, plus the poster lines and executive welcome messages), and each role has a page at `/careers/[slug]`.

- Applying for Unicorn Trainee requires 40 accepted Goodshift or HelpingHand assignments. The careers page reads the signed-in member's assignments and shows their progress. Pending assignments are not counted.
- Horn, probation, eligibility, magic, family, and Employee Happiness rules are in a new `careers` section at the end of the Terms. Keep new Terms sections at the end, because support cites clauses by position.
- The support unicorn receives a role as a `[C:<role id>]` reference when the chat opens from `/support?role=<slug>`.
- The posters are type on pastel cards and the hero reuses the mascot. Original art for the hero and posters is still to come.
- Checked in the dev preview as Poppy. Support replies took 90 to 115 seconds with Gemma once the Careers terms and role were added to the prompt.

## Businesses (outlines)

`src/content/businesses.ts` is the registry of Unicorn Warehouse businesses. Each record carries its industry, tagline, the shifts members can pick up there, one corporate role mapped to a rung of the careers ladder, one policy, and its connections to the rest of the Portfolio. `/businesses` is the directory and `/businesses/[slug]` is each outline page.

- Open businesses (Market, Everair, Dreamwell, Brightside) link to their existing pages. The rest are outlines marked "Opening soon": Quickserve, Fulfillment, Dispatch, Gatherings, Living, Homes, Bank, Motorworks, Wellness.
- The plan is to build the outlines out one at a time. Each parodies an industry, never a named company.
- Shifts on a business page are titles and Token amounts only. Most are not posting records yet. HelpingHand still has no posting records, so no HelpingHand shift counts toward the Trainee quota.
- Trainee progress counts only accepted assignments from herd-eligible postings (`src/server/herdEligibility.ts`). Poppy is at 1 of 40.
- Business policies live in the registry and are not in the Terms yet, so the support unicorn cannot cite them.

## Unicorn Warehouse Bank

Banking now lives at `/tokens#bank`. The former `/bank` address redirects to `/tokens`. Products, the fee schedule, and rates live in `src/content/bank.ts`. `src/server/bankAccount.ts` derives every figure on the page from the member's Token ledger: available, held, and pending balances, Sparkle earned, pace toward the Saturday Suite goal, and the Early Payday offer on each pending payout.

- The Bank adds no ledger entries. Fees are waived during a welcome period ending December 31, 2026, which is why no fees appear on a statement. Charging fees later means adding ledger entries.
- Bank rules are a `bank` section at the end of Product Details, so the support unicorn can cite them.
- Checked signed in as Poppy. Juniper's view and a support chat about the Bank have not been checked.

## Unicorn Warehouse Funplex

`/funplex` is the designated recreation venue: bowling, mini golf, a cinema, an arcade with a Prize Counter, laser tag, go-karts, karaoke, and dining, plus Adventure Plus and birthday parties. Arcade winnings are FunPoints, which never convert to Tokens. Attractions and prizes live in `src/content/funplex.ts`. Every member is scheduled for two Fun Hours a month. `src/server/funHours.ts` counts completed Fun Hours from ledger entries labeled "Funplex" and schedules the rest on the last days of the month at 6:00 a.m.

- No member has a Funplex ledger entry, so both show 0 of 2 with two scheduled Fun Hours. The 60 Tokens due is shown as a future charge and is not on the ledger.
- Funplex rules are a `funplex` section at the end of Product Details.
- Checked signed in as Poppy. A support chat about Fun Hours has not been checked.

## Project decisions to carry forward

- **Voice and art.** Unicorn Warehouse sells everything with adorable unicorns, cheerful copy, and a straight face. Let the nastiest jokes surface in the Terms, Product Details, employer and buyer experiences, and support answers grounded in policy. Ordinary purchases, refunds, and payouts should behave like real account history.
- **Economy.** Employers and buyers pay dollars. Members earn, save, and spend Tokens. Tokens carry over and never expire. The ledger is authoritative. Pending payouts and held Tokens have distinct states, and account views derive totals from the same records.
- **Member data.** Resolve the active member through the server session. Keep member records and internal records in separate server-side modules. Use stable IDs and correlation IDs for cross-service events. When adding history, reconcile refunds and payouts and apply household eligibility consistently.
- **Support and AI.** Demo questions go to the model. In the trace, account evidence establishes what happened and policy evidence establishes what the company can do. Give each distinct department deliverable its own model call, including with Gemma in LM Studio. See [AGENTS.md](AGENTS.md) for the model-call rules.
- **Publishing.** Keep provider credentials out of Git and client code. Review the working tree before committing or pushing.

## Run the local preview

From the workspace root, run:

```powershell
npm.cmd --prefix web run build
npm.cmd --prefix web run start -- --port 3150
```

If an earlier Unicorn Warehouse preview owns port 3150, stop that instance before starting the new one.
