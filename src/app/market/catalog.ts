type Product = readonly [name: string, size: string, tokens: number];

export const departments: readonly {
  name: string;
  icon: string;
  color: string;
  products: readonly Product[];
}[] = [
  {
    name: "Food",
    icon: "🍌",
    color: "#fff2cb",
    products: [
      ["Banana","1 banana",1],
      ["Large eggs","12 eggs",12],
      ["Long-grain rice","2 lb bag",8],
      ["Pasta","1 lb box",5],
      ["Tomato soup","1 can",4],
      ["Frozen dinner","1 meal",9],
      ["Rolled oats","18 oz",7],
      ["Sandwich bread","1 loaf",6],
    ],
  },
  {
    name: "Bathroom",
    icon: "🧴",
    color: "#fce4ef",
    products: [
      ["Toilet paper","6 rolls",12],
      ["Mint toothpaste","4 oz tube",6],
      ["Bar soap","3 bars",7],
      ["Deodorant","1 stick",8],
      ["Period pads","18 count",9],
      ["Shampoo","12 fl oz",9],
      ["Toothbrush","1 brush",4],
      ["Cotton swabs","200 count",5],
    ],
  },
  {
    name: "Clothes",
    icon: "🧦",
    color: "#efe3ff",
    products: [
      ["Crew socks","3 pairs",12],
      ["Cotton underwear","3 pairs",16],
      ["Plain tee","1 shirt",14],
      ["Work pants","1 pair",28],
      ["Rain jacket","1 jacket",34],
      ["Pullover hoodie","1 hoodie",26],
      ["Knit gloves","1 pair",7],
      ["Work belt","1 belt",11],
    ],
  },
  {
    name: "Home & Cleaning",
    icon: "🧽",
    color: "#dcf4e9",
    products: [
      ["Dish soap","16 fl oz",6],
      ["Kitchen sponges","3 pack",5],
      ["Trash bags","20 count",9],
      ["Laundry detergent","32 loads",15],
      ["LED light bulbs","2 pack",11],
      ["All-purpose cleaner","24 fl oz",8],
      ["Paper towels","2 rolls",7],
      ["Cleaning cloths","4 pack",8],
    ],
  },
  {
    name: "Kitchen",
    icon: "🍳",
    color: "#e3edff",
    products: [
      ["Ceramic mug","1 mug",8],
      ["Lunch containers","3 pack",14],
      ["Frying pan","10 in",24],
      ["Starter cutlery","12 piece",19],
      ["Mixing bowl","2 qt",10],
      ["Water bottle","24 fl oz",13],
      ["Cutting board","1 board",11],
      ["Dish towels","2 pack",9],
    ],
  },
  {
    name: "Baby & Family",
    icon: "🧸",
    color: "#ffe8da",
    products: [
      ["Diapers","24 count",21],
      ["Baby wipes","64 count",8],
      ["Cotton bibs","2 pack",10],
      ["Fitted crib sheet","1 sheet",17],
      ["Burp cloths","3 pack",12],
      ["Baby wash","10 fl oz",8],
      ["Toddler cups","2 pack",11],
      ["Baby socks","4 pairs",10],
    ],
  },
  {
    name: "Vegan & Organic",
    icon: "🌱",
    color: "#e5f4cc",
    products: [
      ["Organic banana", "1 banana", 18],
      ["Organic long-grain rice", "2 lb bag", 64],
      ["Organic rolled oats", "18 oz", 56],
      ["Organic oat milk", "32 fl oz", 48],
      ["Organic extra-firm tofu", "14 oz", 52],
      ["Organic chickpeas", "1 can", 32],
      ["Organic vegan sandwich bread", "1 loaf", 45],
      ["Organic vegan frozen dinner", "1 meal", 96],
    ],
  },
];
