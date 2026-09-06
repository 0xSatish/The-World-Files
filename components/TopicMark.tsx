export default function TopicMark({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={`shrink-0 inline-block align-middle ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="topicMarkGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="var(--accent-blue)" />
          <stop offset="30%" stopColor="var(--accent-cyan)" />
          <stop offset="65%" stopColor="var(--accent-magenta)" />
          <stop offset="100%" stopColor="var(--accent-gold)" />
        </linearGradient>
      </defs>

      {/* Rotating Ring & Orbit Motif */}
      <g
        className="topic-mark-spin"
        style={{ transformOrigin: "16px 16px" }}
      >
        {/* Outer Iridescent Ring */}
        <circle
          cx="16"
          cy="16"
          r="13"
          stroke="url(#topicMarkGrad)"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* Inner Orbital Axis Line */}
        <ellipse
          cx="16"
          cy="16"
          rx="13"
          ry="5"
          stroke="url(#topicMarkGrad)"
          strokeWidth="1"
          opacity="0.65"
          transform="rotate(-30 16 16)"
        />

        {/* Orbiting Satellite Dot */}
        <circle cx="27" cy="16" r="2.2" fill="url(#topicMarkGrad)" />
      </g>

      {/* Grounded Center Core Dot */}
      <circle cx="16" cy="16" r="2.5" fill="var(--accent-cyan)" />
    </svg>
  );
}
