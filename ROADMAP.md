# Unicorn Warehouse roadmap

Unicorn Warehouse is becoming a game. A player signs on with a name, takes an entry-level job in one of six career tracks, and lives in Unicornopolis day by day: working shifts, paying rent, and chasing a horn rank that pays nothing. Horn ranks are earned through adventure-game quests played inside walkable 3D interiors.

This file sequences that work. [BUSINESS-ROADMAP.md](BUSINESS-ROADMAP.md) remains the checklist for individual businesses, and [ECONOMY.md](ECONOMY.md) remains the pricing standard.

## The pieces

| Piece | What it is | Depends on |
| --- | --- | --- |
| Career tracks | Six tracks of positions, from entry jobs to level 4. Positions set pay. | Nothing |
| Horn ranks | Five company-wide ranks that grant recognition, never pay. Advancing takes qualifying shifts, manager approval, and a quest. | Career tracks |
| Game engine | Player state, a ledger written by code, days that end, and objectives. | Action layer |
| Action layer | Every player action as one typed server function, used by buttons, the engine, and the support agent. | Nothing |
| Onboarding | Name → track → entry job → Unicorn Trainee → meet your manager → Pathway Kit. | Career tracks, game engine |
| Saves | The Member Records Request PDF. It carries signed game state and can be uploaded to continue. | Game engine |
| Interiors | A Blender interior per location with a walkable character and interaction hotspots, one page each. | Interior pipeline |
| Quest engine | Places, items, dialog, and conditions defined as data. Progress lives in game state. | Game engine, interiors |
| Playable shifts | Short browser minigames that complete regular or extra shifts through the existing action layer. | Career tracks, action layer, saves |
| Support agent | A persistent support bar with tools over the action layer, page navigation, and quest hints. | Action layer, model tool calling |

## Sequence

Three lanes can move at the same time: content (careers), code (engine), and art (Blender and illustrations). Each milestone names its lane.

### M1 · Career tracks and horn ranks · content

Status: done, except the onboarding flow. `careerTracks.ts` holds 6 tracks and 45 positions with pay, managers, minimum ranks, and Pathway Kits. Horn ranks in `careers.ts` are recognition only. `/careers` explains the two records with a live Employee Profile, track pages live at `/careers/tracks/[track]`, rank pages at `/careers/[slug]`, and every department careers page shows its track. Both job boards label shifts by track. Poppy and Juniper have employment records, read through `src/server/employeeRecord.ts`, which the support unicorn also receives.

- `src/content/careerTracks.ts`: six tracks, departments, managers, positions with level, pay, minimum horn rank, and what they lead to. Pathway Kit per track. Qualifying extra shifts per track.
- Horn ranks become recognition only. Each rank's advancement rule lists qualifying shifts, manager approval, and a quest slot.
- Careers clauses appended to the Terms: independent position and rank records, rank gates plus vacancies, transfer resets track progress but keeps rank, the Pathway Kit.
- `/careers` redesign with the Employee Profile explainer, track pages at `/careers/tracks/[track]`, and rank pages at `/careers/[slug]`.
- Business careers pages render their departments from the track data and link to their track.
- HelpingHand and Goodshift become internal extra-shift boards. Postings are tagged to a track, and only shifts in your own track count.
- ECONOMY.md wage table keyed by position level: 12, 18, 28, and 42 Tokens an hour.

**Playable career progression.** The position determines the work and base wage. Regular shifts earn that wage. Accepted extra shifts in the employee's current track count toward horn recognition, alongside manager approval and the Recognition Quest. A horn remains recognition only. Higher-paying positions still require an eligible vacancy. See the [playable shift pilot](#playable-shift-pilot) for how minigames feed these records.

### M2 · Interior pipeline spike · art and code, alongside M1

Status: done for the Bank. The convention is in [INTERIORS.md](INTERIORS.md). `scripts/interiors/build_bank_greybox.py` builds `Unicornopolis-interior-bank.blend` headless, `scripts/interiors/export_interior.py` exports any interior, and the Tokens page has a working Step inside panel with click-to-move, five hotspots, and an exit to the town map. The Bank is still a greybox. The player character is built in code and should eventually come from Blender.

Prove one interior end to end before committing to many.

- A Blender export convention, written down once: a walkable floor mesh, a spawn point, hotspots as named empties, and camera bounds, exported to GLB with a sidecar JSON like `unicornopolisScene.json`.
- A walkable character with click-to-move on the floor mesh, in React Three Fiber.
- Each location page gets the same "Step inside" panel: a still render that loads immediately and opens the walkable interior on demand. The 3D only loads when the player steps inside.
- Pick the first interior from the first quest's locations. The Bank is a good candidate.

### M3 · Action layer and game engine · code

Status: implemented for the two sample members. Open **My account → Overview** to play a day. The member session reads the signed snapshot, projects it over the member's original history, and supplies the same ledger to Wallet, Bank, Fun Hours, Careers, and Support.

- A game state schema: player, employment (position, track, horn rank, track progress, probation), ledger, inventory, quest flags, day, and objectives.
- Every action as a typed server function: take a shift, buy, pay rent, sleep, attend Fun Hours, transfer tracks.
- Ending a day settles rent, renewals, fees, Fun Hours, and pending payouts through the ledger.
- State is signed by the server and carried by the client, so no database is needed.
- Account, Bank, Fun Hours, careers progress, and the support unicorn read from game state instead of `memberAccount.ts`.

