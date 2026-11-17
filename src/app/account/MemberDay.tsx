import type { ReactNode } from "react";
import { departments } from "@/app/market/catalog";
import { brightsideTrack, getPosition, goodshiftTrack, helpingHandTrack, isOpenEntryPosition, payByLevel, positions } from "@/content/careerTracks";
import { brightsideBriefs } from "@/content/gigCatalogs";
import { dreamwellPricing } from "@/content/dreamwellPricing";
import { funHourRate } from "@/content/funplex";
import { postings } from "@/content/goodshiftPostings";
import { helpingHandPostings } from "@/content/helpingHandPostings";
import { getRentBill, regularShiftHours, type GameAction } from "@/server/gameActions";
import { formatGameDate, formatGameTime, gameDay, type GameState } from "@/server/gameState";
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
      {game.unpaid.length > 0 && <div>
        <h3>Outstanding bills</h3>
        <ul>{game.unpaid.map((bill) => <li key={bill.id}>{bill.label} · {bill.amount} Tokens · Due {formatGameDate.format(new Date(bill.due))}</li>)}</ul>
      </div>}
      {rent && rent.due > gameDay(game) && <p>{rent.label} · {rent.amount.toLocaleString("en-US")} Tokens due {formatGameDate.format(new Date(rent.due))}</p>}
      <div className={styles.dayOptions}>
        {!game.ledger.some(({ id }) => id === `regular-${gameDay(game)}`) &&
          <DayForm revision={revision} action="work-shift" label={`Work your shift · ${regularShiftHours * payByLevel[position.level]} Tokens`} />}
        {shifts.length > 0 && <DayForm revision={revision} action="take-shift" label={track === brightsideTrack ? "Submit creator brief" : "Take extra shift"}>
          <label>{track === brightsideTrack ? "Brightside briefs" : "Extra shifts in your track"}<select name="choice" required>
            {shifts.map(({ id, title, payout }) => <option key={id} value={id}>{title} · {payout} Tokens</option>)}
          </select></label>
        </DayForm>}
        <DayForm revision={revision} action="buy" label="Buy from Market">
          <label>Market items<select name="choice" required>
            {departments.map(({ name, products }) => <optgroup key={name} label={name}>
              {products.map(([name, size, amount]) => <option key={name} value={name}>{name} · {size} · {amount} Tokens</option>)}
            </optgroup>)}
          </select></label>
        </DayForm>
        <DayForm revision={revision} action="transfer" label="Transfer tracks">
          <label>Open entry positions<select name="choice" required>
            {positions.filter((position) => position.track !== track && isOpenEntryPosition(position))
              .map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
          </select></label>
        </DayForm>
        <DayForm revision={revision} action="sleep" label={`Book a nap · ${dreamwellPricing.nap.tokens} Tokens`} />
        <DayForm revision={revision} action="attend-fun" label={`Check in for a Fun Hour · ${funHourRate} Tokens`} />
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
