import type { ReactNode } from "react";
import { departments } from "@/app/market/catalog";
import { brightsideTrack, getPosition, goodshiftTrack, helpingHandTrack, isOpenEntryPosition, payByLevel, positions } from "@/content/careerTracks";
import { brightsideBriefs } from "@/content/gigCatalogs";
import { dreamwellPricing } from "@/content/dreamwellPricing";
import { funHourRate } from "@/content/funplex";
import { postings } from "@/content/goodshiftPostings";
import { getStarterHome } from "@/content/living";
import { quickserveMenu } from "@/content/quickserve";
import { groceries, menuSatiety, reserveOrb } from "@/content/survival";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import { actionMinutes, getRentBill, regularShiftHours, regularShiftStart, type GameAction } from "@/server/gameActions";
import { atTime, formatClockTime, formatGameDate, formatGameTime, gameDay, type GameState } from "@/server/gameState";
import styles from "./account.module.css";

function DayForm({ revision, action, label, children }: {
  revision: number; action: GameAction["type"]; label: string; children?: ReactNode;
}) {
  return <form action="/account/day" method="post">
    <input type="hidden" name="revision" value={revision} />
    <input type="hidden" name="action" value={action} />
    {children}
    <button type="submit">{label}</button>
  </form>;
}

export default function MemberDay({ game, available, error }: { game: GameState; available: number; error?: string }) {
  const position = getPosition(game.employment.positionId)!;
  const track = position.track;
  const shifts = [
    ...(track === goodshiftTrack ? postings.map(({ id, title, payout }) => ({ id, title, payout })) : []),
    ...(track === brightsideTrack ? brightsideBriefs : []),
    ...helpingHandPostings.filter(({ site }) => helpingHandTrack(site) === track)
      .map(({ slug, title, payout }) => ({ id: `helpinghand:${slug}`, title, payout })),
  ];
  const rent = getRentBill(game);
  const revision = game.revision;
  const pantry = Object.entries(game.pantry ?? {});
  const kitchen = Boolean(getStarterHome(game.home?.homeId)?.kitchen);
  return (
    <section className={`${styles.panel} ${styles.memberDay}`} id="member-day" aria-labelledby="member-day-heading">
      <header>
        <div>
          <h2 id="member-day-heading">✨ Your day in Unicornopolis</h2>
          <p>{formatGameTime(game.now)} · {formatGameDate.format(new Date(gameDay(game)))} · <strong>{available} Tokens available</strong></p>
        </div>
        <DayForm revision={revision} action="end-day" label="Finish the day ✨" />
      </header>
      {error && <p role="alert">{error}</p>}
      {game.blocks.length > 0 && <div className={styles.today}>
        <h3>🗓️ Today</h3>
        <ol>{[...game.blocks].sort((a, b) => a.start.localeCompare(b.start)).map((block) => (
          <li key={block.id}><time dateTime={block.start}>{formatClockTime(block.start)}–{formatClockTime(block.end)}</time> {block.label}</li>
        ))}</ol>
      </div>}
      {game.unpaid.length > 0 && <div>
        <h3>Outstanding bills</h3>
        <ul>{game.unpaid.map((bill) => <li key={bill.id}>{bill.label} · {bill.amount} Tokens · Due {formatGameDate.format(new Date(bill.due))}</li>)}</ul>
      </div>}
      {rent && rent.due > gameDay(game) && <p>{rent.label} · {rent.amount.toLocaleString("en-US")} Tokens due {formatGameDate.format(new Date(rent.due))}</p>}
      <div className={styles.dayOptions}>
        {!game.ledger.some(({ id }) => id === `regular-${gameDay(game)}`) &&
          <DayForm revision={revision} action="work-shift" label={`Work your shift · ${formatClockTime(atTime(gameDay(game), regularShiftStart))}, ${regularShiftHours} hours · ${regularShiftHours * payByLevel[position.level]} Tokens`} />}
        {shifts.length > 0 && <DayForm revision={revision} action="take-shift" label={track === brightsideTrack ? "Submit creator brief" : "Take extra shift"}>
          <label>{track === brightsideTrack ? "Brightside briefs" : "Extra shifts in your track"}<select name="choice" required>
            {shifts.map(({ id, title, payout }) => <option key={id} value={id}>{title} · {payout} Tokens</option>)}
          </select></label>
        </DayForm>}
        <DayForm revision={revision} action="buy" label={`Buy from Market · ${actionMinutes.buy} min`}>
          <label>Market items<select name="choice" required>
            {departments.map(({ name, products }) => <optgroup key={name} label={name}>
              {products.map(([name, size, amount]) => <option key={name} value={name}>{name} · {size} · {amount} Tokens{groceries[name] ? ` · ${groceries[name].servings} serving${groceries[name].servings === 1 ? "" : "s"}${groceries[name].kitchen ? ", needs a kitchen" : ""}` : ""}</option>)}
            </optgroup>)}
          </select></label>
        </DayForm>
        <DayForm revision={revision} action="eat-out" label={`Eat at Horn & Fries · ${actionMinutes["eat-out"]} min`}>
          <label>Horn &amp; Fries menu<select name="choice" required>
            {quickserveMenu.map(({ id, name, tokens }) => <option key={id} value={id}>{name} · {tokens} Tokens · Satiety +{menuSatiety[id] ?? 0}</option>)}
          </select></label>
        </DayForm>
        {pantry.length > 0 && <DayForm revision={revision} action="eat" label={`Eat at home · ${actionMinutes.eat} min`}>
          <label>Your pantry<select name="choice" required>
            {pantry.map(([name, servings]) => <option key={name} value={name} disabled={groceries[name]?.kitchen && !kitchen}>
              {name} · {servings} left · Satiety +{groceries[name]?.satiety ?? 0}{groceries[name]?.kitchen && !kitchen ? " · needs a kitchen" : ""}
            </option>)}
          </select></label>
        </DayForm>}
        {game.inventory[reserveOrb.item] > 0 && <DayForm revision={revision} action="open-orb" label={`Open an ${reserveOrb.item} · Oxygen +${reserveOrb.oxygen}`} />}
        <DayForm revision={revision} action="transfer" label="Transfer tracks">
          <label>Open entry positions<select name="choice" required>
            {positions.filter((position) => position.track !== track && isOpenEntryPosition(position))
              .map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
          </select></label>
        </DayForm>
        <DayForm revision={revision} action="sleep" label={`Book a nap · ${actionMinutes.sleep} min · ${dreamwellPricing.nap.tokens} Tokens`} />
        <DayForm revision={revision} action="attend-fun" label={`Check in for a Fun Hour · 1 hour · ${funHourRate} Tokens`} />
        {rent && rent.due <= gameDay(game) && !game.ledger.some(({ id }) => id === rent.id) &&
          <DayForm revision={revision} action="pay-rent" label={`Pay rent · ${rent.amount.toLocaleString("en-US")} Tokens`} />}
      </div>
      {Object.keys(game.inventory).length > 0 && <div>
        <h3>🎒 Your inventory</h3>
        <ul>{Object.entries(game.inventory).map(([name, quantity]) => <li key={name}>{name} × {quantity}</li>)}</ul>
      </div>}
    </section>
  );
}
