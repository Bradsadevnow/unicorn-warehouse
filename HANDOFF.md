# Unicorn Warehouse handoff

The Next.js app lives in `web`. Unicorn Warehouse has grown from a membership company into a company town, Unicornopolis, where every business parodies an industry. Every business in the registry has its own page, the 3D town is the homepage navigation, and `npm run lint` and `tsc` pass with no warnings.

## Where we left off (2026-11-16)

- The career system, onboarding, day loop, PDF saves, and first Recognition Quest are live. M7's quest interiors and the M8 Support bar are in place. The last checks covered interior routes and hotspot reachability, Gemma's map and clue tools, and a 5-Token nap charged only on confirmation.
- Next: redesign the persistent player panel around an actual home address and timed deliveries. The section below records the agreed direction. Implementation has yet to begin.
- The Bank interior is still a greybox, and the player unicorn is built in code. When the Browser pane is hidden, streamed Suspense content may not reveal because animation frames pause. Check pages with the pane visible or read the server HTML.

## Game clock (step A of the calendar, 2026-11-17)

The game now runs on a calendar clock. `GameState` is version 2: `now` ("YYYY-MM-DDTHH:MM") replaces `day`, and a small `events` queue holds everything scheduled. Version 1 saves upgrade on load in `migrateGameState`.

- `src/server/gameEvents.ts` owns the queue. `advanceClock(ctx, target)` fires every event up to the target in chronological order, with the clock set to each event's time. Repeating events (rent, renewals, bank month, scheduled Fun Hours) keep only their next occurrence, because the snapshot cookie is capped at 3,800 characters.
- `src/server/gameContext.ts` holds the ledger helpers that actions and events share.
- Times of day: bills at 00:00, bank fees at 00:30, scheduled Fun Hours at 06:00, extra-shift acceptance at 17:00. Each day starts at 08:00.
- **End day** collects past-due charges, then advances to 08:00 tomorrow. Actions do not cost time yet.
- Verified with a scripted 50-day playthrough against the previous engine: identical entries, amounts, dates, balances, and rejections. Bills that fall due at midnight now appear before that day's activity. A version 1 save taken on December 1 upgrades and finishes identically.

**Step B, time costs and blocks (done).** Every action books a `TimeBlock` (`gameState.ts`) and advances the clock through it, so events fire during the activity. Durations are in `actionMinutes` in `gameActions.ts`: the regular shift runs 9:00 to 5:00 (clocking in early waits for 9:00), extra shifts use their posting's duration, Brightside briefs take 90 minutes, Market trips 30, naps 20, Fun Hours 60, rent 10, quest errands 15. Charges happen at the start of an activity and payroll at the end. Activities cannot run past midnight or overlap a booked block. Yesterday's blocks are cleared at the end of the day. My account shows a Today schedule. The 50-day playthrough still matches the previous engine's entries and balances.

- The snapshot cookie grows with the ledger, not the clock: about 2,400 of 3,800 characters after 62 days. Survival stats and deliveries add state, so plan for ledger compaction or server storage before long games hit the cap.

**Step C, the calendar (done).** My account has a 🗓️ Calendar tab: a month grid with a day agenda, covering this month and the next two. `src/server/gameCalendar.ts` builds it by playing the real event queue forward on a copy of the game with no player actions, using the `observe` hook on `advanceClock`. It shows exactly what the engine would charge if nothing else happens, including bills the balance cannot cover. It also shows today's booked blocks, overdue bills, and the end of probation. A check that projected three months and then played those days one at a time matched item for item.

**Starter homes (done).** New players pick one of three starter homes after choosing a job (`starterHomes` in `src/content/living.ts`): the **Employee Bunkhouse** (Bunk C-14, 91 Depot Avenue, 140 Tokens a week), **The Fryer Loft** (upstairs at Horn & Fries, 121 Clover Avenue, 175 a week), and **The Potting Shed** (behind The Garden Residence, 171 Market Avenue, 160 a week). Onboarding shows rent, address, fine print, and the walk to the chosen job (`src/server/starterHomes.ts`, 80 m a minute along `streetRoute`).

- `GameState.home` holds `{ homeId, movedIn }`. Rent is weekly from move-in, first charge one week in, so the welcome credit still covers the Pathway Kit. `nextStarterRentDue` and `getRentBill` in `gameContext.ts` handle it; the rent event reschedules itself weekly. Saves without a home keep the old monthly sample leases unchanged (the 50-day playthrough matches).
- Saves from before starter homes get a **Choose a starter home** panel on My account (`move-in` action, 1 hour). Moving between homes is not available yet.
- The address shows on My account (🏠 panel, linked to the map), the account header household line, the calendar, the Member Records PDF, and Support as `[A:home]`. The Living page has a `#starter-homes` section.
- Map: two new lots, `starter-bunkhouse` (19,8) and `starter-shed` (13,16), with hit regions in `unicornopolisScene.json`. The town GLB predates them, so `TownScene.tsx` draws the bunkhouse, the shed, and the loft on the Horn & Fries roof as simple shapes. Rebake them into the GLB when the model is next exported. The shapes were not visually checked in a browser.
- About 1,360 of 3,800 cookie characters after 62 days in a starter home.

