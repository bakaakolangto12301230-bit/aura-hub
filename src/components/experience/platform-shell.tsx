import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowRight, CalendarDays, Car, Check, ChevronDown, CircleUserRound,
  Menu, Minus, Package, Search, ShoppingBag, Sparkles, Store, Trash2, X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { eventPackages, searchItems } from "@/data/catalog";
import { usePlatform } from "./platform-provider";

const worlds = [
  { to: "/shop" as const, label: "Shop", copy: "Objects to live with", icon: Store, color: "text-shop" },
  { to: "/events" as const, label: "Events", copy: "Moments to remember", icon: Sparkles, color: "text-event" },
  { to: "/auto" as const, label: "Auto", copy: "Care for every drive", icon: Car, color: "text-auto" },
];

function Brand() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Luma home">
      <span className="grid size-8 place-items-center rounded-full bg-ink text-snow shadow-deep transition-transform duration-300 group-hover:rotate-12">
        <span className="font-display text-lg leading-none">L</span>
      </span>
      <span className="hidden text-[0.95rem] font-bold sm:block">Luma</span>
    </Link>
  );
}

export function PlatformShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart, setCartOpen, setSearchOpen } = usePlatform();
  const context = pathname.startsWith("/shop") ? "Shop" : pathname.startsWith("/events") ? "Events" : pathname.startsWith("/auto") ? "Auto" : "Explore";
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setSearchOpen]);

  const contextualLinks = context === "Shop"
    ? ["New arrivals", "Collections"]
    : context === "Events"
      ? ["Occasions", "Packages"]
      : context === "Auto" ? ["Services", "Packages"] : [];

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5">
        <nav className="glass-surface mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-3 sm:h-16 sm:px-4" aria-label="Primary navigation">
          <div className="flex items-center gap-2">
            <Brand />
            <div className="relative hidden md:block">
              <Button variant="ghost" onClick={() => setExploreOpen((open) => !open)} aria-expanded={exploreOpen} className="gap-1.5">
                {context}<ChevronDown className={`transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
              </Button>
              {exploreOpen && (
                <div className="glass-elevated absolute left-0 top-14 w-80 overflow-hidden rounded-[1.5rem] p-2 reveal-up">
                  <div className="px-3 pb-2 pt-1 text-[0.68rem] font-bold uppercase text-muted-foreground">Choose your world</div>
                  {worlds.map(({ to, label, copy, icon: Icon, color }) => (
                    <Link key={to} to={to} onClick={() => setExploreOpen(false)} className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-accent">
                      <span className={`grid size-10 place-items-center rounded-full bg-background ${color}`}><Icon /></span>
                      <span className="min-w-0 flex-1"><span className="block font-bold">{label}</span><span className="block text-xs text-muted-foreground">{copy}</span></span>
                      <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {contextualLinks.length ? contextualLinks.map((label) => <button key={label} className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">{label}</button>) : (
              <Link to="/" activeProps={{ className: "bg-accent text-foreground" }} className="rounded-full px-3 py-2 text-sm text-muted-foreground">Home</Link>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen(true)}><Search /></Button>
            <Button variant="ghost" size="icon" aria-label={`Cart with ${count} items`} className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingBag />
              {count > 0 && <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[0.6rem] font-bold text-primary-foreground">{count}</span>}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account" className="hidden sm:inline-flex"><CircleUserRound /></Button>
            <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden" onClick={() => setMobileOpen(true)}><Menu /></Button>
            <Button asChild variant="inverse" className="ml-1 hidden sm:inline-flex">
              <Link to={context === "Events" ? "/events" : context === "Auto" ? "/auto" : "/shop"}>{context === "Events" || context === "Auto" ? "Book now" : "Start exploring"}</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main>{children}</main>
      <footer className="border-t border-border bg-snow px-5 py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div><Brand /><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Things worth keeping. Moments worth remembering. Care that goes further.</p></div>
          <div className="flex flex-wrap gap-5 text-sm font-semibold">{worlds.map(({ to, label }) => <Link key={to} to={to} className="transition-opacity hover:opacity-60">{label}</Link>)}</div>
        </div>
      </footer>
      <GlobalSearch />
      <CartSheet />
      <BookingDialog />
      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
    </div>
  );
}

function MobileMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Sheet open={open} onOpenChange={onOpenChange}><SheetContent side="bottom" className="glass-elevated rounded-t-[2rem] border-glass-border px-5 pb-10 pt-7"><SheetTitle className="font-display text-3xl font-normal">Where to?</SheetTitle><SheetDescription className="mb-5">Move through Luma without losing your place.</SheetDescription><div className="grid gap-2">{worlds.map(({ to, label, copy, icon: Icon }) => <Link key={to} to={to} onClick={() => onOpenChange(false)} className="flex min-h-16 items-center gap-4 rounded-2xl bg-background/70 p-3"><span className="grid size-11 place-items-center rounded-full bg-ink text-snow"><Icon /></span><span><span className="block font-bold">{label}</span><span className="text-xs text-muted-foreground">{copy}</span></span></Link>)}</div></SheetContent></Sheet>;
}

function GlobalSearch() {
  const { searchOpen, setSearchOpen } = usePlatform();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchItems.filter((item) => `${item.title} ${item.subtitle} ${item.type}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="glass-elevated top-[8%] max-h-[82vh] max-w-2xl translate-y-0 overflow-hidden rounded-[2rem] border-glass-border p-0">
        <DialogTitle className="sr-only">Search everything</DialogTitle><DialogDescription className="sr-only">Search products, event packages, and auto services.</DialogDescription>
        <div className="flex items-center gap-3 border-b border-border px-5"><Search className="text-muted-foreground" /><Input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search everything" className="h-16 border-0 bg-transparent px-0 text-lg shadow-none focus-visible:ring-0" /><span className="hidden rounded-md border border-border px-2 py-1 text-[0.65rem] text-muted-foreground sm:block">ESC</span></div>
        <div className="max-h-[60vh] overflow-y-auto p-3"><div className="px-3 py-2 text-xs font-bold uppercase text-muted-foreground">{query ? `${results.length} matches` : "Suggested for you"}</div>{results.map((item) => <Link key={`${item.type}-${item.id}`} to={item.href} onClick={() => setSearchOpen(false)} className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-accent"><span className="grid size-10 place-items-center rounded-full bg-background"><Package /></span><span className="flex-1"><span className="block font-semibold">{item.title}</span><span className="text-xs text-muted-foreground">{item.type} · {item.subtitle}</span></span><ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>)}</div>
      </DialogContent>
    </Dialog>
  );
}

function CartSheet() {
  const { cart, cartOpen, setCartOpen, removeFromCart, clearCart } = usePlatform();
  const [confirmed, setConfirmed] = useState(false);
  const total = cart.reduce((sum, line) => sum + line.price * line.quantity, 0);
  return <Sheet open={cartOpen} onOpenChange={(open) => { setCartOpen(open); if (!open) setConfirmed(false); }}><SheetContent className="glass-elevated flex w-full flex-col border-glass-border sm:max-w-md"><SheetTitle className="font-display text-3xl font-normal">Your bag</SheetTitle><SheetDescription>{cart.length ? `${cart.length} considered choice${cart.length === 1 ? "" : "s"}` : "Ready when something catches your eye."}</SheetDescription>{confirmed ? <div className="grid flex-1 place-items-center text-center"><div><span className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-7" /></span><h3 className="font-display text-3xl">Order reserved.</h3><p className="mt-2 text-sm text-muted-foreground">Your mock confirmation is ready. No payment was taken.</p><Button className="mt-6" variant="inverse" onClick={() => { clearCart(); setCartOpen(false); }}>Done</Button></div></div> : <><div className="mt-6 flex-1 space-y-3 overflow-y-auto">{cart.length === 0 ? <div className="grid h-64 place-items-center rounded-3xl border border-dashed border-border text-center"><div><ShoppingBag className="mx-auto mb-3 text-muted-foreground" /><p className="font-semibold">Your bag is beautifully empty.</p><Button asChild variant="ghost" className="mt-2" onClick={() => setCartOpen(false)}><Link to="/shop">Discover the shop <ArrowRight /></Link></Button></div></div> : cart.map((line) => <div key={line.id} className="flex items-center gap-3 rounded-2xl bg-background/75 p-3"><img src={line.image} alt="" className="size-16 rounded-xl object-cover" /><div className="min-w-0 flex-1"><div className="font-semibold">{line.name}</div><div className="text-xs text-muted-foreground">{line.accent} · Qty {line.quantity}</div><div className="mt-1 text-sm font-bold">${line.price * line.quantity}</div></div><Button size="icon" variant="ghost" aria-label={`Remove ${line.name}`} onClick={() => removeFromCart(line.id)}><Trash2 /></Button></div>)}</div>{cart.length > 0 && <div className="border-t border-border pt-5"><div className="mb-4 flex justify-between"><span className="text-muted-foreground">Total</span><span className="text-xl font-bold">${total}</span></div><Button variant="inverse" size="lg" className="w-full" onClick={() => setConfirmed(true)}>Checkout <ArrowRight /></Button></div>}</>}</SheetContent></Sheet>;
}

function BookingDialog() {
  const { booking, setBooking } = usePlatform();
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("Sat, Oct 17");
  const [time, setTime] = useState("10:30 AM");
  useEffect(() => { if (booking) setStep(0); }, [booking]);
  if (!booking) return null;
  const dates = booking.kind === "event" ? ["Sat, Oct 17", "Sat, Oct 24", "Fri, Nov 6"] : ["Tomorrow", "Sat, Sep 26", "Mon, Sep 28"];
  return <Dialog open onOpenChange={(open) => !open && setBooking(null)}><DialogContent className="glass-elevated max-w-xl rounded-[2rem] border-glass-border p-0"><DialogTitle className="sr-only">Book {booking.item.name}</DialogTitle><DialogDescription className="sr-only">Choose a date and time, then confirm your request.</DialogDescription><div className="relative h-52 overflow-hidden rounded-t-[2rem]"><img src={booking.item.image} alt="" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" /><div className="absolute bottom-5 left-5 text-snow"><div className="text-xs font-bold uppercase">{booking.kind === "event" ? "Plan your moment" : "Reserve your care"}</div><div className="font-display text-3xl">{booking.item.name}</div></div></div><div className="p-5 sm:p-7">{step === 0 && <><div className="mb-5 flex items-center gap-2 text-sm font-semibold"><CalendarDays /> Choose a date</div><div className="grid grid-cols-3 gap-2">{dates.map((value) => <Button key={value} variant={date === value ? "inverse" : "glass"} className="h-auto whitespace-normal px-2 py-3" onClick={() => setDate(value)}>{value}</Button>)}</div><div className="mb-3 mt-6 text-sm font-semibold">A time that works</div><div className="grid grid-cols-3 gap-2">{["10:30 AM", "1:00 PM", "4:30 PM"].map((value) => <Button key={value} variant={time === value ? "default" : "outline"} onClick={() => setTime(value)}>{value}</Button>)}</div><Button className="mt-7 w-full" size="lg" variant="inverse" onClick={() => setStep(1)}>Continue <ArrowRight /></Button></>}{step === 1 && <><button className="mb-5 flex items-center gap-2 text-sm font-semibold text-muted-foreground" onClick={() => setStep(0)}><ArrowLeft className="size-4" /> Change selection</button><div className="rounded-2xl bg-background/75 p-4"><div className="flex justify-between gap-4"><span className="text-muted-foreground">Selection</span><span className="font-semibold">{booking.item.name}</span></div><div className="mt-3 flex justify-between gap-4"><span className="text-muted-foreground">When</span><span className="font-semibold">{date} · {time}</span></div><div className="mt-3 flex justify-between gap-4"><span className="text-muted-foreground">Estimate</span><span className="font-semibold">{booking.item.priceLabel}</span></div></div><div className="mt-5 grid gap-3"><Input aria-label="Your name" placeholder="Your name" className="h-12 rounded-xl bg-background/70" /><Input aria-label="Email address" type="email" placeholder="Email address" className="h-12 rounded-xl bg-background/70" /></div><Button className="mt-5 w-full" size="lg" variant="inverse" onClick={() => setStep(2)}>Confirm request</Button></>}{step === 2 && <div className="py-8 text-center"><span className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-7" /></span><h3 className="font-display text-3xl">You’re all set.</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">We’ve held {date} at {time}. This is a frontend preview, so no real booking was made.</p><Button className="mt-6" variant="inverse" onClick={() => setBooking(null)}>Done</Button></div>}</div></DialogContent></Dialog>;
}