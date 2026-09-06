import Link from "next/link";
import Disclaimer from "./Disclaimer";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-6">
        <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[13px] text-ink-dim">
          <a
            href="https://world.xyz"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="hover:text-accent transition-colors"
          >
            world.xyz →
          </a>
          <a
            href="https://x.com/world_xyz"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="hover:text-accent transition-colors"
          >
            @world_xyz →
          </a>
          <Link href="/about" className="hover:text-accent transition-colors">
            About this site
          </Link>
        </div>
        <Disclaimer />
      </div>
    </footer>
  );
}
