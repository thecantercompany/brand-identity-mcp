/**
 * Design Language Markdown Builder
 * Generates a structured design-language.md file for developer reference
 */

import type { BrandIdentityInput } from "../types/index.js";
import { formatDate, hexToRgbString } from "../utils/formatting.js";

export function buildDesignLanguageMd(input: BrandIdentityInput): string {
  const date = formatDate();
  const sections: string[] = [];

  sections.push(`# ${input.client_name} — Design Language\n`);
  sections.push(`> Generated ${date}\n`);

  // Brand Essence (always included)
  sections.push(`## Brand Essence\n`);
  sections.push(`**Type:** ${input.client_type.replace(/_/g, " ")}`);
  sections.push(`**Description:** ${input.description}`);
  sections.push(`**Audience:** ${input.target_audience}`);
  sections.push(`**Geography:** ${input.geography}`);
  sections.push(`**Personality:** ${input.brand_personality.join(", ")}`);
  sections.push(`**Primary Emotion:** ${input.primary_emotion}`);
  if (input.competitors) sections.push(`**Competitors:** ${input.competitors}`);
  if (input.existing_assets) sections.push(`**Existing Assets:** ${input.existing_assets}`);
  if (input.election_cycle) sections.push(`**Election Cycle:** ${input.election_cycle}`);
  sections.push("");

  // Color Palette
  if (input.deliverables.includes("color_palette")) {
    sections.push(generateColorSection(input));
  }

  // Typography
  if (input.deliverables.includes("typography")) {
    sections.push(generateTypographySection(input));
  }

  // Voice & Tone
  if (input.deliverables.includes("voice_tone")) {
    sections.push(generateVoiceSection(input));
  }

  // Messaging
  if (input.deliverables.includes("messaging")) {
    sections.push(generateMessagingSection(input));
  }

  // Spacing
  if (input.deliverables.includes("foundations")) {
    sections.push(generateSpacingSection());
  }

  // Do's and Don'ts
  if (input.deliverables.includes("dos_donts")) {
    sections.push(generateRulesSection());
  }

  return sections.join("\n");
}

function generateColorSection(input: BrandIdentityInput): string {
  const emotionColors: Record<string, { primary: [string, string, string][]; secondary: [string, string][]; accent: [string, string][] }> = {
    trust: {
      primary: [["Deep Navy", "#1B365D", "Primary backgrounds, headers"], ["Slate Blue", "#4A6FA5", "Secondary headers, hover states"]],
      secondary: [["Warm Sand", "#E8DCC8"], ["Sky Mist", "#D4E4F7"]],
      accent: [["Action Gold", "#D4A843"], ["Alert Coral", "#E07A5F"]],
    },
    excitement: {
      primary: [["Electric Red", "#E63946", "Primary CTAs, key headlines"], ["Midnight", "#1D3557", "Primary backgrounds"]],
      secondary: [["Cream", "#F1FAEE"], ["Horizon Blue", "#A8DADC"]],
      accent: [["Sunburst", "#F4A261"], ["Vivid Teal", "#2A9D8F"]],
    },
    calm: {
      primary: [["Sage", "#5F7161", "Primary elements"], ["Deep Forest", "#3D5A3E", "Dark mode primary"]],
      secondary: [["Linen", "#FAF3E8"], ["Stone", "#C9B99A"]],
      accent: [["Terracotta", "#C07850"], ["Copper", "#B87333"]],
    },
    urgency: {
      primary: [["Signal Red", "#C8102E", "CTAs, urgent elements"], ["Iron", "#1A1A2E", "Primary backgrounds"]],
      secondary: [["Concrete", "#E8E8E8"], ["Ash", "#9CA3AF"]],
      accent: [["Warning Amber", "#F59E0B"], ["Go Green", "#10B981"]],
    },
    empowerment: {
      primary: [["Royal Purple", "#6B21A8", "Primary elements"], ["Deep Violet", "#4C1D95", "Dark backgrounds"]],
      secondary: [["Lavender Mist", "#EDE9FE"], ["Wisteria", "#C4B5FD"]],
      accent: [["Amber Power", "#F59E0B"], ["Teal Strength", "#14B8A6"]],
    },
    hope: {
      primary: [["Sunrise Blue", "#2563EB", "Primary elements"], ["Ocean Deep", "#1E40AF", "Dark emphasis"]],
      secondary: [["Morning Sky", "#DBEAFE"], ["Warm Peach", "#FED7AA"]],
      accent: [["Sunshine", "#FBBF24"], ["Spring Green", "#34D399"]],
    },
  };

  const colors = emotionColors[input.primary_emotion] || emotionColors.trust;

  let md = `## Color Palette\n\n### Primary\n| Name | Hex | RGB | Usage |\n|------|-----|-----|-------|\n`;
  for (const [name, hex, usage] of colors.primary) {
    md += `| ${name} | ${hex} | ${hexToRgbString(hex)} | ${usage} |\n`;
  }

  md += `\n### Secondary\n| Name | Hex | RGB |\n|------|-----|-----|\n`;
  for (const [name, hex] of colors.secondary) {
    md += `| ${name} | ${hex} | ${hexToRgbString(hex)} |\n`;
  }

  md += `\n### Accent\n| Name | Hex | RGB |\n|------|-----|-----|\n`;
  for (const [name, hex] of colors.accent) {
    md += `| ${name} | ${hex} | ${hexToRgbString(hex)} |\n`;
  }

  md += `\n### Semantic\n| Purpose | Color |\n|---------|-------|\n| Success | #27AE60 |\n| Warning | #F39C12 |\n| Error | #E74C3C |\n| Info | #2980B9 |\n`;

  return md;
}

