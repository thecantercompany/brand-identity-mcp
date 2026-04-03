/**
 * Color Palette section generator
 * Produces: primary, secondary, accent, neutral, and semantic colors with swatches
 */

import type { BrandIdentityInput, ColorEntry, ColorPalette } from "../../types/index.js";
import {
  hexToRgbString,
  hexToHslString,
  contrastRatio,
  wcagRating,
} from "../../utils/formatting.js";

export function generateColorsSection(input: BrandIdentityInput): string {
  const palette = generatePalette(input);
  const primaryHtml = renderColorGroup("Primary Colors", palette.primary, "60% of visual space — backgrounds, headers, primary actions");
  const secondaryHtml = renderColorGroup("Secondary Colors", palette.secondary, "25% of visual space — supporting elements, cards, sections");
  const accentHtml = renderColorGroup("Accent Colors", palette.accent, "10% of visual space — CTAs, highlights, active states");
  const neutralHtml = renderColorGroup("Neutrals", palette.neutrals, "5% — text, borders, dividers, subtle backgrounds");
  const semanticHtml = renderSemanticColors(palette.semantic);

  return `
    <section class="section" id="color-palette">
      <h2>Color Palette</h2>
      <p class="rationale">Every color choice is intentional. This palette is built to evoke <strong>${input.primary_emotion}</strong>, reinforce the brand personality (${input.brand_personality.join(", ")}), and meet WCAG AA accessibility standards.</p>

      ${primaryHtml}
      ${secondaryHtml}
      ${accentHtml}
      ${neutralHtml}
      ${semanticHtml}
    </section>
  `;
}

