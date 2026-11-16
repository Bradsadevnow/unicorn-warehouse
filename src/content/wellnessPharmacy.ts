export const pharmacyPlans = [
  { id: "counter", name: "Counter Care", price: 29, benefit: "Refill reminders, status updates, and pickup at a participating Wellness counter." },
  { id: "reserved", name: "Counter Reserve", price: 69, benefit: "Everything in Counter Care, plus a six-hour pickup window once the counter confirms release." },
  { id: "doorstep", name: "Doorstep Continuity", price: 129, benefit: "Everything in Counter Reserve, plus one standard Dispatch handoff per cycle for eligible orders." },
] as const;

export const refillExamples = [
  { id: "ready", label: "Ready at Ribbon Row", review: "Approved", stock: "Reserved at Ribbon Row", release: "Ready for pickup" },
  { id: "transfer", label: "Stock transfer in progress", review: "Approved", stock: "In transit from Fulfillment", release: "Awaiting counter receipt" },
  { id: "renewal", label: "Pickup after renewal", review: "Approved", stock: "Reserved at Ribbon Row", release: "On hold · Renewal payment pending" },
] as const;
