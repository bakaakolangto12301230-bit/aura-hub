import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Car, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/experience/content";
import heroImage from "@/assets/home-hero.jpg";
import shopImage from "@/assets/shop-world.jpg";
import eventsImage from "@/assets/events-world.jpg";
import autoImage from "@/assets/auto-world.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Luma — Everything you need, one place" },
    { name: "description", content: "Shop considered goods, create memorable events, and book exceptional car care in one seamless destination." },
    { property: "og:title", content: "Luma — Everything you need, one place" },
    { property: "og:description", content: "One beautiful destination for what you want, what you celebrate, and what you drive." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  const worlds = [
    { to: "/shop" as const, label: "Shop", title: "Find something worth bringing home.", copy: "Objects chosen for how they feel, work, and last.", image: shopImage, icon: ShoppingBag, className: "lg:col-span-7" },
    { to: "/events" as const, label: "Events", title: "Make something worth remembering.", copy: "Beautiful settings and thoughtful details, brought together.", image: eventsImage, icon: Sparkles, className: "lg:col-span-5 lg:mt-24" },
    { to: "/auto" as const, label: "Auto", title: "Give your car the care it deserves.", copy: "From a considered wash to lasting protection.", image: autoImage, icon: Car, className: "lg:col-span-12 lg:mx-[8%]" },
  ];
  return <div>
    <section className="relative min-h-[92svh] overflow-hidden p-3 sm:p-5">
      <img src={heroImage} alt="A glass pavilion bringing together design, celebration, and automotive care" width={1600} height={1104} fetchPriority="high" className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-[2rem] object-cover sm:inset-5 sm:h-[calc(100%-2.5rem)] sm:w-[calc(100%-2.5rem)] sm:rounded-[2.5rem]" />
      <div className="absolute inset-3 rounded-[2rem] bg-gradient-to-r from-ink/80 via-ink/25 to-transparent sm:inset-5 sm:rounded-[2.5rem]" />
      <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-10 sm:pb-20 lg:justify-center">
        <div className="max-w-3xl text-snow reveal-up">
          <div className="mb-5 text-xs font-bold uppercase">Shop · Celebrate · Drive</div>
          <h1 className="font-display text-[clamp(3.5rem,8vw,7.6rem)] leading-[0.88]">Everything you need.<br /><span className="italic">One place.</span></h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-snow/80 sm:text-lg">One beautiful destination for what you want, what you celebrate, and what you drive.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" variant="glass"><Link to="/shop">Start exploring <ArrowRight /></Link></Button><Button asChild size="lg" variant="ghost" className="text-snow hover:bg-snow/15 hover:text-snow"><a href="#discover">See what’s here <ArrowDown /></a></Button></div>
        </div>
        <div className="glass-surface soft-drift absolute bottom-8 right-8 hidden max-w-[250px] rounded-2xl p-4 lg:block"><div className="text-xs font-bold uppercase">Made for your day</div><p className="mt-1 text-sm text-muted-foreground">Move between worlds. Keep your place. Finish in a few simple steps.</p></div>
      </div>
    </section>

    <section id="discover" className="mx-auto max-w-7xl px-5 py-24 sm:py-32"><div className="mb-12 max-w-3xl"><Eyebrow>Discover Luma</Eyebrow><h2 className="font-display text-5xl leading-[0.95] sm:text-7xl">Three worlds.<br /><span className="italic text-muted-foreground">One natural rhythm.</span></h2></div><div className="grid gap-5 lg:grid-cols-12">{worlds.map(({ to, label, title, copy, image, icon: Icon, className }) => <Link key={to} to={to} className={`group relative min-h-[520px] overflow-hidden rounded-[2rem] ${className}`}><img src={image} alt="" width={1408} height={1056} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" /><div className="absolute inset-x-5 bottom-5 text-snow sm:inset-x-7 sm:bottom-7"><div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase"><Icon className="size-4" />{label}</div><div className="flex items-end justify-between gap-5"><div><h3 className="max-w-xl font-display text-4xl leading-tight sm:text-5xl">{title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-snow/75">{copy}</p></div><span className="glass-surface grid size-12 shrink-0 place-items-center rounded-full text-foreground transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"><ArrowRight /></span></div></div></Link>)}</div></section>

    <section className="bg-ink px-5 py-24 text-snow sm:py-32"><div className="mx-auto max-w-6xl"><Eyebrow>Connected by design</Eyebrow><blockquote className="max-w-5xl font-display text-4xl leading-tight sm:text-6xl">“I found the gift, planned the night, and booked the detail — <span className="italic text-snow/55">without ever feeling lost.</span>”</blockquote><div className="mt-10 flex flex-wrap gap-3">{worlds.map(({ to, label }) => <Button key={to} asChild variant="glass"><Link to={to}>{label}<ArrowRight /></Link></Button>)}</div></div></section>
  </div>;
}
