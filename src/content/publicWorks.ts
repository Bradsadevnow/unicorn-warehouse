export const publicWorksCycle = 30;

export const publicWorksPlans = [
  { id: "fire", name: "Fire & Rescue", price: 45, tone: "pink", line: "A warm welcome. A cool head.", benefit: "A household address profile, incident updates, and one copy of your incident report per cycle." },
  { id: "police", name: "Neighborhood Police", price: 55, tone: "sky", line: "We’re already familiar with the neighborhood.", benefit: "A household contact profile, case updates, and one lost-property follow-up per cycle." },
  { id: "bundle", name: "Civic Complete", price: 89, tone: "mint", line: "One address. Two departments. One easy renewal.", benefit: "Both memberships, a shared household profile, and a single timeline for incidents that involve both departments." },
] as const;

export const worksNotices = [
  { name: "Lantern Street lane work", window: "Tuesday · 9 a.m.–noon", detail: "One lane at the Depot Avenue junction is closed for patching. The Clover Loop uses its usual stops.", href: "/public-works#clover-loop", link: "See the Clover Loop" },
  { name: "Marina ramp washdown", window: "Saturday · 7–9 a.m.", detail: "The launch ramp opens after washdown. The shoreline path and picnic lawn stay open.", href: "/public-works#marina", link: "Find the marina" },
  { name: "Lost-property counter", window: "Weekdays · 10 a.m.–4 p.m.", detail: "Bring the tag number if you have it. Unclaimed umbrellas are sorted by color, then by how certain you are.", href: "/public-works#campus", link: "Find the counter" },
] as const;

export const worksProjects = [
  { name: "Depot Avenue resurfacing", status: "In progress", detail: "The crew is patching the approach to the Fulfillment pickup bay.", next: "Next: repaint the lane markings after the surface sets." },
  { name: "Clover Lake shoreline upkeep", status: "Scheduled", detail: "The shoreline crew is replacing loose boards and resetting the picnic area.", next: "Next: inspect the marina ramp before the weekend stop opens." },
  { name: "Sunbeam Row shelter", status: "Complete", detail: "The new shelter has a bench, a roof, and a sign you can read from the opposite side of the road.", next: "Next: install the timetable in the timetable holder." },
] as const;

export const worksRequests = [
  { id: "road", name: "Pothole or damaged sign", team: "Roads & Transit", locations: ["Market Square", "Depot Avenue", "Sunbeam Row"], next: "The crew checks the site and assigns the repair to a work order. A cone may arrive before the repair does." },
  { id: "water", name: "Water leak on public land", team: "Water & Shoreline", locations: ["Depot District", "Crown Gardens", "Clover Lake"], next: "The crew checks whether the leak is on the town’s side of the meter before assigning the work." },
  { id: "shore", name: "Damaged boardwalk or park fixture", team: "Water & Shoreline", locations: ["Clover Lake Marina", "Picnic lawn", "Shoreline path"], next: "The shoreline crew inspects the fixture and can flag it for temporary closure." },
  { id: "property", name: "Lost property follow-up", team: "Neighborhood Police", locations: ["Clover Loop", "Market Square", "Clover Lake Marina"], next: "The desk checks the location against hand-in tags. Finding a tag and finding the umbrella are separate steps." },
] as const;
