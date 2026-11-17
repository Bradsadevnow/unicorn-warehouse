import { activeConditions, productivityBand, productivityScore, statIds, statInfo, type Stats } from "@/content/survival";
import styles from "./stat-bars.module.css";

/** The member's five stats, any active conditions, and Goodshift's productivity score. */
export default function StatBars({ stats, compact = false }: { stats: Stats; compact?: boolean }) {
  const score = productivityScore(stats);
  const conditions = activeConditions(stats);
  return (
    <div className={styles.stats} data-compact={compact || undefined}>
      <ul className={styles.bars}>
        {statIds.map((id) => {
          const value = Math.round(stats[id]);
          return (
            <li key={id} data-level={value < 20 ? "low" : value < 45 ? "mid" : "ok"}>
              <span className={styles.label}>{statInfo[id].icon} {statInfo[id].name}</span>
              <span className={styles.meter} role="meter" aria-label={statInfo[id].name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
                <span style={{ width: `${value}%` }} />
              </span>
              <span className={styles.value}>{value}</span>
            </li>
          );
        })}
      </ul>
      <p className={styles.score}><strong>Productivity {score}</strong> · {productivityBand(score).name}</p>
      {conditions.length > 0 && <ul className={styles.conditions}>
        {conditions.map((condition) => <li key={condition.id}><strong>{condition.name}.</strong> {condition.effect}</li>)}
      </ul>}
      {!compact && <dl className={styles.help}>
        {statIds.map((id) => <div key={id}><dt>{statInfo[id].icon} {statInfo[id].name}</dt><dd>{statInfo[id].restoredBy}</dd></div>)}
      </dl>}
    </div>
  );
}
