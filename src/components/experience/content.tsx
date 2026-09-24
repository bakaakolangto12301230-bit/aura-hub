import { ArrowRight, Check, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Offering, Product } from "@/data/catalog";
import { usePlatform } from "./platform-provider";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 flex items-center gap-2 text-[0.7rem] font-bold uppercase text-muted-foreground"><span className="h-px w-7 bg-current" />{children}</div>;
}

export function ProductRail({ products }: { products: Product[] }) {
  const { addToCart } = usePlatform();
  return <div className="hide-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0">{products.map((product, index) => <article key={product.id} className={`group relative min-w-[78vw] snap-start overflow-hidden rounded-[1.75rem] bg-muted sm:min-w-[320px] ${index === 0 ? "lg:min-w-[520px]" : "lg:min-w-[340px]"}`}><div className="aspect-[4/5] overflow-hidden"><img src={product.image} alt={product.name} width={1408} height={1056} loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${index > 0 ? `object-[${42 + index * 8}%_center]` : ""}`} /></div><div className="glass-surface absolute inset-x-3 bottom-3 flex items-end justify-between gap-4 rounded-[1.25rem] p-4"><div><div className="text-[0.65rem] font-bold uppercase text-muted-foreground">{product.category}</div><h3 className="mt-1 font-display text-2xl">{product.name}</h3><div className="mt-1 text-sm font-bold">${product.price}</div></div><Button size="icon" variant="inverse" aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(product)}><Plus /></Button></div></article>)}</div>;
}

export function OfferingRail({ items, kind }: { items: Offering[]; kind: "event" | "auto" }) {
  const { setBooking } = usePlatform();
  return <div className="hide-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0">{items.map((item, index) => <article key={item.id} className={`group min-w-[86vw] snap-start overflow-hidden rounded-[1.75rem] bg-card sm:min-w-[420px] ${index === 0 ? "lg:min-w-[560px]" : "lg:min-w-[420px]"}`}><div className="relative aspect-[16/10] overflow-hidden"><img src={item.image} alt={item.name} width={1408} height={1056} loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${index > 0 ? "object-right" : ""}`} /><span className="glass-surface absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold">{item.category}</span></div><div className="p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-3xl">{item.name}</h3><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{item.description}</p></div><div className="shrink-0 text-sm font-bold">{item.priceLabel}</div></div><div className="mt-5 flex flex-wrap gap-2">{item.details.slice(0, 2).map((detail) => <span key={detail} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs"><Check className="size-3 text-primary" />{detail}</span>)}</div><Button className="mt-6" variant="inverse" onClick={() => setBooking({ item, kind })}>{kind === "event" ? "View & book" : "Choose a time"}<ArrowRight /></Button></div></article>)}</div>;
}

export function ServiceSteps({ labels }: { labels: string[] }) {
  return <div className="grid gap-3 sm:grid-cols-4">{labels.map((label, index) => <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-snow">{index + 1}</span><span className="text-sm font-semibold">{label}</span></div>)}</div>;
}

export function AmbientNote({ children }: { children: React.ReactNode }) {
  return <div className="glass-surface flex items-start gap-3 rounded-2xl p-4 text-sm leading-6"><Sparkles className="mt-0.5 shrink-0 text-primary" />{children}</div>;
}