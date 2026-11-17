import Link from "next/link";
import { getPosition, getTrack } from "@/content/careerTracks";
import { objectiveComplete, starterTokens, type GameState, type ObjectiveId } from "@/server/gameState";
import styles from "./account.module.css";

const objectives: Record<ObjectiveId, string> = {
  "meet-manager": "Meet your manager",
  "buy-kit": "Buy your Pathway Kit",
  "first-shift": "Work your first shift",
  "finish-day": "Finish your first day",
};

export default function PlayerObjectives({ game, error }: { game: GameState; error?: string }) {
  const position = getPosition(game.employment.positionId)!;
  const kit = getTrack(position.track)!.pathwayKit;
  const met = objectiveComplete(game, "meet-manager");
  const equipped = objectiveComplete(game, "buy-kit");
  const done = game.objectives.filter(({ completed }) => completed).length;
  return (
    <section className={`${styles.panel} ${styles.memberDay}`} id="objectives" aria-labelledby="objectives-heading">
      <header>
        <div>
          <h2 id="objectives-heading">✨ Your first steps</h2>
          <p>{position.title} · Unicorn Trainee at enrollment</p>
        </div>
        <span className={styles.badge}>{done} of {game.objectives.length} complete</span>
      </header>
      <ol className={styles.objectives}>
        {game.objectives.map(({ id, completed }) => (
          <li key={id} data-completed={completed}>
            <span aria-hidden="true">{completed ? "✓" : "✧"}</span>
            <strong>{objectives[id]}</strong>
            {completed && <small>Complete</small>}
          </li>
        ))}
      </ol>
      {error && <p role="alert">{error}</p>}
      {!equipped ? <div className={styles.objectiveBrief}>
        <div>
          <h3>{met ? kit.name : position.manager}</h3>
          {met ? <>
            <p>Your {starterTokens}-Token welcome credit is ready at Market. Your kit costs <strong>{kit.tokens} Tokens</strong>.</p>
            <ul>{kit.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </> : <>
            <p>{position.managerTitle} · {position.department}</p>
            <blockquote>“Welcome to the team, {game.player.name}! Market has your Pathway Kit ready. The sooner you’re equipped, the sooner you can start earning.”</blockquote>
          </>}
        </div>
        <form action="/account/day" method="post">
          <input type="hidden" name="revision" value={game.revision} />
          <input type="hidden" name="action" value={met ? "buy-kit" : "meet-manager"} />
          <button type="submit">{met ? `Buy kit · ${kit.tokens} Tokens` : `Meet ${position.manager} ✨`}</button>
        </form>
      </div> : <div className={styles.objectiveLinks}>
        {done < game.objectives.length && <a href="#member-day">Go to your day →</a>}
        <Link href="/home">Explore Unicornopolis →</Link>
      </div>}
    </section>
  );
}
