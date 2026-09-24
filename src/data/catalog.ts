import shopImage from "@/assets/shop-world.jpg";
import eventsImage from "@/assets/events-world.jpg";
import autoImage from "@/assets/auto-world.jpg";

export type ExperienceKey = "shop" | "events" | "auto";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  accent: string;
};

export type Offering = {
  id: string;
  name: string;
  category: string;
  price: number;
  priceLabel: string;
  description: string;
  details: string[];
  image: string;
};

export const products: Product[] = [
  { id: "weekender", name: "Form Weekender", category: "Carry", price: 248, description: "Soft-grain leather, considered down to the last pocket.", image: shopImage, accent: "Graphite" },
  { id: "meridian-watch", name: "Meridian Watch", category: "Objects", price: 189, description: "A quiet, precise companion in brushed steel.", image: shopImage, accent: "Onyx" },
  { id: "cloud-knit", name: "Cloud Knit", category: "Wear", price: 128, description: "Airy merino with an easy, architectural drape.", image: shopImage, accent: "Ivory" },
  { id: "still-fragrance", name: "Still No. 04", category: "Home", price: 84, description: "Cedar, mineral air, and a trace of green fig.", image: shopImage, accent: "Amber" },
];

export const eventPackages: Offering[] = [
  { id: "golden-hour", name: "Golden Hour Gathering", category: "Celebration", price: 4200, priceLabel: "From $4,200", description: "A warm, effortless celebration shaped around your people.", details: ["Up to 60 guests", "Seasonal dining menu", "Florals and ambient lighting", "Event host and coordination"], image: eventsImage },
  { id: "ever-after", name: "Ever After", category: "Wedding", price: 8900, priceLabel: "From $8,900", description: "An intimate ceremony and dinner with every detail composed.", details: ["Up to 90 guests", "Ceremony and reception", "Chef-led menu tasting", "Full planning support"], image: eventsImage },
  { id: "bright-ideas", name: "Bright Ideas", category: "Corporate", price: 3600, priceLabel: "From $3,600", description: "A polished setting for teams, launches, and meaningful conversation.", details: ["Up to 80 guests", "Presentation setup", "All-day refreshments", "Dedicated producer"], image: eventsImage },
];

export const autoServices: Offering[] = [
  { id: "signature-detail", name: "Signature Detail", category: "Complete care", price: 289, priceLabel: "$289", description: "A meticulous inside-and-out reset for your daily drive.", details: ["Hand wash and decontamination", "Interior deep clean", "One-step paint enhancement", "4–5 hours"], image: autoImage },
  { id: "ceramic-shield", name: "Ceramic Shield", category: "Protection", price: 749, priceLabel: "From $749", description: "Long-lasting gloss and easier maintenance through every season.", details: ["Paint correction", "Two-year ceramic coating", "Glass and wheel protection", "Full-day service"], image: autoImage },
  { id: "interior-renewal", name: "Interior Renewal", category: "Cabin care", price: 179, priceLabel: "$179", description: "Deep restorative care for every surface you touch.", details: ["Steam and extraction", "Leather conditioning", "Odor neutralization", "3 hours"], image: autoImage },
];

export const searchItems = [
  ...products.map((item) => ({ id: item.id, title: item.name, subtitle: item.category, type: "Product", href: "/shop" as const })),
  ...eventPackages.map((item) => ({ id: item.id, title: item.name, subtitle: item.category, type: "Event", href: "/events" as const })),
  ...autoServices.map((item) => ({ id: item.id, title: item.name, subtitle: item.category, type: "Auto", href: "/auto" as const })),
];
