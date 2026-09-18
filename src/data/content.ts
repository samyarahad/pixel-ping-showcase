/**
 * Pixel & Ping — content data
 * The showcase content lives here so copy/sections can be tweaked centrally.
 * Note: no fabricated statistics, no fake testimonials, no pricing, no fake data.
 * All sections use a unique per-section visualization (no product screenshots).
 */

export interface SectionCopy {
  /** HTML anchor id of the section element */
  id: string;
  /** Nav label (uppercase, short) */
  nav: string;
  /** Small eyebrow above headline */
  eyebrow: string;
  /** Main headline (can include line breaks) */
  headline: string;
  /** Supporting paragraph */
  support: string;
  /** Optional short feature callouts shown under the headline */
  features?: string[];
}

export const SECTIONS: SectionCopy[] = [
  {
    id: "dashboard",
    nav: "PRODUCT",
    eyebrow: "The Dashboard",
    headline: "See everything\nat a glance.",
    support:
      "A single surface for the moving parts of your network. Statistics, traffic, and activity are framed as quiet objects — not noise.",
    features: [
      "Total, active & online users at a glance",
      "Active servers and Cloudflare accounts",
      "Total traffic and IP health overview",
      "Traffic analytics and user activity panels",
    ],
  },
  {
    id: "users",
    nav: "USERS",
    eyebrow: "People & Access",
    headline: "Designed around\nyour users.",
    support:
      "Organize the people and access that matter to your network. A focused interface for creating, filtering, and finding the users you manage.",
    features: [
      "Search and filter your user base",
      "Create new VPN users in seconds",
      "Empty-state first run that doesn't feel empty",
      "Designed for clarity at any scale",
    ],
  },
  {
    id: "servers",
    nav: "SERVERS",
    eyebrow: "Infrastructure",
    headline: "Your infrastructure,\nin view.",
    support:
      "Servers register into the system quietly. Each one becomes a node on the map — visible, contextual, and ready to be paired with the rest of the network.",
    features: [
      "Register a new server with one action",
      "Pair servers with endpoints and traffic",
      "Visible status across the whole network",
      "No noise — only the context you need",
    ],
  },
  {
    id: "endpoints",
    nav: "ENDPOINTS",
    eyebrow: "Connections",
    headline: "Every endpoint\nhas a place.",
    support:
      "The network converges into endpoints. They are organized, named, and connected to the infrastructure around them.",
    features: [
      "Each endpoint is named and addressable",
      "Visualized as part of the broader network",
      "Connections flow naturally from servers",
    ],
  },
  {
    id: "ip-scanner",
    nav: "SCANNER",
    eyebrow: "Network Intelligence",
    headline: "Find the signal.",
    support:
      "A focused scanner for clean IP pools and endpoint health. Add ranges, evaluate nodes, and keep a tidy record of what is reachable.",
    features: [
      "Maintain a clean IP pool with labels",
      "Add Cloudflare ranges in one action",
      "Registered endpoint health overview",
      "Export and scan from a single surface",
    ],
  },
  {
    id: "ports",
    nav: "PORTS",
    eyebrow: "Connections",
    headline: "Every connection,\norganized.",
    support:
      "Multiple paths, multiple port types — all rendered as elegant technical lines. No clutter, just the structure of your network.",
    features: [
      "HTTP, HTTPS, SSH, WireGuard — side by side",
      "Each port visualized by type",
      "Status pulses show what is alive",
      "Clarity over clutter, always",
    ],
  },
  {
    id: "cloudflare",
    nav: "CLOUDFLARE",
    eyebrow: "Modern Infrastructure",
    headline: "Built around\nmodern infrastructure.",
    support:
      "Cloudflare integration is part of the experience. Pixel & Ping sits as a quiet control layer over a large abstract cloud.",
    features: [
      "Cloudflare integration as part of the flow",
      "Pixel & Ping as the control layer",
      "Visualized data paths through the cloud",
      "Neutral, factual wording — no implied endorsement",
    ],
  },
  {
    id: "config",
    nav: "CONFIG",
    eyebrow: "Configuration",
    headline: "Complexity,\norganized.",
    support:
      "Abstract parameters flow into a central configuration object. The object becomes organized. No actual generation happens here — this is presentation only.",
    features: [
      "Parameters converge into one config",
      "Reads cleanly as YAML",
      "An organized object, not a wall of fields",
      "Pure presentation — no generation on this page",
    ],
  },
  {
    id: "traffic",
    nav: "TRAFFIC",
    eyebrow: "Network Flow",
    headline: "Watch the\nnetwork move.",
    support:
      "Thousands of tiny particles drift through paths. The movement is subtle and beautiful — an atmospheric view of the system in motion.",
    features: [
      "Particle-based traffic visualization",
      "Atmospheric, not clinical",
      "No fabricated live values",
      "Paused for reduced-motion users",
    ],
  },
  {
    id: "analytics",
    nav: "ANALYTICS",
    eyebrow: "Patterns",
    headline: "See the patterns.",
    support:
      "Lines slowly form. Charts emerge. Graphs move subtly. The analytics view turns raw movement into readable shape.",
    features: [
      "Traffic lines that draw themselves in",
      "Daily request bars that build up",
      "Visual presentation only — not live data",
      "Reduced-motion friendly",
    ],
  },
  {
    id: "failover",
    nav: "FAILOVER",
    eyebrow: "Resilience",
    headline: "Built for\nchanging paths.",
    support:
      "Primary route. Alternate route. Connected. The visualization explains how the system behaves when a path changes — an educational animation, not a real operation.",
    features: [
      "Primary → Alternate → Connected cycle",
      "Status indicator with phase color",
      "Traveling pulse on the active route",
      "Educational only — no real failover is performed",
    ],
  },
  {
    id: "logs",
    nav: "LOGS",
    eyebrow: "Activity",
    headline: "See what happened.",
    support:
      "A cinematic stream of system events. Rows of abstract activity appear as the camera moves through them.",
    features: [
      "Color-coded INFO / OK / WARN / ERR levels",
      "Timestamped, monospace, terminal-feel",
      "Auto-scrolling cinematic stream",
      "Paused for reduced-motion users",
    ],
  },
  {
    id: "notifications",
    nav: "NOTIFY",
    eyebrow: "Stay Informed",
    headline: "Stay informed.",
    support:
      "The system speaks softly. Notifications surface the moments that matter without overwhelming the experience.",
    features: [
      "Stacked notification cards",
      "Icons by type: success, warning, info",
      "Only the moments that matter",
      "Animated entrance, never noisy",
    ],
  },
  {
    id: "settings",
    nav: "SETTINGS",
    eyebrow: "Personalization",
    headline: "Make the\nexperience yours.",
    support:
      "Profile, appearance, language, panel name, and password — the things that make Pixel & Ping feel like your own.",
    features: [
      "Profile with avatar selection",
      "Appearance: Pixel Neon / Dark / Light / Midnight",
      "Language and panel name",
      "Change password in one place",
    ],
  },
];

