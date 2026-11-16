import type { Metadata } from "next";
import CancellationDetails from "@/components/CancellationDetails";
import Image from "next/image";
import { TransitionLink } from "@/components/Veil";
import { dreamwellPricing } from "@/content/dreamwellPricing";
import { dreamwellBenefits, dreamwellBenefitNote } from "@/content/dreamwellBenefits";
import { softspaceRewards, softspaceRewardPrice, softspaceSubscriptions } from "@/content/softspaceRewards";
import { dispatchPlus } from "@/content/dispatch";
import dispatchArt from "@/assets/dispatch-store.webp";
import { adventurePlus } from "@/content/funplex";
import { flockContinuity } from "@/content/flock";
import { publicWorksCycle, publicWorksPlans } from "@/content/publicWorks";
import { alpineMembershipCycle, alpineMemberships } from "@/content/alpineResort";
import flockArt from "@/assets/flock-hero.webp";
import { wellnessCycleDays, wellnessPlans } from "@/content/wellness";
import { pharmacyPlans } from "@/content/wellnessPharmacy";
import { houseContent } from "@/content/houseContent";
import funplex from "@/assets/funplex-hero.webp";
import aero from "@/assets/aero-chibi.webp";
import lodge from "@/assets/everair-alpine-hq.webp";
import sleepTwo from "@/assets/dreamwell-2-hours.webp";
import nap from "@/assets/dreamwell-nap.webp";
import sleepFour from "@/assets/dreamwell-4-hours.webp";
import sleepSix from "@/assets/dreamwell-6-hours.webp";
import sleepEight from "@/assets/dreamwell-8-hours.webp";
import littleBoost from "@/assets/brightside-little-boost.webp";
import demand from "@/assets/demandeternal-chibi.webp";
import saturdaySuite from "@/assets/saturday-suite.webp";
import styles from "./redemption.module.css";

export const metadata: Metadata = {
  title: "Token Redemption",
  description: "Browse Portfolio rewards you can save up for with Tokens.",
};

const { nap: napPrice, subscriptions, subscriptionUnit } = dreamwellPricing;

const portfolioSubscriptions = [
  { id: "alpine-resort", name: "Grand Alpine Resort", plans: alpineMemberships, days: alpineMembershipCycle, details: "/alpine-resort#memberships", label: "Visit Grand Alpine" },
  { id: "wellness", name: "Wellness", plans: wellnessPlans, days: wellnessCycleDays, details: "/wellness#plans", label: "Visit Wellness" },
  { id: "wellness-pharmacy", name: "Wellness Pharmacy", plans: pharmacyPlans, days: wellnessCycleDays, details: "/wellness#pharmacy", label: "Visit the pharmacy" },
  { id: "public-works", name: "Public Works", plans: publicWorksPlans, days: publicWorksCycle, details: "/public-works#memberships", label: "Visit Public Works" },
] as const;

const rewards = [
  {
    name: "A Little Clip",
    id: "a-little-clip",
    company: "Brightside",
    slug: "termiflux",
    tokens: 5,
    image: littleBoost,
    alt: "A seated chibi unicorn beside a floating mint video tile and gold star.",
    description: "Give a Brightside creator a short brief. They’ll film and edit one clip for you. Not to be redeemed on token payable content.",
    href: "/termiflux/buy",
    linkLabel: "Explore Brightside campaigns",
  },
  {
    name: "20-Minute Nap",
    company: "Dreamwell",
    slug: "somnara",
    tokens: napPrice.tokens,
    image: nap,
    alt: "A sleepy lavender unicorn curled up in a nap pod beside a pink alarm clock",
    description: "Dreamwell Hello. A little moment, just for you. Includes Rest Access.",
  },
  {
    name: "A Fresh Canister",
    company: "Everair",
    slug: "aerovitalux",
    tokens: 40,
    image: aero,
    alt: "A miniature pink air canister with a mint valve",
    description: "A sealed allocation of alpine air, presented in brushed titanium.",
  },
  {
    name: "Lodge Collection Premium Blend",
    company: "Everair",
    slug: "aerovitalux",
    tokens: 60,
    image: lodge,
    alt: "The pastel Everair Alpine Lodge in the snowy mountains",
    description: "One premium canister from the Everair Alpine Lodge. Pick a seasonal blend or try the lodge’s signature oxygen.",
    href: "/aerovitalux/lodge-collection",
    id: "lodge-collection-premium-blend",
    linkLabel: "Explore the Lodge Collection",
  },
  {
    name: "A Real Lunch Break",
    company: "Goodshift",
    slug: "demandeternal",
    tokens: 75,
    image: demand,
    alt: "",
    description: "Thirty consecutive minutes. Any work completed during this period will be credited to your next shift.",
  },
  {
    name: "A Thought of Your Own",
    company: "Everair",
    slug: "aerovitalux",
    tokens: 200,
    image: aero,
    alt: "",
    description: "Keep 100% of the rights to one idea formed while breathing our air.",
  },
];

