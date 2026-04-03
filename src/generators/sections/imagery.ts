/**
 * Imagery Direction section generator
 */

import type { BrandIdentityInput } from "../../types/index.js";

export function generateImagerySection(input: BrandIdentityInput): string {
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(input.client_type);
  const emotion = input.primary_emotion;

  const photoStyle = getPhotoStyle(emotion, isPolitical, input);
  const iconStyle = getIconStyle(emotion);
  const illustrationStyle = getIllustrationStyle(emotion);
  const antiPatterns = getAntiPatterns(isPolitical);

  return `
    <section class="section" id="imagery">
      <h2>Imagery Direction</h2>

      <div class="subsection">
        <h3>Photography Style</h3>
        <p class="rationale">${photoStyle.rationale}</p>
        <table class="brand-table">
          <thead><tr><th>Aspect</th><th>Direction</th></tr></thead>
          <tbody>
            <tr><td><strong>Mood</strong></td><td>${photoStyle.mood}</td></tr>
            <tr><td><strong>Lighting</strong></td><td>${photoStyle.lighting}</td></tr>
            <tr><td><strong>Subjects</strong></td><td>${photoStyle.subjects}</td></tr>
            <tr><td><strong>Composition</strong></td><td>${photoStyle.composition}</td></tr>
            <tr><td><strong>Color Treatment</strong></td><td>${photoStyle.colorTreatment}</td></tr>
          </tbody>
        </table>
      </div>

      <div class="subsection">
        <h3>Iconography</h3>
        <table class="brand-table">
          <thead><tr><th>Property</th><th>Specification</th></tr></thead>
          <tbody>
            <tr><td><strong>Style</strong></td><td>${iconStyle.style}</td></tr>
            <tr><td><strong>Line Weight</strong></td><td>${iconStyle.lineWeight}</td></tr>
            <tr><td><strong>Corner Radius</strong></td><td>${iconStyle.cornerRadius}</td></tr>
            <tr><td><strong>Fill Rules</strong></td><td>${iconStyle.fillRules}</td></tr>
            <tr><td><strong>Grid</strong></td><td>${iconStyle.grid}</td></tr>
          </tbody>
        </table>
      </div>

      <div class="subsection">
        <h3>Illustration Style</h3>
        <p>${illustrationStyle}</p>
      </div>

      <div class="subsection">
        <h3>What to Avoid</h3>
        <ul>
          ${antiPatterns.map((a) => `<li>${a}</li>`).join("")}
        </ul>
      </div>
    </section>
  `;
}

function getPhotoStyle(emotion: string, isPolitical: boolean, input: BrandIdentityInput) {
  const base = {
    trust: {
      rationale: "Photography should feel authentic and grounded. Real people in real situations, never staged or stock-looking.",
      mood: "Warm, steady, genuine. Convey reliability and human connection.",
      lighting: "Natural light preferred. Soft, even illumination. Avoid harsh shadows or dramatic contrast.",
      subjects: isPolitical
        ? `Real people from ${input.geography} — diverse, multi-generational, engaged in community life. Show the candidate/leaders in authentic settings (town halls, local businesses, community events), not behind podiums.`
        : `Real customers and team members. Candid moments over posed shots. Show the product/service in context of daily life.`,
      composition: "Rule of thirds. Generous negative space for text overlay. Subjects at eye level — never shot from above (condescending) or below (intimidating).",
      colorTreatment: "Slightly warm color grade. Desaturate by 10-15% for a documentary feel. Never over-processed or filtered.",
    },
    excitement: {
      rationale: "Photography should feel dynamic and alive. Movement, energy, real moments of joy and determination.",
      mood: "Energetic, vibrant, forward-moving. Capture momentum.",
      lighting: "Bold, directional light. Golden hour preferred. Some contrast is welcome — it adds drama.",
      subjects: isPolitical
        ? `Large crowds, rally moments, people in motion. Show scale and energy. Mix wide shots (crowd) with tight shots (faces showing emotion).`
        : `People actively using the product/service. Movement and action over stillness. Capture genuine reactions and celebrations.`,
      composition: "Dynamic angles and diagonal lines. Tight crops for intensity. Wide shots for scale. Movement blur is acceptable.",
      colorTreatment: "Punchy, saturated. Lean into the brand's primary colors in post-production. High contrast, vivid tones.",
    },
    calm: {
      rationale: "Photography should feel peaceful, intentional, and natural. Think editorial, not advertising.",
      mood: "Serene, considered, quietly confident. No rush.",
      lighting: "Soft, diffused natural light. Overcast or window light. Gentle shadows.",
      subjects: isPolitical
        ? `Small group conversations, one-on-one moments, peaceful community scenes. Show listening as much as speaking.`
        : `Moments of reflection and satisfaction. Products in calm, organized environments. People at ease.`,
      composition: "Centered or symmetrical compositions. Lots of breathing room. Minimal clutter.",
      colorTreatment: "Muted, desaturated. Warm undertones. Soft contrast. Think film photography, not digital.",
    },
    urgency: {
      rationale: "Photography should feel immediate and consequential. Real stakes, real people, real moments.",
      mood: "Intense, focused, purposeful. Not angry — determined.",
      lighting: "High contrast. Directional light. Shadows are welcome — they add weight.",
      subjects: isPolitical
        ? `Close-up faces showing determination. Hands (working, reaching, voting). Documents and data visualizations. Scenes that show stakes.`
        : `Before/after situations. People in the moment of decision. Close-ups that show focus and intent.`,
      composition: "Tight framing. Get close. Cut unnecessary context. The subject fills the frame.",
      colorTreatment: "Desaturated with selective color pops. High contrast. Lean cool unless showing warmth intentionally.",
    },
    empowerment: {
      rationale: "Photography should make people feel powerful. Low angles, open spaces, subjects in command.",
      mood: "Confident, inclusive, uplifting. People owning their space.",
      lighting: "Bright and open. Backlighting and rim light create halos of strength. Avoid flat lighting.",
      subjects: isPolitical
        ? `Diverse groups taking action. Community organizers, volunteers, voters. Show agency — people doing things, not waiting.`
        : `People achieving, building, creating. Show competence and confidence. Diverse representation is essential, not optional.`,
      composition: "Low angles that elevate subjects. Wide shots showing people in expansive environments. Avoid looking down at subjects.",
      colorTreatment: "Rich and warm. Slightly elevated saturation. Golden tones. Make skin tones glow.",
    },
    hope: {
      rationale: "Photography should feel like a breath of fresh air. Open skies, bright horizons, forward-facing subjects.",
      mood: "Optimistic, warm, open. The visual equivalent of a deep breath.",
      lighting: "Golden hour and blue hour. Warm rim lights. Lens flares are acceptable when natural. Bright, airy.",
      subjects: isPolitical
        ? `Children, families, sunrise/sunset over ${input.geography}. Forward-looking poses. Open landscapes. New beginnings.`
        : `People looking forward (literally). Open spaces. New beginnings — unpacking, first uses, discoveries. Natural environments.`,
      composition: "Horizon lines in lower third (more sky, more possibility). Subjects facing into open space, not walls.",
      colorTreatment: "Warm, bright, slightly lifted shadows. Soft contrast. Pastel-leaning color grade. Never dark or moody.",
    },
  };

  return base[emotion as keyof typeof base] || base.trust;
}

