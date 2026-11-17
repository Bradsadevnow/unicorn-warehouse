import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import InteriorPanel from "@/components/interior/InteriorPanel";
import { getRole } from "@/content/careers";
import { interiors } from "@/content/interiors";
import { questLocationPath, type QuestInteraction } from "@/content/recognitionQuests";
import { getEmployeeRecord } from "@/server/employeeRecord";
import { objectiveComplete } from "@/server/gameState";
import { getMemberSession } from "@/server/memberSession";
import { getRecognitionQuest, questInteractionComplete, questInteractionStatus } from "@/server/recognitionQuestEngine";
import styles from "./quest.module.css";

export const metadata = { title: "Recognition Quests" };

function QuestForm({ questId, interaction, revision, interior = false }: {
  questId: string; interaction: QuestInteraction; revision: number; interior?: boolean;
}) {
  return (
    <form className={styles.form} action="/account/day" method="post">
      <input type="hidden" name="revision" value={revision} />
      <input type="hidden" name="action" value="quest" />
      <input type="hidden" name="questId" value={questId} />
      <input type="hidden" name="interactionId" value={interaction.id} />
      {interior && <p>{interaction.dialogue}</p>}
      {interaction.choices && <label>
        What would you like to request?
        <select name="choice" required defaultValue="">
          <option value="" disabled>Choose a request</option>
          {interaction.choices.options.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
        </select>
      </label>}
      <button type="submit">{interaction.action}</button>
    </form>
  );
}

export default function QuestPage({ params, searchParams }: PageProps<"/quests/[id]">) {
  return <Suspense fallback={<main className={styles.page}>Opening your Recognition file… ✨</main>}>
    <QuestDesk params={params} searchParams={searchParams} />
  </Suspense>;
}

async function QuestDesk({ params, searchParams }: PageProps<"/quests/[id]">) {
  const [{ id }, query, session] = await Promise.all([params, searchParams, getMemberSession()]);
  const quest = getRecognitionQuest(id);
  if (!quest) notFound();
  if (!session) redirect("/");
  const { game, account } = session;
  const employment = getEmployeeRecord(account);
  const counted = employment.qualifyingShifts.counted.length;
  const stop = quest.locations.find((location) => location.id === query.stop) ?? quest.locations[0];
  const room = stop.id === "department" ? employment.position.department : stop.name;
  const isFitted = questInteractionComplete(game, id, quest.completionInteraction);
  const award = quest.interactions.find((interaction) => interaction.awardRank);
  const hasHorn = award && questInteractionComplete(game, id, award.id);
  const awardedTitle = award?.awardRank && getRole(award.awardRank)?.title;
  const qualification = award?.requires.find((condition) => "qualifyingShifts" in condition);
  const required = qualification && "qualifyingShifts" in qualification ? qualification.qualifyingShifts : undefined;
  const available = quest.interactions.filter((interaction) => interaction.location === stop.id).map((interaction) => ({
    interaction, status: questInteractionStatus(game, id, interaction, counted),
  }));
  const hotspots: Record<string, ReactNode> = {};
  for (const { interaction, status } of available) {
    if (interaction.hotspot && status === "ready") {
      hotspots[interaction.hotspot] = <QuestForm questId={id} interaction={interaction} revision={game.revision} interior />;
    }
  }
  const items = quest.items.filter((item) => game.inventory[item] > 0);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className="label">Unicorn Warehouse · Recognition</p>
        <h1>{quest.title} ✨</h1>
        <p>{quest.intro}</p>
        <Link href="/account">Back to your account →</Link>
      </header>

      {!objectiveComplete(game, "buy-kit") ? (
        <section className={styles.panel}>
          <h2>Your manager is expecting you</h2>
          <p>Finish your manager introduction and pick up your Pathway Kit to open your Recognition file.</p>
          <Link href="/account#objectives">Open your first steps →</Link>
        </section>
      ) : <>
        <nav className={styles.stops} aria-label="Quest locations">
          {quest.locations.map(({ id: location, name }) => <Link key={location} href={questLocationPath(id, location)}
            aria-current={location === stop.id ? "page" : undefined}>{name}</Link>)}
        </nav>
        <div className={styles.workspace} id="quest-counter">
          <section className={styles.panel} aria-labelledby="counter-heading">
            <h2 id="counter-heading">{room}</h2>
            <p>{stop.id === "department" ? `${employment.manager.name} · ${employment.manager.title}` : stop.detail}</p>
            {stop.clue && <Link href={stop.clue.href}>{stop.clue.label} →</Link>}
            {typeof query.actionError === "string" && <p className={styles.error} role="alert">{query.actionError}</p>}
            <div className={styles.dialogues}>
              {available.map(({ interaction, status }) => (
                <article key={interaction.id}>
                  <h3>{interaction.title}</h3>
                  {status === "complete" && <p>✓ On file</p>}
                  {status === "locked" && <p className={styles.muted}>Waiting for the required records.</p>}
                  {status === "ready" && <>
                    <p>{interaction.dialogue}</p>
                    <QuestForm questId={id} interaction={interaction} revision={game.revision} />
                  </>}
                </article>
              ))}
            </div>
          </section>
          <aside className={styles.panel}>
            <h2>🎒 Quest inventory</h2>
            {items.length ? <ul className={styles.items}>{items.map((item) => <li key={item}>{item}</li>)}</ul> : <p>Your hands are free.</p>}
            <h2>🦄 Recognition record</h2>
            <p>{hasHorn ? `${awardedTitle} · Horn issued` : isFitted ? "Fitting complete. Your certificate is on file." : "Fitting in progress."}</p>
            {!hasHorn && required !== undefined && <>
              <p>{counted} of {required} accepted extra shifts in your current track</p>
              <progress value={Math.min(counted, required)} max={required} aria-label="Accepted extra shifts" />
            </>}
          </aside>
        </div>
        {interiors[stop.id] && <InteriorPanel key={stop.id} id={stop.id} title={stop.id === "department" ? room : undefined} hotspotActions={hotspots} />}
      </>}
    </main>
  );
}
