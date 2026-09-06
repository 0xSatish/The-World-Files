import Link from "next/link";
import BloubAvatar from "@/components/BloubAvatar";
import Disclaimer from "@/components/Disclaimer";
import PostCard from "@/components/PostCard";
import { getLatest, getSectionPosts } from "@/lib/content";

const TIMELINE_BEATS = [
  { label: "Phantom cutover", href: "/news/2026-06-phantom-cutover" },
  { label: "Disclosure unmasking", href: "/news/2026-06-disclosure-unmasking" },
  { label: "1 July public launch", href: "/news/2026-07-public-launch" },
  { label: "Chainlink + CASH stack", href: "/news/2026-07-public-launch" },
  { label: "Robinhood post (unverified)", href: "/news/2026-07-robinhood-chain-post" },
  { label: "Architecture research", href: "/learn/how-world-prices-a-trade" },
  { label: "Public hiring", href: "/news/2026-08-public-hiring" },
  { label: "UFC / football expansion", href: "/news/2026-08-ufc-hyperliquid-mindshare" },
];

export default function Home() {
  const latest = getLatest(3);
  const explainers = getSectionPosts("learn")
    .filter((p) =>
      ["yes-vs-no", "self-custody-explained", "what-is-a-prediction-market"].includes(
        p.slug
      )
    )
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-line">
        {/* Dedicated Hero Bloub Positioning Wrapper */}
        <div className="hero-anim absolute inset-0 pointer-events-none select-none z-0">
          <BloubAvatar className="absolute -top-[70px] -right-[184px] w-[500px] h-[500px] sm:-top-[90px] sm:-right-[239px] sm:w-[650px] sm:h-[650px] md:-top-[115px] md:-right-[304px] md:w-[825px] md:h-[825px] lg:-top-[140px] lg:-right-[368px] lg:w-[1000px] lg:h-[1000px] xl:-top-[155px] xl:-right-[405px] xl:w-[1100px] xl:h-[1100px]" />
        </div>

        {/* Master Container */}
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-16 md:pt-24 md:pb-20 z-10">
          <div className="max-w-2xl">
            {/* World.xyz Display Wordmark */}
            <div className="hero-anim mb-4 md:mb-5">
              <span className="font-display font-medium text-liquid-mesh text-5xl md:text-7xl tracking-normal inline-block leading-none">
                World.xyz
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-anim font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] text-ink font-normal">
              The Solana prediction market
              <br />
              for everything that&rsquo;s about to happen.
            </h1>

            {/* CTA Row */}
            <div className="hero-anim mt-8 md:mt-10 flex flex-wrap items-center gap-6">
              <a
                href="https://world.xyz"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group relative inline-flex"
              >
                <span className="gradient-border inline-flex">
                  <span
                    className="gradient-border-inner inline-flex items-center gap-2 px-5 py-3 font-mono text-[13px] text-accent group-hover:text-bg transition-colors"
                    style={{ background: "var(--bg)" }}
                  >
                    Trade on world.xyz
                  </span>
                </span>
                {/* Gradient fill on hover */}
                <span
                  className="absolute inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-mono text-[13px] text-bg font-medium"
                  style={{ background: "var(--accent-gradient)" }}
                >
                  Trade on world.xyz
                </span>
              </a>
              <Link
                href="/what-is-world"
                className="font-mono text-[13px] text-ink-dim hover:text-ink transition-colors"
              >
                Start here
              </Link>
            </div>

            {/* Disclaimer */}
            <Disclaimer className="hero-anim mt-8 md:mt-10" />
          </div>
        </div>
      </section>

      {/* Last 90 days */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-mono text-[13px] uppercase tracking-wide text-ink-dim mb-4">
          Last 90 days
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {TIMELINE_BEATS.map((beat) => (
            <Link
              key={beat.label}
              href={beat.href}
              className="shrink-0 font-mono text-[13px] border border-line px-4 py-2 text-ink-dim hover:border-accent hover:text-ink transition-colors whitespace-nowrap"
            >
              {beat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-line">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-mono text-[13px] uppercase tracking-wide text-ink-dim">
            Latest
          </h2>
          <Link href="/news" className="font-mono text-[13px] text-accent hover:underline">
            All updates &rarr;
          </Link>
        </div>
        <div>
          {latest.map((p) => (
            <PostCard key={`${p.section}-${p.slug}`} post={p} />
          ))}
        </div>
      </section>

      {/* Featured explainers */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-line">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-mono text-[13px] uppercase tracking-wide text-ink-dim">
            Start here
          </h2>
          <Link href="/learn" className="font-mono text-[13px] text-accent hover:underline">
            All guides &rarr;
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {explainers.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.section}/${p.slug}`}
              className="group flex flex-col gap-3 p-6 bg-bg-raised border border-line hover:border-accent transition-colors"
            >
              <h3 className="font-serif text-lg leading-snug group-hover:text-accent transition-colors">
                {p.title}
              </h3>
              <p className="text-ink-dim text-[14px]">{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="border-t border-b border-line py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="font-serif text-3xl md:text-4xl leading-snug text-ink max-w-3xl">
            You&rsquo;re not betting with a company.
            <br />
            <span className="text-gradient">
              You&rsquo;re trading a YES or NO token, and your wallet never
              leaves your hands.
            </span>
          </p>
        </div>
      </section>

      {/* Markets teaser */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-mono text-[13px] uppercase tracking-wide text-ink-dim">
            Markets Desk
          </h2>
          <Link href="/markets" className="font-mono text-[13px] text-accent hover:underline">
            Open the desk &rarr;
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {["Sports", "Crypto", "Politics", "Culture"].map((c) => (
            <span
              key={c}
              className="font-mono text-[13px] border border-line px-4 py-2 text-ink-dim"
            >
              {c}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
