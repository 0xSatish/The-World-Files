# The World File

An editorial content hub and community archive dedicated to World (world.xyz), the Solana prediction market. The platform provides independent research, news documentation, educational guides, market overviews, and an affiliation badge directory.

## Overview

The World File is an independent, community-driven information desk. It aggregates public updates, historical market contexts, architectural overviews, and ecosystem discussions surrounding World Prediction Markets.

The website maintains a strict editorial boundary. It is an unofficial resource and is not affiliated with, endorsed by, or operated by world.xyz, Phantom, or official World representatives. Every outbound link directing users to active prediction markets points directly to official platforms (such as world.xyz).

## Website

The website is designed as a high-density, dark-editorial digital archive. It combines structured markdown-driven documentation with interactive client-side visual elements, including liquid glass navigation overlays, dynamic 3D card tilt interactions, and an interactive vector mascot.

## Features

- **Liquid Glass Navigation**: Translucent top navigation bar with backdrop blur and active route highlighting.
- **Interactive Bloub Avatar**: An SVG vector avatar featuring real-time pointer gaze tracking, natural blinking, autonomous expression loops, and interactive micro-animations.
- **Text-Selection and Copy Reaction**: Global DOM event listeners that trigger avatar reactions (such as `skeptical-left` and `angry`) when users highlight text or copy content.
- **Single & Double-Click Micro-Interactions**: Direct user interaction handlers on the Bloub avatar that trigger temporary expression shifts without causing unwanted text selection.
- **Transitions.dev Pointer Card Tilt & Glare**: 3D card perspective tilt with cursor-tracked radial glare spotlights for profile cards on the Team directory page, implemented with zero React state re-render overhead.
- **Avatar Group Spring Falloff Hover**: Horizontal avatar strip with exponential spring falloff shifts (`--shift: (lift * pow(falloff, distance))`) and smooth spring easing.
- **MDX-Driven Publishing Pipeline**: Local filesystem content architecture for news, guides, market overviews, and timeline posts powered by Next MDX Remote and gray-matter.
- **Responsive Layout**: Full layout adaptation supporting desktop multi-column grids, tablet layouts, and touch-safe mobile experiences.
- **Reduced Motion Compliance**: Respects `@media (prefers-reduced-motion: reduce)` across all interactive elements, disabling gaze tracking, body animations, and 3D card tilts.

## Pages / Routes

| Route | Content & Functionality |
| :--- | :--- |
| `/` | **Homepage**: Hero section with interactive Bloub avatar, Liquid Glass nav, featured topics, news feed preview, learn guides, markets desk highlights, and timeline archive. |
| `/about` | **About Page**: Editorial manifesto explaining the purpose of the platform, safety guidelines, and independent stance. |
| `/archive` | **Archive Directory**: Chronological timeline index of historical market events, disclosures, and unmasking documentation. |
| `/archive/[slug]` | **Archive Article**: Individual MDX view for archived timeline entries. |
| `/learn` | **Learn Directory**: Comprehensive educational index containing guides on prediction market mechanics, pricing, oracles, and self-custody. |
| `/learn/[slug]` | **Learn Article**: Individual MDX view for educational guides. |
| `/markets` | **Markets Desk**: Overview of prediction market categories traded on World (sports, crypto, politics, culture) and market entry notes. |
| `/markets/[slug]` | **Market Note**: Individual MDX view for market category notes and desk updates. |
| `/news` | **News Feed**: Timeline of public reporting, platform integration announcements, oracle updates, and community commentary. |
| `/news/[slug]` | **News Article**: Individual MDX view for news articles. |
| `/team` | **Team & Affiliations Directory**: Directory of public accounts holding or previously holding World X affiliation badges, house mascot context, and CT supporters. Features 3D Tilt Cards and spring avatar index. |
| `/what-is-world` | **What is World**: Architectural overview explainer detailing protocol mechanics, Phantom ecosystem integration, and user safety. |

## Design System

The visual design language follows a dark editorial aesthetic engineered for legibility and visual depth.

### Color Palette

The color system uses a dark base paired with an iridescent accent gradient.

```text
Background Base:           #0A0A0A (--bg)
Background Raised:         #141414 (--bg-raised)
Text Primary (Ink):        #EDEBE6 (--ink)
Text Secondary (Ink Dim):  #8C8880 (--ink-dim)
Borders & Lines:           #242220 (--line)

Iridescent Accent Palette:
Cyan:                      #63D8F2
Blue:                      #3E7BFA
Violet / Purple:           #8668D9
Pink / Magenta:            #E76B9B
Coral:                     #E17A6C
Warm Yellow / Gold:        #F2D58A
```

Accent colors are applied selectively to badges, borders, gradients, and interactive highlights without saturating the primary editorial layout.

### Typography

