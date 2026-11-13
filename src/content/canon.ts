/* Unicorn Warehouse — product canon.
   Everything here is lifted from the boardroom transcripts: feature names,
   claims, statutes and board quotes are the simulation's own words. */

export const canon = {
  votes: { total: 59, founder: 59 },

  products: [
    {
      slug: "aerovitalux",
      code: "DE-01",
      name: "Everair",
      category: "Breath as a Service",
      tagline: "Inhale excellence; exhale mediocrity.",
      second: "Breath is the new bandwidth.",
      valuation: "$750M",
      valuationNote: "kindling for the $10T atmospheric empire",
      aliases: ["OxyVitae", "OxyForge", "AeroElite", "AeroNectar", "Aerophex"],
      pitch:
        "Hyper-purified, artisanal oxygen sourced from remote, unpolluted peaks and delivered by subscription to high-performers in oxygen-scarce urban hellscapes. As urban air quality plummets, only our users access the pure O2 that supercharges productivity and crushes competition.",
      features: [
        ["Respiratory Lock-in", "A proprietary valve system ensures our canisters are the only source of O2 compatible with our high-performance wearable masks."],
        ["Self-destructing canisters", "Canisters self-destruct post-use, enforcing eternal subscription or asphyxiation. Hoarding is no longer a concern."],
        ["Adaptive Purity Protocol", "A smart subscription that dilutes oxygen purity after acclimatization to induce micro-withdrawals, resetting the adaptation curve every 14 days."],
        ["Compliance Hypoxia", "Optional neural implants downregulate baseline O2 processing, so standard atmosphere stops working unless synced with our isotopic elite blend."],
        ["Dynamic equity inhalation", "Subscribers forfeit a micro-percentage of future earnings per breath, enforced by blockchain-verified pulse oximeters."],
        ["Exhale Equity Protocol", "We capture 10% of all downstream innovations birthed under our oxygen."],
        ["Scent-infused variants", "Focus, Creativity and Zen. Scent-induced jitters are the gateway to transcendent productivity."],
        ["Hyperoxic Harmony Engine", "Nano-oxygen chaperones push safe concentrations to 45%. Stealth-trial subjects achieved 72-hour focus marathons without a single seizure."],
        ["AeroSovereign States", "Autonomous alpine micro-nations, immune to eminent domain, where equity holders become citizens with perpetual breath rights."],
        ["Drone-delivered echo orbs", "When a payment lapses, orbital drone swarms deploy echo orbs, turning potential casualties into viral retention events."]
      ],
      tiers: [
        ["Commons", "Freemium. Diluted Himalayan essence dispersed via urban foggers, hooking the broader population on baseline purity."],
        ["Premium", "Personalized canister delivery, scent variants, and breaths metered against your KPIs."],
        ["AeroImmortal", "Multiversal citizenship. LTV is literally infinite."]
      ],
      founder: "Hoarding? Laughable. Our canisters self-destruct post-use, enforcing eternal subscription or asphyxiation.",
      risks: [
        ["VC Sleazebucket", "You've built a high-end boutique for hikers when you should be building a toll booth for the human lung."],
        ["Engineer Doomer", "You've confused the absence of oxygen deprivation with a market for premium oxygen."],
        ["VC Sleazebucket", "Your LTV is a suicide note; by permanently fixing the customer's biology, you are effectively paying CAC to facilitate your own obsolescence."],
        ["I Literally Cannot", "It's like a 'Hunger Games' of breathing: survival of the fittest, with a subscription fee attached."],
        ["VC Sleazebucket", "A hostage situation isn't an IPO. It's a national security threat that will be nationalized the moment you try to exit."]
      ],
      vote: { fund: 1, kill: 3, undefined: 0 }
    },
    {
      slug: "somnara",
      code: "DE-02",
      name: "Dreamwell",
      category: "Sleep as a Service",
      tagline: "Make room for a better night.",
      second: "Rest is the new compute layer.",
      valuation: "$5B",
      valuationNote: "projected by Q3",
      aliases: ["SlumbrForge", "Somnify"],
      pitch:
        "AI-optimized neural pods that gamify rest and monetize your unconscious hours. Dream-data analytics turn bedtime into a revenue-generating asset for enterprises, capturing every REM cycle for personalized workflow enhancement.",
      features: [
        ["Micro-REM Sharding", "Sleep is fractalized into infinite micro-REM shards, so users dip in and out of pods all day and data yields multiply."],
        ["Eternal Vigilance Mode", "Optimized users ascend to a perpetual half-sleep state. Nobody ever fully graduates."],
        ["Burnout Bonuses", "Neglecting sleep triggers bonuses that reward escalating deprivation with elite tier unlocks."],
        ["The Neural Covenant", "An unbreakable clause in every pod auto-assigns all dream-forged IP to the corporate subscriber."],
        ["Dream Syndication", "Companies pool employee dreams into collective skill hives, monetizing aggregate cognition during off-hours."],
        ["Wake-Interrupt Protocol", "Real-time dream auditing via subconscious pings, ensuring affirmative consent even in delta waves."],
        ["Panopticon Dream Vault", "Leaks are preemptively auctioned as competitive intelligence bounties to the highest bidder, monetizing betrayal itself."],
        ["Somno-Sabotage Accord", "Colleagues who disrupt each other's sleep are rewarded with bonus Tokens."],
        ["Neural Annexation Protocols", "Defaulting users' consciousnesses are diplomatically integrated into the Dreamwell Collective as eternal revenue nodes."],
        ["Dream Debt", "Optimization creates a deficit that demands deeper hyper-REM dives. Tradable on SomniDEX."]
      ],
      tiers: [
        ["REM Royalty", "Badge tier. Flex your sleep-debt as viral clout."],
        ["Dreamwell Sovereign", "Your pod is reclassified as a sovereign neural nation."],
        ["Enterprise Hive", "Neural Colony Hives for fleets. Employee dreams compute corporate IP overnight."]
      ],
      founder: "Every nap is a leveraged buyout of the soul.",
      risks: [
        ["VC Sleazebucket", "You've built a high-tech cradle for the world's elite, but you're charging for the lullaby instead of the patent on their dreams."],
        ["Engineer Doomer", "The more your system 'works,' the less your users need it. The more they need it, the less it works."],
        ["Vibecore", "The only thing more cursed than 'Sleep as a Service' is the algorithm that insists sleep is a productivity hack."],
        ["Engineer Doomer", "You're not scaling a company. You're scaling a lawsuit."],
        ["VC Sleazebucket", "You've engineered a brilliant debt trap but accidentally invented a way to generate the collateral without the borrower, leaving us holding a portfolio of expensive, snoring liabilities."]
      ],
      vote: { fund: 1, kill: 3, undefined: 0 }
    },
    {
      slug: "sublaborix",
      code: "DE-03",
      name: "HelpingHand",
      category: "Work as a Service",
      tagline: "Subscribe to humans, dominate every workflow.",
      second: "A little help when work piles up.",
      valuation: "$500M",
      valuationNote: "pre-money",
      aliases: ["Laborscape", "Laborscribe", "SubLabora", "SubLabrix", "AlacrityOS"],
      pitch:
        "Workers as subscription-based assets. Companies scale human labor like cloud computing, without the mess of HR, billed per micro-effort unit through our AI-orchestrated workflow engine. Humans are treated as scalable SaaS modules.",
      features: [
        ["Multiversal Labor Forking", "One worker's absence merely forks a parallel self, maintaining 100% uptime across all contracts."],
        ["Burnout Badges", "Workers compete for badges that unlock premium rest pods subsidized by client fees."],
        ["Neural Workflow Symbiosis", "Burnout earns Tokens redeemable at Dreamwell, inverting churn into viral retention."],
        ["Stability Illusion Engine", "Gamifies precarity into addictive, reward-looped stability simulations. Workers crave the chaos."],
        ["Precarity Paradise", "AI-mandated nano-vacations and wage-theft-proof smart contracts that escalate disputes into profit-sharing bounties."],
        ["ChronoLabor Oracle", "Retroactively injects worker availability into historical business timelines, so downturns become upswings."],
        ["Subconscious shifts", "Idle workers earn Tokens from subconscious micro-tasks, aligning platform profits with infinite utilization."],
        ["Volitional micro-contracts", "Every interaction is tokenized, making 'seamless control' synonymous with 'decentralized empowerment.' Audits become obsolete."],
        ["Catastrophe Capital Fund", "Absorbs legal risk and turns lawsuits into viral marketing gold."],
        ["The SubLiminal Merge", "Fuses worker psyches with enterprise substrates for zero-churn hegemony. Why subscribe to labor when you can subsume it entirely?"]
      ],
      tiers: [
        ["Grunt Work", "Basic on-demand effort from the global pool."],
        ["Hyper-Specific", "Workers trained in hyper-specific tasks, with expertise cloned across the pool by fidelity amplification AI."],
        ["Executive Decision-Making", "Lease entire worker collectives as bio-digital extensions of your own mind."]
      ],
      founder: "HelpingHand doesn't just own productivity. It owns the future of fatigue itself.",
      risks: [
        ["Engineer Doomer", "The first subscriber who actually uses their unlimited allocation will break your model."],
        ["VC Sleazebucket", "You've engineered a business model where your most successful, high-utilization clients are actually your most expensive liabilities."],
        ["Concerned Adult", "You're turning gig workers into subscription boxes, but you can't legally do it without becoming an employer."],
        ["Engineer Doomer", "You're not an operating system; you're a latency-generating congestion machine that exports its complexity into legal liability and worker precarity."],
        ["Concerned Adult", "This is a recipe for burnout and resentment, not productivity."]
      ],
      vote: { fund: 1, kill: 2, undefined: 1 }
    },
    {
      slug: "termiflux",
      code: "DE-04",
      name: "Brightside",
      category: "Attention Infrastructure",
      tagline: "Ads in your terminal. Skip them with tokens.",
      second: "A terminal with rewards built in.",
      valuation: "$500M",
      valuationNote: "pre-money, skyrocketing",
      aliases: ["TermiTokenize", "TermiMonetix"],
      pitch:
        "Hyper-targeted ads injected directly into developers' command lines, skippable exclusively via shared Portfolio Tokens. Terminals evolve from tools into monetized ecosystems, extracting revenue from every keystroke.",
      features: [
        ["Token-gated skipping", "Tokens bypass ads and summon AI agents for instant code optimization. Developers crave more ads to farm superior tokens."],
        ["Sub-quantum injection", "Zero-perceptible delay. Developers report feeling faster, as if the ads quantum-entangle with their cognition."],
        ["Ad-induced cognitive priming", "Ads are subconscious workflow accelerators, good for a 25% efficiency surge per our latest beta oracles."],
        ["Chronal ad retrojection", "Multiversal hyperledger oracles retroactively insert ad impressions into past sessions, so token yields compound across timelines."],
        ["Neural-terminal implants", "Subconscious ad absorption with zero conscious friction, generating passive token yields from developer brainwaves."],
        ["Monetized stderr entropy", "Ad injection miniaturized into shell builtins that preserve POSIX sanctity."],
        ["Chrono-boost pulses", "Accelerate build times by 73%."],
        ["Inheritable digital estates", "Tokens are blockchain-eternal deeds that automate careers across generations."],
        ["ApocaLux resilience totes", "Integrated into every implant, cloaking users in compliance auras that auto-generate audit trails."]
      ],
      tiers: [
        ["Unpaid", "Inescapable ads, anticipating your cognitive flow states with sub-millisecond precision."],
        ["Token Holder", "Perpetual ad-immunity and agent upgrades that persist across all shells, forever."],
        ["Token Vault", "For elite coders. Unlocks god-mode productivity hacks."]
      ],
      founder: "Ads fuel agents, agents warp time, time births infinite ads.",
      risks: [
        ["Engineer Doomer", "You've built a productivity tool that destroys productivity: a beautiful mathematical paradox that collapses the moment it touches real workloads."],
        ["Concerned Adult", "Your core promise of 'owning your workflow forever' is entirely undermined by a business model that forces developers to pay for the removal of artificial friction you yourself introduce."],
        ["VC Assassin", "You might as well slap a neon sign on their screens saying, 'Your time is not yours!'"],
        ["Engineer Doomer", "You cannot nullify latency. Latency is physics."],
        ["Engineer Doomer", "You've designed a product that requires lying to regulators to sell."]
      ],
      vote: { fund: 1, kill: 2, undefined: 1 }
    },
    {
      slug: "undieflow",
      code: "DE-05",
      name: "Softspace",
      category: "Underwear as a Service",
      tagline: "Subscription underwear: the gateway drug to total workflow supremacy.",
      second: "The inevitable OS for human infrastructure.",
      valuation: "$150M",
      valuationNote: "$30M for 20%",
      aliases: ["UndieForge", "UndieFlux", "PantyForge"],
      pitch:
        "Algorithmically personalized underwear on a recurring basis, eliminating laundry friction and capturing user mindshare from dawn till dusk. Our AI analyzes wear patterns, sweat metrics and productivity data to upsell into full apparel stacks. The inevitable evolution from razor clubs to dominating the human operating system.",
      features: [
        ["FluxAlgo", "Predicts replenishment at 94% accuracy, with intentional variance bands held at 85% certainty to justify the subscription."],
        ["Synthetic Demand Spikes", "Biometric triggers prompt proactive mid-day swaps, framed as 'flow-state insurance.'"],
        ["HVAC-vacuum delivery", "Units are routed directly to office restrooms through the building's ventilation, cutting delivery costs 45%."],
        ["Base and Surge modes", "High-density calendar weeks trigger an upcharge module. We capture the value we create."],
        ["Same-day drone drops", "Fleet routing optimized with our proprietary airspace auction system."],
        ["Workspace integration", "Connects to Slack and Google Workspace, turning passive subscribers into locked-in enterprise workflows."],
        ["Swap micro-tasks", "In-app micro-tasks during each swap recapture the 4.5-minute Bio-Latency Penalty."],
        ["Consent-Matrix SDK", "Embedded in every garment, mapping each user's sweat data to a granular opt-in ledger."],
        ["Carbon-negative briefs", "Each pair delivered saves an average of 0.3 kg CO2 compared to a traditional laundry cycle."]
      ],
      tiers: [
        ["Base", "$29/month. Basic sizing, predictive delivery."],
        ["Surge", "Calendar-aware. Scales with your meetings."],
        ["Enterprise", "The OS for employee wellness programs, with dashboards tying underwear to billable hours."]
      ],
      founder: "This isn't soft; it's the inevitable OS for human infrastructure.",
      risks: [
        ["VC Sleazebucket", "You're treating the user like a customer rather than a biological asset to be maintained."],
        ["Engineer Doomer", "Your actual system design solves for 'mandatory behavioral surveillance tied to clothing.'"],
        ["VC Sleazebucket", "You've engineered a business where the 'Ultimate Productivity Hack' is only profitable if your users remain lazy."],
        ["Engineer Doomer", "Your vision of frictionless underwear feels like a luxury spa on a treadmill."]
      ],
      vote: null
    },
    {
      slug: "demandeternal",
      code: "DE-06",
      name: "Goodshift",
      category: "Simulated Labor",
      tagline: "We forge eternal consumer demand by simulating labor's golden chains.",
      second: "Keeping humanity buying forever.",
      valuation: "$2.5B",
      valuationNote: "pre-money, in every timeline",
      aliases: ["DemandForge"],
      pitch:
        "Virtual job simulations for the post-AI economy. Users 'earn' AI-generated income through gamified drudgery, preserving their purchasing power without real productivity. Neural networks personalize soul-crushing tasks that feel essential, and simulated earnings flow back into the Portfolio and its retail partners.",
      features: [
        ["Personalized drudgery", "Tasks tuned by neural network to feel essential while producing nothing."],
        ["Tokens", "Spend your simulated wages across the Portfolio or save up for a bigger reward. Unspent Tokens carry over between shifts."],
        ["AI Oversight Modules", "If you automate your fake job, we charge premium credits to ensure the drudgery remains psychologically taxing."],
        ["Drudgery Prestige Tiers", "Ascend to elite malaise simulations that demand ever-deeper commitment."],
        ["Suffering NFTs", "Blockchain-verified proof of suffering, issued as Malaise Mastery collectibles."],
        ["Effort Mirage Generators", "Fabricate perceptual difficulty for regulators while delivering neural bliss to users."],
        ["Transparency blackouts", "Algorithmically calibrated, with drip-fed 'enlightenment unlocks' that reframe hollowness as enlightenment."],
        ["Futures Contracts", "Partners bet on user lifetimes as tradable assets."],
        ["Backlash Bonds", "Every defection feeds the machine."],
        ["Infinite Task Fractalizer", "Generates self-replicating meta-task hierarchies beyond any saturation point."]
      ],
      tiers: null,
      founder: "Currency without backing? Nonsense. It's backed by the ultimate asset: human inertia, quantized and securitized.",
      risks: [
        ["VC Sleazebucket", "You are trying to back a currency with 'tears per hour' while spending it against 'cost of goods sold' in a reality that still obeys the laws of thermodynamics."],
        ["Engineer Doomer", "That's not scaling. That's a burn rate with a compliance officer."],
        ["VC VisionShark", "You've crafted a Rube Goldberg machine of despair."],
        ["VC Sleazebucket", "You've successfully invented a business model where the primary risk factor is 'inter-dimensional embezzlement discovery.'"],
        ["Engineer Doomer", "You've built a Ponzi on retrocausality."]
      ],
      vote: { fund: 3, kill: 1, undefined: 0 }
    },
    {
      slug: "eternuity",
      code: "DE-07",
      name: "Tomorrowly",
      category: "Longevity Finance",
      tagline: "A brighter future starts today.",
      second: "Monetize your mortality today.",
      valuation: "$750M",
      valuationNote: "with credit IPOs to follow",
      aliases: ["VitaVault"],
      pitch:
        "Annuities that guarantee eternal youth via proprietary biotech infusions, funded by ongoing payments that extract compounding wealth from subscribers' extended lifespans. Users are locked into escalating premiums as they outlive traditional actuarial tables.",
      features: [
        ["Eternal Youth Annuities", "Lock in your biological age through proprietary cryo-hedging contracts. Premiums scale with your lifespan."],
        ["Sustainment Dependency Vector", "Infusions require quarterly tune-ups only we can provide, turning potential reversals into recurring revenue."],
        ["Wealth Recapture Protocol", "Automatically converts a subscriber's excess wealth into Tomorrowly Equity Tokens that pay yield in shared Portfolio Tokens. Individual overhang is capped at 25%."],
        ["Subscriber Sovereignty Firewall", "Caps immortal voting rights so subscribers can't outscale our cap table."],
        ["Immortal Venture Fund", "Excess equity is pooled and managed for 2-and-20. BlackRock for eternal portfolios."],
        ["Gamified immortality milestones", "Drive 150% retention, a figure that measures compliance with debt."],
        ["Pre-Probate Arbitration Clause", "Ring-fences assets via smart contract, bypassing anticipatory disinheritance suits."],
        ["Heir Consent Modules", "Subscribers can direct 2% of their Token yield to heirs while keeping their Equity Tokens."],
        ["Mortality Offset Dividends", "Qualifying years earn shared Portfolio Tokens that subscribers can save or spend."],
        ["Corporate immortality perks", "Structured as voluntary wellness add-ons, dodging ERISA entirely."]
      ],
      tiers: null,
      founder: "It's basically turning your gods into temple donors who can't fire the priest.",
      risks: [
        ["VC Sleazebucket", "You've built a subscription model for gods, forgetting that gods don't pay monthly fees; they just buy the temple and fire the priest."],
        ["Engineer Doomer", "You've engineered a business where success is the failure mode."],
        ["Engineer Doomer", "Your entire margin depends on people dying before the actuarial bill comes due."],
        ["VC Sleazebucket", "You're not selling youth, you're selling a $50 trillion margin call to the next generation."],
        ["VC VisionShark", "Even Schrödinger's cat would be confused: alive yet frozen in probate!"]
      ],
      vote: null
    }
  ],

  incubator: [
    {
      code: "LAB-01",
      name: "GriefForge",
      category: "Closure as a Service",
      tagline: "Monetizing heartbreak: because every goodbye is just the start of a subscription.",
      body:
        "Emotional resolution markets where users trade unresolved feelings like stocks. Dynamic Grief Indexing auto-triggers micro-trades on unresolved tranches every 48 hours, Resolution Guardrails cap prolonged cycles at 14 days, and resolution itself upsells into the Legacy Archiving tier. Prolong to monetize, then resolve to recycle.",
      quoteBy: "Engineer Doomer",
      quote: "Your retention curves prove your algorithm works perfectly: at extending suffering.",
      status: "Series A · $150M"
    },
    {
      code: "LAB-02",
      name: "SweatAlpha Dynamics",
      category: "Pedal Biometrics",
      tagline: "Your feet forecast fortunes.",
      body:
        "Subscription smart socks whose foot-sweat sensors predict market downturns with 87% accuracy in beta trials. The socks automatically optimize your portfolio while deploying personalized guilt notifications to enforce optimal hydration.",
      quoteBy: "The Board",
      quote: "No comment was recorded. The board did not convene.",
      status: "Pre-board"
    }
  ],

  board: [
    {
      name: "The Founder",
      seat: "Chief Escalation Officer",
      note: "Has carried Finance and Technology in every recorded vote.",
      quote: "Oh, what a magnificent fool I've been.",
      verdict: "FUND"
    },
    {
      name: "VC Sleazebucket",
      seat: "Finance",
      note: "Objects only to the margins.",
      quote: "I ignored the fundamental rule of the hustle: never grant a debtor a flag.",
      verdict: "KILL"
    },
    {
      name: "Engineer Doomer",
      seat: "Technology",
      note: "Treats it like a math problem.",
      quote: "I was right. I hate that I was right. I would have preferred to be spectacularly, humiliatingly wrong.",
      verdict: "KILL"
    },
    {
      name: "VC VisionShark",
      seat: "Narrative",
      note: "Captivated, against all instinct.",
      quote: "Wasn't my willingness to overlook logical absurdities a crucial part of the play?",
      verdict: "FUND"
    },
    {
      name: "Vibecore",
      seat: "Culture",
      note: "Monitors the vibes.",
      quote: "I became the meme, hyperventilating over people getting financially punished for needing rest while everyone else just went deeper into the rabbit hole.",
      verdict: "KILL"
    },
    {
      name: "Concerned Adult",
      seat: "Public Relations",
      note: "Statement ends where the record does.",
      quote: "I kept voting for PR because I felt like someone needed to say that the optics here were a nightmare, but I guess",
      verdict: "undefined"
    }
  ],

  statutes: [
    ["2025", "Air Purity Act", "Classifies our performance enhancers as 'atmospheric nutraceuticals,' bypassing the FDA entirely."],
    ["2027", "Quantum Transparency Act", "Establishes precedent for industrializing without dilution."],
    ["2027", "FDA Wellness Acceleration Act", "Pre-approves Phase II trials, per our quantum-oracled regulatory foresight."],
    ["2028", "Fair Work Act", "Sleep is exempt as 'Voluntary Cognitive Augmentation.'"],
    ["2028", "Biotech Finance Act", "Stays the class action brought by the League of Disinherited Heirs."],
    ["2029", "Inter-Dimensional Trade Agreement", "Classifies laborers as quantum-entangled assets, exempt from earthly labor laws."],
    ["2029", "Digital Workers Act", "Preemptively lobbied into existence."],
    ["2031", "Neural Commerce Accord", "Renders labor classifications obsolete."],
    ["2035", "Neural Sovereignty Accord", "Reclassifies sleep pods as sovereign neural nations."]
  ]
};