The sample lease starts billing on December 1 for both members, using the listed Living rent for Peach Porch and Sunbeam House. Poppy's seeded AirLink renewal uses 120 Tokens per 30 days until AirLink has a catalog price. New extra shifts become eligible for client acceptance the following day. Closing a day posts accepted payouts before attempting outstanding bills and that day's charges. An unpaid bill remains outstanding and only available Tokens fund settlement.

The signed browser snapshot belongs to one sign-in session. Re-signing starts from the sample history. Its cookie has finite space and revisions reject stale forms. The M5 save flow is where long-running play and resumption belong.

### M4 · Onboarding and objectives · code and content

Status: implemented. The public sign-in accepts a display name and retains the masked SSN and consent scenes. The player chooses an open entry position, meets the assigned manager, and buys the track's Market Pathway Kit from a 100-Token welcome credit. Account Overview records those objectives, the first shift, and the first day close. Demo profiles are retired from sign-in.

- Sign-on by name. The SSN screen stays.
- Choose a track, choose an available entry job, receive the Unicorn Trainee rank, meet your manager, buy your Pathway Kit.
- An objectives panel. The company presents every objective as achievable.
- Retire Poppy and Juniper.

### M5 · Saves · code

Status: implemented. **Member Records** in the account portal exports the current Token statement and a signed snapshot. The sign-in screen links to the upload form. Restoring opens a fresh browser session at the saved game day, and modified PDFs are rejected before the current session changes.

- Export the Member Records Request PDF: statement pages generated from state, with the signed state embedded.
- Upload to continue. A tampered file is rejected in character by Member Records.

### M6 · Quest engine and the first quest · code, art, content

Status: implemented. **The Horn Fitting** opens from the account and Careers after the Pathway Kit. Bank hotspots and the other desks share the same quest actions, inventory, and saved progress. The fitting can be completed while qualifying shifts accrue. Issuing the horn still takes 40 accepted extras in the current track and manager approval. Creator-track employees can now submit Brightside briefs through the day panel.

- Quests as data: locations, items, interactions, dialog, and conditions. Clues come from Terms and Product Details.
- An inventory and dialog UI that works inside interiors and falls back to cards where a location has no interior yet.
- First quest: "The Horn Fitting" (Junior Unicorn Associate). It needs the Bank, Lost Property at the police station, Dreamwell, and the player's own department.

### M7 · Interiors rollout · art, ongoing

Status: the Horn Fitting route is complete. Lost Property, Dreamwell, and the shared Department Recognition Office have Blender sources, walkable exports, stills, and quest interactions. The office displays the player's current department and manager. Later rooms can follow the same export convention.

- One location at a time: Blender interior, still render, and ChatGPT illustrations for each page.
- Quest locations first, then the rest of town.

### M8 · Support agent bar · code

Status: implemented for signed-in members. The bar keeps the conversation through navigation, offers site and map links, and can prepare supported game actions. Confirmations show the server's quote and are bound to the session and current account revision. Horn Fitting hints come with clue links.

- The current Support chat already uses model-selected tools to read member records and search policy. The persistent bar will extend that interaction to navigation and confirmed game actions.
- A persistent bar on every page. Tools to read the account, take actions through the action layer, navigate, and open places on the map.
- Any action that spends Tokens requires the player's confirmation.
- Quest hints in character: the agent can cite the clause you missed but cannot solve the quest for you.

### M9 · Later

- More quests: "Rainbow Authority" (Senior Unicorn), "The Quiet Key" (Unicorn Team Lead), and "The Executive Floor" (Executive Unicorn, documented and impossible).
- The labor marketplace revamp: outside clients buy Unicorn Warehouse staff time.

#### Playable shift pilot

Start with Horn & Fries dinner rush and the Line Unicorn's **Clock in** action in My account. Pippa Pickle runs three quick rounds. Assemble the burger from the ticket, time the fries and match the pickup number, then hit the service chime on beat. The shift receipt records orders served, pickles intercepted, guest delight, and the wage posted. Goodshift Insights can reuse the performance record later.

- Start with a React minigame using the site's existing account flow. Introduce Phaser when a game needs a dedicated loop, sprites, collisions, or more complex timing. Keep React Three Fiber for the town, interiors, and future 3D work such as delivery routes.
- The server issues the shift ID and challenges. The client submits its actions. The shared action layer validates the result and posts the scheduled wage once. Metrics on the receipt describe performance; the existing position sets pay.
- Reuse the game for eligible HelpingHand rush postings with their advertised payout and acceptance rules. Only accepted extras in the player's current track qualify for horn progression.
- The first playable loop is job selection → minigame → receipt and ledger → Token purchase → PDF save and restore. Later games can cover parcel sorting, application stamping, construction stacking, delivery, and mandatory corporate enthusiasm.

## Rules that hold across milestones

- The ledger is the source of truth. Game actions write ledger entries, and every view derives from them.
- Puzzles must be solvable. Every step should make sense if you squint at policy that already exists.
- Original work only. The quests follow point-and-click adventure conventions, with Unicorn Warehouse characters, art, and puzzles.
- One 3D scene per page, loaded on demand behind a still render.
- New Terms and Product Details sections go at the end of their lists, because support cites clauses by position.
