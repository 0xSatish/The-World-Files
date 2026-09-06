export default function GlobeMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="worldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-blue)" />
          <stop offset="30%" stopColor="var(--accent-cyan)" />
          <stop offset="65%" stopColor="var(--accent-magenta)" />
          <stop offset="100%" stopColor="var(--accent-gold)" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="160" stroke="url(#worldGradient)" strokeWidth="1" />
      <ellipse
        cx="200"
        cy="200"
        rx="160"
        ry="60"
        stroke="url(#worldGradient)"
        strokeWidth="1"
      />
      <ellipse
        cx="200"
        cy="200"
        rx="90"
        ry="160"
        stroke="url(#worldGradient)"
        strokeWidth="1"
      />
      <line x1="40" y1="200" x2="360" y2="200" stroke="url(#worldGradient)" strokeWidth="1" />
      <line x1="200" y1="40" x2="200" y2="360" stroke="url(#worldGradient)" strokeWidth="1" />
    </svg>
  );
}