function generatePalette(input: BrandIdentityInput): ColorPalette {
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(input.client_type);
  const emotion = input.primary_emotion;

  // Select palette based on primary emotion, with political adjustments
  const palettes: Record<string, () => ColorPalette> = {
    trust: () => ({
      primary: [
        { name: "Deep Navy", hex: "#1B365D", rgb: hexToRgbString("#1B365D"), hsl: hexToHslString("#1B365D"), usage: "Primary backgrounds, headers", rationale: "Navy projects authority and stability — the foundation of trust. High contrast against white ensures readability." },
        { name: "Slate Blue", hex: "#4A6FA5", rgb: hexToRgbString("#4A6FA5"), hsl: hexToHslString("#4A6FA5"), usage: "Secondary headers, hover states", rationale: "Mid-tone blue softens the navy without losing seriousness. Works as an accessible link color." },
      ],
      secondary: [
        { name: "Warm Sand", hex: "#E8DCC8", rgb: hexToRgbString("#E8DCC8"), hsl: hexToHslString("#E8DCC8"), usage: "Card backgrounds, section dividers", rationale: "Warm neutral balances the cool blues. Feels approachable and grounded." },
        { name: "Sky Mist", hex: "#D4E4F7", rgb: hexToRgbString("#D4E4F7"), hsl: hexToHslString("#D4E4F7"), usage: "Highlight sections, callout backgrounds", rationale: "Light blue creates visual breathing room while staying on-brand." },
      ],
      accent: [
        { name: "Action Gold", hex: "#D4A843", rgb: hexToRgbString("#D4A843"), hsl: hexToHslString("#D4A843"), usage: "CTAs, buttons, important links", rationale: "Gold creates urgency and premium feel against navy. High visibility for conversion elements." },
        { name: "Alert Coral", hex: "#E07A5F", rgb: hexToRgbString("#E07A5F"), hsl: hexToHslString("#E07A5F"), usage: "Secondary CTAs, notification badges", rationale: "Warm contrast to the cool palette. Draws attention without aggression." },
      ],
      neutrals: [
        { name: "Charcoal", hex: "#2D3436", rgb: hexToRgbString("#2D3436"), hsl: hexToHslString("#2D3436"), usage: "Body text, primary text", rationale: "Softer than pure black, easier on the eyes for long-form reading." },
        { name: "Graphite", hex: "#636E72", rgb: hexToRgbString("#636E72"), hsl: hexToHslString("#636E72"), usage: "Secondary text, captions", rationale: "Provides clear hierarchy without harsh contrast." },
        { name: "Silver", hex: "#B2BEC3", rgb: hexToRgbString("#B2BEC3"), hsl: hexToHslString("#B2BEC3"), usage: "Borders, dividers, disabled states", rationale: "Subtle enough to organize without competing for attention." },
        { name: "Cloud", hex: "#F5F6FA", rgb: hexToRgbString("#F5F6FA"), hsl: hexToHslString("#F5F6FA"), usage: "Page background, alternate sections", rationale: "Slightly warm white reduces eye strain and adds polish." },
      ],
      semantic: { success: "#27AE60", warning: "#F39C12", error: "#E74C3C", info: "#2980B9", successDark: "#2ECC71", warningDark: "#F1C40F", errorDark: "#E74C3C", infoDark: "#3498DB" },
    }),
    excitement: () => ({
      primary: [
        { name: "Electric Red", hex: "#E63946", rgb: hexToRgbString("#E63946"), hsl: hexToHslString("#E63946"), usage: "Primary CTAs, key headlines", rationale: "Red commands attention and signals energy. Used strategically, not as a background flood." },
        { name: "Midnight", hex: "#1D3557", rgb: hexToRgbString("#1D3557"), hsl: hexToHslString("#1D3557"), usage: "Primary backgrounds, text on light", rationale: "Dark contrast ground for the vibrant palette. Prevents visual fatigue." },
      ],
      secondary: [
        { name: "Cream", hex: "#F1FAEE", rgb: hexToRgbString("#F1FAEE"), hsl: hexToHslString("#F1FAEE"), usage: "Page backgrounds, breathing space", rationale: "Near-white with warm undertone. Keeps energy without harsh contrast." },
        { name: "Horizon Blue", hex: "#A8DADC", rgb: hexToRgbString("#A8DADC"), hsl: hexToHslString("#A8DADC"), usage: "Info sections, secondary cards", rationale: "Cool complement to the warm reds. Creates visual balance." },
      ],
      accent: [
        { name: "Sunburst", hex: "#F4A261", rgb: hexToRgbString("#F4A261"), hsl: hexToHslString("#F4A261"), usage: "Secondary CTAs, highlights", rationale: "Warm orange extends the energy without competing with primary red." },
        { name: "Vivid Teal", hex: "#2A9D8F", rgb: hexToRgbString("#2A9D8F"), hsl: hexToHslString("#2A9D8F"), usage: "Success states, positive indicators", rationale: "Complementary to the warm palette. Fresh and modern." },
      ],
      neutrals: [
        { name: "Charcoal", hex: "#264653", rgb: hexToRgbString("#264653"), hsl: hexToHslString("#264653"), usage: "Body text", rationale: "Deep blue-gray maintains brand warmth in text." },
        { name: "Storm", hex: "#6B7B8D", rgb: hexToRgbString("#6B7B8D"), hsl: hexToHslString("#6B7B8D"), usage: "Secondary text", rationale: "Cool gray provides hierarchy." },
        { name: "Mist", hex: "#B8C5D0", rgb: hexToRgbString("#B8C5D0"), hsl: hexToHslString("#B8C5D0"), usage: "Borders, dividers", rationale: "Subtle organizational element." },
        { name: "Snow", hex: "#F8F9FA", rgb: hexToRgbString("#F8F9FA"), hsl: hexToHslString("#F8F9FA"), usage: "Backgrounds", rationale: "Clean base for vibrant colors to pop." },
      ],
      semantic: { success: "#2A9D8F", warning: "#F4A261", error: "#E63946", info: "#457B9D", successDark: "#34D399", warningDark: "#FBBF24", errorDark: "#F87171", infoDark: "#60A5FA" },
    }),
    calm: () => ({
      primary: [
        { name: "Sage", hex: "#5F7161", rgb: hexToRgbString("#5F7161"), hsl: hexToHslString("#5F7161"), usage: "Primary elements, headers", rationale: "Green conveys growth, balance, and natural calm. Sage avoids the cliché of bright green." },
        { name: "Deep Forest", hex: "#3D5A3E", rgb: hexToRgbString("#3D5A3E"), hsl: hexToHslString("#3D5A3E"), usage: "Dark mode primary, footer", rationale: "Rich depth for anchoring elements." },
      ],
      secondary: [
        { name: "Linen", hex: "#FAF3E8", rgb: hexToRgbString("#FAF3E8"), hsl: hexToHslString("#FAF3E8"), usage: "Page backgrounds", rationale: "Warm, soft background evokes paper and naturalness." },
        { name: "Stone", hex: "#C9B99A", rgb: hexToRgbString("#C9B99A"), hsl: hexToHslString("#C9B99A"), usage: "Cards, highlights", rationale: "Earthy complement to the greens." },
      ],
      accent: [
        { name: "Terracotta", hex: "#C07850", rgb: hexToRgbString("#C07850"), hsl: hexToHslString("#C07850"), usage: "CTAs, action elements", rationale: "Warm earth tone creates gentle urgency against cool greens." },
        { name: "Copper", hex: "#B87333", rgb: hexToRgbString("#B87333"), hsl: hexToHslString("#B87333"), usage: "Secondary CTAs, links", rationale: "Premium metallic feel that grounds the natural palette." },
      ],
      neutrals: [
        { name: "Espresso", hex: "#3E3232", rgb: hexToRgbString("#3E3232"), hsl: hexToHslString("#3E3232"), usage: "Body text", rationale: "Warm black that feels softer than pure black." },
        { name: "Walnut", hex: "#7A6855", rgb: hexToRgbString("#7A6855"), hsl: hexToHslString("#7A6855"), usage: "Secondary text", rationale: "Brown-gray continues the earthy theme." },
        { name: "Pebble", hex: "#B5A898", rgb: hexToRgbString("#B5A898"), hsl: hexToHslString("#B5A898"), usage: "Borders, dividers", rationale: "Warm gray for gentle organization." },
        { name: "Cream", hex: "#F7F3EE", rgb: hexToRgbString("#F7F3EE"), hsl: hexToHslString("#F7F3EE"), usage: "Backgrounds", rationale: "Warm white, easier on the eyes." },
      ],
      semantic: { success: "#5F7161", warning: "#D4A843", error: "#C04040", info: "#4A6FA5", successDark: "#6B8C6D", warningDark: "#E0B850", errorDark: "#D06060", infoDark: "#5B80B5" },
    }),
    urgency: () => ({
      primary: [
        { name: "Signal Red", hex: "#C8102E", rgb: hexToRgbString("#C8102E"), hsl: hexToHslString("#C8102E"), usage: "CTAs, urgent elements", rationale: "Red signals immediate importance. Used for action items, not backgrounds." },
        { name: "Iron", hex: "#1A1A2E", rgb: hexToRgbString("#1A1A2E"), hsl: hexToHslString("#1A1A2E"), usage: "Primary backgrounds, headers", rationale: "Near-black provides gravitas and contrast for the vibrant red." },
      ],
      secondary: [
        { name: "Concrete", hex: "#E8E8E8", rgb: hexToRgbString("#E8E8E8"), hsl: hexToHslString("#E8E8E8"), usage: "Card backgrounds", rationale: "Neutral ground that doesn't compete with urgent colors." },
        { name: "Ash", hex: "#9CA3AF", rgb: hexToRgbString("#9CA3AF"), hsl: hexToHslString("#9CA3AF"), usage: "Secondary elements", rationale: "Cool gray creates calm zones between urgent elements." },
      ],
      accent: [
        { name: "Warning Amber", hex: "#F59E0B", rgb: hexToRgbString("#F59E0B"), hsl: hexToHslString("#F59E0B"), usage: "Deadlines, time-sensitive callouts", rationale: "Amber signals caution without the aggression of red." },
        { name: "Go Green", hex: "#10B981", rgb: hexToRgbString("#10B981"), hsl: hexToHslString("#10B981"), usage: "Success, completion, positive actions", rationale: "Green provides relief and resolution after urgent red." },
      ],
      neutrals: [
        { name: "Ink", hex: "#111827", rgb: hexToRgbString("#111827"), hsl: hexToHslString("#111827"), usage: "Body text", rationale: "Deep neutral for maximum readability." },
        { name: "Slate", hex: "#6B7280", rgb: hexToRgbString("#6B7280"), hsl: hexToHslString("#6B7280"), usage: "Secondary text", rationale: "Clear hierarchy in text." },
        { name: "Border Gray", hex: "#D1D5DB", rgb: hexToRgbString("#D1D5DB"), hsl: hexToHslString("#D1D5DB"), usage: "Borders, dividers", rationale: "Clean separation." },
        { name: "Background", hex: "#F9FAFB", rgb: hexToRgbString("#F9FAFB"), hsl: hexToHslString("#F9FAFB"), usage: "Page background", rationale: "Clean, professional base." },
      ],
      semantic: { success: "#10B981", warning: "#F59E0B", error: "#EF4444", info: "#3B82F6", successDark: "#34D399", warningDark: "#FBBF24", errorDark: "#F87171", infoDark: "#60A5FA" },
    }),
    empowerment: () => ({
      primary: [
        { name: "Royal Purple", hex: "#6B21A8", rgb: hexToRgbString("#6B21A8"), hsl: hexToHslString("#6B21A8"), usage: "Primary elements, headers", rationale: "Purple symbolizes empowerment, dignity, and transformation. Bold without being aggressive." },
        { name: "Deep Violet", hex: "#4C1D95", rgb: hexToRgbString("#4C1D95"), hsl: hexToHslString("#4C1D95"), usage: "Dark backgrounds, footers", rationale: "Rich depth for anchoring." },
      ],
      secondary: [
        { name: "Lavender Mist", hex: "#EDE9FE", rgb: hexToRgbString("#EDE9FE"), hsl: hexToHslString("#EDE9FE"), usage: "Card backgrounds, highlights", rationale: "Soft purple extends the primary without overwhelming." },
        { name: "Wisteria", hex: "#C4B5FD", rgb: hexToRgbString("#C4B5FD"), hsl: hexToHslString("#C4B5FD"), usage: "Accents, icons", rationale: "Mid-tone bridge between primary and background." },
      ],
      accent: [
        { name: "Amber Power", hex: "#F59E0B", rgb: hexToRgbString("#F59E0B"), hsl: hexToHslString("#F59E0B"), usage: "CTAs, action buttons", rationale: "Gold/amber against purple creates a regal, empowering combination." },
        { name: "Teal Strength", hex: "#14B8A6", rgb: hexToRgbString("#14B8A6"), hsl: hexToHslString("#14B8A6"), usage: "Success, positive indicators", rationale: "Fresh complement that signals growth and progress." },
      ],
      neutrals: [
        { name: "Deep Gray", hex: "#1F2937", rgb: hexToRgbString("#1F2937"), hsl: hexToHslString("#1F2937"), usage: "Body text", rationale: "Strong but not harsh." },
        { name: "Cool Gray", hex: "#6B7280", rgb: hexToRgbString("#6B7280"), hsl: hexToHslString("#6B7280"), usage: "Secondary text", rationale: "Clean hierarchy." },
        { name: "Light Gray", hex: "#D1D5DB", rgb: hexToRgbString("#D1D5DB"), hsl: hexToHslString("#D1D5DB"), usage: "Borders", rationale: "Subtle structure." },
        { name: "Off White", hex: "#F9FAFB", rgb: hexToRgbString("#F9FAFB"), hsl: hexToHslString("#F9FAFB"), usage: "Backgrounds", rationale: "Clean base." },
      ],
      semantic: { success: "#14B8A6", warning: "#F59E0B", error: "#EF4444", info: "#8B5CF6", successDark: "#2DD4BF", warningDark: "#FBBF24", errorDark: "#F87171", infoDark: "#A78BFA" },
    }),
    hope: () => ({
      primary: [
        { name: "Sunrise Blue", hex: "#2563EB", rgb: hexToRgbString("#2563EB"), hsl: hexToHslString("#2563EB"), usage: "Primary elements, headers", rationale: "Bright blue radiates optimism and openness. Forward-looking and inclusive." },
        { name: "Ocean Deep", hex: "#1E40AF", rgb: hexToRgbString("#1E40AF"), hsl: hexToHslString("#1E40AF"), usage: "Dark backgrounds, emphasis", rationale: "Deepens the primary for contrast and gravitas." },
      ],
      secondary: [
        { name: "Morning Sky", hex: "#DBEAFE", rgb: hexToRgbString("#DBEAFE"), hsl: hexToHslString("#DBEAFE"), usage: "Card backgrounds, callouts", rationale: "Light blue extends optimism across the page." },
        { name: "Warm Peach", hex: "#FED7AA", rgb: hexToRgbString("#FED7AA"), hsl: hexToHslString("#FED7AA"), usage: "Highlights, featured content", rationale: "Warm counterpoint to cool blues. Feels welcoming." },
      ],
      accent: [
        { name: "Sunshine", hex: "#FBBF24", rgb: hexToRgbString("#FBBF24"), hsl: hexToHslString("#FBBF24"), usage: "CTAs, buttons", rationale: "Yellow/gold against blue is classic hope-and-optimism pairing." },
        { name: "Spring Green", hex: "#34D399", rgb: hexToRgbString("#34D399"), hsl: hexToHslString("#34D399"), usage: "Success, positive feedback", rationale: "Growth and renewal — reinforces the hope narrative." },
      ],
      neutrals: [
        { name: "Dark Slate", hex: "#1E293B", rgb: hexToRgbString("#1E293B"), hsl: hexToHslString("#1E293B"), usage: "Body text", rationale: "Blue-tinted dark for warmth." },
        { name: "Slate", hex: "#64748B", rgb: hexToRgbString("#64748B"), hsl: hexToHslString("#64748B"), usage: "Secondary text", rationale: "Clear hierarchy." },
        { name: "Light Slate", hex: "#CBD5E1", rgb: hexToRgbString("#CBD5E1"), hsl: hexToHslString("#CBD5E1"), usage: "Borders", rationale: "Subtle blue-gray for structure." },
        { name: "Near White", hex: "#F8FAFC", rgb: hexToRgbString("#F8FAFC"), hsl: hexToHslString("#F8FAFC"), usage: "Backgrounds", rationale: "Cool white, clean and open." },
      ],
      semantic: { success: "#34D399", warning: "#FBBF24", error: "#F87171", info: "#60A5FA", successDark: "#6EE7B7", warningDark: "#FDE68A", errorDark: "#FCA5A5", infoDark: "#93C5FD" },
    }),
  };

  const generator = palettes[emotion] || palettes.trust;
  return generator();
}

