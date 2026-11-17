import { charterDepartureTokens, venues } from "./gatherings";
import { bankAutoFinancing } from "./autoFinancing";
import { leaseTerms, rentals, shortLeasePremiumPercent } from "./living";
import { wellnessClinics, wellnessCycleDays, wellnessPlans } from "./wellness";
import { pharmacyPlans } from "./wellnessPharmacy";
import { constructionProjects } from "./construction";
import { flockContinuity } from "./flock";
import { publicWorksCycle, publicWorksPlans } from "./publicWorks";
import { alpineLiftPass, alpineMembershipCycle, alpineMemberships, alpineRooms, heatedWalkway, skiAndStay, skiLiftPolicy } from "./alpineResort";
import { motorServices, tradeEstimates, vehicles } from "./motorworks";
import { fulfillmentRates } from "./fulfillment";
import { dispatchPlus, priorityMatchingTokens } from "./dispatch";
import { funplexAttractionDetails, funplexTerms } from "./funplexPolicy";

export const terms = [
  {
    "id": "scope",
    "title": "Scope and order of precedence",
    "paragraphs": [
      "These Terms govern the Portfolio Account and each benefit delivered through it. A benefit may be provided by a different Portfolio company from the one that bills you for it. The company shown on your statement is responsible for the statement.",
      "Your Order Summary identifies the benefit you selected. The Product Details determine what counts as delivery. If the two documents differ, the Order Summary controls the amount due and the Product Details control what you receive.",
      "A Household includes each person whose sleep, work, purchases, or expected inheritance materially affects the Account. An individual may remain in your Household for forecasting purposes after removal from your Family settings."
    ]
  },
  {
    "id": "tokens",
    "title": "Tokens and settlement",
    "paragraphs": [
      "Portfolio Tokens carry over and never expire. Redemption requires an eligible Account and an available benefit. An Account under review may retain its entire Token balance while redemption is paused. During that period, your statement will show the balance you would otherwise be able to use.",
      "Buyer payments in dollars settle separately from worker and creator payouts in Tokens. The dollar price of an assignment establishes the buyer’s obligation. It establishes no exchange rate, redemption value, or minimum payout.",
      "A reserved reward places a hold on the quoted amount. If a reservation is released, the held Tokens return to the balance after reconciliation. If the reward has been discontinued, the return of Tokens completes our obligation even where no substitute exists.",
      "Assignment payout. A submitted assignment may appear as a pending payout before client acceptance. An internal quality review does not constitute client acceptance. Pending Tokens become spendable only after the payout posts to the Token statement, and may not be applied to a renewal before posting."
    ]
  },
  {
    "id": "renewal",
    "title": "Renewals and continuity",
    "paragraphs": [
      "Subscriptions renew according to the billing interval shown on the order. A request to cancel takes effect at the first renewal boundary after we verify the request. A notice of future cancellation does not interrupt service or change the billing dates that occur during verification.",
      "Account closure does not itself schedule removal of installed equipment. Where removal is required, the product schedule determines which service continues through the removal appointment. A statement may therefore include a final renewal after the effective date of account closure.",
      "We may send notice to the inbox associated with the affected benefit. Closing that inbox changes the address at which you can read the notice. It does not change the date on which the notice was made available."
    ]
  },
  {
    "id": "training",
    "title": "Submitted material and service improvement",
    "paragraphs": [
      "Submitted Material includes clip takes, discarded drafts, dream reports, thermostat changes, recorded breaths, and corrections to any of the foregoing. Your ownership of Submitted Material is subject to the Portfolio’s continuing permission to reproduce it, modify it, and use it to develop services for other members.",
      "A member may opt out of future training on Submitted Material. The setting applies to material received after confirmation. It does not remove material already incorporated into a model or forecasts already issued about the member. Family members may still receive forecasts to which they are entitled.",
      "An appeal supplies a labeled example of the decision being appealed. We retain the example and its resolution to improve future decisions. If you appeal the inclusion of an appeal in training, both appeals are retained together so our reviewers can understand the sequence.",
      "An employer may order output from a model trained on accepted handoffs. The worker’s original payout covers the original assignment. Subsequent orders for equivalent output do not create additional payouts, even if the model reproduces the worker’s preferred sign-off."
    ]
  },
  {
    "id": "disputes",
    "title": "Corrections and disputes",
    "paragraphs": [
      "Requests concerning missed work must identify whether the missing event was a shift, a rest period, or a payment. If it was all three, open one request with each provider. A finding by one provider does not close a request with another.",
      "A statement correction may change how an event is described without reversing the event. Where service cannot be repeated, including an expired Saturday, the corrected statement is our record of what would have been delivered.",
      "Unresolved matters may be submitted to the Portfolio Review Office after the product provider issues its final response. A review concerns one billing period. A renewal during review creates a separate billing period."
    ]
  },
  {
    "id": "account-governance",
    "title": "Account governance",
    "paragraphs": [
      "Continued Consent. Your continued use of any Portfolio benefit constitutes acceptance of the Terms then in effect. Where a benefit is necessary to maintain access to another benefit, such continued use shall not be considered involuntary solely because discontinuation would result in the loss of both benefits.",
      "Consent by Dependency. Where a member's participation is required for the continued delivery of benefits to another Household member, the member may suspend their own benefits without suspending the obligations arising from that participation.",
      "Everair Sync Continuity. Cancellation ends the applicable renewal obligation once verified. It does not end Sync enrollment or restore access to unmetered air. Restoration takes effect upon completion of a separately scheduled Sync release. The presence of ambient air does not establish that restoration has occurred."
    ]
  },
  {
    "id": "benefit-accounting",
    "title": "Benefit accounting",
    "paragraphs": [
      "Time Allocation. Time saved through Portfolio services may be included in the calculation of a member's available productive capacity. Such calculations do not constitute an assignment of additional work, but may inform future eligibility, performance expectations, and benefit pricing.",
      "Rest Reconciliation. Rest periods exceeding the member's subscribed Dreamwell allocation may be recorded as unplanned recovery. Unplanned recovery does not create a Token charge, but may reduce the member's available productive capacity score until the excess rest has been reconciled through qualifying activity."
    ]
  },
  {
    "id": "personalization",
    "title": "Data and personalization",
    "paragraphs": [
      "Inferred Preferences. The Portfolio may infer preferences from a member's conduct, including choices not made, messages not sent, and benefits not redeemed. A member's failure to correct an inferred preference may be used to improve the confidence assigned to that preference.",
      "Accuracy of Personalization. Members may request correction of an inferred preference. Corrections shall be recorded as additional preference data and may be considered alongside the original inference. A correction does not require removal of the inference it concerns."
    ]
  },
  {
    "id": "estate-continuity",
    "title": "Estate continuity",
    "paragraphs": [
      "Future Earnings. For continuity planning, the Portfolio may include reasonably anticipated future Token earnings in a member's estate projections. A projected earning does not constitute an asset until received, but may be considered when calculating the value of benefits offered against the estate.",
      "Posthumous Service Continuity. Death does not automatically constitute a request for cancellation. Where a member has enabled Family Continuity, benefits may continue until the designated representative completes the applicable transition process."
    ]
  },
  {
    "id": "member-support",
    "title": "Member support",
    "paragraphs": [
      "Dispute Resolution Assistance. Members may use the Portfolio's automated assistant to understand, prepare, and submit disputes. Information supplied during dispute preparation may be retained for service improvement. The assistant's explanation of a policy does not constitute a determination regarding its fairness.",
      "Human Review. A member may request human review of an automated decision. Human review may be performed by a qualified representative relying on automated summaries, recommendations, and supporting records. The use of such materials does not diminish the human character of the review."
    ]
  },
  {
    "id": "interdependence",
    "title": "Cross-division eligibility",
    "paragraphs": [
      "Portfolio Benefit Interdependence. A change in eligibility, standing, or participation within one Portfolio service may affect the pricing, availability, or renewal conditions of another. Such adjustments shall be treated as independent product decisions and shall not constitute a penalty for the member's original action. For example, an appeal concerning an unpaid Goodshift assignment may lower the member's reliability score. Dreamwell may then revise the member's rest pricing, and the estate service may update projected estate value. Each adjustment will appear on the statement issued by the division that made it."
    ]
  },
  {
    "id": "severability",
    "title": "Severability and Member Understanding",
    "paragraphs": [
      "If any provision of these Terms is determined to be unenforceable, the remaining provisions shall continue in effect. The unenforceability of a provision does not establish that the member misunderstood it. Members acknowledge that an inability to understand these Terms does not, by itself, constitute a defect in their presentation."
    ]
  },
  {
    "id": "careers",
    "title": "Careers · The herd",
    "paragraphs": [
      "Horn. A horn is issued upon successful completion of probation. The horn remains the property of Unicorn Warehouse at all times, including while worn. A unicorn who leaves the herd returns the horn at separation.",
      "Probation. Probation lasts 90 days. Probation restarts when a unicorn changes supervisor, team, or shift pattern. Time spent on probation counts toward tenure once probation is complete.",
      "Eligibility. Every employee holds the rank of Unicorn Trainee from the first day of employment. Advancement to a higher horn rank requires accepted extra shifts within the employee’s own career track, the approval of their department manager, and completion of that rank’s Recognition Quest. Extra shifts awaiting client acceptance are not counted. Opportunity Hours are not counted. A posting’s track may change while an extra shift is awaiting acceptance.",
      "Magic. Sparkle, glitter, rainbows, and other magic generated during working hours are the intellectual property of Unicorn Warehouse. Magic generated outside working hours that resembles magic generated during working hours is presumed to have been generated during working hours.",
      "Shine. Shine availability is subject to departmental approval. Approved shine is scheduled by the department.",
      "Family. Unicorn Warehouse describes its workforce as a family. Family membership confers no inheritance rights, no right to remain, and no right to be informed of changes to the family.",
      "Employee Happiness. Standard happiness is included during working hours. Premium Employee Happiness is available through payroll deduction. Deductions continue through the end of the plan year, including after separation.",
      "Two Records. Each employee holds a position and a horn rank. The position describes the employee’s assigned responsibilities and determines base pay. The horn rank reflects the employee’s recognized value to the herd and determines recognition and benefits. Neither record determines the other.",
      "Positions and Vacancies. A position above entry level requires the minimum horn rank listed for that position and an open vacancy. An employee who holds the required horn rank is eligible to be considered for the position. Eligibility to be considered is not an offer of consideration.",
      "Transfers. An employee may transfer to another career track by accepting an entry-level position in that track. The employee’s horn rank is retained. Probation, qualifying extra shifts, and track progress restart in the new track. Shifts completed in a previous track remain part of the employee’s record and are not counted.",
      "Pathway Kit. Each career track requires a Pathway Kit, purchased from Unicorn Warehouse Market before the employee’s first shift. The kit remains the employee’s property. Replacement components are sold separately.",
      "Recognition Quests. Each horn rank above Unicorn Trainee includes a Recognition Quest, which must be completed personally by the employee. Recognition Quests are completed outside working hours and are not paid work. Hints may be provided by Customer Support. Solutions may not."
    ]
  },
  ...funplexTerms,
  {
    "id": "dispatch",
    "title": "Dispatch · Service clocks, handoff, and courier obligations",
    "paragraphs": [
      "Three clocks. Member wait time begins at order placement. Dispatch service time begins at recorded pickup. Courier paid time covers the accepted delivery. Time can be visible in a member’s tracking history without being included in either the service guarantee or the courier’s payout.",
      "Priority Matching. Release of a priority offer is delivery of the Priority Matching benefit. A courier’s refusal does not restore the purchased priority or the subscription boost used to release it. A member may purchase priority for a subsequent offer on the same delivery.",
      "Pickup readiness. The originating business determines when an order is ready. Dispatch may show a courier at the pickup point while the kitchen or counter is still preparing the order. Arrival at the pickup point establishes that the courier was available to wait.",
      "Personal handoff. The charge for Hand it to Me covers one attempt within the handoff window. If the member misses the window, a timestamped delivery photo may close the delivery record. A photo of a parcel at the address is evidence of the handoff attempt. Finding the parcel may require a separate request.",
      "Vehicle readiness. A courier is responsible for the condition of their vehicle. A declined offer during repairs may affect future offer eligibility. Repairs financed through Unicorn Warehouse Bank remain payable on their own schedule while the vehicle is out of service.",
      "Replacement courier. Dispatch may transfer the remaining route to another courier. Both couriers may see the route in their histories. Each sees only the portion accepted for settlement. The member receives one delivery receipt.",
      "Delivery disputes. The Order record, courier record, and originating business record may close at different times. A corrected delivery timestamp updates the record under review. A refund or payout adjustment requires a separate decision by the division that issued the charge or credit.",
      "Bundled orders. If an order contains goods from more than one business, each business may confirm readiness independently. An unavailable item may be refunded by the business that sold it. The Dispatch charge remains due for the delivery that was completed, including a delivery containing only the separately purchased sauce."
    ]
  },
  {
    "id": "fulfillment",
    "title": "Fulfillment · Shipping, floor targets, and returns",
    "paragraphs": [
      "Shipment. An outbound scan completes the warehouse’s shipping obligation. The customer may see a parcel as shipped before the carrier records possession. Carrier pickup begins the delivery window under the Dispatch Product Details.",
      "Time Off Task. Time between recorded scans continues to accrue during a conveyor stoppage. A worker may record the cause for review. An accepted exception changes the description of the interval. Review does not restart the belt.",
      "Team benchmarks. Each week’s highest verified pick rate becomes the floor target for the following week. Recognition for the record remains with the worker who set it. The obligation to match it is shared by the floor.",
      "Returns. A drop-off scan confirms receipt of the outer parcel or the item presented at the counter. The refund window begins when inspection accepts the item. A notice confirming receipt does not begin the refund window.",
      "Ledger adjustments. A seller refund, a Fulfillment inspection charge, and a Dispatch delivery charge are recorded separately. Reversing a line on one statement does not reverse a completed service on another.",
      "Storage. Storage is charged per reserved bin for each 30-day period. A bin remains reserved while a removal request is under review. Empty space in a reserved bin remains available to the merchant and is billed accordingly."
    ]
  },
  {
    "id": "gatherings",
    "title": "Gatherings · Venue time, privacy, and charters",
    "paragraphs": [
      "Venue access. Booked venue time includes setup, decorating, and cleanup. A contractor or partner arriving before the host may start the room clock. A room becoming beautiful during the booking is use of the room.",
      "Private events. A private booking excludes other paying guests. It does not exclude authorized venue photography or production staff where the booking provides for them. Brightside may describe the resulting footage as a private event.",
      "Air service. The Alpine Room includes one shared seasonal flight for the table. Individual breathing preferences are priced per guest. A guest’s existing Everair obligations remain in force throughout dinner.",
      "No Announcements. The Gold Room upgrade removes optional event announcements. Portfolio service notices, ceremony timing corrections, and reminders of applicable charges are classified as venue information.",
      "Charter departure. A dockside charter provides access to the reserved vessel at its berth. Departure from the marina is a separate service. A view of departing vessels is part of the dockside experience.",
      "Guest experience and labor. The event ends when the last guest leaves. An assignment ends at its scheduled time. Service delivered after the assignment ends may be recorded on the guest experience report before a separate assignment is approved.",
      "Partner charges. A venue booking, Fun Hours charge, and Brightside media purchase appear on the statements of their respective providers. Refund of a venue charge does not reverse a service already delivered by another provider."
    ]
  },
  {
    id: "motorworks",
    title: "Motors · Trade-ins, diagnostic consent, and payment priority",
    paragraphs: [
      "Test drives. The test-drive route may include streets currently served by Dispatch. Passing a pickup point does not constitute arrival for work. Any assignment accepted during a test drive must be completed after delivery of the vehicle.",
      "Trade-in valuation. The display estimate remains valid until the appraisal begins. A recorded service recommendation may reduce the allowance at the same visit in which it becomes eligible for financing.",
      "Diagnostic consent. Authorization covers inspection and preparation of recommendations. The diagnostic fee confirms that a diagnosis was attempted. A finding of no fault does not reverse the fee.",
      "Payment priority. A scheduled Bank installment draws from available Everyday Tokens. Pending wages remain pending even when earned while operating the financed vehicle. A shortfall can trigger a payment notice while an assignment is still awaiting client acceptance.",
      "Repair financing. A repair agreement is separate from the vehicle purchase agreement. Returning a vehicle does not discharge the cost of a repair performed before its return.",
    ],
  },
  {
    id: "living",
    title: "Living · Renewals, transfers, and residential continuity",
    paragraphs: [
      "Occupancy. A lease grants access to the listed residence for its stated term. Successive renewals may establish a history of occupancy. That history does not accrue equity, even where total rent exceeds the property's acquisition cost.",
      "Valuation and renewal. Living's Homes team may consider recent improvements, neighborhood demand, and household contributions to local Portfolio activity. A household nominated for a neighborhood improvement award may receive the award and an adjusted renewal offer in the same delivery.",
      "Transfer availability. The convenience of a transfer is assessed against available units and documented Portfolio assignments. If an assignment is pending, proximity may be calculated against the last accepted worksite. The new lease begins on the agreed date. The old lease remains payable until the surrender inspection closes.",
      "Rent settlement. Rent is due in available Everyday Tokens. Pending earnings may support an income projection for screening. Only settled Tokens count as payment. A resident may therefore meet the income requirement while a rent payment remains outstanding.",
      "Deposit reconciliation. Living returns the available remainder of a security deposit in Tokens after condition review and any outstanding charges have been reconciled. A deposit held at the previous address cannot fund the first month's rent at the new address while reconciliation is open.",
      "Valuation appeals. A member may request correction of the measurements underlying a renewal. A request for correction does not pause the offer deadline. A confirmed increase in usable area may be reflected in the next available renewal offer.",
    ],
  },
  {
    id: "wellness",
    title: "Wellness · Subscription access, care records, and continuity",
    paragraphs: [
      "Subscription scope. A covered visit is a visit the member may request. An available visit is a visit the clinic may provide. Wellness tracks these as separate accomplishments.",
      "Benefit expiry. A request made during the final days of a cycle belongs to that cycle. A visit supplied in the next cycle uses the next cycle’s allowance. The prior cycle is considered to have provided access because it accepted the request.",
      "Renewals and settlement. Renewal uses available Everyday Tokens. Wellness may count pending Goodshift payouts when estimating whether a member can afford a plan. Those payouts cannot fund the renewal until they settle. An appointment reminder is not confirmation that the renewal settled.",
      "Continuing consent. Permission to retrieve records may be withdrawn. A care pathway that relies on those records may be paused until the member supplies equivalent records from an approved source. A pause in a care pathway does not pause the billing cycle.",
      "Gastrointestinal Support Bundle. A Market purchase may appear in the food and comfort journal where personalization is enabled. Removing the purchase from the journal does not remove the purchase from the Market record. The journal may record the removal as a separate preference.",
      "Movement & Recovery. Wellness may record that a member is ready to resume a normal routine. Goodshift may use that record when considering assignment eligibility. A scheduling recommendation is not a promise that the member will have time to attend their next review.",
      "Rest & Reset and Breathing Well. Dreamwell and Everair maintain their own records and subscriptions. A Wellness reviewer may identify a gap in those records. Addressing a gap in a partner subscription may require a separate payment to the partner.",
      "Mindful Moments. Conversations stay within the authorized care team. The fact that a conversation occurred, its billing status, and any authorized follow-up flags are administrative records. A concern about work can be private while the existence of a work-related follow-up is visible.",
      "Household Care. The four check-ins are shared across enrolled members. If a member leaves the household, a check-in used by that member remains used. A child’s change in household does not create a refund in either household.",
      "Continuity Plus. A coordinator may continue to route open matters during a transition. Former Tomorrowly policies retain their original estate provisions. A continuity notice sent to a designated representative is evidence that the transition has started, not that the household has left the plan.",
      "Member satisfaction. Invitations are issued after eligibility verification. Where a visit is declined before verification is complete, the member may rate the explanation once their satisfaction survey eligibility has been verified.",
    ],
  },
  {
    id: "wellness-pharmacy",
    title: "Wellness Pharmacy · Refill access, custody, and release",
    paragraphs: [
      "Approved, allocated, and released. Approval means the refill may proceed. Allocation means stock has been assigned to the order. Release means the counter may hand it over. A member may receive a confirmation at each stage. Only the third confirmation authorizes a trip to the counter.",
      "Availability. Stock allocated to a member may be held at Fulfillment while in transit to the dispensing counter. An item can be in stock at the Portfolio level while unavailable at the address in the reminder.",
      "Pickup windows. A Counter Reserve window begins when the counter issues the release notice. Opening the notice is not a condition of delivery. A notice sent during an accepted Goodshift assignment is considered delivered at the time it was sent.",
      "Renewal holds. A released refill may return to hold if membership renewal has not settled before pickup. The stock reservation may remain visible during review. Supply reserved for a member is counted as availability even while the member is unable to collect it.",
      "Dispatch handoff. Doorstep Continuity covers one eligible handoff per cycle. A courier handoff attempt consumes that allowance once Dispatch records it. When the bag returns to the counter, the member may collect it there or request another delivery at the prevailing Dispatch rate.",
      "Data and consent. The pharmacy records the item and approval status. Dispatch receives handoff instructions and a package identifier. A member may withdraw permission for optional delivery reminders. Scheduled service notices and notices of additional charges are operational messages.",
      "Cancellation. Ending a pharmacy subscription ends future renewals when cancellation takes effect. Open orders keep their existing order and custody records. Cancellation of a related clinic plan does not cancel the pharmacy plan. A bag may be waiting at the counter while the subscription that got it there is still under review.",
      "Service credits. If the pharmacy made the refill available for pickup and Dispatch made it available for delivery, both services may be recorded as fulfilled. A member disputing a missed handoff should attach the same order reference to each provider's dispute form.",
    ],
  },
  {
    id: "construction",
    title: "Construction · Site access and project milestones",
    paragraphs: [
      "Site access. A scheduled shift identifies a date and a site assignment. Moving a completion estimate may change or cancel the shifts scheduled against that estimate. The worksite may continue to show its previous completion date until the revised schedule publishes.",
      "Equipment and briefing. Safety equipment is available to rent at the site office. The rental is deducted from the day’s payout. Attendance at a safety briefing is recorded as understanding. A request for clarification is entered separately as a question.",
      "Handoff. Handoff is complete when the receiving division accepts the project record. A receiving division may defer its first day of use. The reported completion date stays the date of handoff.",
    ],
  },
  {
    id: "flock",
    title: "Flock · Check-in recipients and benefit continuity",
    paragraphs: [
      "Household recipients. Members may select household contacts and change them at any time. Workplace recipients are designated by the sponsoring employer. Workplace recipients do not occupy a slot on the household contact list, even when they receive the same underlying event.",
      "Arrival and availability. A household arrival notice confirms that a check-in was recorded. A workplace notice may indicate the same member is available for an assignment. A member may dispute availability without requesting withdrawal of the arrival notice.",
      "Missed check-ins. The absence of a check-in does not establish the member's whereabouts. It may establish that the member did not check in during the expected window. Workplace attendance records may retain this distinction for review.",
      "Consent. Changing household contacts affects subsequent household delivery only. Ending household notices does not withdraw recorded check-ins from workplace records where employment sponsorship requires retention.",
      "End of sponsorship. The employer's eligibility record ends the complimentary benefit. Clover Cloud may promptly notify household contacts of paid continuation. Delivery of an employment notice follows the employer's own schedule.",
      "Household Continuity. Paid continuation preserves eligible household notices. It does not restore employment, workplace sponsorship, or access to a prior employer's records. A payment prompt is classified as a continuity notice.",
    ],
  },
  {
    id: "public-works",
    title: "Public Works · Incident records and membership boundaries",
    paragraphs: [
      "Membership scope. Civic subscriptions cover household profiles, record access, and updates. Emergency response is separate. A timely response does not establish that the resulting record is available at the same time.",
      "Fire & Rescue. One copy of an incident report is included per cycle. A report requested in one cycle and issued in the next counts when issued. A correction to a report is filed as a new copy when the original copy has already been released.",
      "Neighborhood Police. A lost-property follow-up covers one request for status. A reply that an item is still awaiting a tag is a status reply. Reuniting a member with an item and closing the item's record are separate events.",
      "Civic Complete. Both departments may display their records on one timeline. The timeline can show one incident as closed and open at the same time where the departments have completed different work. The timeline is accurate as to both.",
      "Changes of address. A shared household profile may be transferred to a new address. An incident report remains associated with the address where the incident was opened. A resident may therefore move without the incident following them, although the renewal may follow them.",
      "Service credits. A road closure may delay arrival for a Public Works shift. The road crew records its successful closure separately from the assignment team’s record of late arrival. A credit issued by either department does not revise the other department’s record.",
    ],
  },
  {
    id: "alpine-resort",
    title: "Grand Alpine Resort · Booking, walkway access, and lift tickets",
    paragraphs: [
      heatedWalkway,
      skiLiftPolicy,
      "Ski & Stay includes the stated number of single-day passes. A room stay and issued passes appear as separate items on the booking.",
      "Membership allowances. Unused spa days, lift passes, and suite nights expire at the end of the cycle. A reservation request is not a reservation. Priority dining access permits the member to request a table before general availability opens.",
      "Summit Circle. Suite inventory for membership nights is released separately from nightly room inventory. A suite offered at the nightly rate may still be unavailable for a member night.",
      "Casino. The cashier exchanges available Tokens for Alpine Chips at face value. Unplayed chips can be exchanged back at the cashier. Sparkle has no chip value.",
    ],
  },
  {
    id: "lost-property-release",
    title: "Neighborhood Police · Lost Property release",
    paragraphs: [
      "Physical release. At the Lost Property desk, the member must provide the tag number and request physical release. A status update reports where the object is. Record closure ends the inquiry. Neither procedure transfers possession of the object.",
    ],
  },
];