function getIconStyle(emotion: string) {
  const styles: Record<string, { style: string; lineWeight: string; cornerRadius: string; fillRules: string; grid: string }> = {
    trust: { style: "Outlined, clean, professional", lineWeight: "1.5px stroke at 24px icon size. Scale proportionally.", cornerRadius: "2px — subtle rounding, not sharp, not soft", fillRules: "Outline only for primary. Filled variant for selected/active states.", grid: "24px base grid, 2px padding from edges" },
    excitement: { style: "Filled with occasional outline accents. Bold and geometric.", lineWeight: "2px stroke when outlined. Fill preferred.", cornerRadius: "4px — noticeable rounding for friendliness", fillRules: "Filled by default. Use two-tone for complex icons.", grid: "24px base grid, 2px padding" },
    calm: { style: "Thin outlined, minimal, elegant", lineWeight: "1px stroke at 24px — delicate but visible", cornerRadius: "0px — clean, precise corners", fillRules: "Outline only. Never filled. Simplicity is the point.", grid: "24px base grid, 3px padding for extra breathing room" },
    urgency: { style: "Bold filled, high contrast", lineWeight: "2px stroke when outlined. Fill preferred.", cornerRadius: "0px — sharp, no-nonsense", fillRules: "Filled and bold. Duotone for secondary states.", grid: "24px base grid, 1px padding — icons fill their space" },
    empowerment: { style: "Outlined with rounded joins, warm and accessible", lineWeight: "1.5px stroke. Consistent across the set.", cornerRadius: "4px — rounded for approachability", fillRules: "Outline default. Filled for active/selected states.", grid: "24px base grid, 2px padding" },
    hope: { style: "Duotone — primary color with lighter tint fill", lineWeight: "1.5px stroke with light fill", cornerRadius: "6px — fully rounded, soft, friendly", fillRules: "Duotone: outlined with 20% opacity fill. Creates depth without heaviness.", grid: "24px base grid, 2px padding" },
  };
  return styles[emotion] || styles.trust;
}

function getIllustrationStyle(emotion: string): string {
  const styles: Record<string, string> = {
    trust: "If illustrations are used, they should be clean and informational — closer to infographics than art. Flat design with brand colors. No gradients, no 3D, no cartoon characters. Think diagrams, maps, and data visualizations with personality.",
    excitement: "Bold, geometric illustrations with dynamic composition. Limited palette (3-4 brand colors max). Abstract shapes and patterns welcome. Think concert poster meets infographic. Movement and energy in every piece.",
    calm: "Minimal line illustrations with a single brand color plus neutrals. Thin strokes, lots of white space. Organic, flowing forms — plants, landscapes, gentle curves. Think botanical illustration meets modern design.",
    urgency: "Bold, high-contrast graphics. Limited color palette — red/black/white. Clean geometric shapes. Arrows and directional elements. Think propaganda poster meets modern design (in terms of impact, not ideology).",
    empowerment: "Warm, inclusive illustrations showing diverse people in active poses. Flat design with brand colors. Slightly rounded forms for approachability. Show groups, collaboration, building things together.",
    hope: "Bright, airy illustrations with soft gradients and warm light effects. Open spaces and horizon lines. Figures looking up or forward. Watercolor-inspired textures acceptable. Think picture book optimism meets sophisticated design.",
  };
  return styles[emotion] || styles.trust;
}

function getAntiPatterns(isPolitical: boolean): string[] {
  const common = [
    "Stock photos that look like stock photos — obvious poses, forced diversity, fake environments",
    "Clip art, generic icons from free icon packs, or mismatched icon styles",
    "Low-resolution or pixelated images in any context",
    "Images with visible watermarks or third-party branding",
    "Over-filtered or heavily processed photos (Instagram filters, HDR abuse)",
    "Images that are so dark or low-contrast that details are lost",
  ];

  if (isPolitical) {
    common.push(
      "Podium-only photography — show the candidate with people, not above them",
      "Flags used as wallpaper or background texture (feels performative)",
      "Military/law enforcement imagery unless directly relevant to policy",
      "Images that could be perceived as exclusionary to any community"
    );
  }

  return common;
}