- **Headlines & Editorial Titles**: Serif fallback stack (`Georgia`, `Iowan Old Style`, `Palatino Linotype`).
- **Body Text & UI**: Sans-serif fallback stack (`-apple-system`, `Segoe UI`, `Helvetica`, `Arial`).
- **Data, Metadata & Code**: Monospace fallback stack (`SF Mono`, `IBM Plex Mono`, `ui-monospace`, `Menlo`).

## Bloub Avatar

The Bloub avatar component (`components/BloubAvatar.tsx`) is an SVG vector asset featuring a custom animation and interaction engine:

- **Cursor Gaze Tracking**: Calculates pointer coordinates relative to avatar geometry and smoothly interpolates pupil positions towards the cursor.
- **Autonomous Expression Engine**: Automatically cycles through subtle natural facial states (`neutral`, `happy`, `surprised`, `skeptical-left`, `drowsy-closed`, `angry-brows`) during idle periods.
- **Text-Selection Reaction**: Listens to global DOM selection events to switch the avatar to a `skeptical-left` expression when content is highlighted on the page.
- **Copy Reaction**: Intercepts `copy` keyboard and clipboard events while text is selected, triggering a temporary `angry` expression animation.
- **Direct Pointer Interactions**: Responds to single-clicks with temporary expression shifts and double-clicks with an `angry` animation while explicitly suppressing browser text selection.
- **Iridescent Surface Shader**: Animates a continuous multi-stop radial gradient mesh (`liquid-mesh-flow`) mimicking fluid metallic light.

## Team Badges

The `/team` page presents a structured directory of public accounts associated with World’s X affiliation badge distribution campaign.

### Disclaimer & Attribution Notice

These accounts hold or have held a World affiliation badge on X, or are publicly tied to World's badge campaign. They are not published founders, engineers, officers, or official representatives of World Prediction Markets. Profile details are sourced from public X accounts and community research.

No individual listed in the directory is labeled with invented corporate titles such as Founder, CEO, CTO, or Lead Engineer unless verified by authoritative public documentation.

## Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **Content Engine**: Next MDX Remote and gray-matter
- **Utilities**: `clsx`, `tailwind-merge`
- **Build Tools**: ESLint 9 with `eslint-config-next`

## Project Structure

```text
world-file/
├── app/
│   ├── about/
│   ├── archive/
│   │   └── [slug]/
│   ├── learn/
│   │   └── [slug]/
│   ├── markets/
│   │   └── [slug]/
│   ├── news/
│   │   └── [slug]/
│   ├── team/
│   ├── what-is-world/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AvatarGroup.tsx
│   ├── BloubAvatar.tsx
│   ├── Disclaimer.tsx
│   ├── GlobeMark.tsx
│   ├── OrbMark.tsx
│   ├── PostCard.tsx
│   ├── PostPage.tsx
│   ├── SectionIndex.tsx
│   ├── SiteFooter.tsx
│   ├── SiteNav.tsx
│   ├── SourceList.tsx
│   ├── TeamCard.tsx
│   ├── TiltCard.tsx
│   └── TopicMark.tsx
├── content/
│   ├── learn/
│   ├── markets/
│   ├── news/
│   └── timeline/
├── lib/
│   ├── content.ts
│   ├── teamData.ts
│   └── utils.ts
├── public/
│   └── Team/
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Local Development

### Prerequisites

Ensure you have Node.js (version 20 or higher) and npm installed.

### Setup Instructions

1. **Clone Repository**:
   ```bash
   git clone https://github.com/0xSatish/The-World-Files.git
   cd The-World-Files
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

4. **Build Production Application**:
   ```bash
   npm run build
   ```

5. **Start Production Server**:
   ```bash
   npm run start
   ```

## Environment Variables

No environment variables or external API keys are required for the static compilation and execution of v1 of The World File. All content is generated at build time from local MDX files and static TypeScript schemas.

## Build and Validation

The application undergoes static page generation and TypeScript type checking during the build pipeline:

```bash
# Run production build
npm run build

# Run linter
npm run lint
```

During build validation, Next.js prerenders all 38 static routes, verifying page generation and component props.

## Deployment

The application is optimized for deployment on Vercel or any static/Node.js hosting provider supporting Next.js App Router.

### Deploying to Vercel

1. Push your changes to the GitHub repository (`https://github.com/0xSatish/The-World-Files.git`).
2. Log in to [Vercel](https://vercel.com) and click **Add New** > **Project**.
3. Import the `The-World-Files` repository.
4. Keep default framework settings (Next.js).
5. Click **Deploy**.
6. Future pushes to the `main` branch will automatically trigger production deployments.

## Content / Attribution / Disclaimer

The World File is an independent educational and historical archive. All product names, logos, and brands are property of their respective owners. Mention of third-party platforms (such as World, world.xyz, Phantom, or Solana) is strictly for descriptive and educational purposes and does not imply affiliation or endorsement.

## Status

Active production build. Fully implemented static routing, MDX article rendering, responsive UI, 3D card tilt interactions, avatar animation engine, and team directory.

## License

No explicit license is currently assigned to this repository. All rights reserved by the author.
