# Unicorn Warehouse handoff

The Next.js app lives in `web`. At handoff, the local production preview was running at http://localhost:3150/tokens.

## Where we left off

The user approved the Token Economy redesign and its original art. No next feature is queued.

- The local `semantic-hallucination-generators/crystal.html` was the layout reference. The new `/tokens` has a split hero, a compact wallet preview, and three illustrated cards for earning, saving, and spending. The page and styles live in `src/app/tokens/page.tsx` and `src/app/tokens/tokens.module.css`.
- The original illustrations in `src/assets` are `tokens-earn.webp` (mint payroll window), `tokens-save.webp` (lavender piggy bank), and `tokens-spend.webp` (pink grocery checkout). The hero uses `public/token-economy.webp`.
- The wallet reads the active fictional member session on the server. It uses `getTokenBalances` to derive available, pending, and held Tokens from the ledger. It links to `/account?tab=wallet`. Signed-out visitors see the wallet link without member balances.
- Earn links to HelpingHand, Goodshift, and Brightside. Spend links to Market, A Little Clip, and Dreamwell subscriptions. Save links to the 10,000-Token Saturday Suite.

The production build passed after the art was added. The preview was restarted and all three image URLs returned HTTP 200. The signed-in wallet rendered in a smoke test before the art change. Browser layout review and publishing are unverified.

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
