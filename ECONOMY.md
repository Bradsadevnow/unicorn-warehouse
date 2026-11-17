# Unicorn Warehouse Economic Standard v1.0

Use 1 Token ≈ $1 as an internal purchasing-power benchmark. Cash redemption is $0. Pay follows the position, never the horn rank. Positions sit at four levels within a career track, defined in [careerTracks.ts](src/content/careerTracks.ts). Career comparisons assume 40 hours per week, 52 weeks per year, and 12 months per year. They represent gross earnings at the reference hours. Gig payouts are per accepted assignment.

## Affordability scenarios

All figures are Tokens. The 3,500 scenario models one adult renting a room in shared housing. The 5,500 scenario models a larger household supported by one full-time income. These internal planning scenarios use reference budgets. Current rents live in the [Living catalog](src/content/living.ts).

| Position level | Examples | Hourly | Monthly | After 3,500 | After 5,500 |
| --- | --- | ---: | ---: | ---: | ---: |
| 1 · Entry | Line Unicorn, Warehouse Picker, Teller Unicorn | 12 | 2,080 | -1,420 | -3,420 |
| 2 · Experienced | Fun Compliance Host, Balance Preservation Associate | 18 | 3,120 | -380 | -2,380 |
| 3 · Supervisory | Assistant Shift Happiness Manager, Inventory Truth Specialist | 28 | 4,853 | +1,353 | -647 |
| 4 · Leadership | Pick Rate Encouragement Lead, Structural Optimism Foreman | 42 | 7,280 | +3,780 | +1,780 |

| Monthly expense | Shared housing scenario | Household scenario |
| --- | ---: | ---: |
| Housing | 1,400 | 2,200 |
| Food | 500 | 800 |
| Everair | 350 | 500 |
| Dreamwell | 600 | 600 |
| Softspace | 180 | 400 |
| Transportation | 240 | 500 |
| Other essentials | 170 | 500 |
| Mandatory Fun Hours | 60 | Budget separately |
| **Total** | **3,500** | **5,500** |

The household column preserves the original essentials subtotal. Adding 60 Tokens for one member's Fun Hours brings it to 5,560. Bank charges depend on account activity and are excluded from both scenarios. Everair remains a budget allowance pending a baseline allowance and renewal price. The Market example below uses current shelf prices. The Softspace household estimate is a usage budget. The shared scenario uses Seasonal Select.

## The game economy

The playable game follows the scenarios above. An entry-level member earns 96 Tokens for a regular shift, six days a week, or about 85 Tokens a day. The game's prices are set so that a member who works every regular shift, eats when hungry, and keeps both memberships clears only a few Tokens a day. A renewal week leaves bills outstanding until the next paychecks catch up. An extra hour of HelpingHand work a day closes that gap.

| Cost | Price | Per day |
| --- | --- | ---: |
| Employee Bunkhouse · The Potting Shed · The Fryer Loft | 280 · 300 · 330 Tokens a week | 40–47 |
| Everair AirLink Premium | 210 Tokens every 30 days | 7 |
| Softspace Daily Balance | 180 Tokens every 30 days | 6 |
| Food at Horn & Fries | About 3 satiety per Token, plus morale | 25–28 |
| Food cooked at home (The Fryer Loft only) | About 6 satiety per Token | 13–15 |
| Ready-to-eat groceries | About 4 satiety per Token | 20 |
| Fun Hours | 30 Tokens, one a day, 4 required a month | 4+ |

- Starter rent bills weekly from move-in, starting one week in. A month of the bunkhouse is about 1,210 Tokens, under the 1,400 shared-housing allowance.
- New members get Everair and Softspace for their first 14 days, and then the memberships renew. Members who join later pay the first period up front. The seeded sample account's AirLink plan now renews at the catalog price too.
- Grocery servings and satiety are in [survival.ts](src/content/survival.ts). A member without a kitchen can still eat bread, apples, beans, milk, carrots, and bananas.
- Tuning record: a 75-day scripted playthrough for each home ends with 66–356 Tokens and 4–14 days with an outstanding bill. With an extra hour of work a day, it ends with about 1,000 Tokens and at most one such day. The previous prices ended 60 days with 2,000–2,600 Tokens.

## Pricing and accounting

Dreamwell is the first catalog update. Its current pricing lives in [dreamwellPricing.ts](src/content/dreamwellPricing.ts). The nap is 5 Tokens per session. The Essential, Plus, Premium, and Complete subscriptions are 8, 12, 16, and 20 Tokens per day for 2, 4, 6, and 8 hours respectively. Thirty days of Complete costs 600 Tokens. Existing ledger entries, including Poppy's 250-Token four-hour session, keep their recorded amounts.

Give each priced offering a stable ID, a catalog version, an effective date, a billing unit, and an entitlement. Use the unit members actually buy, such as a meal, a delivery, a day of rest, a 30-day comfort cycle, or a monthly rental. Document scheduled exceptions such as seasonal cooling rates. Preserve the applicable price and version on an obligation when it is created. Refund against the original charge.

Settle through the authoritative Token ledger. Keep pending payouts and holds distinct from settled transactions. Application code determines fees and payouts. Support explains recorded account activity and cites policy. As settlement features are added, verify that accepted shifts pay the posted amount, renewals use their applicable catalog version, and refunds reconcile to the original charge.

Keep balances, obligations, and payments distinct. A quote creates no obligation. A signed lease or loan creates a dated obligation owned by the issuing business. A settled payment references that obligation. Departments can apply their own policy to account facts. For example, Living can consider pending wages when screening income, while the Bank can apply only available Everyday Tokens to rent.

## Gig boards and Market

- HelpingHand's 24 sample jobs show the duration and pay 12–20 Tokens per hour at the listed durations, including a rush premium for dinner pickup. A 15-minute unload pays 4 Tokens. Employers pay $14 for that job.
- Goodshift's 16 postings use 18, 24, 28, and 35 Tokens per hour for Associate, Specialist, Analyst, and Senior analyst work, respectively. Buyers pay in dollars. Use accepted assignments for realized income. Poppy's existing weekly report entries are still 140 Tokens each, while the current three-hour posting pays 84.
- Brightside's nine briefs pay 18–72 Tokens per approved package. Package prices account for creative work beyond the finished clip's runtime. Buyers pay dollars and the payout is in Tokens.
- Market staples include 4-Token bread, 6-Token eggs, and 2-Token canned beans. Vegan & Organic keeps its premium slate, including the 18-Token banana.

A four-shop month at 125 Tokens per shop fits the 500-Token shared-housing food allowance. An example shop buys 8 bananas, a dozen eggs, a bag of rice, a box of pasta, a can of soup, 3 frozen dinners, a box of oats, a loaf of bread, 3 cans of black beans, 2 half-gallons of milk, a bag of apples, 2 bags of carrots, 4 bags of frozen vegetables, 2 trays of chicken thighs, and a bottle of cooking oil. This is an example of catalog purchasing power.
