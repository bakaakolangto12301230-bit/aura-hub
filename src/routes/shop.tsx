import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Filter, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { AmbientNote, Eyebrow, ProductRail } from "@/components/experience/content";
import { products } from "@/data/catalog";
import { usePlatform } from "@/components/experience/platform-provider";
import shopImage from "@/assets/shop-world.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [
    { title: "Shop considered goods — Luma" },
    { name: "description", content: "Discover tactile essentials, new arrivals, and thoughtful objects selected to live beautifully." },
    { property: "og:title", content: "Shop considered goods — Luma" },
    { property: "og:description", content: "Objects selected for how they feel, work, and last." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ShopPage,
});

function ShopPage() {
  const [category, setCategory] = useState("Everything");
  const { setSearchOpen, addToCart } = usePlatform();
  const categories = ["Everything", "Carry", "Objects", "Wear", "Home"];
  const filtered = category === "Everything" ? products : products.filter((item) => item.category === category);
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .45 }}>
    <section className="relative min-h-[80svh] overflow-hidden px-5 pb-12 pt-28 sm:pt-32"><div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]"><div className="relative z-10"><Eyebrow>Curated for the everyday</Eyebrow><h1 className="font-display text-6xl leading-[0.9] sm:text-8xl">Objects with<br /><span className="italic text-shop">lasting presence.</span></h1><p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">A considered edit of things that earn their place—through utility, material, and quiet delight.</p><div className="mt-8 flex gap-3"><Button variant="inverse" onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}>Shop new arrivals <ArrowRight /></Button><Button variant="glass" size="icon" aria-label="Search products" onClick={() => setSearchOpen(true)}><Search /></Button></div></div><div className="relative min-h-[520px]"><div className="absolute inset-0 overflow-hidden rounded-[2.5rem]"><img src={shopImage} alt="A curated leather weekender, knitwear, watch, and fragrance" width={1408} height={1056} className="h-full w-full object-cover" /></div><div className="glass-surface absolute bottom-5 left-5 right-5 rounded-2xl p-4 sm:left-auto sm:w-72"><div className="text-xs font-bold uppercase text-shop">Editor’s pick</div><div className="mt-1 font-display text-2xl">Form Weekender</div><p className="mt-1 text-xs leading-5 text-muted-foreground">Soft-grain leather with a place for everything.</p><div className="mt-4 flex items-center justify-between"><span className="font-bold">$248</span><Button size="icon" variant="inverse" aria-label="Add Form Weekender to cart" onClick={() => addToCart(products[0])}><ShoppingBag /></Button></div></div></div></div></section>

    <section id="collection" className="mx-auto max-w-7xl px-5 py-20"><div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><Eyebrow>New arrivals</Eyebrow><h2 className="font-display text-5xl sm:text-6xl">Made to be used.</h2></div><div className="hide-scrollbar flex gap-2 overflow-x-auto">{categories.map((item) => <Button key={item} variant={category === item ? "inverse" : "glass"} onClick={() => setCategory(item)}>{item}</Button>)}<Button variant="glass" size="icon" aria-label="More filters"><Filter /></Button></div></div><ProductRail products={filtered} /></section>

    <section className="px-5 pb-24"><div className="mx-auto grid max-w-6xl gap-6 rounded-[2.5rem] bg-ink p-7 text-snow sm:p-12 lg:grid-cols-2 lg:items-center"><div><Eyebrow>Collection 04</Eyebrow><h2 className="font-display text-4xl sm:text-6xl">Quiet forms.<br /><span className="italic text-snow/55">Rich materials.</span></h2></div><div><AmbientNote>Every piece in this edit is selected to work together—without looking like a set.</AmbientNote><Button asChild className="mt-5" variant="glass"><Link to="/shop">Explore the complete edit <ArrowRight /></Link></Button></div></div></section>
  </motion.div>;
}