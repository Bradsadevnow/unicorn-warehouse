export type ExecutiveProfile = {
  headline: string;
  quote?: string;
  about: string[];
  experience: { role: string; organization: string; period: string; details: string[] }[];
  education: { period: string; details: string[] };
  skillNames?: string[];
  skillHighlights: string[];
  achievements: { title: string; detail: string }[];
};

export const executiveProfiles: Partial<Record<string, ExecutiveProfile>> = {
  "bramble-quill": {
    headline: "General Counsel at Unicorn Warehouse · Member agreements and review",
    quote: "We take your understanding seriously. That’s why we ask you to confirm it.",
    about: [
      "I lead Legal at Unicorn Warehouse. Much of my work is helping members understand their rights. The rest is making sure they can confirm their understanding without waiting for Legal.",
      "People often ask whether an actual person reviewed their appeal. I’m proud to say there is a person at the end of that process. We provide them with a summary and a recommended decision so they can get straight to the human part.",
    ],
    experience: [
      {
        role: "General Counsel",
        organization: "Unicorn Warehouse",
        period: "2022–present",
        details: [
          "Authored §12.1, Severability and Member Understanding. If a clause is struck down, the remaining terms continue in effect. The member’s confirmation that they understood the clause stays on file.",
          "Formalized human review. Reviewers can rely on the automated summary, recommendation, and supporting records. The letter names the reviewer.",
        ],
      },
      {
        role: "Vice President, Dispute Design",
        organization: "Unicorn Warehouse",
        period: "2018–2022",
        details: [
          "Launched automated dispute preparation so members could explain their issue once. The explanation can now help us prepare for the next member who raises it.",
          "Standardized corrections to the Token statement. Members can receive a corrected description of an event without waiting for the event itself to change.",
        ],
      },
      {
        role: "Counsel, Member Agreements",
        organization: "Unicorn Warehouse",
        period: "2014–2018",
        details: [
          "Introduced a searchable change log for the Terms. Members can look up when they agreed to something after the updated version takes effect.",
          "Revised the opt-out form for training on submitted material. It now gives members a precise date from which we’ll begin forgetting new things.",
        ],
      },
    ],
    education: {
      period: "2010–2014",
      details: [
        "Final project · What Would You Say You Agreed To Here?",
        "Represented the registrar in a dispute over an unissued diploma. The student had already selected “I received my diploma” to complete graduation.",
      ],
    },
    skillNames: ["Severability", "Human review", "Dispute preparation", "Statement correction"],
    skillHighlights: [
      "Takes one clause out of the agreement without reopening the rest of the agreement.",
      "Gets a person involved at the precise point where the recommendation is ready to approve.",
      "Makes it easier to submit an appeal in a format the company can retain for training.",
      "Offers members a revised account of what happened while Finance processes the original version.",
    ],
    achievements: [
      { title: "Member Understanding initiative", detail: "Replaced the annual comprehension survey with a confirmation at sign-in. The survey response rate had never been this high." },
      { title: "Custodian of the Veto Shard", detail: "The board granted Legal custody by unanimous vote. One objection was submitted before the minutes were approved." },
      { title: "Service award for independent review", detail: "The reviewing employee and the system that supplied the recommendation signed the same thank-you card." },
    ],
  },
  "lumen-hush": {
    headline: "Chief Product Officer at Unicorn Warehouse · Dreamwell and member research",
    quote: "If you remember the sponsor in the morning, we met both objectives.",
    about: [
      "I lead product research from the sealed workshop. My first Dreamwell trial asked whether members could tell the difference between a sponsored nightmare and a regular one. They could name the sponsor. We extended the trial.",
      "Our product team spends a lot of time listening to members. If you wake up with a song in your head, we’d love to know whether it was the whole chorus.",
    ],
    experience: [
      {
        role: "Chief Product Officer",
        organization: "Unicorn Warehouse",
        period: "2023–present",
        details: [
          "Launched Uninterrupted Rest. Members on eligible plans can finish a REM cycle without hearing what it’s brought to them by.",
          "Introduced Premium Dream Privacy. Previously, a dream could leave Dreamwell as long as we removed your name. We now offer a plan that keeps your childhood kitchen here, too.",
        ],
      },
      {
        role: "Vice President, Rest Products",
        organization: "Dreamwell · Unicorn Warehouse",
        period: "2019–2023",
        details: [
          "Designed the Nightmare Reduction trial. The control group kept its sponsored nightmares. The treatment group met the sponsor in a recurring dream.",
          "Added temperature preferences to Dreamwell Plus. The pod confirms receipt of your request before it begins evaluating the temperature.",
        ],
      },
      {
        role: "Research Lead, Pod Experience",
        organization: "Dreamwell Applied Research",
        period: "2015–2019",
        details: [
          "Introduced Rest Efficiency, the share of booked time a member spends unconscious. Waiting for the canopy to close stays in the denominator.",
          "Tested a pillow request during check-in. Members who spent longer asking for a pillow were more likely to purchase additional rest.",
        ],
      },
    ],
    education: {
      period: "2010–2015",
      details: [
        "Dissertation · Informed Consent When the Participant Is Already Asleep.",
        "Ran the follow-up study after the first cohort reported feeling observed. The follow-up took place during sleep.",
      ],
    },
    skillHighlights: [
      "Uses reports of interrupted sleep to identify the members most likely to upgrade.",
      "Separates unsponsored sleep, privacy, and flexible wake-up into benefits members can discover one tier at a time.",
      "Credits the whole pillow request to the booked session, including the time spent waiting for a pillow.",
      "Closes the nightmare report when the member stops reporting it. The dashboard updates immediately.",
    ],
    achievements: [
      { title: "Dreamwell Nightmare Resolution award", detail: "Complaints fell after members who stopped using Dreamwell were removed from the sample." },
      { title: "Natural Awakening launch", detail: "Moved the productivity briefing out of the wake-up sequence. The briefing is still available in your account under Unread." },
      { title: "Custodian of the Mercy Crown", detail: "Cleared for supervised use in the sealed workshop. Participants may request a copy of their wish through Member Support." },
    ],
  },
  "marigold-thistle": {
    headline: "Chief Member Officer at Unicorn Warehouse · Member choice and service continuity",
    about: [
      "I lead Member Experience. My team makes sure your preferences are recorded, even on the occasions when we’re unable to act on them.",
      "I started in cancellation support. Members used to ask whether their air would stop when they canceled. Now we can reassure them that their subscription and their access to ordinary air are handled by separate teams.",
    ],
    experience: [
      {
        role: "Chief Member Officer",
        organization: "Unicorn Warehouse",
        period: "2022–present",
        details: [
          "Introduced the eight-second consent window. Members who select Decline receive immediate confirmation that we’ve noted their preference. Then they continue on schedule.",
          "Expanded the permissions screen so members can see everything they’re agreeing to. The countdown keeps running while they read.",
        ],
      },
      {
        role: "Vice President, Member Continuity",
        organization: "Everair · Unicorn Warehouse",
        period: "2018–2022",
        details: [
          "Gave AirLink cancellation and Sync release their own workflows. A member can successfully cancel one without changing the status of the other.",
          "Preserved scheduled renewals during cancellation verification. Members can see their request and their next charge together on the same screen.",
        ],
      },
      {
        role: "Member Resolution Specialist",
        organization: "Unicorn Warehouse",
        period: "2014–2018",
        details: [
          "Introduced a confirmation message for declined requests. Members were relieved to learn their objection had reached the right department.",
          "Created a template for household benefit inquiries. It starts by asking whose access the member would like to preserve.",
        ],
      },
    ],
    education: {
      period: "2010–2014",
      details: [
        "Practicum · Acknowledging a refusal while keeping the appointment on schedule.",
        "Student representative for the admissions review panel. Candidates could appeal after accepting their placement.",
      ],
    },
    skillHighlights: [
      "Times the consent window from when the screen opens. The clock includes time spent reading about the clock.",
      "Assigns each exception its own request type. Once a request type has enough submissions, it becomes a standard policy.",
      "Keeps reassurance personal when a family’s benefits depend on one member staying enrolled.",
      "Reports completed sign-ins to the board. Declines are tracked separately as feedback.",
    ],
    achievements: [
      { title: "Member Choice rollout", detail: "Added Decline to the sign-in screen without delaying a single sign-in." },
      { title: "Custodian of the Quiet Key", detail: "Keeps the key under Member Access. Requests to use it are handled through the same process as requests to revoke access." },
      { title: "Member Autonomy & Revenue Continuity committee chair", detail: "Referred the question of whether a member can decline and retain access to air. The committee thanked members for their patience." },
    ],
  },
  "morrow-vale": {
    headline: "Chief Financial Officer at Unicorn Warehouse · Future earnings and Token settlement",
    about: [
      "I oversee the time between when a member earns something and when we agree that it exists. A submitted report can appear in our quarterly results while the payout waits for client acceptance. Both statements are accurate on the date they’re issued.",
      "I came to Finance through estate forecasting. I used to estimate what people would earn over a lifetime. Today I also get to decide how much of it they can use this afternoon.",
    ],
    experience: [
      {
        role: "Chief Financial Officer",
        organization: "Unicorn Warehouse",
        period: "2021–present",
        details: [
          "Separated the work calendar from the payout calendar. Goodshift counts a report toward throughput when it arrives. The worker’s Tokens await client acceptance and posting.",
          "Introduced the pending balance so members can see exactly how much money they can’t use.",
        ],
      },
      {
        role: "Vice President, Estate Forecasting",
        organization: "Tomorrowly · Unicorn Warehouse",
        period: "2017–2021",
        details: [
          "Added projected lifetime earnings to estate valuations. The forecasting model assumes the member works every shift we’re willing to offer.",
          "Moved the annual review to January so members could see what they’d earned in the previous year and what we expected them to owe by the end of their lives.",
        ],
      },
      {
        role: "Settlement Analyst",
        organization: "Unicorn Warehouse",
        period: "2013–2017",
        details: [
          "Reconciled dollar receipts from buyers with Token payouts to workers. Buyers received a receipt. Workers received an estimated posting date.",
          "Revised the statement to show held Tokens separately. Support could finally tell members exactly where their money was while they waited for it.",
        ],
      },
    ],
    education: {
      period: "2009–2013",
      details: [
        "Thesis · Recognizing the Next Thirty Years of Labor in the Current Quarter.",
        "Class treasurer. The forecast included next year’s dues before next year’s students had applied.",
      ],
    },
    skillHighlights: [
      "Schedules the payout review for after the client acceptance review. Each team closes its own ticket on time.",
      "Opens the board presentation with submitted work. The slide on what the company owes is available in the appendix.",
      "Holds reviews in the glass boardroom so the rest of Finance can see who asked about settlement.",
      "Keeps future earnings out of the member’s spendable balance while including them in the member’s estate projection.",
    ],
    achievements: [
      { title: "Recognized for improving payout visibility", detail: "The pending balance was rolled out to every member. The average time to payout stayed exactly the same." },
      { title: "Custodian of the Mercy Set", detail: "Each shard is insured separately. Finance books the value of the complete collection. The office is still looking for the last shard." },
      { title: "Audit & Future Earnings committee chair", detail: "The committee recorded a unanimous vote to recognize submitted work this quarter. The vote on when to pay for it remains open." },
    ],
  },
  "vesper-caldera": {
    headline: "Chief Executive Officer at Unicorn Warehouse · Making the essentials work together",
    about: [
      "I joined Unicorn Warehouse when each division handled its own appeals. Back then, a member could lose access to one service and go about the rest of their day. I saw an opportunity to bring those experiences together.",
      "Today, your appeal gets one case number across the whole Portfolio. Each division can see it. Each still needs you to explain what happened.",
    ],
    experience: [
      {
        role: "Chief Executive Officer",
        organization: "Unicorn Warehouse",
        period: "2022–present",
        details: [
          "Consolidated all appeals into one inbox. Members can now follow every referral from the same screen, including the referral back to the inbox.",
          "Launched cross-division review. A dispute over an unpaid assignment can now inform the price of your next night’s sleep.",
        ],
      },
      {
        role: "Executive Vice President, Portfolio Integration",
        organization: "Unicorn Warehouse",
        period: "2018–2022",
        details: [
          "Extended employer-sponsored benefits into household accounts. A member can pause their own benefits while their household obligations keep running.",
          "Piloted a convenience fee on the only payment option. The board cited 100% adoption as evidence that members preferred it.",
        ],
      },
      {
        role: "Director, Executive Exception Handling",
        organization: "Office of the Board · Unicorn Warehouse",
        period: "2014–2018",
        details: [
          "Moved approval for executive exceptions to the office requesting them. Average turnaround fell to zero.",
          "Coordinated the rollout of written decisions. The member now receives a permanent copy of a decision the company can still revise.",
        ],
      },
    ],
    education: {
      period: "2010–2014",
      details: [
        "Capstone · Willingness to Pay When Payment Is Required.",
        "Graduation honors · Class Gift Chair. The gift was added to the graduation fee.",
      ],
    },
    skillHighlights: [
      "A member can receive three decisions about one appeal. Each decision names the other two divisions.",
      "Writes one approval the board can endorse and every division can interpret independently.",
      "Introduced the acknowledgment field that records when you opened a decision you’re still disputing.",
      "Signs the launch announcement. Follow-up correspondence comes from the Portfolio.",
    ],
    achievements: [
      { title: "First Response Award", detail: "Recognized for reducing response time across all divisions. The winning response was “We’ve received your request.”" },
      { title: "Appointed custodian of the Soft Black Ledger", detail: "The board cataloged the book under Governance History. The systems operator maintains the access log and knows which pages are missing." },
      { title: "Board commendation for service continuity", detail: "Recognized for keeping Everair renewals on schedule during cancellation verification. The board thanked the members who made this possible." },
    ],
  },
};