**Survival stats, step D (done, first pass).** Five stats on 0–100: Oxygen, Satiety, Energy, Comfort, Morale. Hygiene was dropped. Tuning lives in `src/content/survival.ts` (rates, conditions, productivity, food values, interventions); the engine is `src/server/survival.ts`.

- `GameState.survival` holds the stats and the time they were measured. `settleStats` runs inside `advanceClock`, slice by slice, so every event and activity drains or restores at its own time (the "AirLink lapses at 2 a.m." case works). The activity comes from the booked block (work, nap, meal, awake). Unbooked time is awake from 8:00 to 22:00 and asleep from 22:00 until morning, so the calendar projection drains realistically too.
- Sleep recovery scales with the home (`sleepQuality` on each starter home; the bunkhouse is worst). Comfort settles toward the home's `comfort` level, plus 25 with an active Softspace plan. Oxygen sits at ambient levels (72 resting, 60 working) and 96 on an active Everair plan. For a member with Everair Sync whose plan is past due, it drains 6 an hour.
- Conditions follow from the stats: Oxygen Deficient, Sleep Deprived, Malnourished (energy drains 1.5×), Housing Distress (sleep restores less), and Disengaged.
- Productivity is the spec's formula without Hygiene, rescaled to 0–100, and taken at clock-in. Below 60, Goodshift books 30 minutes of coaching after the shift; below 40, a 60-minute improvement-plan check-in. Below 20, no assignments. Extra shifts record the score, and clients do not accept work under 40: the payout posts as 0, "not accepted by client". Everything is rule-based, with no randomness.
- At zero energy, only eating, napping, paying rent, or finishing the day is allowed. At zero satiety, Wellness bills a 60-Token nutritional intervention (once a day). At zero oxygen, Everair bills a 250-Token Emergency Continuity Reconnect (once a day). Nothing ends the run yet; death and Continuity of Membership are still open.
- Food: **Eat at Horn & Fries** (the real menu, 30 min, plus 2 morale). Market groceries now go to a `pantry` by the serving, and **Eat at home** uses them (15 min). Groceries that need cooking need a kitchen, and only The Fryer Loft has one (a hot plate). Fun Hours give 20 morale.
- Harness results over 14 days in the bunkhouse: not eating means daily improvement-plan check-ins and a growing Wellness debt; two Horn & Fries meals a day (about 24 Tokens) holds standard performance; adding Fun Hours reaches Excellent on rested mornings. With stats frozen, the 50-day playthrough still matches the pre-stats engine.
- The calendar projection runs the stats too, so it forecasts Wellness and Everair interventions on the day they would happen. A "Satiety reaches 15 Tuesday" style warning is not built.

**Member panel (done, first pass).** The Support dock (`src/components/SupportBar.tsx`) is now a panel on every page, with tabs for Today (stats, conditions, productivity, schedule, bills), Home (address, rent, kitchen, pantry, Go home), Wallet (balances and recent activity), and Support (the existing chat). The launcher shows five mini stat bars. `src/server/memberPanel.ts` builds the data in the root layout from the signed save. Form actions reload the page, so the panel is always current; leaving the Support tab calls `router.refresh()` in case Support changed the account. On `/support` the panel hides its Support tab. My account has a 💗 Wellbeing section (`src/components/StatBars.tsx`), and Support can cite `[A:wellbeing]`.

**Everair and Softspace memberships (done).** Onboarding ends with "Your wellbeing, included.": Everair AirLink Premium (120 Tokens every 30 days) and Softspace Daily Balance (180 every 30 days), both pre-checked. The first 30 days are included, then they renew automatically (`src/content/memberships.ts`). Players who skipped them can start one from My account → Memberships and pay the first period up front (`subscribe` action). `GameState.memberships` feeds the subscriptions on `createPlayerAccount`, so renewals, oxygen and comfort run through the existing machinery.

- A failed AirLink renewal lapses Sync at midnight and oxygen drains 6 an hour. Only an unpaid renewal lapses the plan, not other Everair charges. One reserve orb goes to the home address (Terms: "one reserve orb may be dispatched to the delivery address on file"), and **Open an Everair reserve orb** adds 70 oxygen. Everair bills the 250-Token reconnect once per lapse. After that, oxygen stays at zero until the renewal is paid.
- The regular shift is always available, whatever the productivity score, so a member in trouble can still earn. Only extra shifts close below 20. A harness run confirmed the way back: lapse, orb, reconnect, regular shifts, renewal collected, oxygen restored to 96.

