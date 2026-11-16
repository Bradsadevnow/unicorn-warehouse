export const wellnessCycleDays = 30;

export const wellnessPlans = [
  { id: "everyday", name: "Everyday Care", price: 85, tone: "lilac", line: "A familiar place to start.", benefit: "One routine check-in per cycle and a member inbox for follow-up questions.", appointment: "Routine check-in" },
  { id: "gut", name: "Gastrointestinal Support Bundle", price: 145, tone: "mint", line: "Make room for a more comfortable day.", benefit: "Two digestive support check-ins per cycle and a private food and comfort journal.", appointment: "Digestive support check-in" },
  { id: "mobility", name: "Movement & Recovery", price: 180, tone: "peach", line: "Keep doing the things that move you.", benefit: "Two mobility reviews per cycle and a return-to-routine summary you can take with you.", appointment: "Mobility review" },
  { id: "rest", name: "Rest & Reset", price: 155, tone: "lilac", line: "A little more room to recover.", benefit: "One recovery review per cycle and the option to bring your Dreamwell history to the appointment.", appointment: "Recovery review" },
  { id: "air", name: "Breathing Well", price: 165, tone: "sky", line: "A little support with every breath.", benefit: "One breathing support check-in per cycle and a review of your Everair plan and equipment records.", appointment: "Breathing support check-in" },
  { id: "mind", name: "Mindful Moments", price: 210, tone: "pink", line: "Make some time to talk.", benefit: "Two private conversations per cycle and access to the same care team for follow-up.", appointment: "Private conversation" },
  { id: "household", name: "Household Care", price: 360, tone: "butter", line: "One place to come back to, together.", benefit: "Four shared routine check-ins per cycle for up to three enrolled household members.", appointment: "Household check-in" },
  { id: "continuity", name: "Continuity Plus", price: 640, tone: "mint", line: "A care team that keeps up with you.", benefit: "One named care coordinator, one planning review per cycle, and help coordinating records across your memberships.", appointment: "Care planning review" },
] as const;

export const wellnessClinics = [
  { id: "ribbon", name: "Ribbon Row Clinic", neighborhood: "Ribbon Row", slots: ["everyday", "gut", "mind", "household"] },
  { id: "depot", name: "Depot District Clinic", neighborhood: "Across from Fulfillment", slots: ["everyday", "mobility", "air"] },
  { id: "garden", name: "Garden Pavilion", neighborhood: "Crown Gardens", slots: ["gut", "rest", "continuity"] },
] as const;
