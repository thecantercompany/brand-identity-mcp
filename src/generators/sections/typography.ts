/**
 * Typography section generator
 * Produces: font recommendations, type scale, specimens
 */

import type { BrandIdentityInput, FontRecommendation, TypeScale } from "../../types/index.js";

export function generateTypographySection(input: BrandIdentityInput): string {
  const fonts = selectFonts(input);
  const scale = generateTypeScale(fonts);

  const fontCards = fonts
    .map(
      (f) => `
    <div class="font-card">
      <h4>${f.role === "primary" ? "Primary" : "Secondary"} Typeface: ${f.name}</h4>
      <p class="rationale"><strong>Rationale:</strong> ${f.rationale}</p>
      <p><strong>Weights used:</strong> ${f.weights.join(", ")}</p>
      <p><strong>Google Fonts:</strong> <code>${f.googleFontsUrl}</code></p>
    </div>
  `
    )
    .join("");

  const scaleRows = scale
    .map(
      (s) => `
    <tr>
      <td><strong>${s.level}</strong></td>
      <td>${s.font}</td>
      <td>${s.weight}</td>
      <td>${s.sizeDesktop}</td>
      <td>${s.sizeMobile}</td>
      <td>${s.lineHeight}</td>
      <td>${s.letterSpacing}</td>
    </tr>
  `
    )
    .join("");

  const primaryFont = fonts.find((f) => f.role === "primary")!;
  const secondaryFont = fonts.find((f) => f.role === "secondary")!;

  const specimens = generateSpecimens(primaryFont, secondaryFont, scale);

  return `
    <section class="section" id="typography">
      <h2>Typography</h2>
      <p class="rationale">Typography carries the brand voice visually. These typefaces pair ${primaryFont.name}'s personality with ${secondaryFont.name}'s clarity to create a system that works from yard signs to long-form documents.</p>

      <div class="subsection">
        <h3>Typeface Selection</h3>
        ${fontCards}
      </div>

      <div class="subsection">
        <h3>Font Pairing Logic</h3>
        <p>${primaryFont.name} provides character and recognition at display sizes. ${secondaryFont.name} takes over at body sizes where readability is paramount. The contrast between ${primaryFont.name.includes("serif") || primaryFont.name.includes("Serif") ? "serif and sans-serif" : "geometric and humanist"} forms creates visual hierarchy naturally — headlines feel different from body text without relying on weight alone.</p>
      </div>

      <div class="subsection">
        <h3>Type Scale</h3>
        <table class="brand-table">
          <thead>
            <tr>
              <th>Level</th>
              <th>Font</th>
              <th>Weight</th>
              <th>Desktop</th>
              <th>Mobile</th>
              <th>Line Height</th>
              <th>Letter Spacing</th>
            </tr>
          </thead>
          <tbody>${scaleRows}</tbody>
        </table>
        <p class="rationale"><strong>Minimum accessible size:</strong> 16px for body text, 14px for captions. Never go below 12px for any text.</p>
      </div>

      <div class="subsection">
        <h3>Type Specimens</h3>
        ${specimens}
      </div>
    </section>
  `;
}

function selectFonts(input: BrandIdentityInput): FontRecommendation[] {
  const emotion = input.primary_emotion;
  const personality = input.brand_personality;
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(input.client_type);

  // Font pairing selections based on emotion + personality
  const fontPairings: Record<string, FontRecommendation[]> = {
    trust: [
      {
        name: "Playfair Display",
        role: "primary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&display=swap",
        rationale: "Playfair Display is an elegant transitional serif that projects authority, tradition, and trustworthiness. Its high contrast strokes feel established and credible at display sizes.",
        weights: ["400 Regular", "600 SemiBold", "700 Bold", "800 ExtraBold"],
      },
      {
        name: "Inter",
        role: "secondary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        rationale: "Inter is a highly legible sans-serif optimized for screens. Its clean geometry and open apertures ensure readability at any size, from mobile to desktop.",
        weights: ["300 Light", "400 Regular", "500 Medium", "600 SemiBold", "700 Bold"],
      },
    ],
    excitement: [
      {
        name: "Space Grotesk",
        role: "primary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
        rationale: "Space Grotesk is a modern proportional sans-serif with geometric roots and a dynamic character. Its slightly quirky letterforms feel energetic and forward-looking.",
        weights: ["400 Regular", "500 Medium", "600 SemiBold", "700 Bold"],
      },
      {
        name: "DM Sans",
        role: "secondary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap",
        rationale: "DM Sans is a low-contrast geometric sans-serif with excellent readability. Its clean, modern forms complement Space Grotesk without competing.",
        weights: ["300 Light", "400 Regular", "500 Medium", "600 SemiBold", "700 Bold"],
      },
    ],
    calm: [
      {
        name: "Libre Baskerville",
        role: "primary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
        rationale: "Libre Baskerville is a web-optimized serif with classical proportions. Its measured, thoughtful letterforms evoke steadiness and quiet confidence.",
        weights: ["400 Regular", "700 Bold"],
      },
      {
        name: "Source Sans 3",
        role: "secondary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap",
        rationale: "Source Sans 3 is Adobe's first open-source typeface — clean, readable, and calm. Its humanist forms feel approachable without being casual.",
        weights: ["300 Light", "400 Regular", "500 Medium", "600 SemiBold", "700 Bold"],
      },
    ],
    urgency: [
      {
        name: "Oswald",
        role: "primary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap",
        rationale: "Oswald is a condensed sans-serif reworking of the classic gothic style. Its vertical stress and narrow proportions create visual urgency and demand attention at headline sizes.",
        weights: ["400 Regular", "500 Medium", "600 SemiBold", "700 Bold"],
      },
      {
        name: "Roboto",
        role: "secondary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
        rationale: "Roboto's dual nature — mechanical skeleton with geometric forms — provides clear, efficient readability for body text under high-urgency conditions.",
        weights: ["300 Light", "400 Regular", "500 Medium", "700 Bold"],
      },
    ],
    empowerment: [
      {
        name: "Sora",
        role: "primary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap",
        rationale: "Sora is a modern geometric sans-serif with strong, confident forms. Its even stroke weights and open counters feel empowering and accessible.",
        weights: ["400 Regular", "500 Medium", "600 SemiBold", "700 Bold", "800 ExtraBold"],
      },
      {
        name: "Nunito Sans",
        role: "secondary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&display=swap",
        rationale: "Nunito Sans has rounded terminals that feel inclusive and welcoming — a warmth that complements Sora's structural confidence.",
        weights: ["300 Light", "400 Regular", "500 Medium", "600 SemiBold", "700 Bold"],
      },
    ],
    hope: [
      {
        name: "Plus Jakarta Sans",
        role: "primary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
        rationale: "Plus Jakarta Sans is a fresh, modern geometric with subtle warmth. Its optimistic character and excellent weight range make it versatile from headlines to UI.",
        weights: ["400 Regular", "500 Medium", "600 SemiBold", "700 Bold", "800 ExtraBold"],
      },
      {
        name: "Outfit",
        role: "secondary",
        googleFontsUrl: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap",
        rationale: "Outfit is a geometric sans-serif that's friendly and open. Its clean forms pair naturally with Plus Jakarta Sans for a cohesive, forward-looking system.",
        weights: ["300 Light", "400 Regular", "500 Medium", "600 SemiBold", "700 Bold"],
      },
    ],
  };

  return fontPairings[emotion] || fontPairings.trust;
}

