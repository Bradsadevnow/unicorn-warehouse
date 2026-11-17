import Link from "next/link";
import { getStarterHome, starterHomes } from "@/content/living";
import { townPath } from "@/content/unicornopolis";
import { getRentBill } from "@/server/gameActions";
import { formatGameDate, type GameState } from "@/server/gameState";
import { starterHomeAddress } from "@/server/starterHomes";
import styles from "./account.module.css";

/** The member's starter home, or a move-in form for accounts opened before starter homes. */
export default function MemberHome({ game, error }: { game: GameState; error?: string }) {
  const home = getStarterHome(game.home?.homeId);
  if (!home) {
    return <section className={styles.panel} id="home" aria-labelledby="home-heading">
      <h2 id="home-heading">🏠 Choose a starter home</h2>
      <p>Your account does not have a home address on file. Choose a starter home to receive deliveries and household services. Rent is weekly, and your first week is on us.</p>
      {error && <p role="alert" className={styles.restoreNotice}>{error}</p>}
      <div className={styles.homeChoices}>
        {starterHomes.map((option) => (
          <form key={option.id} action="/account/day" method="post">
            <input type="hidden" name="revision" value={game.revision} />
            <input type="hidden" name="action" value="move-in" />
            <input type="hidden" name="choice" value={option.id} />
            <strong>{option.name}</strong>
            <span>{option.neighborhood} · {option.weeklyRent} Tokens a week</span>
            <button type="submit">Move in · 1 hr</button>
          </form>
        ))}
      </div>
      <Link href="/living#starter-homes">Compare starter homes →</Link>
    </section>;
  }
  const rent = getRentBill(game);
  const overdue = rent && game.unpaid.some(({ id }) => id === rent.id);
  return <section className={styles.panel} id="home" aria-labelledby="home-heading">
    <h2 id="home-heading">🏠 {home.name}</h2>
    <dl className={styles.balances}>
      <div><dt>Address</dt><dd>{starterHomeAddress(home)}</dd></div>
      <div><dt>Since</dt><dd>{formatGameDate.format(new Date(game.home!.movedIn))}</dd></div>
      <div><dt>Rent</dt><dd>{home.weeklyRent} Tokens a week</dd></div>
      {rent && <div><dt>{overdue ? "Past due" : "Next rent"}</dt><dd>{formatGameDate.format(new Date(rent.due))}</dd></div>}
    </dl>
    <p className={styles.note}>{home.finePrint}</p>
    <Link href={townPath(home.lotId)}>See your home on the map →</Link>
  </section>;
}
