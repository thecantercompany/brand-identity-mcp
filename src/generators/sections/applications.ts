/**
 * Brand Applications section generator
 * Creative briefs for designers — not actual designs
 */

import type { BrandIdentityInput } from "../../types/index.js";

export function generateApplicationsSection(input: BrandIdentityInput): string {
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(input.client_type);
  const apps = getApplications(input, isPolitical);

  const appHtml = apps
    .map(
      (a) => `
    <div class="application-brief">
      <h3>${a.name}</h3>
      <table class="brand-table">
        <tbody>
          <tr><td><strong>Purpose</strong></td><td>${a.purpose}</td></tr>
          <tr><td><strong>Key Elements</strong></td><td>${a.elements}</td></tr>
          <tr><td><strong>Layout Direction</strong></td><td>${a.layout}</td></tr>
          <tr><td><strong>Brand Application</strong></td><td>${a.brandApplication}</td></tr>
          <tr><td><strong>Special Notes</strong></td><td>${a.notes}</td></tr>
        </tbody>
      </table>
    </div>
  `
    )
    .join("");

  return `
    <section class="section" id="applications">
      <h2>Brand Applications</h2>
      <p class="rationale">These are creative briefs — specifications for a designer to execute. Each application describes what to include, how brand elements apply, and what to watch out for.</p>
      ${appHtml}
    </section>
  `;
}

interface ApplicationBrief {
  name: string;
  purpose: string;
  elements: string;
  layout: string;
  brandApplication: string;
  notes: string;
}

