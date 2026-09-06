import Link from "next/link";

export const metadata = { title: "What is World  The World File" };

export default function WhatIsWorld() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="font-mono text-[13px] uppercase tracking-wide text-accent mb-3">
        What is World
      </p>
      <h1 className="font-serif text-4xl md:text-5xl mb-10 max-w-xl">
        A Solana-native prediction market, in plain terms
      </h1>

      <div className="prose-body text-[17px]">
        <p>
          World is a Solana-native, self-custodial prediction market
          protocol. You trade YES or NO on real-world questions across
          sports, crypto, politics, and culture, and the outcome settles
          onchain.
        </p>

        <h2>What you can actually do</h2>
        <ul>
          <li>Trade YES or NO contracts on real-world questions</li>
          <li>Trade 24/7  trades settle in seconds</li>
          <li>Hold your own funds and positions the entire time</li>
          <li>Verify markets, trades, and resolution onchain</li>
        </ul>

        <h2>How a trade works</h2>
        <p>
          Each question resolves to YES or NO. The contracts tied to each
          side are standard SPL tokens, which means they can plug into
          other Solana products  they're not locked inside a single
          interface. See{" "}
          <Link href="/learn/yes-vs-no">YES vs NO</Link> for the mechanics
          of a single trade.
        </p>

        <h2>Why self-custodial matters</h2>
        <p>
          Your wallet signs every trade. World holds no funds and no
          positions on your behalf, at any point. That's a structural
          difference from platforms where you deposit funds and trust a
          company to hold them. See{" "}
          <Link href="/learn/self-custody-explained">
            Why self-custodial matters
          </Link>{" "}
          for the fuller version.
        </p>

        <h2>Where to actually trade</h2>
        <p>
          World is live at{" "}
          <a
            href="https://world.xyz"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            world.xyz
          </a>{" "}
          and reachable inside Phantom. This site never asks you to connect
          a wallet  trade only through those two paths.
        </p>

        <h2>What World is not</h2>
        <ul>
          <li>
            Not a confirmed official token  copycat tokens exist and are
            not endorsed
          </li>
          <li>
            Not a doxxed team  no public reporting has identified who
            specifically runs it
          </li>
          <li>
            Not Kalshi  World isn't a regulated, custodial exchange; see{" "}
            <Link href="/learn/world-vs-polymarket-vs-kalshi">
              World vs Polymarket vs Kalshi
            </Link>
          </li>
        </ul>
      </div>

      <Link
        href="/learn"
        className="inline-block mt-16 font-mono text-[13px] text-accent hover:underline"
      >
        ← Read the full guide library
      </Link>
    </div>
  );
}
