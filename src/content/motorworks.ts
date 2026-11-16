export const vehicles = [
  { id: "mint-mile", name: "Mint Mile", trim: "City", price: 12_900, description: "A cheerful little hatchback for city parking, errands, and keeping the Dispatch app open." },
  { id: "parcel-plus", name: "Parcel Plus", trim: "Cargo", price: 20_400, description: "A flat cargo floor, easy sliding doors, and room for every parcel they assign you." },
  { id: "grand-glimmer", name: "Grand Glimmer", trim: "Executive", price: 31_900, description: "Soft-touch seating, a quiet cabin, and a separate place to keep the keys to your other car." },
] as const;


export const tradeEstimates = [
  { id: "none", label: "No trade-in", credit: 0 },
  { id: "road-ready", label: "Road-ready", credit: 2_400 },
  { id: "needs-service", label: "Service recommended", credit: 900 },
] as const;

export const motorServices = [
  { id: "oil", name: "Oil and filter", price: 48 },
  { id: "inspection", name: "Diagnostic inspection", price: 65 },
  { id: "brakes", name: "Front brake service", price: 320 },
  { id: "tires", name: "Tire rotation", price: 24 },
] as const;

export const inspection = [
  { item: "Lights and signals", status: "Passed", note: "Ready for your next trip." },
  { item: "Tire rotation", status: "Recommended", note: "Due at your next service interval.", service: motorServices[3] },
  { item: "Front brakes", status: "Attention", note: "Bring the replacement recommendation to the service desk.", service: motorServices[2] },
] as const;

export const sampleRepairTotal = inspection.reduce(
  (total, item) => total + ("service" in item ? item.service.price : 0),
  0,
);