function generateTypographySection(input: BrandIdentityInput): string {
  const fontMap: Record<string, [string, string]> = {
    trust: ["Playfair Display", "Inter"],
    excitement: ["Space Grotesk", "DM Sans"],
    calm: ["Libre Baskerville", "Source Sans 3"],
    urgency: ["Oswald", "Roboto"],
    empowerment: ["Sora", "Nunito Sans"],
    hope: ["Plus Jakarta Sans", "Outfit"],
  };

  const [primary, secondary] = fontMap[input.primary_emotion] || fontMap.trust;

  return `## Typography

**Primary Font:** ${primary}
**Secondary Font:** ${secondary}

| Level | Font | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|-------|------|--------|----------------|---------------|-------------|----------------|
| Display | ${primary} | 800 | 56px | 36px | 1.1 | -0.02em |
| Headline | ${primary} | 700 | 40px | 28px | 1.2 | -0.01em |
| Title 1 | ${primary} | 700 | 32px | 24px | 1.25 | -0.01em |
| Title 2 | ${primary} | 600 | 24px | 20px | 1.3 | 0 |
| Title 3 | ${secondary} | 600 | 20px | 18px | 1.35 | 0 |
| Body | ${secondary} | 400 | 16px | 16px | 1.6 | 0 |
| Callout | ${secondary} | 500 | 16px | 16px | 1.5 | 0 |
| Subheadline | ${secondary} | 600 | 14px | 14px | 1.4 | 0.01em |
| Footnote | ${secondary} | 400 | 13px | 13px | 1.4 | 0.01em |
| Caption | ${secondary} | 400 | 12px | 12px | 1.4 | 0.02em |
`;
}

function generateVoiceSection(input: BrandIdentityInput): string {
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(input.client_type);

  let md = `## Voice & Tone

**Voice Attributes:** Direct, ${input.brand_personality[0] || "Confident"}, ${input.brand_personality[1] || "Approachable"}

| Context | Tone | Example |
|---------|------|---------|
| Social Media | Warmer, conversational | "Big news for ${input.geography}. Here's what's happening." |
| Email | Personal, direct | "You've probably heard about [issue]. Let me tell you what we're doing." |
| Press | Formal but clear | "${input.client_name} today announced a new initiative." |
| Website | Scannable, benefit-focused | "Real solutions. Real results." |
`;

  if (isPolitical) {
    md += `| Fundraising | Urgent but respectful | "This race is closer than anyone expected." |
| Voter Outreach | Friendly, empowering | "Your polling place is [location]. Your voice, your vote." |
`;
  }

  md += `\n### Vocabulary\n**Preferred:** ${isPolitical ? "community, neighbors, families, accountability, action, results, your voice" : "people, build, simple, clear, together, real, you/your"}\n`;
  md += `**Avoid:** ${isPolitical ? "stakeholders, leverage, synergy, pivot, fight/war/battle" : "synergy, leverage, disrupt, utilize, best-in-class, cutting-edge"}\n`;

  return md;
}

function generateMessagingSection(input: BrandIdentityInput): string {
  return `## Key Messages

**Elevator Pitch:** ${input.client_name} — ${input.brand_personality[0] || "bold"}, ${input.brand_personality[1] || "principled"} solutions for ${input.target_audience} in ${input.geography}.

| Pillar | Headline |
|--------|----------|
| Accountability | ${input.client_name} delivers on promises — no excuses. |
| Community First | Every decision starts with: how does this help ${input.target_audience}? |
| Action Over Rhetoric | Results you can see. Progress you can measure. |
`;
}

function generateSpacingSection(): string {
  return `## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| space-0.5 | 4px | Tight inline spacing |
| space-1 | 8px | Compact padding, list gaps |
| space-1.5 | 12px | Input padding |
| space-2 | 16px | Standard padding |
| space-3 | 24px | Card padding, section gaps |
| space-4 | 32px | Section padding (mobile) |
| space-6 | 48px | Section padding (tablet) |
| space-8 | 64px | Section padding (desktop) |
| space-12 | 96px | Page-level spacing |
| space-16 | 128px | Major section breaks |
`;
}

function generateRulesSection(): string {
  return `## Do's and Don'ts

### Do
- Use the approved color palette consistently
- Maintain clear space around the logo
- Use the type scale as specified
- Write in the brand voice
- Prioritize accessibility (WCAG AA minimum)

### Don't
- Stretch, rotate, or distort the logo
- Use colors outside the approved palette
- Set body text in the display typeface
- Use the logo on busy backgrounds
- Add drop shadows or effects to brand elements
`;
}
