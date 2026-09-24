import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Heart, PartyPopper, UsersRound } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Eyebrow, OfferingRail, ServiceSteps } from "@/components/experience/content";
import { eventPackages, featuredEvent } from "@/data/catalog";
import { usePlatform } from "@/components/experience/platform-provider";
import eventsImage from "@/assets/events-world.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [
    { title: "Events made memorable — Luma" },
    { name: "description", content: "Explore beautiful event packages for weddings, birthdays, celebrations, and corporate gatherings." },
    { property: "og:title", content: "Events made memorable — Luma" },
    { property: "og:description", content: "Beautiful settings and thoughtful details, brought together." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: EventsPage,
});

function EventsPage() {
  const { setBooking } = usePlatform();
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .45 }}>
    <section className="relative min-h-[88svh] overflow-hidden p-3 pt-24 sm:p-5 sm:pt-28"><img src={eventsImage} alt="A candlelit glasshouse celebration at sunset" width={1408} height={1056} className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-[2rem] object-cover sm:inset-5 sm:h-[calc(100%-2.5rem)] sm:w-[calc(100%-2.5rem)] sm:rounded-[2.5rem]" /><div className="absolute inset-3 rounded-[2rem] bg-gradient-to-t from-ink/85 via-transparent to-transparent sm:inset-5 sm:rounded-[2.5rem]" /><div className="relative mx-auto flex min-h-[calc(88svh-7rem)] max-w-7xl items-end px-5 pb-10 text-snow sm:px-10 sm:pb-14"><div className="max-w-4xl"><div className="mb-4 text-xs font-bold uppercase">Gather beautifully</div><h1 className="font-display text-5xl leading-[0.92] sm:text-8xl">Make something<br /><span className="italic">worth remembering.</span></h1><div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center"><p className="max-w-xl text-base leading-7 text-snow/75">From the first welcome to the last toast, choose a thoughtful starting point and make it entirely yours.</p><Button variant="glass" size="lg" onClick={() => setBooking({ item: featuredEvent, kind: "event" })}>Find your date <CalendarDays /></Button></div></div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-24 sm:py-32"><div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]"><div className="lg:sticky lg:top-32 lg:self-start"><Eyebrow>Start with the feeling</Eyebrow><h2 className="font-display text-5xl leading-none sm:text-6xl">What are we<br /><span className="italic text-event">celebrating?</span></h2><p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Choose an occasion. We’ll surface the settings, menus, and details that fit.</p></div><div className="grid gap-3 sm:grid-cols-2">{[{ label: "A birthday", icon: PartyPopper }, { label: "A wedding", icon: Heart }, { label: "A private gathering", icon: UsersRound }, { label: "A team moment", icon: CalendarDays }].map(({ label, icon: Icon }, index) => <button key={label} onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })} className={`group flex min-h-44 items-end justify-between rounded-[1.75rem] border border-border p-5 text-left transition-all hover:-translate-y-1 hover:shadow-glass ${index === 1 ? "bg-event text-snow" : "bg-card"}`}><span><Icon className="mb-8" /><span className="block font-display text-3xl">{label}</span></span><ArrowRight className="transition-transform group-hover:translate-x-1" /></button>)}</div></div></section>

    <section id="packages" className="bg-warm/20 px-5 py-24"><div className="mx-auto max-w-7xl"><div className="mb-10 max-w-2xl"><Eyebrow>Thoughtful beginnings</Eyebrow><h2 className="font-display text-5xl sm:text-6xl">Packages with room<br /><span className="italic text-event">to make them yours.</span></h2></div><OfferingRail items={eventPackages} kind="event" /></div></section>
    <section className="mx-auto max-w-6xl px-5 py-24"><Eyebrow>Simple by design</Eyebrow><ServiceSteps labels={["Choose occasion", "Explore package", "Select your date", "Confirm details"]} /></section>
  </motion.div>;
}