export const productDetails = [
  {
    "id": "everair",
    "title": "Everair · Air supply and intellectual property",
    "paragraphs": [
      "First Breath covers one inhalation at a participating sample station. A second inhalation is metered. Sharing a mask does not divide a breath between accounts. The inhalation belongs to the account to which the canister was paired at the time of use.",
      "Everair Sync. While Sync is active, ambient air is unavailable as a substitute for an Everair allocation, including when the mask is removed or AirLink is disconnected. A verified subscription cancellation does not release Sync. If a payment fails, one reserve orb may be dispatched to the delivery address on file. Delivery marks the reserve benefit as used. An unopened orb may not be carried forward as an account credit.",
      "Pay as You Breathe settles against future earnings. Separately, Everair retains a 10% interest in inventions developed while using metered air. A recording made after removing the mask does not establish when the idea was formed. The canister ledger determines the relevant breathing interval.",
      "An account holder may redeem A Thought of Your Own to release Everair’s interest in one identified idea. Revisions share the original release only if the reviewer determines they contain no new idea. If a released idea is later tied to a future idea deemed company property, the release is revoked and the account holder’s right to full ownership of the released idea ends. The redemption is not refunded.",
      "Air Quality Assurance. Everair guarantees that every metered breath meets Portfolio standards at the point of dispensing. For Sync members, eligibility to resume unmetered breathing is determined separately under Sync Continuity.",
      "Complimentary Exhalation. Exhalation is currently included at no additional charge. This benefit is promotional and may be modified with 30 days' notice.",
      "Family Breathing Plan. Household members may pool their inhalation allowances. In the event of a shortage, breaths are allocated according to each member's projected economic contribution.",
      "Inspiration Protection. Members may purchase Inspiration Protection to ensure ideas conceived during a breathing session remain their own. Protection begins upon confirmation and does not apply retroactively.",
      "Wireless Breathing. Everair AirLink™ enables compatible masks to receive metered air allocations without a physical connection to the member's primary canister. Wireless connectivity does not eliminate the requirement for an active air subscription. Breaths attempted outside the supported coverage area may be recorded as unsuccessful delivery attempts.",
      "Connection Stability. AirLink maintains a connection to the nearest authorized breathing access point. During network congestion, breathing requests may be queued according to subscription priority. Priority processing does not guarantee uninterrupted delivery.",
      "Offline Breathing. Offline breathing is available to members enrolled in AirLink Premium. Offline allowances must be downloaded while connected. Unused offline breaths expire upon reconnection and do not convert to Portfolio Tokens.",
      "Firmware and Security. AirLink masks may receive automatic firmware updates to maintain service compatibility. Breathing functionality may be temporarily unavailable during installation. Members are encouraged to schedule updates outside anticipated periods of heavy respiration.",
      "Household Device Limits. Each Everair Household subscription supports a specified number of simultaneous mask connections. Additional devices may be paired for a nominal Token fee. When the connection limit is reached, service priority is determined by the Household's projected economic contribution.",
      "Network Neutrality. Everair does not discriminate between members based on the content of their breathing. Premium subscribers may receive preferential packet scheduling during periods of elevated demand."
    ]
  },
  {
    "id": "dreamwell",
    "title": "Dreamwell · Rest and dream rights",
    "paragraphs": [
      "Rest Access begins when the pod registers entry. Time spent requesting a pillow, adjusting the temperature, or waiting for the canopy to close forms part of the booked session. Dreamwell Essential includes one pillow per occupied pod.",
      "Dream Retention permits recall of selected scenes. A promotional insertion may be retained with a scene where removing it would materially alter the plot. Nightmare Reduction measures sponsored nightmares across eligible sessions and may be satisfied by moving a sponsor into a recurring dream.",
      "Premium Dream Privacy limits sharing of identifiable dream recordings. A dream from which your name has been removed may still contain your childhood kitchen. Natural Awakening excludes the productivity briefing. The briefing remains available in your Account under Unread.",
      "Rest Efficiency. Dreamwell measures sleep efficiency as the percentage of booked time spent unconscious. Members who remain awake during their session are encouraged to purchase additional time.",
      "Dream Advertising Preferences. Members may select up to three preferred advertising categories for dream insertion. Opting out of a category may increase the frequency of advertisements from the remaining categories.",
      "Nightmare Resolution. A nightmare is considered resolved when the member no longer reports it. Members who stop using Dreamwell are excluded from unresolved nightmare statistics.",
      "Sleep Debt Transfer. Unused sleep credits may be transferred to an eligible Household member. Transferring credits does not transfer the fatigue associated with the original missed rest.",
      "Bundled Household Rest. A registered Household beneficiary may use the minutes on their active Dreamwell household grant while the sponsoring membership is in good standing. A covered session consumes the grant’s remaining minutes and does not create a separate Token charge."
    ]
  },
  {
    "id": "softspace",
    "title": "Softspace · Adjustments and installed equipment",
    "paragraphs": [
      "A warming or cooling reward authorizes a 1° change to the current setting. Restoring the prior setting requires another adjustment. If two people share a room, their personal settings and allowances remain separate even when both are complaining about the same vent.",
      "Unused subscription units are subject to the issue windows and rollover rules on your plan. Portfolio Tokens do not expire. The units issued when you spend them can expire at midnight, at renewal, or at the end of an applicable transfer window.",
      "Changes to implant consent require an appointment. Attendance requires consent to diagnostic access. Where consent has already been withdrawn, a new authorization must be recorded before the appointment can proceed. An overdue balance suspends comfort adjustments. The implant remains installed pending removal.",
      "Temperature Stability. Softspace guarantees that your thermostat will display your selected temperature. Actual room temperature may differ based on building conditions, occupancy, and available adjustment credits.",
      "Emergency Comfort. Members experiencing extreme discomfort may request an Emergency Adjustment. Emergency Adjustments are processed before standard requests and billed at the prevailing emergency rate.",
      "Shared Environment Reconciliation. Where Household members select conflicting temperatures, Softspace will maintain the setting that minimizes total Portfolio expenditure. Both members' adjustment allowances may be charged.",
      "Comfort Loyalty. Members maintaining the same temperature for 30 consecutive days receive a Stability Badge. Badges do not include temperature adjustments."
    ]
  },
  {
    "id": "work",
    "title": "HelpingHand · Assignment settlement",
    "paragraphs": [
      "A buyer purchases the listed deliverable. An assignment may be completed by more than one person. Replacing a person does not create a second deliverable or a second buyer payment. Each worker’s payout reflects the portion accepted at handoff.",
      "An unassigned interval is available time if the worker remains eligible for a new offer. Declining an offer does not end availability. Only a recorded end of shift ends availability for scheduling purposes.",
      "Opportunity Preservation. Workers who remain available but receive no assignments continue accumulating Opportunity Hours. Opportunity Hours demonstrate employability but are not payable.",
      "Performance Continuity. If an assignment is completed early, the remaining scheduled time may be reassigned without additional compensation, provided the replacement task is of comparable difficulty.",
      "Worker Recognition. High-performing workers may be designated Preferred Contributors. Preferred Contributors receive priority notifications of assignments, including those with lower Token payouts.",
      "Skill Development. Assignments requiring unfamiliar skills may be classified as Learning Opportunities. Learning Opportunities may offer reduced compensation in recognition of their educational value."
    ]
  },
  {
    "id": "goodshift",
    "title": "Goodshift · Office assignments",
    "paragraphs": [
      "For Goodshift, meeting notes include action items. Completing the action items requires a separate order. A meeting to decide whether an action item is complete is also a separate order.",
      "Protected Lunch Break. Members may redeem Tokens for a 30-minute uninterrupted lunch period. Interruptions initiated by management pause the interruption timer. The lunch timer continues to run.",
      "Work-Life Balance. Goodshift provides an optional Work-Life Balance Dashboard. Time spent reviewing the dashboard is classified as personal development and excluded from paid work.",
      "Attendance Optimization. Employees arriving early may begin productive activities immediately. Early productivity does not modify the scheduled shift start.",
      "Meeting Efficiency. Meetings that conclude without actionable outcomes may be classified as Alignment Sessions. Alignment Sessions are successful when all attendees acknowledge that alignment occurred."
    ]
  },
  {
    "id": "brightside",
    "title": "Brightside · Briefs, approval, and reuse",
    "paragraphs": [
      "A buyer purchases the clips specified in the brief. Creator Tokens post only after acceptance. A clip that is used internally for comparison, training, or a presentation about why it was rejected has not thereby been accepted.",
      "A Little Clip supplies production of one short clip. Not to be redeemed on token payable content. If a reward clip is submitted against a paid brief, the brief must be fulfilled again from a new recording.",
      "Where the brief requests an authentic reaction, satisfactory performance is determined against the approved reference reaction. The reference reaction may itself have been produced under an earlier brief.",
      "Authentic Reactions. Creators may be asked to reproduce spontaneous reactions from approved reference footage. A reaction is considered authentic when it meets the buyer's authenticity guidelines.",
      "Creative Ownership. Creators retain the right to identify themselves as the original creator of accepted content. The Portfolio retains the right to publish, modify, reproduce, or replace the creator's likeness.",
      "Exposure Compensation. Unaccepted clips may be featured in internal training presentations. Exposure from these presentations does not constitute acceptance or compensation.",
      "Creator Independence. Brightside creators determine their own schedules. Availability during buyer-selected production windows may affect future assignment eligibility."
    ]
  },
  {
    "id": "market",
    "title": "Market · Orders and substitutions",
    "paragraphs": [
      "Pack counts refer to units at dispatch. An unripe banana may satisfy an order for a banana. An organic banana may be replaced with another organic banana of different emotional ripeness. The organic price applies to the replacement.",
      "A substitution made after picking is valued at the price of the substitute. If you decline it, you may keep your original place in the queue for the next picking window. Your original place does not preserve the original price.",
      "A worker who stocks a product may purchase it on the same terms as any other member. Handling the product during a shift does not reserve it or count as a deposit.",
      "Freshness Guarantee. All produce is guaranteed fresh at the time it enters the fulfillment system. Time spent awaiting delivery does not affect the original freshness certification.",
      "Essential Substitutions. If an essential item is unavailable, the Portfolio may substitute an item of equivalent nutritional intent. Nutritional intent is determined by the Portfolio.",
      "Price Protection. Members may lock in the price of an item for 30 days. Price Protection applies to the listed item and does not cover substitutions, handling fees, or changes in package size.",
      "Household Consumption Forecasting. Market may use Everair breathing data, Dreamwell sleep activity, and Goodshift schedules to predict household grocery needs. Members may disable personalized recommendations without disabling forecasting."
    ]
  },
  {
    "id": "saturday",
    "title": "Reserve · The Saturday Suite",
    "paragraphs": [
      "The Suite provides 24 consecutive hours from check-in. Time spent asleep counts toward the stay. If you choose Natural Awakening, you remain responsible for the portion of Saturday that elapsed while you were naturally asleep.",
      "The window opens. Closing it is included. The manual thermostat may be turned in either direction throughout the stay. Settings, unused bath water, and the right to decline work do not transfer to your account on departure.",
      "Goodshift pauses availability until checkout. Checkout restores eligibility for assignments, including assignments at the Suite. Requests to extend a stay are subject to the turnover schedule.",
      "Unscheduled Time. Members are entitled to 24 consecutive hours without assigned Portfolio obligations. Personal responsibilities, existing financial obligations, and scheduled subscription renewals remain unaffected.",
      "Freedom of Choice. Members may decline all available activities during their stay. Declining an activity does not create a credit or extend the reservation.",
      "Silence Guarantee. The Suite provides an environment free from mandatory notifications. Notifications received during the stay will be delivered together upon checkout.",
      "Return to Productivity. Upon checkout, members receive a personalized summary of tasks, opportunities, and obligations accumulated during their absence."
    ]
  },
  {
    "id": "harmony",
    "title": "Portfolio Harmony™ · Cross-product optimization",
    "paragraphs": [
      "Portfolio Harmony coordinates your services to minimize interruptions and improve your member experience.",
      "When Goodshift records longer hours, Dreamwell may recommend additional sleep sessions. Everair may increase your breathing allocation. Softspace may adjust its comfort recommendations based on fatigue. Market may suggest convenience meals at prevailing prices. For former Tomorrowly policies, these changes may update projected lifetime expenses.",
      "Portfolio Harmony optimizes outcomes across the Portfolio. Individual member savings are not a required optimization objective."
    ]
  },
  {
    "id": "estate",
    "title": "Estate continuity · Former Tomorrowly policies",
    "paragraphs": [
      "The insured age is the biological age recorded at enrollment. The billing age increases with each quarterly renewal. A missed sustainment appointment restores the standard passage of time. Any premium adjustment resulting from the missed appointment is calculated at the newly applicable age.",
      "Wealth above the policy threshold is converted into Tomorrowly Equity Tokens. Equity remains on the principal account and does not have cash redemption. Designated heirs may receive 2% of policy yield as spendable Portfolio Tokens. A beneficiary statement is issued even when there is no distribution.",
      "For voting purposes, Equity Tokens above your voting cap are included in your holdings but excluded from your vote. For fee purposes, they are included in both. Management charges accrue over the policyholder’s remaining lifetime, as extended from time to time.",
      "Payment of heir yield does not open the estate. The estate remains pending while the policyholder remains covered. If an heir dies before the policyholder, the policyholder may designate a replacement heir at the next quarterly review. The replacement heir’s first statement includes a line for Prior Beneficiary.",
      "An employer may sponsor a quarter of coverage. Ending employment ends sponsorship at the end of the quarter in which the separation was recorded. To dispute the separation date, the insured must remain current through the date of the final determination.",
      "Guaranteed Legacy. Tomorrowly guarantees that your estate will remain preserved for your designated beneficiaries. Preservation does not guarantee distribution.",
      "Heir Readiness Program. Beneficiaries may enroll in an educational program to prepare for their eventual inheritance. Program fees are deducted from projected distributions.",
      "Intergenerational Continuity. Where an heir dies before the insured, their projected inheritance may be transferred to the next eligible generation. Transfer processing does not affect the insured's continued coverage.",
      "Longevity Achievement. Policyholders reaching 150 years of age receive Lifetime Platinum status. Lifetime Platinum includes complimentary annual estate reviews and priority beneficiary replacement.",
      "Death Verification. A policyholder's death must be confirmed through an approved Portfolio verification process. Coverage and associated management fees continue until verification is complete.",
      "Cross-Product Optimization. Portfolio Harmony coordinates your services to minimize interruptions and improve your member experience."
    ]
  },
  {
    "id": "bank",
    "title": "Unicorn Warehouse Bank · Accounts, Sparkle, and advances",
    "paragraphs": [
      "Deposits. A payout is deposited to Everyday Tokens when it posts. A pending payout is displayed for your convenience. A displayed amount is not a deposit and may not be spent, saved, or relied upon.",
      "Sparkle. Balances earn interest in Sparkle at the published Annual Percentage Sparkle. Sparkle reflects how much your Tokens are appreciated. Sparkle is not redeemable, transferable, or convertible to Tokens.",
      "Early Payday. A member may request an advance of up to 70% of a pending payout. The advance fee is deducted from the advance before it is deposited. If the payout is not accepted, the full advance settles against future earnings before those earnings become available.",
      "Courtesy Coverage. A purchase that exceeds the available balance may be covered at the Bank’s discretion. Each covered item carries a coverage fee. A coverage fee that exceeds the available balance is itself a covered item.",
      "Maintenance. Everyday Tokens carries a monthly maintenance fee. The fee is waived for balances of 10,000 Tokens or more. All fees are waived during the welcome period, which ends December 31, 2026.",
      "Holds. Held Tokens remain in your account and are included in your total balance. Held Tokens are excluded from your available balance. Tokens never expire, including while held.",
      "Goals. A savings goal estimates when a reward may become affordable at your current pace. An estimate is not a reservation. The price of a reward may change while you save for it.",
      "Closing. You may close your account at any time. Tokens in a closed account remain yours and remain at the Bank."
    ]
  },
  {
    "id": "funplex",
    "title": "Unicorn Warehouse Funplex · Fun Hours and attractions",
    "paragraphs": [
      "Fun Hours. Each member is scheduled for two Fun Hours per calendar month. Fun Hours are part of a balanced membership and are completed at the Funplex.",
      "Scheduling. A member may choose their Fun Hours. Fun Hours not chosen by the final week of the month are scheduled automatically. A scheduled Fun Hour is billed at its scheduled check-in time if the member does not check in. Parking with a registered vehicle counts as check-in under the Funplex visit terms.",
      "Designated Venue. The Funplex is the designated recreation venue for members. Recreation at other venues is welcome and is not recorded as Fun Hours.",
      "Enjoyment. Enjoyment is measured at exit. A member who reports less than Delighted may be scheduled an additional Fun Hour at the member rate.",
      "Personal Time. Fun Hours are personal time and are excluded from paid work. This includes Fun Hours scheduled by an employer as a team event.",
      "Arcade. Games accept Tokens. Winning awards FunPoints. FunPoints cannot be converted back to Tokens, transferred, or carried to another visit. Standard FunPoints expire 15 minutes before closing. Adventure Plus FunPoints expire 10 minutes before closing. The Prize Counter closes at closing.",
      "Cinema. Sponsored previews are part of the feature and vary in length. Sleep during a feature is recorded by Dreamwell as a rest session and billed at the nap rate in addition to the ticket. Recline is metered by the degree.",
      "Bowling. Shoe rental is included with every game. Returning the shoes incurs a processing fee. Shoes that are not returned are billed as a purchase, and the processing fee still applies.",
      "Laser Tag. Ammunition is unlimited. Successful hits are billed individually to the member who made them. A hit on a teammate is billed at the same rate.",
      "Mini Golf. Rainbow Links is advertised as eighteen holes. The final six require Adventure Plus. A round ended at hole twelve is scored against par for eighteen.",
      "Go-Karts. Karts are set to walking speed. Racing speed requires Adventure Plus. A race ends when the first kart finishes, and every kart is billed for the full race.",
      "Adventure Plus. Adventure Plus renews monthly. A cancellation takes effect after the member’s next scheduled Fun Hour. Fun Hours are scheduled monthly.",
      "Birthday Parties. Gatherings handles the booking, Horn & Fries supplies the cake, and Brightside records the memories. Party time includes setup and cleanup. The recording belongs to Brightside. The birthday guest receives a copy of the first three seconds.",
      "Lost and Found. Found items are kept at the Prize Counter. An item may be reclaimed by its owner with FunPoints at the posted rate.",
      "Exit. The exit is through the Token Arcade. Time spent locating the exit is part of the visit.",
      "Attractions. Lane time, round time, and table time are metered from check-in. A game in progress when the time ends is scored as complete."
    ]
  },
  ...funplexAttractionDetails,
  {
    id: "quickserve",
    title: "Horn & Fries · Pickup, drive-thru, and express service",
    paragraphs: [
      "Express service. The three-minute promise begins when the kitchen accepts the order. Time spent awaiting acceptance is recorded as queue time. A reopened order begins a new service interval.",
      "Pickup. A tray is ready when its number is first called. A second call is recorded as a courtesy and does not change the original ready time.",
      "Drive-thru. The drive-thru serves lunch and dinner rush. A vehicle asked to pull forward has completed window service and entered the collection queue.",
      "Meal purchases. Meals are payable in Tokens, including proceeds from an accepted shift. Pending earnings may be displayed on the same tray estimate and remain unavailable for purchase.",
      "Shift breaks. Breaks are available between rushes. Management determines when the rush ends. A rush concludes when the queue has been reconciled, including orders carried into the next rush.",
    ],
  },
  {
    id: "dispatch",
    title: "Dispatch · Delivery windows, handoff, and priority",
    paragraphs: [
      "Delivery windows. The delivery window begins when pickup is recorded. Order placement and time awaiting a courier are recorded separately. An order delivered within its service window is classified On Time.",
      `Priority Matching. Priority Matching costs ${priorityMatchingTokens} Tokens per order unless an available Dispatch Plus boost is applied. Priority applies to the release of the offer to couriers. It does not change the arrival window or guarantee acceptance.`,
      "Hand it to me. A personal handoff is attempted at the destination. If the recipient misses the handoff window, the courier may leave the parcel and record delivery with a photo. The personal handoff charge covers the attempt.",
      "Courier settlement. The payout covers the accepted delivery. Travel to the pickup and from the handoff is the courier’s own time.",
      `Dispatch Plus. The subscription renews at ${dispatchPlus.tokens} Tokens per ${dispatchPlus.interval} and includes ${dispatchPlus.boosts} Priority Matching boosts per cycle. Unused boosts reset at renewal. A boost is used when the offer is released, including if a courier declines it.`,
    ],
  },
  {
    "id": "fulfillment",
    "title": "Fulfillment · Parcel tracking, lockers, and merchant rates",
    "paragraphs": [
      `Rates. Storage is ${fulfillmentRates.storage} Tokens per bin per 30 days. Pick and pack is ${fulfillmentRates.pickAndPack} Tokens per parcel. Return inspection is ${fulfillmentRates.inspection} Tokens per item.`,
      "Tracking. The parcel record lists Picked, Packed, Shipped, and Courier pickup as separate events. The shipping event is the outbound bay scan. Courier pickup records the start of Dispatch’s delivery window.",
      "Returns and lockers. The counter supports label-free drop-off. Locker returns use the original box. A return receipt identifies the drop-off method and shows the inspection status. A completed drop-off does not itself post Tokens.",
      "Merchant storage and handling. Storage is billed per reserved bin per 30 days. Pick and pack is billed per parcel. Return inspection is billed per item."
    ]
  },
  {
    id: "gatherings",
    title: "Gatherings · Venue packages and booking estimates",
    paragraphs: [
      ...venues.map(({ name, tokens, capacity, detail }) => `${name}. Starting price ${tokens.toLocaleString("en-US")} Tokens, up to ${capacity} guests. ${detail}`),
      `The Vesting Period. The base charter takes place at the marina berth. Departing the marina adds ${charterDepartureTokens.toLocaleString("en-US")} Tokens to the starting estimate.`,
      "Funplex parties. The Extravaganza Supreme Suite shares the starting price published by Funplex. Gatherings coordinates booking, Horn & Fries supplies the cake, and Brightside records the event under the Funplex party conditions.",
    ],
  },
  {
    id: "motorworks",
    title: "Motors · Inventory, Motorworks service, and Bank financing",
    paragraphs: [
      ...vehicles.map(({ name, trim, price }) => `${name} ${trim}. Sticker price ${price.toLocaleString("en-US")} Tokens.`),
      `Trade-in preview. Road-ready credit is ${tradeEstimates[1].credit.toLocaleString("en-US")} Tokens. Service recommended credit is ${tradeEstimates[2].credit.toLocaleString("en-US")} Tokens. Final allowance follows inspection.`,
      ...motorServices.map(({ name, price }) => `${name}. Listed service price ${price} Tokens.`),
      `Bank financing. Vehicle purchases use ${bankAutoFinancing.vehicle.apr}% fixed APR over ${bankAutoFinancing.vehicle.terms.join(", ")} months. Eligible repairs use ${bankAutoFinancing.repair.apr}% fixed APR over ${bankAutoFinancing.repair.terms.join(", ")} months. Estimates exclude additional fees.`,
      "Settlement. Installments are paid in available Everyday Tokens. A quote does not create a loan, and previewing a service appointment does not reserve a bay.",
    ],
  },
  {
    id: "living",
    title: "Living · Rent, lease lengths, and move-in costs",
    paragraphs: [
      `Lease lengths. Available terms are ${leaseTerms.join(" and ")} months. The six-month rate adds ${shortLeasePremiumPercent}% to listed monthly rent, rounded up to a whole Token. Standard maintenance is included. Utilities and optional services, including Softspace plans, are billed separately.`,
      ...rentals.map(({ name, rent }) => `${name}. ${rent.toLocaleString("en-US")} Tokens per month on a 12-month lease.`),
      "Move-in. First month's rent and a security deposit equal to one month's rent are due at move-in. A quote previews these costs and does not reserve a unit or post a charge.",
      "Layout and access. Floor plans are illustrative. The area of a private-room listing describes the private room only. Walking estimates reflect the listed destination. Pet permission and amenities are specific to the unit.",
    ],
  },
  {
    id: "wellness",
    title: "Wellness · Subscription rates, visit allowances, and clinic previews",
    paragraphs: [
      `Billing. All Wellness memberships renew every ${wellnessCycleDays} days and are priced in Everyday Tokens.`,
      ...wellnessPlans.map(({ name, price, benefit }) => `${name}. ${price} Tokens per ${wellnessCycleDays} days. ${benefit}`),
      ...wellnessClinics.map(({ name, slots }) => `${name}. Example appointment types include ${wellnessPlans.filter(({ id }) => slots.some((slot) => slot === id)).map(({ appointment }) => appointment.toLowerCase()).join(", ")}.`),
      "Visit preview. A plan benefit and clinic availability are evaluated independently. The preview does not enroll a member, reserve a visit, or create a charge.",
      "Records. Dreamwell history is optional in Rest & Reset. Dedicated Everair equipment and plan records are reviewed under Breathing Well. Former Tomorrowly coverage follows the original estate policy.",
    ],
  },
  {
    id: "wellness-pharmacy",
    title: "Wellness Pharmacy · Refill memberships and handoff details",
    paragraphs: [
      `Billing. Pharmacy subscriptions renew every ${wellnessCycleDays} days, independently of clinic subscriptions. Membership covers refill services. Order contents are billed separately in Everyday Tokens.`,
      ...pharmacyPlans.map(({ name, price, benefit }) => `${name}. ${price} Tokens per ${wellnessCycleDays} days. ${benefit}`),
      "Status. Pharmacy review governs approval. Fulfillment inventory records govern stock. The pharmacy counter governs release. Dispatch records eligible delivery handoff attempts separately.",
      "Tracking. The refill preview shows illustrative statuses. It does not submit a refill, reserve stock, or create a charge.",
    ],
  },
  {
    id: "construction",
    title: "Construction · Project layouts and schedules",
    paragraphs: [
      ...constructionProjects.map(({ name, client, milestones }) => `${name} · ${client}. ${milestones.join(". ")}.`),
      "Published layouts describe intended use. A scheduled milestone is an estimate. Completion is recorded on acceptance by the receiving division.",
    ],
  },
  {
    id: "flock",
    title: "Flock · Employment sponsorship and Household Continuity",
    paragraphs: [
      "Eligible employment includes sponsored household check-ins. Employer-designated recipients receive workplace status notices under the sponsorship terms.",
      `Household Continuity costs ${flockContinuity.price} Tokens every ${flockContinuity.days} days after sponsorship ends.`,
      "Clover Cloud Data Center. 181 Orchard Street, Depot District.",
      "Example check-ins show how one event may be presented to different recipients. The preview does not read a member's location, send a message, or change account state.",
    ],
  },
  {
    id: "public-works",
    title: "Public Works · Department memberships and Civic Complete",
    paragraphs: [
      ...publicWorksPlans.map(({ name, price, benefit }) => `${name}. ${price} Tokens every ${publicWorksCycle} days. ${benefit}`),
      "A subscription covers administrative services. Emergency response is separate from subscription eligibility. This catalog does not submit a request or charge an account.",
    ],
  },
  {
    id: "alpine-resort",
    title: "Grand Alpine Resort · Rooms, Ski & Stay, and lift passes",
    paragraphs: [
      heatedWalkway,
      skiLiftPolicy,
      ...alpineRooms.map(({ name, tokens, detail }) => `${name}. ${tokens.toLocaleString("en-US")} Tokens per night. ${detail}`),
      `${skiAndStay.name}. ${skiAndStay.tokens.toLocaleString("en-US")} Tokens for ${skiAndStay.nights} nights in a ${skiAndStay.room.name} and ${skiAndStay.passes} single-day lift passes.`,
      `${alpineLiftPass.label}. ${alpineLiftPass.tokens} Tokens per person per day.`,
      ...alpineMemberships.map(({ name, price, benefit }) => `${name}. ${price} Tokens every ${alpineMembershipCycle} days. ${benefit}`),
      "The stay preview shows sample pricing. It does not reserve a room, issue a lift pass, or charge an account.",
    ],
  },
  {
    id: "wake-verification",
    title: "Dreamwell · Rest Desk verification",
    paragraphs: [
      "Wake Verification records that a member was awake while signing at the Rest Desk. Pod attendance confirms entry only. Dream Retention concerns recall after a session. Wake Verification requires a handwritten signature and can be issued without booking a pod.",
    ],
  },
];
