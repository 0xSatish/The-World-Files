import type { Source } from "@/lib/content";

function LabelTag({ label }: { label: Source["label"] }) {
  if (label === "official") {
    return <span className="text-gradient font-semibold">Official</span>;
  }
  if (label === "press") {
    return <span className="text-ink">Press</span>;
  }
  return <span className="text-ink-dim italic">Independent</span>;
}

export default function SourceList({
  sources,
  compact = false,
}: {
  sources: Source[];
  compact?: boolean;
}) {
  const textSize = compact ? "text-[11px]" : "text-[12px]";
  const padding = compact ? "px-2 py-1" : "px-3 py-1.5";

  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((source, i) => (
        <a
          key={`${source.outlet}-${i}`}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={`inline-flex items-center gap-1.5 border border-line ${textSize} ${padding} font-mono text-ink-dim hover:border-accent hover:text-ink transition-colors`}
        >
          <LabelTag label={source.label} />
          <span aria-hidden="true"></span>
          <span>{source.outlet}</span>
        </a>
      ))}
    </div>
  );
}