function generateTypeScale(fonts: FontRecommendation[]): TypeScale[] {
  const primary = fonts.find((f) => f.role === "primary")!.name;
  const secondary = fonts.find((f) => f.role === "secondary")!.name;

  return [
    { level: "Display", font: primary, weight: "800", sizeDesktop: "56px", sizeMobile: "36px", lineHeight: "1.1", letterSpacing: "-0.02em" },
    { level: "Headline", font: primary, weight: "700", sizeDesktop: "40px", sizeMobile: "28px", lineHeight: "1.2", letterSpacing: "-0.01em" },
    { level: "Title 1", font: primary, weight: "700", sizeDesktop: "32px", sizeMobile: "24px", lineHeight: "1.25", letterSpacing: "-0.01em" },
    { level: "Title 2", font: primary, weight: "600", sizeDesktop: "24px", sizeMobile: "20px", lineHeight: "1.3", letterSpacing: "0" },
    { level: "Title 3", font: secondary, weight: "600", sizeDesktop: "20px", sizeMobile: "18px", lineHeight: "1.35", letterSpacing: "0" },
    { level: "Body", font: secondary, weight: "400", sizeDesktop: "16px", sizeMobile: "16px", lineHeight: "1.6", letterSpacing: "0" },
    { level: "Callout", font: secondary, weight: "500", sizeDesktop: "16px", sizeMobile: "16px", lineHeight: "1.5", letterSpacing: "0" },
    { level: "Subheadline", font: secondary, weight: "600", sizeDesktop: "14px", sizeMobile: "14px", lineHeight: "1.4", letterSpacing: "0.01em" },
    { level: "Footnote", font: secondary, weight: "400", sizeDesktop: "13px", sizeMobile: "13px", lineHeight: "1.4", letterSpacing: "0.01em" },
    { level: "Caption", font: secondary, weight: "400", sizeDesktop: "12px", sizeMobile: "12px", lineHeight: "1.4", letterSpacing: "0.02em" },
  ];
}

function generateSpecimens(primary: FontRecommendation, secondary: FontRecommendation, scale: TypeScale[]): string {
  const displayScale = scale.find((s) => s.level === "Display")!;
  const headlineScale = scale.find((s) => s.level === "Headline")!;
  const bodyScale = scale.find((s) => s.level === "Body")!;

  return `
    <div class="type-specimens">
      <div class="specimen" style="font-family: '${primary.name}', serif; font-size: ${displayScale.sizeDesktop}; font-weight: ${displayScale.weight}; line-height: ${displayScale.lineHeight}; letter-spacing: ${displayScale.letterSpacing};">
        Display — ${primary.name} ${displayScale.weight}
      </div>
      <div class="specimen" style="font-family: '${primary.name}', serif; font-size: ${headlineScale.sizeDesktop}; font-weight: ${headlineScale.weight}; line-height: ${headlineScale.lineHeight}; letter-spacing: ${headlineScale.letterSpacing};">
        Headline — ${primary.name} ${headlineScale.weight}
      </div>
      <div class="specimen" style="font-family: '${secondary.name}', sans-serif; font-size: ${bodyScale.sizeDesktop}; font-weight: ${bodyScale.weight}; line-height: ${bodyScale.lineHeight};">
        Body text — ${secondary.name} ${bodyScale.weight}. This is how paragraph copy looks in the brand system. It should be comfortable to read at length, with generous line height and clear letter spacing. The quick brown fox jumps over the lazy dog.
      </div>
    </div>
  `;
}
