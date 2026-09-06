export default function OrbMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Under-glow blur filter */}
        <filter id="orbGlowBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="35" />
        </filter>

        {/* Sphere clipping path */}
        <clipPath id="orbClip">
          <circle cx="300" cy="300" r="160" />
        </clipPath>

        {/* Graticule fade mask (soft radial fade at edges) */}
        <radialGradient id="graticuleMaskGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="graticuleMask">
          <rect x="0" y="0" width="600" height="600" fill="url(#graticuleMaskGrad)" />
        </mask>

        {/* Soft outer under-glow gradient using accent tokens */}
        <radialGradient id="orbGlowGrad" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.55" />
          <stop offset="35%" stopColor="var(--accent-magenta)" stopOpacity="0.4" />
          <stop offset="70%" stopColor="var(--accent-gold)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
        </radialGradient>

        {/* Main Iridescent Gradient - cyan -> blue -> violet -> magenta -> gold */}
        <linearGradient id="orbIridescentGrad" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="var(--accent-cyan)" />
          <stop offset="25%" stopColor="var(--accent-blue)" />
          <stop offset="50%" stopColor="var(--accent-violet)" />
          <stop offset="75%" stopColor="var(--accent-magenta)" />
          <stop offset="100%" stopColor="var(--accent-gold)" />
        </linearGradient>

        {/* Secondary swirling gradient for rich multidimensional depth */}
        <linearGradient id="orbSecondaryGrad" x1="85%" y1="15%" x2="15%" y2="85%">
          <stop offset="0%" stopColor="var(--accent-magenta)" stopOpacity="0.85" />
          <stop offset="40%" stopColor="var(--accent-gold)" stopOpacity="0.65" />
          <stop offset="70%" stopColor="var(--accent-blue)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0.9" />
        </linearGradient>

        {/* 3D Key Light Highlight Layer (Upper-Left specular wrap) */}
        <radialGradient id="orb3dLight" cx="30%" cy="26%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="25%" stopColor="var(--accent-cyan)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="var(--accent-blue)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* 3D Shadow Layer (Lower-Right Spherical Depth) */}
        <radialGradient id="orb3dShadow" cx="35%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0.15" />
          <stop offset="85%" stopColor="#000000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
        </radialGradient>
      </defs>

      {/* Layer 1: Background Warped Graticule Grid */}
      <g mask="url(#graticuleMask)">
        <g
          className="orb-graticule-grid"
          style={{ transformOrigin: "300px 300px" }}
        >
          {/* Latitude Arcs (bowing in 3D perspective across background) */}
          <path d="M -50 80 Q 300 170 650 80" stroke="var(--line)" strokeWidth="1" opacity="0.4" fill="none" />
          <path d="M -50 150 Q 300 230 650 150" stroke="var(--ink-dim)" strokeWidth="1" opacity="0.2" fill="none" />
          <path d="M -50 220 Q 300 280 650 220" stroke="var(--ink-dim)" strokeWidth="1" opacity="0.25" fill="none" />
          <path d="M -50 290 Q 300 330 650 290" stroke="var(--line)" strokeWidth="1" opacity="0.35" fill="none" />
          <path d="M -50 360 Q 300 370 650 360" stroke="var(--ink-dim)" strokeWidth="1" opacity="0.25" fill="none" />
          <path d="M -50 430 Q 300 410 650 430" stroke="var(--ink-dim)" strokeWidth="1" opacity="0.2" fill="none" />
          <path d="M -50 500 Q 300 450 650 500" stroke="var(--line)" strokeWidth="1" opacity="0.3" fill="none" />

          {/* Longitude Meridians (curving vertically across background) */}
          <path d="M 80 -50 Q 170 300 80 650" stroke="var(--line)" strokeWidth="1" opacity="0.3" fill="none" />
          <path d="M 160 -50 Q 230 300 160 650" stroke="var(--ink-dim)" strokeWidth="1" opacity="0.2" fill="none" />
          <path d="M 240 -50 Q 280 300 240 650" stroke="var(--ink-dim)" strokeWidth="1" opacity="0.25" fill="none" />
          <path d="M 320 -50 Q 330 300 320 650" stroke="var(--line)" strokeWidth="1" opacity="0.35" fill="none" />
          <path d="M 400 -50 Q 380 300 400 650" stroke="var(--ink-dim)" strokeWidth="1" opacity="0.25" fill="none" />
          <path d="M 480 -50 Q 430 300 480 650" stroke="var(--ink-dim)" strokeWidth="1" opacity="0.2" fill="none" />
          <path d="M 560 -50 Q 480 300 560 650" stroke="var(--line)" strokeWidth="1" opacity="0.3" fill="none" />
        </g>
      </g>

      {/* Layer 2: Outer Soft Glow (sit behind sphere) */}
      <circle
        cx="300"
        cy="330"
        r="190"
        fill="url(#orbGlowGrad)"
        filter="url(#orbGlowBlur)"
      />

      {/* Layer 3: Main Sphere Body */}
      <g clipPath="url(#orbClip)">
        {/* 3a: Internal iridescent surface with continuous slow spin */}
        <g
          className="orb-surface-spin"
          style={{ transformOrigin: "300px 300px" }}
        >
          {/* Base iridescent fill */}
          <rect x="100" y="100" width="400" height="400" fill="url(#orbIridescentGrad)" />
          {/* Layered swirling accent shapes for depth */}
          <circle cx="230" cy="210" r="170" fill="url(#orbSecondaryGrad)" style={{ mixBlendMode: "screen", opacity: 0.6 }} />
          <ellipse cx="370" cy="370" rx="160" ry="120" fill="url(#orbIridescentGrad)" transform="rotate(45 370 370)" style={{ mixBlendMode: "overlay", opacity: 0.5 }} />
        </g>

        {/* 3b: Static 3D Specular Key Light Overlay */}
        <circle cx="300" cy="300" r="160" fill="url(#orb3dLight)" />

        {/* 3c: Static 3D Spherical Shadow Overlay */}
        <circle cx="300" cy="300" r="160" fill="url(#orb3dShadow)" />
      </g>

      {/* Layer 4: Rim Definition & Edge Ring */}
      <circle
        cx="300"
        cy="300"
        r="160"
        fill="none"
        stroke="#000000"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <circle
        cx="300"
        cy="300"
        r="159.2"
        fill="none"
        stroke="var(--accent-cyan)"
        strokeWidth="0.8"
        opacity="0.35"
      />

      {/* Layer 5: Specular Highlight (4-Point Star Sparkle / Cross Flare) */}
      <g
        className="orb-sparkle"
        style={{ transformOrigin: "215px 205px" }}
      >
        {/* Soft sparkle aura */}
        <circle cx="215" cy="205" r="18" fill="#ffffff" opacity="0.3" filter="url(#orbGlowBlur)" />
        <circle cx="215" cy="205" r="5" fill="#ffffff" opacity="0.95" />
        
        {/* 4-point star path */}
        <path
          d="M 215 185 Q 215 205 195 205 Q 215 205 215 225 Q 215 205 235 205 Q 215 205 215 185 Z"
          fill="#ffffff"
          opacity="0.95"
        />
        {/* Tapered cross-flare rays */}
        <line x1="175" y1="205" x2="255" y2="205" stroke="#ffffff" strokeWidth="1.2" opacity="0.75" />
        <line x1="215" y1="165" x2="215" y2="245" stroke="#ffffff" strokeWidth="1.2" opacity="0.75" />
        <line x1="195" y1="185" x2="235" y2="225" stroke="#ffffff" strokeWidth="0.6" opacity="0.4" />
        <line x1="235" y1="185" x2="195" y2="225" stroke="#ffffff" strokeWidth="0.6" opacity="0.4" />
      </g>
    </svg>
  );
}
