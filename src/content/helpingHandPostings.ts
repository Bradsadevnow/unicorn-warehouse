import { helpingHandCatalog } from "./gigCatalogs";

type JobTitle = (typeof helpingHandCatalog)[number]["jobs"][number][0];
type JobDescription = readonly [site: string, summary: string, duties: string, requirements: string, acceptance: string];

const descriptions = {
  "Log potholes along the Clover Loop": [
    "Public Works · Roads & Transit",
    "Walk the assigned route and record pavement defects from the sidewalk so the repair crew can prioritize its next run.",
    "Check in with the crew lead and use the station checklist.",
    "Comfort following directions and recording a clear handoff.",
    "The crew lead confirms the completed checklist. An item marked for another visit stays on the shared list.",
  ],
  "Set out lakeside cleanup supplies": [
    "Public Works · Water & Shoreline",
    "Stage bags, gloves, and grabbers for volunteers at Clover Lake without blocking the walking path.",
    "Check in with the crew lead and use the station checklist.",
    "Comfort following directions and recording a clear handoff.",
    "The crew lead confirms the completed checklist. An item marked for another visit stays on the shared list.",
  ],
  "Restock the fire hall supply room": [
    "Public Works · Fire & Rescue",
    "Count clean towels and approved station supplies, then restock the labeled shelves for the next crew.",
    "Check in with the crew lead and use the station checklist.",
    "Comfort following directions and recording a clear handoff.",
    "The crew lead confirms the completed checklist. An item marked for another visit stays on the shared list.",
  ],
  "Sort lost-property tags": [
    "Public Works · Neighborhood Police",
    "Match the public-counter tags to items in the lost-property tray and pass the checklist to the desk lead.",
    "Check in with the crew lead and use the station checklist.",
    "Comfort following directions and recording a clear handoff.",
    "The crew lead confirms the completed checklist. An item marked for another visit stays on the shared list.",
  ],
  "Carry materials to the upper floors": ["Construction · Logistics", "Match labeled materials to the floor manifest and move them using the designated route with the site crew.", "Check in with the site lead and follow the handoff checklist.", "Attention to detail and comfort working on your feet.", "The lead signs off on the completed handoff."],
  "Direct traffic at the site entrance": ["Construction · Site operations", "Meet scheduled deliveries at the entrance and relay bay assignments to drivers.", "Check in with the site lead and follow the handoff checklist.", "Attention to detail and comfort working on your feet.", "The lead signs off on the completed handoff."],
  "Sweep the site at close": ["Construction · Closeout", "Clear the marked walkways and report anything that needs the site lead’s attention.", "Check in with the site lead and follow the handoff checklist.", "Attention to detail and comfort working on your feet.", "The lead signs off on the completed handoff."],
  "Clear lanes between games": ["Funplex · Bowling", "Reset the lane seating area and tell the host when the next group can come through.", "Check in with the site lead and follow the handoff checklist.", "Attention to detail and comfort working on your feet.", "The lead signs off on the completed handoff."],
  "Retrieve balls from the water hazard": ["Funplex · Mini golf", "Collect and count recovered balls using the course tools from the marked path.", "Check in with the site lead and follow the handoff checklist.", "Attention to detail and comfort working on your feet.", "The lead signs off on the completed handoff."],
  "Sweep a theater between features": ["Funplex · Starlight Cinema", "Sweep aisles and check seats once the auditorium is empty.", "Check in with the site lead and follow the handoff checklist.", "Attention to detail and comfort working on your feet.", "The lead signs off on the completed handoff."],
  "Staff the Prize Counter": ["Funplex · Prize Counter", "Help guests find prizes, scan tickets, and restock the display between groups.", "Check in with the site lead and follow the handoff checklist.", "Attention to detail and comfort working on your feet.", "The lead signs off on the completed handoff."],
  "Refill canisters at the Lodge": ["Everair Alpine Lodge · Bottling floor", "Stage and label canisters at the bottling line under the floor lead’s direction.", "Check in with the site lead and follow the handoff checklist.", "Attention to detail and comfort working on your feet.", "The lead signs off on the completed handoff."],
  "Set out seasonal blend samples": ["Everair Alpine Lodge · Tasting room", "Arrange sealed seasonal samples and refresh the display before the next group arrives.", "Check in with the site lead and follow the handoff checklist.", "Attention to detail and comfort working on your feet.", "The lead signs off on the completed handoff."],
  "Set out clinic welcome packets": [
    "Wellness · Reception",
    "Get the check-in counter ready before the first appointment.",
    "Put out the correct welcome packets, refill the pen tray, and update the room signs.",
    "An eye for detail and comfort following a front desk checklist.",
    "The front desk lead confirms the packet count. Consent pages go underneath the welcome letter.",
  ],
  "Reset an exam room": [
    "Wellness · Clinic operations",
    "Help the clinic get an empty room ready for its next visit.",
    "Restock approved supplies and complete the room readiness checklist.",
    "Comfort following site instructions and keeping member material private.",
    "The room lead checks the reset. The next visit can start after the room is released.",
  ],
  "Set up a rental tour": [
    "Living · Leasing office",
    "Help the leasing team welcome prospective residents at the next showing.",
    "Set out floor plans, straighten the model home, and put the return keys in the tray.",
    "Comfort following a room checklist and working around scheduled appointments.",
    "The leasing coordinator checks that the home is ready before the first guest arrives.",
  ],
  "Prepare a unit for inspection": [
    "Living · Resident services",
    "Get an empty home ready for its move-in inspection.",
    "Clear the entry, verify the fixture checklist, and report anything that needs a technician.",
    "An eye for detail and willingness to follow the site lead’s safety instructions.",
    "The inspector accepts the preparation after reviewing the checklist and condition notes.",
  ],
  "Photograph a unit before move-out": [
    "Living · Resident services",
    "Create a condition record for a scheduled move-out.",
    "Follow the photo checklist and flag items that still belong to the resident.",
    "Comfort following an image checklist and respecting the resident’s appointment window.",
    "The site lead checks all required angles before the record enters deposit review.",
  ],
  "Verify listing measurements": [
    "Living · Homes",
    "Check a published layout against its field measurements.",
    "Measure the rooms on the checklist and record differences before the next listing refresh.",
    "Comfort using a tape measure and reading a basic floor plan.",
    "The Homes coordinator verifies the worksheet. A discrepancy goes to listing review.",
  ],
  "Prepare a showroom vehicle": [
    "Motors · Showroom",
    "Get the Mint Mile ready for its next test drive.",
    "Wipe the cabin, replace the window card, and confirm the driver's seat is back in its welcome position.",
    "An eye for detail and comfort following the showroom checklist.",
    "Sales signs off on the cabin and display. The monthly payment must be legible from the sidewalk.",
  ],
  "Photograph a trade-in": [
    "Motors · Appraisal bay",
    "Make a complete photo record for the appraisal team.",
    "Capture the odometer, all four sides, and any visible damage in the marked bay.",
    "Comfort following an image checklist and uploading photos.",
    "The appraiser checks the required angles. Retakes are part of the original assignment.",
  ],
  "Sort incoming parts": [
    "Motorworks · Parts counter",
    "Match the morning parts delivery to the service orders waiting on it.",
    "Scan cartons, check part numbers, and stage items by bay.",
    "Comfort reading part labels and following the counter lead’s handling instructions.",
    "Parts confirms the scans. Any unmatched carton stays on the exception shelf.",
  ],
  "Host arrivals at the Funplex suite": [
    "Gatherings · Funplex party suite",
    "Greet birthday guests and help the host get everyone settled before the cake arrives.",
    "Check names against the booking, point out the arcade entrance, and notify the room lead once the party is seated.",
    "A warm welcome and care when handling guest lists.",
    "The host confirms the seating count. Extra minutes requested by a guest are referred to the booking holder."
  ],
  "Welcome guests aboard the yacht": [
    "Gatherings · The Vesting Period marina berth",
    "Welcome guests aboard and share the evening itinerary with the private chef.",
    "Check the guest list, direct arrivals to the lounge deck, and pass special requests to the charter lead.",
    "Guest service experience and willingness to follow the vessel crew’s instructions.",
    "The charter lead confirms arrivals. A dockside charter is fulfilled at the berth and does not include departure."
  ],
  "Receive an inbound pallet": [
    "Fulfillment · Receiving dock",
    "Check a pallet against the manifest and get its cartons into the receiving lanes.",
    "Scan the load, flag damaged cartons, and pass labeled goods to the stow team.",
    "Comfort working on your feet and following the dock lead’s handling instructions.",
    "The inbound lead reconciles the accepted cartons. A pallet waiting on a discrepancy remains part of the handoff."
  ],
  "Pack Market orders on the line": [
    "Fulfillment · Packing line",
    "Pack collected Market items for their next stop at the outbound bay.",
    "Match items to the order, choose the box from the station guide, and scan the finished parcel.",
    "Attention to order labels and comfort following a packing guide.",
    "The floor lead verifies completed scans. A parcel held for an item correction stays open on your station record."
  ],
  "Stage burger orders at the grill": [
    "Horn & Fries · Grill pass",
    "Help the grill team keep burgers moving from assembly to the pickup station during a rush.",
    "Match completed wraps to tickets, flag missing modifiers, and stage orders in the sequence the counter lead calls.",
    "Comfort working on your feet and following the kitchen lead’s safety instructions.",
    "The grill lead checks the ticket handoff. Orders held for a missing modifier stay on the handoff list even when everything else is ready."
  ],
  "Reset a sleep suite between sessions": [
    "Dreamwell · Guest suites",
    "Get a private sleep suite ready between guests so the next member can settle in right away.",
    "Change the linens, return the lights and sound to their default settings, and log any item left behind.",
    "Comfort following a room reset checklist and handling clean linens.",
    "The retreat lead checks the room before the next booking. Finishing the reset does not reserve the suite for staff use."
  ],
  "Restock the Dreamwell linen station": [
    "Dreamwell · Linen station",
    "Prepare fresh towels, quilts, and pillowcases for the evening reset team.",
    "Sort the delivery by suite, fill the marked shelves, and flag any short count before handoff.",
    "Comfort reading stock labels and moving linen bundles with the cart provided.",
    "The linen lead verifies what was put away. A pillowcase is recorded separately from the privilege of using it."
  ],
  "Welcome evening guests at Dreamwell": [
    "Dreamwell · Evening reception",
    "Help arriving guests find the lounge and their assigned pods before their rest windows begin.",
    "Check booking names, show guests where to leave their things, and send changes to the reception lead.",
    "A calm speaking voice and care when handling member booking details.",
    "The reception lead signs off on the arrivals list. A guest checked in by the system stays on the handoff list until they arrive."
  ],
  "Bag orders during the lunch rush": [
    "Horn & Fries · Packing counter",
    "Keep lunch orders moving from the kitchen to the pickup shelf. You’ll join the counter team for the busiest half hour of service.",
    "Match each printed ticket to the order, add the requested extras, and call out any missing item before sealing the bag.",
    "Comfort reading tickets quickly and working near a busy kitchen.",
    "The counter lead confirms the bags were staged in ticket order. A bag waiting on the kitchen remains assigned to its original packer."
  ],
  "Cover dinner rush pickup": [
    "Horn & Fries · Pickup window",
    "Take over the pickup window while the dinner team works through the incoming orders.",
    "Match names to sealed bags, direct waiting guests, and hand off any order still in the queue at the end of the shift.",
    "A clear speaking voice and comfort standing at a busy counter.",
    "The counter lead accepts the handoff after reconciling pickups. An order marked ready by the kitchen still counts as waiting until it leaves the shelf."
  ],
  "Restock the condiment station": [
    "Horn & Fries · Dining room",
    "Refill napkins, cups, and sealed condiment packets so the next rush starts with a full station.",
    "Count what remains, replenish each bin to its marked line, and take empty packaging back to the stock area.",
    "Ability to reach the stocked shelves and follow the station checklist.",
    "The floor lead checks the station against the opening photo. Condiments handed directly to a guest do not count toward the refill."
  ],
  "Reset the dining room": [
    "Horn & Fries · Dining room",
    "Turn the dining room over between rushes so the next customers have a clean place to sit.",
    "Clear trays, wipe surfaces with the supplies provided, and return chairs to their floor marks.",
    "Comfort standing and walking between tables for the shift.",
    "The floor lead signs off on the room. Where a customer remains seated, the table stays on the handoff list."
  ],
  "Unload a delivery": [
    "Market · Receiving dock",
    "Give the receiving team a hand moving an incoming delivery from the truck to the marked staging area.",
    "Match the cartons to the dock manifest and move them using the equipment provided. Flag damaged packages for the receiving lead.",
    "Follow the dock lead’s instructions and ask for assistance when a carton requires it.",
    "The dock lead checks the staged cartons against the manifest. Time waiting for the truck counts toward the booked window."
  ],
  "Sort incoming cartons": [
    "Market · Receiving dock",
    "Sort the morning delivery before stock heads to the floor.",
    "Read destination labels, group cartons by department, and set aside anything with a missing or damaged label.",
    "Comfort reading stock labels and moving cartons with the equipment provided.",
    "The receiving lead accepts the sort after checking the department lanes. Unlabeled cartons go to exceptions and remain part of the count."
  ],
  "Stage pickup orders": [
    "Fulfillment · Collection area",
    "Get packed customer orders into the right pickup lanes ahead of the next collection window.",
    "Scan completed orders, place them in their assigned bays, and report any order that arrives with a missing bag.",
    "Comfort using a handheld scanner. The site shows you how to sign in.",
    "The collection lead compares the bay scan with the order record. Scanning an empty bay does not stage an order."
  ],
  "Count one aisle of stock": [
    "Fulfillment · Inventory floor",
    "Count the stock in one assigned aisle while the inventory team closes out the latest delivery.",
    "Record quantities for each marked shelf, flag open cases, and submit a single count sheet before handoff.",
    "Attention to detail and comfort counting from both shelf and case labels.",
    "The inventory lead checks variances before acceptance. A recount uses the original assignment window."
  ],
  "Restock the front shelves": [
    "Market · Grocery floor",
    "Fill the front shelves before shoppers arrive, starting with the items on the opening list.",
    "Bring stock forward, rotate older inventory to the front, and flag any shelf that cannot be filled.",
    "Comfort moving cases with the equipment provided and reading date labels.",
    "The floor manager checks the opening list. Empty spaces are marked as opportunities even when the item is out of stock."
  ],
  "Set up a window display": [
    "Market · Shop window",
    "Build the week’s display from the samples, fixtures, and reference photo provided by the merchandising team.",
    "Place each item and its shelf card, tidy the window, and leave a photo for the next shift.",
    "Able to follow a reference layout and work with the floor team around the entrance.",
    "The manager signs off against the reference photo. Items sold from the display during setup still count as missing in the final photo."
  ],
  "Apply shelf labels": [
    "Market · Grocery floor",
    "Help get the shelves ready for a price change before the next shopping window.",
    "Match each new label to its item and shelf position. Bring mismatched labels to the floor manager.",
    "Comfort reading small print and matching product codes.",
    "The floor manager checks the changed shelves. A price question from a shopper is logged separately from the labeling work."
  ],
  "Pack online orders": [
    "Market · Online pickup",
    "Get the next round of online grocery orders packed and ready for collection.",
    "Pick from the order list, keep fragile items separate, and send substitution questions to the pickup lead.",
    "Comfort following a handheld pick list and keeping multiple orders separate.",
    "The pickup lead verifies the contents against the order. A substitution stays open until the lead records the result."
  ],
  "Set up tables": [
    "Gatherings · Event hall",
    "Help turn a bare event room into a space ready for guests.",
    "Set tables according to the floor plan, leave the marked aisles clear, and check table numbers with the event lead.",
    "Comfort working with a partner on furniture moves.",
    "The event lead signs off on the floor plan. Layout changes requested before sign-off use the same booked window."
  ],
  "Arrange chairs": [
    "Gatherings · Event hall",
    "Set out chairs for an upcoming talk or reception.",
    "Place chairs by row count and keep the designated gaps clear. Return spare chairs to the marked storage area.",
    "Comfort following a seating diagram and working around other setup crews.",
    "The event lead verifies the seating count. Seats held for late guests still need to be set out."
  ],
  "Staff the check-in desk": [
    "Gatherings · Guest entrance",
    "Welcome guests, check names against the booking list, and help them find the right room.",
    "Record arrivals, hand out the supplied badges, and refer name changes to the event lead.",
    "A friendly greeting and care when handling guest information.",
    "The event lead accepts the checked-in list. A guest who comes back for a replacement badge is still one arrival."
  ],
  "Clear the room after an event": [
    "Gatherings · Event hall",
    "Help clear the room after the final guests leave so the next crew can set up.",
    "Sort borrowed equipment, bag waste, and take found items to the event desk.",
    "Comfort standing throughout the shift and moving items with the equipment provided.",
    "The event lead checks the cleared floor against the turnover sheet. A guest’s belongings must be logged before they count as cleared."
  ],
  "Sweep a storefront": [
    "Market · Store entrance",
    "Give the first shoppers a clean path from the doors to the cart area.",
    "Sweep the marked entrance, clear loose debris, and tell the front-end manager if anything needs a closer look.",
    "Comfort working near foot traffic and using the cleaning supplies provided.",
    "The front-end manager checks the area before sign-off. The next shopper starts a new cleaning interval."
  ],
  "Wipe down tables and counters": [
    "Market · Front end",
    "Clean the guest-service and checkout surfaces between busy periods.",
    "Wipe the marked tables and counters and replenish the supplies at the cleanup station.",
    "Follow the site’s cleaning checklist and leave active counters to the staff operating them.",
    "The front-end manager verifies the finished surfaces. An occupied counter is added to the handoff instead of marked complete."
  ],
  "Clean a break room": [
    "Living · Staff break room",
    "Reset a shared break room before the next team comes in.",
    "Wipe shared surfaces, empty the marked bins, and refill the soap and paper supplies provided.",
    "Comfort following the posted cleaning checklist and identifying personal property.",
    "The site lead checks the room against the reset list. Unclaimed lunches go to the designated shelf and remain unclaimed."
  ],
  "Reset a fitting room": [
    "Retail partner · Fitting rooms",
    "Get the fitting rooms ready for the next shoppers.",
    "Return garments to the sorting rail, clear hangers, and wipe the benches with the supplies provided.",
    "Comfort working around customer arrivals and following room-access instructions.",
    "The floor lead checks the reset rooms. A room in use remains on the handoff list."
  ],
  "Collect a local supply order": [
    "Dispatch · Local pickup",
    "Collect a prepaid supply order and bring it back to the receiving point on the job card.",
    "Check the pickup reference, count the packages, and bring the receipt back with the order.",
    "Able to make the listed local trip and carry the order using the site’s transport arrangements.",
    "The dispatch lead confirms receipt of the packages. A prepaid order does not require a member payment at pickup."
  ],
  "Run a parcel to the mailroom": [
    "Dispatch · Mailroom",
    "Take a labeled parcel from the collection point to the building mailroom.",
    "Check the destination label and get a receiving scan or signature from the desk.",
    "Know how to follow the building’s delivery directions and keep the label intact.",
    "The dispatcher checks the receiving record. A parcel left beside the desk is still recorded as in transit."
  ],
  "Move boxes between departments": [
    "Dispatch · Internal deliveries",
    "Move the marked boxes from one department to another before the afternoon handoff.",
    "Check each destination, move the boxes using the cart provided, and confirm delivery with the receiving team.",
    "Comfort navigating shared corridors and moving boxes with the equipment supplied.",
    "The receiving team accepts the count. A box delivered to its previous department is referred for reconciliation."
  ],
  "Stage outgoing shipments": [
    "Dispatch · Shipping bays",
    "Give the dispatch team a hand lining up outgoing shipments for the next pickup.",
    "Scan the shipment labels, stage packages by route, and separate missing-label items for review.",
    "Comfort checking route labels and working around a dispatch crew.",
    "The dispatch lead accepts the scan list. A parcel staged after its route closes is carried into the next pickup window."
  ]
} satisfies Record<JobTitle, JobDescription>;

export const helpingHandJobsPath = "/sublaborix/jobs";

export const helpingHandPostingGroups = helpingHandCatalog.map(({ category, jobs }) => ({
  category,
  postings: jobs.map(([title, price, duration, payout]) => {
    const [site, summary, duties, requirements, acceptance] = descriptions[title];
    const slug = title.toLowerCase().replaceAll(" ", "-");
    return { category, title, price, duration, payout, site, summary, duties, requirements, acceptance, slug, href: helpingHandJobsPath + "/" + slug };
  }),
}));

export const helpingHandPostings = helpingHandPostingGroups.flatMap(({ postings }) => postings);
export type HelpingHandPosting = (typeof helpingHandPostings)[number];

export function getHelpingHandPosting(slug: string) {
  return helpingHandPostings.find((posting) => posting.slug === slug);
}
