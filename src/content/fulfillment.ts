export const sampleParcel = {
  id: "UW-BOX-1042",
  item: "Market pantry order",
  status: "On its way",
  scans: [
    { time: "8:42 a.m.", title: "Picked", detail: "Your items have been collected." },
    { time: "8:47 a.m.", title: "Packed", detail: "Your parcel is sealed and ready to move." },
    { time: "8:49 a.m.", title: "Shipped", detail: "Scanned into Outbound Bay 4." },
  ],
  pickup: { time: "2:16 p.m.", title: "Courier pickup", detail: "Dispatch accepted the parcel. The delivery window begins." },
  handoff: "Final handoff pending",
} as const;

export const fulfillmentRates = {
  storage: 12,
  pickAndPack: 5,
  inspection: 3,
} as const;