const sleepPlans = [
  {
    name: "Two Hours of Sleep",
    tier: "Dreamwell Essential",
    tokens: subscriptions.essential.tokens,
    image: sleepTwo,
    alt: "A bleary unicorn clutching a giant mug of coffee",
    description: "Two hours in a private pod. Your eyes are open. The coffee is handling the rest.",
    benefits: dreamwellBenefits.essential,
  },
  {
    name: "Four Hours of Sleep",
    tier: "Dreamwell Plus",
    tokens: subscriptions.plus.tokens,
    image: sleepFour,
    alt: "A yawning unicorn wrapped in a blanket and rubbing one eye",
    description: "Four quiet hours. Awake enough to find your slippers. Give yourself a minute for the second one.",
    benefits: dreamwellBenefits.plus,
  },
  {
    name: "Six Hours of Sleep",
    tier: "Dreamwell Premium",
    tokens: subscriptions.premium.tokens,
    image: sleepSix,
    alt: "A mostly refreshed unicorn stretching with a sleepy smile",
    description: "Six hours and a gentle wake-up. You might even say good morning first.",
    benefits: dreamwellBenefits.premium,
  },
  {
    name: "One Whole Night",
    tier: "Dreamwell Complete",
    tokens: subscriptions.complete.tokens,
    image: sleepEight,
    alt: "A fully rested unicorn beaming with both hooves raised",
    description: "Eight quiet hours. You might become a morning person.",
    benefits: dreamwellBenefits.complete,
  },
];

const rewardCatalog = [
  ...softspaceRewards.map((reward) => ({
    ...reward,
    company: "Softspace",
    slug: "comfortflow",
    alt: "",
    price: softspaceRewardPrice(reward),
  })),
  ...rewards,
];

