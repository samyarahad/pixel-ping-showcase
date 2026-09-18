/**
 * Pixel & Ping — content data
 * The showcase content lives here so copy/sections can be tweaked centrally.
 * Note: no fabricated statistics, no fake testimonials, no pricing, no fake data.
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
  /** Screenshot filename (without extension) — optional because some
   *  sections rely purely on abstract visualization. */
  shot?: string;
  /** Short caption shown next to the screenshot */
  caption?: string;
}

export const SECTIONS: SectionCopy[] = [
  {
    id: "dashboard",
    nav: "PRODUCT",
    eyebrow: "The Dashboard",
    headline: "See everything\nat a glance.",
    support:
      "A single surface for the moving parts of your network. Statistics, traffic, and activity are framed as quiet objects — not noise.",
    shot: "dashboard",
    caption: "Dashboard — overview, statistics, analytics",
  },
  {
    id: "users",
    nav: "USERS",
    eyebrow: "People & Access",
    headline: "Designed around\nyour users.",
    support:
      "Organize the people and access that matter to your network. A focused interface for creating, filtering, and finding the users you manage.",
    shot: "users",
    caption: "Users — search, filter, create",
  },
  {
    id: "servers",
    nav: "SERVERS",
    eyebrow: "Infrastructure",
    headline: "Your infrastructure,\nin view.",
    support:
      "Servers register into the system quietly. Each one becomes a node on the map — visible, contextual, and ready to be paired with the rest of the network.",
    shot: "servers",
    caption: "Servers — register & manage",
  },
  {
    id: "endpoints",
    nav: "ENDPOINTS",
    eyebrow: "Connections",
    headline: "Every endpoint\nhas a place.",
    support:
      "The network converges into endpoints. They are organized, named, and connected to the infrastructure around them.",
  },
  {
    id: "ip-scanner",
    nav: "SCANNER",
    eyebrow: "Network Intelligence",
    headline: "Find the signal.",
    support:
      "A focused scanner for clean IP pools and endpoint health. Add ranges, evaluate nodes, and keep a tidy record of what is reachable.",
    shot: "ip-scanner",
    caption: "IP Scanner — clean IP pool & health",
  },
  {
    id: "ports",
    nav: "PORTS",
    eyebrow: "Connections",
    headline: "Every connection,\norganized.",
    support:
      "Multiple paths, multiple port types — all rendered as elegant technical lines. No clutter, just the structure of your network.",
  },
  {
    id: "cloudflare",
    nav: "CLOUDFLARE",
    eyebrow: "Modern Infrastructure",
    headline: "Built around\nmodern infrastructure.",
    support:
      "Cloudflare integration is part of the experience. Pixel & Ping sits as a quiet control layer over a large abstract cloud.",
  },
  {
    id: "config",
    nav: "CONFIG",
    eyebrow: "Configuration",
    headline: "Complexity,\norganized.",
    support:
      "Abstract parameters flow into a central configuration object. The object becomes organized. No actual generation happens here — this is presentation only.",
  },
  {
    id: "traffic",
    nav: "TRAFFIC",
    eyebrow: "Network Flow",
    headline: "Watch the\nnetwork move.",
    support:
      "Thousands of tiny particles drift through paths. The movement is subtle and beautiful — an atmospheric view of the system in motion.",
  },
  {
    id: "analytics",
    nav: "ANALYTICS",
    eyebrow: "Patterns",
    headline: "See the patterns.",
    support:
      "Lines slowly form. Charts emerge. Graphs move subtly. The analytics view turns raw movement into readable shape.",
  },
  {
    id: "failover",
    nav: "FAILOVER",
    eyebrow: "Resilience",
    headline: "Built for\nchanging paths.",
    support:
      "Primary route. Alternate route. Connected. The visualization explains how the system behaves when a path changes — an educational animation, not a real operation.",
  },
  {
    id: "logs",
    nav: "LOGS",
    eyebrow: "Activity",
    headline: "See what happened.",
    support:
      "A cinematic stream of system events. Rows of abstract activity appear as the camera moves through them.",
  },
  {
    id: "notifications",
    nav: "NOTIFY",
    eyebrow: "Stay Informed",
    headline: "Stay informed.",
    support:
      "The system speaks softly. Notifications surface the moments that matter without overwhelming the experience.",
  },
  {
    id: "settings",
    nav: "SETTINGS",
    eyebrow: "Personalization",
    headline: "Make the\nexperience yours.",
    support:
      "Profile, appearance, language, panel name, and password — the things that make Pixel & Ping feel like your own.",
    shot: "settings",
    caption: "Settings — profile, appearance, general",
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
