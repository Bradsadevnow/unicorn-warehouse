/** Opening curtain: black, a single label, a rule drawn across the bottom,
 *  then the whole thing lifts. Pure CSS (see globals.css). */
export default function Curtain({ label }: { label: string }) {
  return (
    <div className="curtain" aria-hidden>
      <span className="label">{label}</span>
      <i />
    </div>
  );
}
