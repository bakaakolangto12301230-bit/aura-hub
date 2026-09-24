import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CarFront, CircleGauge, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Eyebrow, OfferingRail, ServiceSteps } from "@/components/experience/content";
import { autoServices, featuredAutoService } from "@/data/catalog";
import { usePlatform } from "@/components/experience/platform-provider";
import autoImage from "@/assets/auto-world.jpg";

export const Route = createFileRoute("/auto")({
  head: () => ({ meta: [
    { title: "Premium automotive care — Luma" },
    { name: "description", content: "Choose detailing, ceramic protection, and restorative automotive care, then reserve a convenient appointment." },
    { property: "og:title", content: "Premium automotive care — Luma" },
    { property: "og:description", content: "Considered care for every surface and every drive." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: AutoPage,
});

function AutoPage() {
  const { setBooking } = usePlatform();
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .45 }} className="bg-ink text-snow">
    <section className="relative min-h-[92svh] overflow-hidden p-3 pt-24 sm:p-5 sm:pt-28"><img src={autoImage} alt="A freshly detailed graphite performance car" width={1408} height={1056} className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-[2rem] object-cover sm:inset-5 sm:h-[calc(100%-2.5rem)] sm:w-[calc(100%-2.5rem)] sm:rounded-[2.5rem]" /><div className="absolute inset-3 rounded-[2rem] bg-gradient-to-r from-ink/90 via-ink/15 to-transparent sm:inset-5 sm:rounded-[2.5rem]" /><div className="relative mx-auto flex min-h-[calc(92svh-7rem)] max-w-7xl items-center px-5 sm:px-10"><div className="max-w-3xl"><div className="mb-4 text-xs font-bold uppercase text-snow/75">Precision car care</div><h1 className="font-display text-6xl leading-[0.88] sm:text-8xl">The finish<br /><span className="italic text-auto">speaks for itself.</span></h1><p className="mt-6 max-w-lg text-base leading-7 text-snow/70">Meticulous detailing, lasting protection, and a booking experience as polished as the result.</p><div className="mt-8 flex flex-wrap gap-3"><Button size="lg" variant="glass" onClick={() => setBooking({ item: featuredAutoService, kind: "auto" })}>Reserve a detail <ArrowRight /></Button><Button variant="ghost" className="text-snow hover:bg-snow/10 hover:text-snow" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>Explore services</Button></div></div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32"><div className="mb-12 max-w-3xl"><Eyebrow>Care, considered</Eyebrow><h2 className="font-display text-5xl leading-none sm:text-7xl">Choose what your<br /><span className="italic text-snow/45">car needs today.</span></h2></div><div className="grid gap-3 md:grid-cols-3">{[{ icon: Sparkles, title: "Reset", copy: "A complete wash and interior refresh." }, { icon: CircleGauge, title: "Restore", copy: "Correct, refine, and bring depth back." }, { icon: ShieldCheck, title: "Protect", copy: "Lock in gloss with long-term protection." }].map(({ icon: Icon, title, copy }, index) => <button key={title} onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className={`group min-h-64 rounded-[1.75rem] border border-snow/10 p-6 text-left transition-all hover:-translate-y-1 ${index === 1 ? "bg-snow text-ink" : "bg-snow/5"}`}><Icon className="mb-20 size-6" /><div className="flex items-end justify-between"><div><h3 className="font-display text-3xl">{title}</h3><p className={`mt-2 text-sm ${index === 1 ? "text-muted-foreground" : "text-snow/55"}`}>{copy}</p></div><ArrowRight className="transition-transform group-hover:translate-x-1" /></div></button>)}</div></section>

    <section id="services" className="rounded-t-[3rem] bg-background px-5 py-24 text-foreground sm:py-32"><div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><Eyebrow>Detailing menu</Eyebrow><h2 className="font-display text-5xl sm:text-6xl">Every surface,<br /><span className="italic text-auto">thoughtfully handled.</span></h2></div><Button variant="glass"><CarFront /> Sedan selected</Button></div><OfferingRail items={autoServices} kind="auto" /><div className="mt-20"><Eyebrow>From need to gleam</Eyebrow><ServiceSteps labels={["Choose service", "Select package", "Pick a time", "Drive away renewed"]} /></div></div></section>
  </motion.div>;
}