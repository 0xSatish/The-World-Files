export default function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[13px] text-ink-dim max-w-md ${className}`}>
      Unofficial community site. Not affiliated with world.xyz.
    </p>
  );
}