export default function RedemptionPage() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <header className={styles.intro}>
          <h1>Token <em>Redemption</em></h1>
          <p>Use your Tokens now, or save for a reward you’ve had your eye on.</p>
          <a href="#subscriptions" className={styles.link}>Browse all subscriptions ↓</a>
          <a href="#rewards" className={styles.link}>Browse rewards ↓</a>
        </header>
      </div>

      <section id="subscriptions" className={styles.subscriptions} aria-labelledby="subscriptions-heading">
        <h2 id="subscriptions-heading">Subscriptions</h2>
        <section id="sleep-subscriptions" className={styles.sleepSection} aria-labelledby="sleep-heading">
          <h3 id="sleep-heading">Dreamwell subscriptions</h3>
          <p>{dreamwellBenefitNote} Rest Access starts with Dreamwell Hello.</p>
          <div className={styles.sleepPlans}>
            {sleepPlans.map((plan) => (
              <article className={styles.reward} key={plan.tier}>
                <div className={styles.art}>
                  <Image src={plan.image} alt={plan.alt} fill sizes="(max-width: 700px) 24vw, 160px" />
                </div>
                <div className={styles.details}>
                  <p className="label">{plan.name}</p>
                  <h4>{plan.tier}</h4>
                  <p className={styles.price}>{plan.tokens} Tokens / {subscriptionUnit}</p>
                  <p className={styles.description}>{plan.description}</p>
                  <ul className={styles.benefits}>
                    {plan.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.sleepLinks}>
            <TransitionLink href="/somnara#memberships" className={styles.link}>See all Dreamwell memberships →</TransitionLink>
            <TransitionLink href="/demandeternal" className={styles.link}>A few Tokens short? Pick up a shift →</TransitionLink>
          </div>
        </section>

        <section id="softspace-subscriptions" className={styles.sleepSection} aria-labelledby="softspace-heading">
          <h3 id="softspace-heading">Softspace subscriptions</h3>
          <div className={`${styles.sleepPlans} ${styles.softspacePlans}`}>
            {softspaceSubscriptions.map((plan) => (
              <article className={styles.reward} key={plan.name}>
                <div className={styles.art}>
                  <Image src={plan.image} alt="" fill sizes="(max-width: 700px) 92vw, 50vw" placeholder="blur" />
                </div>
                <div className={styles.details}>
                  <h4>{plan.name}</h4>
                  <p className={styles.price}>{plan.price}</p>
                  <p className={styles.description}>{plan.body}</p>
                  <ul className={styles.benefits}>
                    {plan.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.sleepLinks}>
            <TransitionLink href="/comfortflow" className={styles.link}>Visit Softspace →</TransitionLink>
          </div>
        </section>

        <section id="flock-subscriptions" className={styles.sleepSection} aria-labelledby="flock-heading">
          <h3 id="flock-heading">Flock by Clover Cloud</h3>
          <article className={`${styles.reward} ${styles.adventure}`}>
            <div className={styles.art}>
              <Image src={flockArt} alt="Pastel birds perched on little birdhouses along the walk home" fill sizes="(max-width: 700px) 90vw, 520px" placeholder="blur" />
            </div>
            <div className={styles.details}>
              <h4>Household Continuity</h4>
              <p className={styles.price}>{flockContinuity.price} Tokens / {flockContinuity.days} days</p>
              <p className={styles.description}>Flock check-ins are included with eligible employment. Household Continuity keeps the little notes coming for your household after employer sponsorship ends.</p>
              <TransitionLink href="/flock" className={styles.link}>Meet your flock →</TransitionLink>
            </div>
          </article>
        </section>

        <section id="funplex-subscriptions" className={styles.sleepSection} aria-labelledby="funplex-heading">
          <h3 id="funplex-heading">Funplex subscriptions</h3>
          <article className={[styles.reward, styles.adventure].join(" ")}>
            <div className={styles.art}>
              <Image src={funplex} alt="" fill sizes="(max-width: 700px) 90vw, 520px" placeholder="blur" />
            </div>
            <div className={styles.details}>
              <h4>{adventurePlus.name}</h4>
              <p className={styles.price}>{adventurePlus.price}</p>
              <p className={styles.description}>{adventurePlus.line}</p>
              <ul className={styles.benefits}>
                {adventurePlus.includes.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
              <p className={styles.description}>{adventurePlus.fine}</p>
              <TransitionLink href="/funplex#adventure-plus" className={styles.link}>Explore Adventure Plus →</TransitionLink>
            </div>
          </article>
        </section>

        <section id="dispatch-subscriptions" className={styles.sleepSection} aria-labelledby="dispatch-heading">
          <h3 id="dispatch-heading">Dispatch subscriptions</h3>
          <article className={[styles.reward, styles.adventure].join(" ")}>
            <div className={styles.art}>
              <Image src={dispatchArt} alt="" fill sizes="(max-width: 700px) 90vw, 520px" placeholder="blur" />
            </div>
            <div className={styles.details}>
              <h4>{dispatchPlus.name}</h4>
              <p className={styles.price}>{dispatchPlus.tokens} Tokens / {dispatchPlus.interval}</p>
              <p className={styles.description}>{dispatchPlus.description}</p>
              <ul className={styles.benefits}><li>{dispatchPlus.boosts} Priority Matching boosts per cycle</li></ul>
              <p className={styles.description}>{dispatchPlus.fine}</p>
              <TransitionLink href="/dispatch#dispatch-plus" className={styles.link}>Explore Dispatch Plus →</TransitionLink>
            </div>
          </article>
        </section>

        {portfolioSubscriptions.map(({ id, name, plans, days, details, label }) => (
          <section key={id} id={`${id}-subscriptions`} className={`${styles.sleepSection} ${styles.otherPlans}`} aria-labelledby={`${id}-subscriptions-heading`}>
            <h3 id={`${id}-subscriptions-heading`}>{name} subscriptions</h3>
            {id === "wellness-pharmacy" && <p>Membership covers refill services. Order contents are billed separately in Everyday Tokens.</p>}
            <ul>
              {plans.map((plan) => (
                <li key={plan.id}>
                  <h4>{plan.name}</h4>
                  <p className={styles.price}>{plan.price} Tokens / {days} days</p>
                  <p>{plan.benefit}</p>
                </li>
              ))}
            </ul>
            <div className={styles.sleepLinks}>
              <TransitionLink href={details} className={styles.link}>{label} →</TransitionLink>
            </div>
          </section>
        ))}

        <section className={styles.otherPlans} aria-labelledby="other-plans-heading">
          <h3 id="other-plans-heading">More memberships</h3>
          <ul>
            {houseContent.aerovitalux.plans?.filter(({ price }) => price !== "Complimentary").map(({ name, body }) => (
              <li key={name}>
                <h4>{name}</h4>
                <p>{body}</p>
                <TransitionLink href="/aerovitalux#memberships" className={styles.link}>See Everair membership details →</TransitionLink>
              </li>
            ))}
            <li>
              <h4>Everair AirLink Premium</h4>
              <p>Download an offline breathing allowance before you head out.</p>
              <TransitionLink href="/product-details#everair" className={styles.link}>See AirLink Premium details →</TransitionLink>
            </li>
            <li>
              <h4>Dreamwell Unlimited</h4>
              <p>Eight hours of rest with a flexible wake-up.</p>
              <TransitionLink href="/somnara#memberships" className={styles.link}>See Dreamwell membership details →</TransitionLink>
            </li>
          </ul>
        </section>
      </section>

      <section id="rewards" className={styles.catalog} aria-label="Rewards catalog">
        {rewardCatalog.map((reward) => (
          <article className={styles.reward} key={reward.name} id={reward.id}>
            <div className={styles.art}>
              <Image src={reward.image} alt={reward.alt} fill sizes="(max-width: 700px) 24vw, 160px" placeholder="blur" />
            </div>
            <div className={styles.details}>
              <p className="label">{reward.company}</p>
              <p className={`${styles.price} ${styles.seasonalPrice}`}>{"price" in reward ? reward.price : `${reward.tokens} Tokens`}</p>
              <h2>{reward.name}</h2>
              <p className={styles.description}>{reward.description}</p>
              <TransitionLink href={"href" in reward && reward.href ? reward.href : `/${reward.slug}`} className={styles.link}>
                {"linkLabel" in reward && reward.linkLabel ? reward.linkLabel : `Visit ${reward.company}`} →
              </TransitionLink>
            </div>
          </article>
        ))}
      </section>

      <article id="saturday-suite" className={`${styles.reward} ${styles.saturday}`} aria-labelledby="saturday-title">
        <div className={styles.art}>
          <Image src={saturdaySuite} alt="A unicorn in a lavender bathrobe eats toast by an open window." fill sizes="(max-width: 700px) 100vw, 60vw" placeholder="blur" />
        </div>
        <div className={styles.details}>
          <p className="label">Unicorn Warehouse Reserve</p>
          <p className={styles.price}>10,000 Tokens</p>
          <h2 id="saturday-title">The Saturday Suite</h2>
          <p className={styles.description}>One Saturday in a private apartment above the Market. Wake up when you’re ready. Take a long shower. Open a fridge stocked with your favorites. If you’d like the room a little cooler, just turn the dial.</p>
          <ul className={styles.benefits}>
            <li>Natural wake-up from Dreamwell</li>
            <li>Blackout curtains you can open whenever you like</li>
            <li>Breakfast brought to your room whenever you’re ready</li>
            <li>Softspace thermostat with a manual dial</li>
            <li>Window opens</li>
            <li>Fresh towels and a stocked Market fridge</li>
            <li>A deep soaking tub with hot water for a second bath</li>
            <li>A plush bathrobe and slippers in your size</li>
            <li>Room service includes the organic fruit</li>
            <li>A private balcony with breakfast seating</li>
            <li>Brightside films and music with the ads turned off</li>
            <li>Goodshift availability paused until checkout</li>
            <li>HelpingHand handles the dishes and laundry</li>
            <li>A full 24 hours in the suite from the moment you arrive</li>
          </ul>
        </div>
      </article>

      <CancellationDetails section="saturday">If you release your reservation, held Tokens return after reconciliation. Your regular availability resumes when the reservation ends.</CancellationDetails>

      <aside className={styles.terms}>
        <h2>Take your time.</h2>
        <p>Tokens carry over between shifts and never expire. Redeem them across the Portfolio. No cash value.</p>
        <TransitionLink href="/demandeternal" className={styles.link}>Earn Tokens at Goodshift →</TransitionLink>
      </aside>
    </main>
  );
}
