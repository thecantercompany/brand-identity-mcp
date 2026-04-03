/**
 * HTML Document Builder
 * Assembles section generators into a complete, self-contained HTML document
 */

import type { BrandIdentityInput } from "../types/index.js";
import { formatDate } from "../utils/formatting.js";
import { generateStrategySection } from "./sections/strategy.js";
import { generateVoiceToneSection } from "./sections/voice-tone.js";
import { generateMessagingSection } from "./sections/messaging.js";
import { generateColorsSection } from "./sections/colors.js";
import { generateTypographySection } from "./sections/typography.js";
import { generateImagerySection } from "./sections/imagery.js";
import { generateApplicationsSection } from "./sections/applications.js";
import { generateDosDontsSection } from "./sections/dos-donts.js";
import { generateFoundationsSection } from "./sections/foundations.js";
import { generateComponentsSection } from "./sections/components.js";
import { generatePatternsSection } from "./sections/patterns.js";
import { generateTokensSection } from "./sections/tokens.js";
import { generateImplementationSection } from "./sections/implementation.js";

const sectionGenerators: Record<string, (input: BrandIdentityInput) => string> = {
  brand_strategy: generateStrategySection,
  voice_tone: generateVoiceToneSection,
  messaging: generateMessagingSection,
  color_palette: generateColorsSection,
  typography: generateTypographySection,
  imagery: generateImagerySection,
  applications: generateApplicationsSection,
  dos_donts: generateDosDontsSection,
  foundations: generateFoundationsSection,
  components: generateComponentsSection,
  patterns: generatePatternsSection,
  design_tokens: generateTokensSection,
  implementation_guide: generateImplementationSection,
};

const sectionLabels: Record<string, string> = {
  brand_strategy: "Brand Strategy",
  voice_tone: "Voice & Tone",
  messaging: "Messaging Framework",
  color_palette: "Color Palette",
  typography: "Typography",
  imagery: "Imagery Direction",
  applications: "Brand Applications",
  dos_donts: "Brand Do's and Don'ts",
  foundations: "Design System Foundations",
  components: "UI Components",
  patterns: "Design Patterns",
  design_tokens: "Design Tokens",
  implementation_guide: "Implementation Guide",
};

const sectionIds: Record<string, string> = {
  brand_strategy: "brand-strategy",
  voice_tone: "voice-tone",
  messaging: "messaging",
  color_palette: "color-palette",
  typography: "typography",
  imagery: "imagery",
  applications: "applications",
  dos_donts: "dos-donts",
  foundations: "foundations",
  components: "components",
  patterns: "patterns",
  design_tokens: "design-tokens",
  implementation_guide: "implementation",
};

export function buildHtmlDocument(input: BrandIdentityInput): string {
  const date = formatDate();
  const sections = input.deliverables
    .filter((d) => sectionGenerators[d])
    .map((d) => sectionGenerators[d](input))
    .join("\n");

  const tocItems = input.deliverables
    .filter((d) => sectionLabels[d])
    .map((d) => `<li><a href="#${sectionIds[d]}">${sectionLabels[d]}</a></li>`)
    .join("\n");

  // Determine which Google Fonts to load based on emotion
  const fontLinks = getFontLinks(input.primary_emotion);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${input.client_name} — Brand Identity System</title>
  ${fontLinks}
  <style>
    ${getStyles(input)}
  </style>
</head>
<body>
  <header class="document-header">
    <h1>${input.client_name}</h1>
    <p class="subtitle">Brand Identity System</p>
    <p class="meta">Generated ${date} &middot; ${input.client_type.replace(/_/g, " ")} &middot; ${input.geography}</p>
  </header>

  <nav class="toc">
    <h2>Contents</h2>
    <ol>${tocItems}</ol>
  </nav>

  <main>
    ${sections}
  </main>

  <footer class="document-footer">
    <p>${input.client_name} Brand Identity System &middot; Generated ${date}</p>
    <p>This document is confidential and intended for internal use by ${input.client_name} and its authorized partners.</p>
  </footer>
</body>
</html>`;
}

function getFontLinks(emotion: string): string {
  const fontMap: Record<string, string> = {
    trust: `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">`,
    excitement: `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">`,
    calm: `<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet">`,
    urgency: `<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">`,
    empowerment: `<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Nunito+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">`,
    hope: `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">`,
  };
  return fontMap[emotion] || fontMap.trust;
}

