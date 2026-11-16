export const constructionProjects = [
  {
    id: "little-stoop", name: "Little Stoop Townhomes", client: "Unicorn Warehouse Living",
    description: "Family townhomes around a shared playground, with wide front steps and room to leave the stroller.",
    plan: ["Ground floor · Living room, kitchen, front stoop", "Upper floor · Three bedrooms, shared bath"],
    milestones: ["Site and foundations complete", "Framing and utilities complete", "Handoff to Living complete"],
    href: "/living",
  },
  {
    id: "outbound-bay", name: "Outbound Bay Expansion", client: "Unicorn Warehouse Fulfillment",
    description: "A covered staging extension with separate entrances for incoming inventory and courier pickup.",
    plan: ["Street side · Courier check-in and sheltered pickup", "Warehouse side · Staging lanes and outbound scan station"],
    milestones: ["Survey and bay layout complete", "Canopy installation in progress", "Load test and handoff scheduled"],
    href: "/fulfillment",
  },
  {
    id: "pavilion", name: "Garden Pavilion Fit-Out", client: "Unicorn Warehouse Wellness",
    description: "A clinic fit-out that makes room for private conversations, a quiet waiting area, and an accessible entry.",
    plan: ["Public side · Ramp entrance, reception, quiet waiting", "Clinic side · Consultation rooms and staff workroom"],
    milestones: ["Measured survey complete", "Partitions and finish schedule in progress", "Clinic walk-through scheduled"],
    href: "/wellness",
  },
] as const;
