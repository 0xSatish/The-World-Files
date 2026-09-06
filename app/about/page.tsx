export const metadata = { title: "About this site  The World File" };

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <p className="font-mono text-[13px] uppercase tracking-wide text-accent mb-3">
        About this site
      </p>
      <h1 className="font-serif text-4xl md:text-5xl mb-10 max-w-xl">
        A community file, not a company site
      </h1>

      <div className="prose-body text-[17px]">
        <p>
          The World File is an unofficial resource about World, the Solana
          prediction market. It exists because the product deserved a
          useful reference beyond scattered threads — not because it has
          any relationship with world.xyz.
        </p>

        <h2>Why there's no team page</h2>
        <p>
          World's own team hasn't been publicly identified in reliable
          reporting, and this site isn't going to invent one. No founder
          names, no photos, no funding claims, no token, no roadmap beyond
          what's shipped. If it isn't public and confirmable, it doesn't
          go on this file  including about World's own team.
        </p>

        <h2>What this site deliberately excludes</h2>
        <p>
          Several products and pages share the word "World" but are
          unrelated to the Solana prediction market at world.xyz. This
          site does not cover, source from, or treat as World news:
        </p>
        <ul>
          <li>
            <strong>Worldcoin / World App / Tools for Humanity</strong>
            a separate identity-verification and wallet project. Different
            company, different product, different chain.
          </li>
          <li>
            <strong>Pump.fun WORLD token pages</strong> and "is WORLD
            safe?" audit sites  Phantom itself says the memetoken is not
            confirmed as official. This site does not treat it as a
            platform token.
          </li>
          <li>
            <strong>Unofficial clone landing pages</strong> describing
            themselves as "Hyperliquid meets Polymarket"  these are
            third-party marketing pages, not World's own product.
          </li>
          <li>
            <strong>Any page that invents a founder name</strong> for
            World  the team is unpublished in reliable reporting, and
            fabricated attribution is worse than no attribution.
          </li>
        </ul>
        <p>
          If a source conflates any of these with World the prediction
          market, this site does not use it.
        </p>

        <h2>What this site will and won't do</h2>
        <ul>
          <li>Will keep publishing guides, news, and archive updates</li>
          <li>Will always send you to world.xyz or Phantom to actually trade</li>
          <li>Will never ask you to connect a wallet</li>
          <li>Will never claim to speak for World</li>
        </ul>

        <h2>Corrections and contact</h2>
        <p>
          If something here is wrong or out of date, reach out through the
          X account that runs this site. Corrections get made quickly
          this is meant to stay accurate, not just online.
        </p>
      </div>
    </div>
  );
}