**Economy balance (done).** Renewals now hurt. Starter rent is 280, 300, and 330 Tokens a week. AirLink Premium is 210 Tokens every 30 days (the old 120 was only the sample account's plan). The membership introductory period is 14 days. Groceries are about 6 satiety per Token cooked and about 4 ready to eat, down from up to 24. Work burns 6 satiety an hour, and being awake 3.5. Fun Hours are no longer capped at the monthly requirement: one a day, so morale can be bought. The numbers and the 75-day tuning record are in [ECONOMY.md](ECONOMY.md#the-game-economy). The scratchpad harness strategy that measured them works every regular shift, eats when hungry, and takes a Fun Hour when morale is under 35.

Next: Market orders delivered to the home address on the clock, the decision on death, and a "Satiety reaches 15 Tuesday" style forecast on the calendar.

## Next build · The member panel and life at an address

Expand the signed-in Support dock into a persistent member panel. Keep the conversation available while the player moves around. Use four tabs:

- **Today** — In-game date and time, current location, next shift, bills due, and the next delivery window.
- **Home** — Assigned address and unit, rent and due date, lease, and deliveries. **Go home** should open the player's actual address on the town map.
- **Wallet** — Available, pending, and held Tokens, recent activity, and a link to the full statement.
- **Support** — The existing conversation, tool trace, and confirmation cards. Give the unicorn access to the signed-in player's lease, shift, and order records as those features come online.

Keep My account for the detailed statement, employment record, and Member Records PDF saves. Move ordering out of its Market picker and into Market. Move **Work your shift** to **Clock in** at the player's workplace, where the Horn & Fries minigame can eventually run. Remove track transfer from player controls for this pass. If transfers return, decide the rule and any affordability requirement before exposing them again. Pay still comes from the position. Accepted extras and manager approval feed horn recognition.

**Housing.** After job selection, offer a few starter rentals, such as a furnished room, a studio near the outbound depot, and a small walk-up above the shops. Show rent and commute before selection. Assign the player to a specific map lot and unit, and save the lease and actual address to the account. Schedule the first rent payment after the player has had time to earn wages, so the existing 100-Token welcome credit can still cover the Pathway Kit. Exact rents and first-payment timing are open design decisions.

**Orders and the clock.** Place the order at Market and choose a delivery window on the in-game clock. Dispatch quotes the fee using the home address. Link the Market order, Fulfillment record, Dispatch attempt, and ledger entries with one correlation ID. The Today tab can show “Groceries arriving 5:20–5:40 p.m.” The player counts as home when their character is at the assigned address when the courier arrives. Advance time through play and restore the clock and pending deliveries from the signed save. Closing the browser pauses the clock.

If the player is away at arrival, record the missed attempt and route the order back to the depot for next-day pickup or rebooking. The Dispatch voice: “We stopped by! Your groceries are back at the depot, where they’ve been marked successfully transported.” Decide delivery fees, charges for rebooking, and timing rules when designing the actual flow.

Build the first slice end to end: **choose a home → place a Market order → receive or miss delivery**. That slice should connect the member panel, town map, Market, Fulfillment, Dispatch, ledger, and PDF save. Keep the Horn & Fries dinner rush pilot in the roadmap for the workplace clock-in pass.

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

**Careers.** Every member is an employee with two separate records: a position in one of six career tracks (`src/content/careerTracks.ts`), which sets pay and has a manager, and a horn rank (`src/content/careers.ts`), which is recognition only. Higher positions need a minimum horn rank and a vacancy. Horn ranks advance through accepted extra shifts in the employee's own track, manager approval, and a Recognition Quest. `/careers` shows the Employee Profile, `/careers/tracks/[track]` shows each track, `/careers/[slug]` shows each rank, and `src/server/employeeRecord.ts` derives a member's profile and qualifying shifts. HelpingHand and Goodshift label each shift with the track it counts toward.

**Member data and game loop.** Players enter a display name, choose a career track and open entry position, and receive a new signed game snapshot. The legacy profiles are retired from public sign-in. My account posts actions to `/account/day`, and Bank, Fun Hours, Careers, Wallet, and Support read the same projected account. Members can download a statement at `/member-records` and restore it from sign-in. Keep `UW_RECORDS_SECRET` (or the fallback `UW_SESSION_SECRET`) stable across deployments to preserve existing saves.

**Support unicorn.** `/api/support` gives the model account evidence `[A:…]`, Terms `[T:…]`, Product Details `[P:…]`, postings `[J:…]`, and careers roles `[C:…]`. A chat can open from a transaction, a posting (`/support?posting=<slug>`, or `helpinghand:<slug>` for HelpingHand), or a role (`/support?role=<slug>`).

## Open threads

- **Poppy's history predates the current prices.** Her weekly reports paid 140 Tokens each, while that posting now pays 84 under ECONOMY.md. Reconcile this when member histories are reseeded.
- **The Horn Fitting interiors and Support bar are in place.** Lost Property, Dreamwell, and the shared Recognition Office join the walkable Bank. The quest route retains its desk cards and signed inventory. The signed-in Support bar can link to map lots, give quest hints, and prepare confirmed game actions.
- **Playable shift pilot.** Horn & Fries dinner rush is recorded under career progression and in the roadmap's backlog. It uses the existing wage, ledger, and PDF save flow. A future HelpingHand version can count toward horn recognition after acceptance.
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
