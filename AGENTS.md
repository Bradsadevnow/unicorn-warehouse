<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Unicorn Warehouse model calls

- Give each AI-generated section or distinct department deliverable its own model call, including when developing locally with Gemma through LM Studio. Brightside Assurance evaluations, Portfolio Harmony communications, and Support replies each use a dedicated prompt. When one workflow needs several outputs, call each generator separately.
- Give each call the relevant account records, policy, and prior workflow outputs. Keep balances, settlement, dates, and workflow state authoritative in application code. Models can explain those facts or propose next steps.
- Ask the model for only the formatting its output needs. Let application code handle layout and presentation. Use plain text for prose and a small schema when code needs structured fields.
- Give each call room for the detail, voice, and absurdity the section needs. Model spend is flexible. Preserve separate calls and full responses during local development and in production.
- Keep member accounts and internal company records in separate server-side modules. Resolve the active member on the server. Link company records to an account and ledger entry by ID, and pass only the fields each page or model call needs.
