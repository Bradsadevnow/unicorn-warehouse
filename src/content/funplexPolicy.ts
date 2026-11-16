import { attractions } from "./funplex";

export const funplexTerms = [
  {
    "id": "funplex-visit",
    "title": "Funplex · Admission, access, and departure",
    "paragraphs": [
      "Parking and commencement. Parking is complimentary for the first Fun Hour of a visit. A vehicle registered to the Household is checked in when it enters the parking area. The Fun Hour begins at that time, including while you are looking for a space. For members arriving without a registered vehicle, check-in occurs at admission. Scheduled no-show billing is described in the Funplex Product Details.",
      "Hours and closing. Funplex operates from 6:00 a.m. to midnight. Standard FunPoints expire 15 minutes before closing. Adventure Plus FunPoints expire 10 minutes before closing. An unexpired balance is required when the Prize Counter completes the redemption.",
      "Departure. The designated exit is through the Token Arcade. Time spent locating the exit counts toward the visit. Emergency exits remain available for emergencies.",
      "Photo Booth. Capture is complimentary. Printed copies, downloads, and deletion are separately priced. A deletion purchase removes the member-facing copy. Brightside may retain a copy already used in production, training, or incident review. A photo purchased for deletion is delivered when the deletion receipt becomes available.",
      "Lost and Found. Items are retained at the Prize Counter and may be reclaimed by their owners with FunPoints at the posted rate. Proof of ownership establishes eligibility to redeem the item. If an item is required to earn enough points to reclaim it, it may be loaned back for the duration of the qualifying play.",
      "Restrooms. Restrooms are located past the Prize Counter. Access is included while an attraction is in progress. Attraction time continues during restroom access. The access reader uses the time of entry, so an attraction expiring during a restroom visit does not require a second scan to leave."
    ]
  },
  {
    "id": "funplex-consent",
    "title": "Funplex · Consent, waivers, and incident review",
    "paragraphs": [
      "Recorded acceptance. Scanning a Portfolio membership at check-in records acceptance of these Terms. A Household organizer may confirm a booking for guests. For a guest who cannot consent independently, a parent or authorized guardian must confirm participation. The organizer’s booking acknowledgement serves as a record that this confirmation was obtained.",
      "Assumption of risk. Guests acknowledge the ordinary risks of movement, noise, bright lights, and competitive play shown in the applicable Product Details. To the extent permitted by applicable law, the waiver covers ordinary incidents associated with those disclosed risks. Rights that cannot be waived remain available. The waived portion of the risk will appear as Acknowledged on the visit record.",
      "Consent preferences. A guest may decline recording by choosing the unrecorded equivalent where offered. If an unrecorded equivalent is unavailable, the booked attraction remains chargeable. Withdrawal applies to new recordings after confirmation. It leaves existing attendance records and permitted prior uses in place.",
      "Allocation of charges. Unless a purchase is expressly assigned to a guest account, attraction and incidental charges post to the booking Household. A guest may decline the proposed allocation before check-in. The organizer remains responsible for the unallocated amount.",
      "Incident review. An incident report may be filed during or after a visit. A report opens a review of the incident and does not reverse the charge or restore expired FunPoints. Guests may attach the relevant photo or recording. Copies obtained from the Photo Booth are charged at the published download rate.",
      "Enjoyment records. The Portfolio may retain attendance, ratings, and changes to ratings for service improvement. A member who leaves before answering is recorded as having completed the visit with enjoyment unverified. Unverified enjoyment may be scheduled for verification at a later visit."
    ]
  }
];

const attractionClauses = {
  "lanes": [
    "Shoe reconciliation. Unreturned shoes are billed as a purchase. The return processing fee remains due for closing the rental record. Returning one shoe produces a separate reconciliation record for the remaining shoe.",
    "Lane records. The score displayed at the end of the paid lane time is the score of record. A ball still rolling when the lane closes is recorded as a ball in progress and the frame is closed at the score already posted."
  ],
  "links": [
    "Round entitlement. A standard round includes access to holes 1 through 12. Adventure Plus unlocks holes 13 through 18. The 18-hole par remains the comparison for all completed scorecards.",
    "Ball retrieval is billed per request. A retrieved ball is available at the clubhouse. Returning to collect it counts toward round time."
  ],
  "cinema": [
    "Sponsored previews are included in the feature. An intermission ends when the feature resumes. Concessions purchased during intermission establish no right to replay the portion missed while collecting them.",
    "Dreamwell records sleep during a feature as a nap. The nap charge is separate from the ticket. Being awakened by the next preview does not reverse the recorded nap."
  ],
  "arcade": [
    "Standard FunPoints expire 15 minutes before closing. Adventure Plus FunPoints expire 10 minutes before closing. In either case the Prize Counter must complete the redemption before expiry. Queue placement reserves your place in line.",
    "A game-card balance inquiry is billed in Tokens. An inquiry may therefore show a lower balance than the balance that prompted the inquiry."
  ],
  "arena": [
    "A hit on a teammate is billed at the same rate as any other successful hit. A score correction may remove the point from the scoreboard. The original hit remains on the Token statement until the charge is separately reviewed.",
    "Team results are shared with team leads. The visit remains personal time even when an employer uses the result in a team review."
  ],
  "speedway": [
    "Standard speed is walking speed. Adventure Plus unlocks racing speed. The first finisher ends the race for all entrants and the full race charge applies to each kart.",
    "A lap unfinished at the end of a race is recorded as distance traveled for venue analytics. It is excluded from the member’s lap count."
  ],
  "lounge": [
    "A performance may appear in Brightside previews. A performance accepted for screening is not an accepted creator brief and earns no creator payout.",
    "The second verse is an add-on. Applause counts as delivered when playback begins, including if the performer has left the stage."
  ],
  "cafe": [
    "Table time begins at seating, including while you are waiting to order. An unfinished order does not extend the included visit time.",
    "A refill is measured when the drink is dispensed. Ice remaining in the original cup does not carry forward as a credit."
  ]
} satisfies Record<(typeof attractions)[number]["id"], readonly string[]>;

export const funplexAttractionDetails = attractions.map(({ id, name, kind, price, extras, fine }) => ({
  id: "funplex-" + id,
  title: "Funplex · " + name + " (" + kind + ")",
  paragraphs: [
    "Admission. " + price + ".",
    "Published options. " + extras.join(". ") + ".",
    fine,
    ...attractionClauses[id],
  ],
}));