export const NAV_ITEMS: { id: string; label: string }[] = [
  { id: "hero", label: "HOME" },
  { id: "dashboard", label: "PRODUCT" },
  { id: "cloudflare", label: "NETWORK" },
  { id: "failover", label: "FEATURES" },
  { id: "reveal", label: "EXPERIENCE" },
];

export const SOCIAL = {
  telegram: "https://t.me/Pixel_Ping",
  youtube: "https://www.youtube.com/channel/ShadowDrop-024",
} as const;

export const BRAND = {
  name: "PIXEL & PING",
  tagline: "A modern network management experience.",
} as const;

/**
 * Capabilities strip — short stat-like callouts presented as a band
 * between the hero and the first product section.
 * IMPORTANT: no fabricated numbers. These are qualitative capability
 * descriptions, not metrics.
 */
export const CAPABILITIES: { title: string; desc: string; icon: string }[] = [
  { icon: "grid",    title: "ONE SURFACE",    desc: "Dashboard, users, servers, endpoints — all in one place" },
  { icon: "cloud",   title: "CLOUD-NATIVE",   desc: "Built around modern infrastructure like Cloudflare" },
  { icon: "shield",  title: "RESILIENT",      desc: "Failover and endpoint health designed in from day one" },
  { icon: "pulse",   title: "OBSERVABLE",     desc: "Traffic, analytics, logs — visible, never noisy" },
];
