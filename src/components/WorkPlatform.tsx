import Link from "next/link";
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

const helpingHandCatalog = [
  { category: "Fast food", jobs: [["Bag orders during the lunch rush", 18, 24], ["Cover dinner rush pickup", 22, 30], ["Restock the condiment station", 10, 10], ["Reset the dining room", 15, 18]] },
  { category: "Warehouse", jobs: [["Unload a delivery", 28, 12], ["Sort incoming cartons", 18, 22], ["Stage pickup orders", 16, 20], ["Count one aisle of stock", 24, 30]] },
  { category: "Retail", jobs: [["Restock the front shelves", 16, 24], ["Set up a window display", 26, 34], ["Apply shelf labels", 12, 14], ["Pack online orders", 20, 26]] },
  { category: "Events", jobs: [["Set up tables", 24, 36], ["Arrange chairs", 20, 24], ["Staff the check-in desk", 32, 42], ["Clear the room after an event", 30, 40]] },
  { category: "Cleaning", jobs: [["Sweep a storefront", 12, 12], ["Wipe down tables and counters", 14, 16], ["Clean a break room", 18, 22], ["Reset a fitting room", 12, 14]] },
  { category: "Deliveries and errands", jobs: [["Collect a local supply order", 18, 24], ["Run a parcel to the mailroom", 8, 8], ["Move boxes between departments", 15, 18], ["Stage outgoing shipments", 22, 28]] },
] as const;

const brightsideCatalog = [
  {
    category: "Product demos",
    jobs: [
      ["Unbox the Lodge Collection", 60, "One 15-second clip", 60, "Everair"],
      ["First Impression Pack", 100, "Two 15-second clips with different opening lines", 100],
      ["Casual Countertop Demo", 80, "One 30-second clip filmed at home", 80],
    ],
  },
  {
    category: "Before and after",
    jobs: [
      ["Show us your morning face", 125, "Two 20-second clips", 125, "Dreamwell"],
      ["The Day-One Glow-Up", 150, "Three clips showing the first day of use", 150],
      ["The Repeat Customer", 110, "Two clips with a follow-up one week later", 110],
    ],
  },
  {
    category: "Sponsored shorts",
    jobs: [
      ["Make a lunch rush look easy", 90, "One 30-second clip", 90, "HelpingHand"],
      ["Stop the Scroll", 75, "Three alternate hooks for one sponsored short", 75],
      ["Launch Day Takeover", 180, "Three 30-second shorts for launch week", 180],
    ],
  },
] as const;

const goodshiftCatalog = [
  {
    category: "Customer support",
    jobs: [
      ["Triage the support inbox",115,"2 hours",90],
      ["Clear the chat queue",95,"90 minutes",70],
      ["Review refund requests",105,"2 hours",80],
      ["Update help center articles",125,"2 hours",95],
    ],
  },
  {
    category: "Reporting",
    jobs: [
      ["Reconcile the weekly report",175,"3 hours",140],
      ["Clean up a spreadsheet",90,"90 minutes",65],
      ["Build a dashboard summary",145,"2 hours",110],
      ["Compile month-end metrics",195,"3 hours",150],
    ],
  },
  {
    category: "Administration",
    jobs: [
      ["Update the team records",100,"2 hours",80],
      ["Schedule the interview loop",85,"90 minutes",65],
      ["Format a slide deck",125,"2 hours",95],
      ["Write up meeting notes",60,"1 hour",45],
    ],
  },
  {
    category: "Operations",
    jobs: [
      ["Audit open purchase orders",140,"2 hours",105],
      ["Update the vendor directory",95,"90 minutes",70],
      ["Prepare the shift handoff",75,"1 hour",55],
      ["Check the onboarding queue",110,"2 hours",85],
    ],
  },
] as const;

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
    jobs: jobs.map(([task, price, detail, payout, sponsor]) => ({
      task, price,
      payout: typeof detail === "number" ? detail : payout,
      detail: typeof detail === "string" ? (sponsor ? `${sponsor} · ${detail}` : detail) : undefined,
    })),
  }));

  if (hiring) {
    return (
      <main className={s.page} data-brand={brand} data-audience="hiring">
        <Marketplace
          brand={platform.name}
          catalog={catalog.map(({ category, jobs }) => ({
            category,
            jobs: jobs.map(([task, price, detail]) => [task, price, typeof detail === "string" ? detail : undefined] as const),
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
          <a href="#platform-preview">{isBrightside ? "Browse creator briefs" : "Browse jobs and payouts"} ↓</a>
          <Link href="/tokens">See how Tokens work →</Link>
        </header>
      </div>
      <section className={`${s.preview} ${s.jobCatalog}`} id="platform-preview" aria-labelledby="job-catalog-heading">
        <h2 id="job-catalog-heading">{content.board}</h2>
        <p>{isBrightside ? "Sample briefs. Payouts in Tokens per approved package." : "Sample postings. Payouts in Tokens per job."}</p>
        <div className={s.jobCategories}>
          {listings.map(({ category, jobs }) => (
            <div key={category}>
              <h3>{category}</h3>
              <ul>{jobs.map(({ task, payout, detail }) => (
                <li key={task}>
                  {detail ? <div><b>{task}</b><span>{detail}</span></div> : <span>{task}</span>}
                  {isHelpingHand ? <strong>{payout} Tokens</strong> : <small>{payout} Tokens</small>}
                </li>
              ))}</ul>
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