function renderColorGroup(title: string, colors: ColorEntry[], usageNote: string): string {
  const swatches = colors
    .map((c) => {
      const ratioWhite = contrastRatio(c.hex, "#FFFFFF");
      const ratioBlack = contrastRatio(c.hex, "#000000");
      const ratingWhite = wcagRating(ratioWhite);
      const ratingBlack = wcagRating(ratioBlack);
      const textColor = ratioWhite > ratioBlack ? "#FFFFFF" : "#000000";

      return `
      <div class="color-swatch-card">
        <div class="color-swatch" style="background-color: ${c.hex}; color: ${textColor};">
          <span class="swatch-name">${c.name}</span>
        </div>
        <div class="swatch-info">
          <div class="swatch-hex"><strong>${c.hex}</strong></div>
          <div class="swatch-values">
            <span>${c.rgb}</span><br>
            <span>${c.hsl}</span>
          </div>
          <div class="swatch-contrast">
            vs White: ${ratioWhite.toFixed(1)}:1 (${ratingWhite})<br>
            vs Black: ${ratioBlack.toFixed(1)}:1 (${ratingBlack})
          </div>
          <div class="swatch-usage">${c.usage}</div>
        </div>
        <p class="swatch-rationale"><em>${c.rationale}</em></p>
      </div>
    `;
    })
    .join("");

  return `
    <div class="subsection">
      <h3>${title}</h3>
      <p class="usage-note">${usageNote}</p>
      <div class="color-grid">${swatches}</div>
    </div>
  `;
}

function renderSemanticColors(semantic: ColorPalette["semantic"]): string {
  const entries = [
    { purpose: "Success", light: semantic.success, dark: semantic.successDark },
    { purpose: "Warning", light: semantic.warning, dark: semantic.warningDark },
    { purpose: "Error", light: semantic.error, dark: semantic.errorDark },
    { purpose: "Info", light: semantic.info, dark: semantic.infoDark },
  ];

  const rows = entries
    .map(
      (e) => `
    <tr>
      <td><strong>${e.purpose}</strong></td>
      <td><span class="inline-swatch" style="background:${e.light};"></span> ${e.light}</td>
      <td><span class="inline-swatch" style="background:${e.dark};"></span> ${e.dark}</td>
    </tr>
  `
    )
    .join("");

  return `
    <div class="subsection">
      <h3>Semantic Colors</h3>
      <p class="rationale">System feedback colors for UI states. These remain consistent regardless of brand theme.</p>
      <table class="brand-table">
        <thead>
          <tr><th>Purpose</th><th>Light Mode</th><th>Dark Mode</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}
