import Link from "next/link";
import { postingCategories, postingPath, postings } from "@/content/goodshiftPostings";
import { brightsideBriefId, brightsideCatalog, helpingHandCatalog } from "@/content/gigCatalogs";
import { helpingHandJobsPath, helpingHandPostings } from "@/content/helpingHandPostings";
import Marketplace from "./Marketplace";
import s from "./work-platform.module.css";

const platforms = {
  brightside: {
    name: "Brightside",
    path: "/termiflux",
    tagline: "Make every moment count.",
    seeker: {
      title: "Turn your next clip into Tokens.",
      intro: "Pick a brand brief, make it your own, and earn Tokens when your clip is approved. The first three seconds are yours to make count.",
      board: "Open creator briefs",
      benefits: ["See the payout before you pitch", "Choose briefs that fit your style", "Spend your earnings across Unicorn Warehouse"],
    },
  },
  helpinghand: {
    name: "HelpingHand",
    path: "/sublaborix",
    tagline: "A little help goes a long way.",
    seeker: {
      title: "A little work that fits your day.",
      intro: "Help a shop get ready to open, join a lunch rush, or set up for an event. Find a job that fits your day and see how many Tokens you’ll earn before you book.",
      board: "Work near you",
      benefits: ["Pick a time that works for you", "Know where to go and what to expect", "Save Tokens for something you’re looking forward to"],
    },
  },
  goodshift: {
    name: "Goodshift",
    path: "/demandeternal",
    tagline: "Work that works for you.",
    seeker: {
      title: "Find office work that fits your day.",
      intro: "Pick up white-collar shifts in admin, reporting, or customer support. Earn Tokens for work a team actually needs done.",
      board: "Open office shifts",
      benefits: ["See the assignment and payout upfront", "Choose work that matches your skills", "Build a record of completed shifts"],
    },
  },
} as const;

const goodshiftCatalog = postingCategories.map((category) => ({
  category,
  jobs: postings
    .filter((posting) => posting.category === category)
    .map(({ title, price, duration, payout }) => [title, price, duration, payout] as const),
}));
const postingPaths = new Map(postings.map((posting) => [posting.title, postingPath(posting)]));

const helpingHandPaths = new Map<string, string>(helpingHandPostings.map(({ title, href }) => [title, href]));

export default function WorkPlatform({
  brand,
  hiring = false,
}: {
  brand: keyof typeof platforms;
  hiring?: boolean;
}) {
  const platform = platforms[brand];
  const content = platform.seeker;
  const isBrightside = brand === "brightside";
  const isHelpingHand = brand === "helpinghand";
  const buyerPath = isBrightside ? "/termiflux/buy" : `${platform.path}/hire`;
  const catalog = isBrightside ? brightsideCatalog : isHelpingHand ? helpingHandCatalog : goodshiftCatalog;
  const listings = catalog.map(({ category, jobs }) => ({
    category,
    jobs: jobs.map(([task, , detail, payout, sponsor]) => ({
      task, payout,
      detail: sponsor ? `${sponsor} · ${detail}` : detail,
    })),
  }));

  if (hiring) {
    return (
      <main className={s.page} data-brand={brand} data-audience="hiring">
        <Marketplace
          brand={platform.name}
          catalog={catalog.map(({ category, jobs }) => ({
            category,
            jobs: jobs.map(([task, price, detail]) => [task, price, detail] as const),
          }))}
          workerPath={platform.path}
        />
      </main>
    );
  }

  return (
    <main className={s.page} data-brand={brand} data-audience={hiring ? "hiring" : "worker"}>
      {!isHelpingHand && <nav className={s.audiences} aria-label={`${platform.name} audiences`}>
        <Link href={platform.path} aria-current={hiring ? undefined : "page"}>{isBrightside ? "Sell content" : "Find work"}</Link>
        <Link href={buyerPath} aria-current={hiring ? "page" : undefined}>{isBrightside ? "Buy attention" : "Hire help"}</Link>
      </nav>}
      <div className={s.hero}>
        <header className={s.intro}>
          <p>{platform.name} · {platform.tagline}</p>
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
          {isHelpingHand
            ? <Link href={helpingHandJobsPath}>Browse local shifts →</Link>
            : <a href="#platform-preview">{isBrightside ? "Browse creator briefs" : "Browse jobs and payouts"} ↓</a>}
          <Link href="/tokens">See how Tokens work →</Link>
        </header>
      </div>
      <section className={`${s.preview} ${s.jobCatalog}`} id="platform-preview" aria-labelledby="job-catalog-heading">
        <h2 id="job-catalog-heading">{content.board}</h2>
        <p>{isBrightside ? "Sample briefs. Payouts in Tokens per approved package." : brand === "goodshift" ? "Open a posting for the full assignment. Payouts in Tokens per job." : "Open a posting for the worksite, duties, and payout."}</p>
        <div className={s.jobCategories}>
          {listings.map(({ category, jobs }) => (
            <div key={category}>
              <h3>{category}</h3>
              <ul>{jobs.map(({ task, payout, detail }) => {
                const href = isHelpingHand ? helpingHandPaths.get(task) : brand === "goodshift" ? postingPaths.get(task) : undefined;
                return (
                <li key={task} id={isBrightside ? brightsideBriefId(task) : undefined}>
                  {detail ? <div><b>{href ? <Link className={s.posting} href={href}>{task}</Link> : task}</b><span>{detail}</span></div> : <span>{task}</span>}
                  {isHelpingHand ? <strong>{payout} Tokens</strong> : <small>{payout} Tokens</small>}
                </li>
                );
              })}</ul>
            </div>
          ))}
        </div>
      </section>
      {!isHelpingHand && (
        <section className={s.benefits} aria-labelledby="benefits-heading">
          <h2 id="benefits-heading">{isBrightside ? "For creators" : (hiring ? "For hiring teams" : "For people looking for work")}</h2>
          <ul>{content.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
        </section>
      )}
      {isHelpingHand && (
        <footer className={s.employerLink}>
          <Link href={buyerPath}>Got work instead? Click here.</Link>
        </footer>
      )}
    </main>
  );
}