function getStyles(input: BrandIdentityInput): string {
  const fontMap: Record<string, { primary: string; secondary: string }> = {
    trust: { primary: "'Playfair Display', Georgia, serif", secondary: "'Inter', -apple-system, sans-serif" },
    excitement: { primary: "'Space Grotesk', sans-serif", secondary: "'DM Sans', sans-serif" },
    calm: { primary: "'Libre Baskerville', Georgia, serif", secondary: "'Source Sans 3', sans-serif" },
    urgency: { primary: "'Oswald', sans-serif", secondary: "'Roboto', sans-serif" },
    empowerment: { primary: "'Sora', sans-serif", secondary: "'Nunito Sans', sans-serif" },
    hope: { primary: "'Plus Jakarta Sans', sans-serif", secondary: "'Outfit', sans-serif" },
  };

  const fonts = fontMap[input.primary_emotion] || fontMap.trust;

  return `
    /* Reset & Base */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 16px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: ${fonts.secondary}; color: #1a1a1a; line-height: 1.6; max-width: 960px; margin: 0 auto; padding: 48px 32px; }

    /* Print */
    @media print {
      body { padding: 0; max-width: none; }
      .section { page-break-inside: avoid; }
      .toc { page-break-after: always; }
    }

    /* Typography */
    h1, h2, h3, h4 { font-family: ${fonts.primary}; line-height: 1.2; }
    h1 { font-size: 48px; font-weight: 800; letter-spacing: -0.02em; }
    h2 { font-size: 32px; font-weight: 700; margin-top: 64px; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #e0e0e0; }
    h3 { font-size: 22px; font-weight: 600; margin-top: 32px; margin-bottom: 16px; }
    h4 { font-size: 18px; font-weight: 600; margin-top: 16px; margin-bottom: 8px; }
    p { margin-bottom: 12px; }

    /* Header */
    .document-header { margin-bottom: 48px; padding-bottom: 32px; border-bottom: 3px solid #1a1a1a; }
    .document-header h1 { margin-bottom: 8px; }
    .subtitle { font-size: 20px; font-weight: 500; color: #555; margin-bottom: 8px; }
    .meta { font-size: 14px; color: #888; text-transform: capitalize; }

    /* TOC */
    .toc { margin-bottom: 48px; padding: 24px; background: #f9f9f9; border-radius: 8px; }
    .toc h2 { font-size: 20px; margin-top: 0; border: none; padding-bottom: 0; margin-bottom: 16px; }
    .toc ol { padding-left: 24px; }
    .toc li { margin-bottom: 6px; }
    .toc a { color: #2563eb; text-decoration: none; }
    .toc a:hover { text-decoration: underline; }

    /* Sections */
    .section { margin-bottom: 48px; }
    .subsection { margin-bottom: 32px; }
    .rationale { font-size: 14px; color: #555; font-style: italic; margin-top: 8px; }
    .usage-note { font-size: 14px; color: #666; margin-bottom: 16px; }

    /* Tables */
    .brand-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
    .brand-table th { text-align: left; padding: 10px 14px; background: #f5f5f5; border-bottom: 2px solid #ddd; font-weight: 600; }
    .brand-table td { padding: 10px 14px; border-bottom: 1px solid #eee; vertical-align: top; }
    .brand-table tr:hover { background: #fafafa; }

    /* Color Swatches */
    .color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 16px; }
    .color-swatch-card { border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
    .color-swatch { height: 80px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; }
    .swatch-name { text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
    .swatch-info { padding: 12px; font-size: 12px; }
    .swatch-hex { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
    .swatch-values { color: #666; margin-bottom: 6px; }
    .swatch-contrast { font-size: 11px; color: #888; margin-bottom: 6px; }
    .swatch-usage { font-size: 12px; color: #444; }
    .swatch-rationale { padding: 0 12px 12px; font-size: 12px; margin: 0; }
    .inline-swatch { display: inline-block; width: 16px; height: 16px; border-radius: 3px; vertical-align: middle; margin-right: 4px; border: 1px solid rgba(0,0,0,0.1); }

    /* Type Specimens */
    .type-specimens { margin-top: 24px; }
    .specimen { margin-bottom: 24px; padding: 16px; background: #fafafa; border-radius: 8px; }

    /* Values Grid */
    .values-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .value-card { padding: 16px; background: #f9f9f9; border-radius: 8px; border-left: 3px solid #2563eb; }
    .value-card h4 { margin-top: 0; }

    /* Voice / Vocabulary */
    .vocabulary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .vocab-column h4 { margin-top: 0; }
    .vocab-column.preferred { background: #f0fdf4; padding: 16px; border-radius: 8px; }
    .vocab-column.avoid { background: #fef2f2; padding: 16px; border-radius: 8px; }
    .vocab-column ul { padding-left: 20px; }
    .vocab-column li { margin-bottom: 4px; font-size: 14px; }

    /* Positioning */
    .positioning-statement { padding: 24px; background: #f9f9f9; border-radius: 8px; margin-bottom: 16px; }
    .positioning-formula { font-size: 18px; margin-bottom: 4px; }

    /* Personality */
    .personality-persona { padding: 20px; background: #f9f9f9; border-radius: 8px; }

    /* Messaging */
    .elevator-pitch { font-size: 22px; font-style: normal; font-weight: 600; padding: 20px 24px; border-left: 4px solid #2563eb; background: #f9f9f9; margin: 16px 0; }
    .boilerplate { margin-bottom: 16px; padding: 16px; background: #fafafa; border-radius: 8px; }
    .tagline-option { padding: 16px; border: 1px solid #eee; border-radius: 8px; margin-bottom: 12px; }
    .key-message { padding: 16px; background: #f9f9f9; border-radius: 8px; margin-bottom: 12px; }

    /* Do's and Don'ts */
    .dos-list, .donts-list { display: grid; gap: 12px; }
    .do-item, .dont-item { display: flex; gap: 12px; padding: 12px; border-radius: 8px; }
    .do-item { background: #f0fdf4; }
    .dont-item { background: #fef2f2; }
    .do-icon { color: #16a34a; font-size: 20px; font-weight: 700; flex-shrink: 0; }
    .dont-icon { color: #dc2626; font-size: 20px; font-weight: 700; flex-shrink: 0; }
    .checklist { padding-left: 24px; }
    .checklist li { margin-bottom: 6px; }

    /* Applications */
    .application-brief { margin-bottom: 24px; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
    .application-brief h3 { margin-top: 0; }

    /* Components */
    .component-grid { display: grid; gap: 16px; }
    .component-card { padding: 16px; border: 1px solid #eee; border-radius: 8px; }
    .component-card h4 { margin-top: 0; color: #2563eb; }
    .component-details { font-size: 13px; margin-top: 8px; }
    .component-details > div { margin-bottom: 6px; }
    .component-specs { margin-top: 8px; }
    .spec-table { font-size: 12px; }
    .spec-table td { padding: 2px 8px; }
    .spec-table td:first-child { font-weight: 500; white-space: nowrap; }

    /* Patterns */
    .pattern-card { padding: 16px; border: 1px solid #eee; border-radius: 8px; margin-bottom: 12px; }
    .pattern-card h4 { margin-top: 0; }
    .wireframe-description, .flow-steps { font-size: 14px; margin-bottom: 8px; }

    /* Principles */
    .principle-card { padding: 16px; background: #f9f9f9; border-radius: 8px; margin-bottom: 12px; }
    .principle-card h4 { margin-top: 0; }

    /* Developer Guidelines */
    .dev-guidelines h4 { margin-top: 20px; }
    .dev-guidelines ul { padding-left: 20px; margin-bottom: 12px; }
    .dev-guidelines li { margin-bottom: 4px; font-size: 14px; }

    /* Implementation */
    .impl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .impl-grid h4 { margin-top: 0; }
    .impl-grid ul { list-style: none; padding: 0; }
    .impl-do, .impl-dont { padding: 8px 12px; margin-bottom: 6px; border-radius: 4px; font-size: 14px; }
    .impl-do { background: #f0fdf4; }
    .impl-dont { background: #fef2f2; }

    /* Tokens */
    pre { background: #1e1e2e; color: #cdd6f4; padding: 20px; border-radius: 8px; overflow-x: auto; font-size: 13px; line-height: 1.5; }
    code { font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace; }
    p code, li code, td code { background: #f1f1f1; padding: 2px 6px; border-radius: 3px; font-size: 13px; color: #e11d48; }

    /* Font Card */
    .font-card { padding: 16px; background: #f9f9f9; border-radius: 8px; margin-bottom: 12px; }
    .font-card h4 { margin-top: 0; }

    /* Footer */
    .document-footer { margin-top: 64px; padding-top: 24px; border-top: 1px solid #ddd; font-size: 12px; color: #888; text-align: center; }
  `;
}