function getApplications(input: BrandIdentityInput, isPolitical: boolean): ApplicationBrief[] {
  const standard: ApplicationBrief[] = [
    {
      name: "Business Cards",
      purpose: "First physical impression. Must communicate credibility and contact info at a glance.",
      elements: "Logo, name, title, phone, email, website. Optional: tagline, QR code to website/vCard.",
      layout: "Front: logo + name/title centered or left-aligned with generous whitespace. Back: full color or pattern with contact details. Single-sided acceptable for cost-conscious runs.",
      brandApplication: "Primary color as background or accent bar. Primary typeface for name, secondary for contact details. Logo at minimum size specification.",
      notes: "Standard size: 3.5\" x 2\". Ensure text is no smaller than 8pt for readability. Consider rounded corners for a modern feel if brand personality supports it.",
    },
    {
      name: "Letterhead & Stationery",
      purpose: "Official correspondence. Must look professional when printed and as PDF.",
      elements: "Logo (top left or centered), address block, optional tagline, footer with website/social.",
      layout: "Clean margins (1\" minimum). Logo in header. Address in footer or header secondary position. Leave maximum space for letter content.",
      brandApplication: "Logo in primary color. Subtle color accent (thin line or block) using secondary color. Body text area uses secondary typeface at body size.",
      notes: "Design for both print (Letter size 8.5\" x 11\") and digital (PDF). Ensure the design works in grayscale for fax/photocopy scenarios.",
    },
    {
      name: "Email Signature",
      purpose: "Every email is a brand touchpoint. Consistent signatures build recognition.",
      elements: "Name, title, phone, email, website. Logo (small). Optional: social icons, tagline.",
      layout: "Horizontal layout preferred. Logo left, info right. Or stacked: logo top, info below. Keep total height under 150px.",
      brandApplication: "Logo at smallest approved size. Primary color for name, neutral for other text. Avoid background colors (email clients render inconsistently).",
      notes: "Must work across Outlook, Gmail, Apple Mail. Use inline CSS only. No background images. Test in plain-text mode too.",
    },
    {
      name: "Social Media Profiles",
      purpose: "Brand presence across 5 platforms: Facebook, Instagram, X/Twitter, LinkedIn, Threads.",
      elements: "Avatar (logo or icon mark), cover image (key visual + tagline), bio text.",
      layout: "Avatar: logo centered on brand color background, simple and recognizable at 32px. Cover: key message or visual with safe zones for platform UI overlays.",
      brandApplication: "Avatar uses logo on primary color background. Cover image uses brand photography style, primary + secondary colors, display typeface for any text overlay.",
      notes: "Design at each platform's current dimensions. Facebook cover: 820x312. Instagram avatar: 320x320. LinkedIn banner: 1584x396. Account for mobile crop differences.",
    },
    {
      name: "Presentation Template",
      purpose: "Internal and external presentations. Must look professional with minimal design effort from the user.",
      elements: "Title slide, section divider, content slide (text + image), data/chart slide, closing/CTA slide.",
      layout: "16:9 aspect ratio. Logo in consistent position (bottom-left or top-right). Title slides use display type, content slides use body type. Generous margins.",
      brandApplication: "Title slides: primary color background, white text in display typeface. Content slides: white background, neutral text, accent color for highlights. Data slides: chart colors from brand palette.",
      notes: "Design for both Google Slides and PowerPoint. Include master slides/layouts. Provide a chart color sequence using the full palette.",
    },
  ];

  const political: ApplicationBrief[] = isPolitical
    ? [
        {
          name: "Yard Signs",
          purpose: "Highest-volume political brand touchpoint. Must be readable at 30+ mph from 50+ feet.",
          elements: "Candidate/org name (LARGE), office/tagline (smaller), optional website. That's it — nothing else.",
          layout: "Name fills 60-70% of the sign. Simple horizontal layout. Maximum 3 lines of text. White or light background with dark text, OR dark background with white text.",
          brandApplication: "Primary color as background or text color. Display typeface at maximum weight. Contrast ratio must exceed 7:1 for outdoor readability.",
          notes: `Standard sizes: 18"x24" (residential), 4'x8' (highway). Design at actual size. Test readability by viewing the design at 10% zoom on screen. If you can't read it, redesign.`,
        },
        {
          name: "Palm Cards",
          purpose: "Handout for canvassers and events. The 30-second pitch in print form.",
          elements: "Front: photo, name, office, 3 key issues. Back: bio paragraph, endorsements, website, QR code.",
          layout: `4"x6" or 3.5"x8.5". Front is the hook — bold, visual, scannable. Back is the substance — still concise but more detail.`,
          brandApplication: "Full brand treatment. Primary colors, both typefaces, brand photography style. This is the most complete single-piece expression of the brand.",
          notes: "Print on heavy stock (14pt+). Include a clear call to action (vote date, website, volunteer signup). Ensure Spanish/bilingual version if geography requires it.",
        },
        {
          name: "Bumper Stickers",
          purpose: "Mobile advertising. Name recognition at its most basic.",
          elements: "Name + office. That's it. Maybe a URL if it's short.",
          layout: `Standard: 11.5"x3". Name in the largest type that fits. Left-to-right reading. No imagery.`,
          brandApplication: "Primary color background, white text (or inverse). Display typeface only. This is the most reduced expression of the brand — if it works here, it works everywhere.",
          notes: "Must be readable from 10+ feet. Weatherproof vinyl. Test that the design doesn't lose meaning when partially obscured (another car, rain, etc.).",
        },
        {
          name: "Email Templates",
          purpose: "Fundraising, voter outreach, volunteer recruitment. The digital workhorse.",
          elements: "Header with logo, hero image area, body text area, CTA button(s), footer with legal/unsubscribe.",
          layout: "Single-column, max 600px wide. Hero image optional. CTA button prominent and repeated. Short paragraphs. Mobile-first design.",
          brandApplication: "Header: logo on white or primary color. CTA buttons: accent color with white text. Body: secondary typeface, neutral text color. Links in primary color.",
          notes: "Must render in all major email clients (Outlook, Gmail, Apple Mail, Yahoo). Use inline CSS. Test dark mode rendering. Include plain-text fallback.",
        },
      ]
    : [];

  return [...standard, ...political];
}
