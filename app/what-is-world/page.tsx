import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is World  Protocol Profile & Architecture  The World File",
  description:
    "Comprehensive, independent editorial profile of World.xyz: Solana-native architecture, Phantom integration, outcome token mechanics, Chainlink oracles, fee structure, and security considerations.",
};

export default function WhatIsWorld() {
  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-cyan-500/30 selection:text-cyan-200 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6 space-y-14">
        {/* Header Section */}
        <header className="border-b border-white/[0.08] pb-8">
          <div className="text-[12px] font-mono text-accent uppercase tracking-wider mb-3">
            WHAT IS WORLD &mdash; PROTOCOL PROFILE
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-ink tracking-tight mb-4">
            World.xyz: The Solana-Native Prediction Market
          </h1>
          <p className="text-base sm:text-lg text-ink-dim font-sans leading-relaxed max-w-3xl">
            An independent editorial profile detailing World.xyz&rsquo;s onchain architecture, Phantom Predict integration, binary outcome tokens, market-maker liquidity, fee structures, risks, and trust assumptions.
          </p>
        </header>

        {/* Executive Summary / Introduction */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal tracking-tight">
            Protocol Overview
          </h2>
          <div className="prose-body text-[15px] sm:text-[16px] text-ink-dim leading-relaxed space-y-4">
            <p>
              <strong className="text-ink font-medium">World.xyz</strong> is a fully onchain, non-custodial prediction market protocol built natively on the Solana blockchain. The protocol enables users to trade binary <span className="text-cyan-400 font-mono">YES</span> or <span className="text-pink-400 font-mono">NO</span> outcome contracts across cryptocurrency price movements, sports, real-world events, geopolitics, and macroeconomic indicators.
            </p>
            <p>
              Unlike traditional sportsbooks or centralized prediction platforms, positions on World exist as standard onchain tokens held directly inside the user&rsquo;s self-custodial wallet rather than offchain account balances. When a market resolves, winning outcome tokens automatically settle in <strong className="text-ink font-medium">CASH</strong> onchain.
            </p>
            <p>
              In current ecosystem deployments, the World trading experience is integrated into the <strong className="text-accent font-mono text-[14px]">Predict</strong> tab inside the Phantom wallet application across mobile and desktop.
            </p>
          </div>
        </section>

        {/* How World Works: The 9-Step Lifecycle */}
        <section className="space-y-6 pt-6 border-t border-white/[0.08]">
          <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal tracking-tight">
            How World Works: The Contract Lifecycle
          </h2>
          <p className="text-[15px] text-ink-dim leading-relaxed font-sans">
            Trading on World follows a structured onchain lifecycle from question formulation to automated settlement:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[
              {
                step: "01",
                title: "Market Creation",
                desc: "A binary market is created around a specific event or price target with explicit resolution conditions.",
              },
              {
                step: "02",
                title: "Outcome Token Minting",
                desc: "YES and NO outcome tokens are minted in complete pairs backed by 1 CASH of collateral.",
              },
              {
                step: "03",
                title: "Market-Maker Liquidity",
                desc: "Specialized market makers (such as JanusFI and BisonFI) supply continuous buy/sell quotes.",
              },
              {
                step: "04",
                title: "DFlow Order Routing",
                desc: "Order execution and swap routing are handled through DFlow for efficient Solana execution.",
              },
              {
                step: "05",
                title: "Position Acquisition",
                desc: "Traders purchase YES or NO outcome tokens reflecting their forecast for the event.",
              },
              {
                step: "06",
                title: "Self-Custodial Holding",
                desc: "Acquired outcome tokens reside directly inside the user's Solana wallet as transferable assets.",
              },
              {
                step: "07",
                title: "Early Position Exit",
                desc: "Traders can sell their outcome tokens back to the market maker before market resolution.",
              },
              {
                step: "08",
                title: "Chainlink Resolution",
                desc: "Chainlink Data Streams and Data Infrastructure feeds report verified outcome data to settle the market.",
              },
              {
                step: "09",
                title: "Automated CASH Settlement",
                desc: "Winning outcome tokens automatically redeem for 1 CASH after resolution; losing tokens expire at 0 CASH.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-accent font-semibold tracking-widest block mb-1">
                    STEP {item.step}
                  </span>
                  <h3 className="font-serif text-lg text-ink font-normal mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[13px] font-sans text-ink-dim leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outcome Tokens Mechanics */}
        <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#0D0D0F] via-[#121218] to-[#181524] border border-white/15 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            TOKEN MECHANICS & PAIRING
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal">
            Binary Outcome Tokens: YES & NO Pairs
          </h2>
          <p className="text-[14px] sm:text-[15px] text-ink-dim leading-relaxed font-sans">
            Every prediction market on World operates on a pair of outcome contracts: <strong className="text-cyan-300">YES</strong> and <strong className="text-pink-300">NO</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xs font-mono text-ink-dim uppercase mb-1">COLLATERAL PAIR</div>
              <div className="text-xl font-serif text-ink font-normal">1 YES + 1 NO</div>
              <div className="text-[12px] font-mono text-accent mt-1">= 1.00 CASH</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xs font-mono text-cyan-400 uppercase mb-1">WINNING OUTCOME</div>
              <div className="text-xl font-serif text-cyan-300 font-normal">Redeems for 1.00</div>
              <div className="text-[12px] font-mono text-ink-dim mt-1">CASH after Resolution</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xs font-mono text-pink-400 uppercase mb-1">LOSING OUTCOME</div>
              <div className="text-xl font-serif text-pink-300 font-normal">Expires at 0.00</div>
              <div className="text-[12px] font-mono text-ink-dim mt-1">CASH after Resolution</div>
            </div>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal tracking-tight">
            Key Protocol Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Non-Custodial Architecture",
                desc: "Wallet holds all tokens directly. No platform deposits or centralized custody requirements.",
              },
              {
                title: "Phantom Integration",
                desc: "Native Predict tab access on mobile and desktop without standalone web app registration.",
              },
              {
                title: "Market-Maker Liquidity",
                desc: "Quotes provided by specialized liquidity pools (JanusFI, BisonFI) routed via DFlow.",
              },
              {
                title: "Chainlink Oracle Data",
                desc: "Resolution powered by Chainlink Data Streams and Data Infrastructure feeds.",
              },
              {
                title: "Automatic CASH Settlement",
                desc: "Winning tokens resolve automatically to CASH directly into the user's wallet.",
              },
              {
                title: "Early Exit Capability",
                desc: "Positions can be sold back to liquidity providers prior to event resolution.",
              },
              {
                title: "Solana Mainnet Speed",
                desc: "Sub-second block confirmation times and low network execution costs.",
              },
              {
                title: "Short-Duration Crypto Markets",
                desc: "Fast-paced short-term price movement predictions alongside macro events.",
              },
              {
                title: "Transferable Tokens",
                desc: "Outcome positions exist as standard Solana tokens within self-custodial wallets.",
              },
            ].map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#0D0D0F]/80 border border-white/[0.08] backdrop-blur-md"
              >
                <h3 className="font-serif text-lg text-ink font-normal mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-[13px] text-ink-dim leading-relaxed font-sans">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Fees Section */}
        <section className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal">
              Fee Structure & Execution Costs
            </h2>
            <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              SPREAD-BASED COST
            </span>
          </div>

          <div className="prose-body text-[14px] sm:text-[15px] text-ink-dim leading-relaxed space-y-4">
            <p>
              World does not charge a separate explicit platform trading fee line item. Instead, trading costs are embedded directly within the market-maker bid-ask spread:
            </p>

            <ul className="space-y-2 list-disc pl-5">
              <li>
                <strong className="text-ink">Spread-Based Pricing:</strong> Combined YES + NO prices typically sum to approximately <strong className="text-ink">1.02–1.03 CASH</strong>.
              </li>
              <li>
                <strong className="text-ink">Effective Cost:</strong> This spread represents an approximate <strong className="text-accent">2–3% trading cost</strong> embedded in execution.
              </li>
              <li>
                <strong className="text-ink">Variable Spread Notice:</strong> Spreads are determined by market makers and may widen or narrow based on market liquidity.
              </li>
              <li>
                <strong className="text-ink">Solana Network Fees:</strong> Standard Solana transaction fees are paid in SOL.
              </li>
              <li>
                <strong className="text-ink">Zero Settlement Claim Fee:</strong> Automated settlement does not incur an additional protocol claim fee.
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use World: Step-by-Step */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal tracking-tight">
            How to Use World (Step-by-Step)
          </h2>

          <div className="space-y-3">
            {[
              "Open the Phantom wallet application on mobile or desktop.",
              "Navigate to the Predict tab in the main navigation.",
              "Browse active binary outcome categories (crypto, sports, politics, culture).",
              "Select a market to view detailed resolution terms and current quotes.",
              "Choose your position: YES or NO.",
              "Enter trade size and select payment asset.",
              "Review the quoted contract price, spread, and estimated payout.",
              "Confirm transaction signature (ensure your wallet has SOL for network fees).",
              "Track your position under wallet tokens; optionally sell early before resolution.",
              "Upon resolution, winning contracts automatically settle into CASH in your wallet.",
            ].map((stepText, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <span className="font-mono text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-[14px] font-sans text-ink/90 leading-relaxed">
                  {stepText}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Market Categories */}
        <section className="space-y-6 pt-6 border-t border-white/[0.08]">
          <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal tracking-tight">
            Supported Prediction Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                CRYPTO & MACRO
              </div>
              <h3 className="font-serif text-lg text-ink font-normal mb-2">
                Short-Duration & Price Targets
              </h3>
              <p className="text-[13px] text-ink-dim leading-relaxed">
                Short-term Bitcoin and Solana price boundaries, token performance targets, and macroeconomic interest rate expectations.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="text-xs font-mono text-pink-400 uppercase tracking-wider mb-1">
                SPORTS & ENTERTAINMENT
              </div>
              <h3 className="font-serif text-lg text-ink font-normal mb-2">
                Major Sporting Events
              </h3>
              <p className="text-[13px] text-ink-dim leading-relaxed">
                Match winners, tournament outcomes, and championship predictions, including coverage around events like Formula 1 and the 2026 FIFA World Cup.
              </p>
            </div>
          </div>
        </section>

        {/* Risks & Limitations */}
        <section className="p-6 md:p-8 rounded-2xl bg-amber-500/[0.03] border border-amber-500/20 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            RISKS, LIMITATIONS & TRUST ASSUMPTIONS
          </div>

          <h2 className="font-serif text-2xl text-ink font-normal">
            Important Protocol Considerations
          </h2>

          <ul className="space-y-2.5 text-[14px] font-sans text-ink-dim leading-relaxed list-disc pl-5">
            <li>
              <strong className="text-ink">Geographic Restrictions:</strong> Access to prediction markets is subject to regional legal compliance and geographic availability filters.
            </li>
            <li>
              <strong className="text-ink">Upgradeable Smart Contracts:</strong> Protocol contracts are upgradeable by operator keys, introducing trust assumptions around governance.
            </li>
            <li>
              <strong className="text-ink">Single Operator Authority:</strong> Security reviews identify a single operator key controlling key market parameter functions.
            </li>
            <li>
              <strong className="text-ink">Liquidity & Spread Variance:</strong> Market-maker spreads may widen significantly on less active or niche contracts.
            </li>
            <li>
              <strong className="text-ink">Solana Gas Dependency:</strong> Users must maintain SOL balance in their wallet to execute trades and sign transactions.
            </li>
            <li>
              <strong className="text-ink">Ecosystem Recency:</strong> World is a relatively young protocol without multi-year operational history under extreme market volatility.
            </li>
          </ul>
        </section>

        {/* Safety & Due Diligence */}
        <section className="space-y-4 pt-6 border-t border-white/[0.08]">
          <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal tracking-tight">
            Is World.xyz Safe and Legitimate?
          </h2>
          <div className="prose-body text-[15px] text-ink-dim leading-relaxed space-y-3">
            <p>
              World.xyz is publicly identified as the protocol powering the native Predict tab within the Phantom wallet ecosystem. The protocol utilizes established Chainlink oracle feeds for market resolution and executes non-custodially on Solana mainnet.
            </p>
            <p>
              While no major security exploit has been recorded during initial operation, users must perform due diligence regarding upgradeable contract authorities, operator control keys, and regional regulatory compliance. This summary is for informational research only and does not constitute financial or legal advice.
            </p>
          </div>
        </section>



        {/* Pros & Cons Summary Table */}
        <section className="space-y-6 pt-6 border-t border-white/[0.08]">
          <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal tracking-tight">
            Protocol Assessment: Pros & Cons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-cyan-500/[0.02] border border-cyan-500/20 space-y-4">
              <h3 className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                PROS / ADVANTAGES
              </h3>
              <ul className="text-[13px] font-sans text-ink-dim leading-relaxed space-y-2 list-disc pl-4">
                <li>Native non-custodial Phantom Predict integration</li>
                <li>Automated CASH settlement directly to user wallet</li>
                <li>Standardized YES/NO outcome token pairs</li>
                <li>Chainlink oracle data infrastructure for resolution</li>
                <li>Sub-second Solana execution speed and low gas fees</li>
                <li>Ability to exit positions prior to resolution</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-pink-500/[0.02] border border-pink-500/20 space-y-4">
              <h3 className="font-mono text-xs font-semibold text-pink-400 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                CONS / LIMITATIONS
              </h3>
              <ul className="text-[13px] font-sans text-ink-dim leading-relaxed space-y-2 list-disc pl-4">
                <li>Regional & geographic availability restrictions</li>
                <li>Trading costs embedded in 2–3% market maker spreads</li>
                <li>Operator control keys and upgradeable contracts</li>
                <li>Solana-only protocol execution in current release</li>
                <li>Variable liquidity depth across niche contracts</li>
                <li>Relatively new protocol without multi-year track record</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Editorial Verdict */}
        <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#0D0D0F] via-[#14141E] to-[#1A1828] border border-white/20 space-y-4">
          <div className="text-xs font-mono text-accent uppercase tracking-wider">
            EDITORIAL ASSESSMENT
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-ink font-normal">
            The World File Verdict
          </h2>
          <p className="text-[15px] text-ink-dim leading-relaxed font-sans">
            World.xyz represents a significant iteration in Solana-native prediction markets by embedding non-custodial event trading directly into the Phantom wallet. By combining market-maker liquidity (via JanusFI and BisonFI), DFlow routing, Chainlink data feeds, and automated CASH settlement, World offers a streamlined prediction experience.
          </p>
          <p className="text-[15px] text-ink-dim leading-relaxed font-sans">
            However, users must evaluate trade-offs including spread-based execution costs (~2–3%), regional access restrictions, and trust assumptions surrounding upgradeable contracts and operator keys.
          </p>
        </section>

        {/* Footer Navigation Back to Learn */}
        <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <Link href="/learn" className="text-accent hover:underline">
            &larr; Return to Learn Guides
          </Link>
          <Link href="/team" className="text-ink-dim hover:text-ink">
            View Team & Affiliations Directory &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
