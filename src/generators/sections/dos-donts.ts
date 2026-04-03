/**
 * Brand Do's and Don'ts section generator
 */

import type { BrandIdentityInput } from "../../types/index.js";

export function generateDosDontsSection(input: BrandIdentityInput): string {
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(input.client_type);
  const dos = getDos(input, isPolitical);
  const donts = getDonts(input, isPolitical);
  const checklist = getChecklist(isPolitical);

  const dosHtml = dos.map((d) => `
    <div class="do-item">
      <div class="do-icon">&#10003;</div>
      <div>
        <strong>${d.rule}</strong>
        <p>${d.description}</p>
      </div>
    </div>
  `).join("");

  const dontsHtml = donts.map((d) => `
    <div class="dont-item">
      <div class="dont-icon">&#10007;</div>
      <div>
        <strong>${d.rule}</strong>
        <p>${d.description}</p>
      </div>
    </div>
  `).join("");

  const checklistHtml = checklist.map((c) => `<li>${c}</li>`).join("");

  return `
    <section class="section" id="dos-donts">
      <h2>Brand Do's and Don'ts</h2>

      <div class="subsection">
        <h3>Do</h3>
        <div class="dos-list">${dosHtml}</div>
      </div>

      <div class="subsection">
        <h3>Don't</h3>
        <div class="donts-list">${dontsHtml}</div>
      </div>

      <div class="subsection">
        <h3>Consistency Checklist</h3>
        <p class="rationale">Before publishing any branded material, verify:</p>
        <ul class="checklist">${checklistHtml}</ul>
      </div>
    </section>
  `;
}

function getDos(input: BrandIdentityInput, isPolitical: boolean): { rule: string; description: string }[] {
  const items = [
    { rule: "Use the approved color palette consistently", description: "Every piece of collateral should be identifiable as " + input.client_name + " from the colors alone. Reference hex codes exactly — don't eyeball it." },
    { rule: "Maintain clear space around the logo", description: "The logo needs breathing room. Minimum clear space equals the height of the logo's smallest letter on all sides." },
    { rule: "Use the type scale as specified", description: "Display type for headlines, body type for paragraphs. Don't mix them up. The hierarchy exists for a reason." },
    { rule: "Write in the brand voice", description: "Direct, " + (input.brand_personality[0] || "confident") + ", " + (input.brand_personality[1] || "approachable") + ". Read your copy aloud — if it doesn't sound like a real person, rewrite it." },
    { rule: "Prioritize accessibility", description: "All text must meet WCAG AA contrast ratios. Use alt text for images. Ensure all interactive elements are keyboard-navigable." },
  ];

  if (isPolitical) {
    items.push({ rule: "Include required disclaimers", description: "'Paid for by' disclaimers must appear on all public-facing materials. Check local election law for specific requirements." });
  }

  return items;
}

function getDonts(input: BrandIdentityInput, isPolitical: boolean): { rule: string; description: string }[] {
  const items = [
    { rule: "Don't stretch, rotate, or distort the logo", description: "The logo must always appear in its original proportions. If it doesn't fit, use a different logo variant — don't force it." },
    { rule: "Don't use colors outside the approved palette", description: "No one-off blues, no 'close enough' reds. If you need a color that isn't in the palette, it probably means the layout needs rethinking." },
    { rule: "Don't set body text in the display typeface", description: "Display type is for headlines and large text only. It's not designed for readability at small sizes and will make paragraphs look unprofessional." },
    { rule: "Don't use the logo on busy backgrounds", description: "The logo needs contrast to be legible. If the background is complex, use a solid color block behind the logo or switch to the reversed version." },
    { rule: "Don't add drop shadows, gradients, or effects to brand elements", description: "The brand identity is designed to work without embellishment. Effects look dated and undermine the design's integrity." },
  ];

  if (isPolitical) {
    items.push(
      { rule: "Don't use the brand in ways that could be taken out of context", description: "Opposition research will screenshot everything. Every design should look professional and defensible in isolation." },
      { rule: "Don't use stock photos of other locations", description: "If the brand represents " + input.geography + ", the photography should show " + input.geography + ". Audiences spot fake locations instantly." }
    );
  }

  return items;
}

function getChecklist(isPolitical: boolean): string[] {
  const items = [
    "Logo is the correct variant for this context (full color, monochrome, or reversed)",
    "Colors match the approved hex codes exactly",
    "Typography uses the correct typeface and weight from the scale",
    "Clear space around the logo is maintained",
    "All text meets WCAG AA contrast ratio (4.5:1 for body, 3:1 for large text)",
    "Images follow the photography style guide",
    "Voice and tone match the brand guidelines for this channel",
    "All links work and point to the correct destinations",
    "Content has been proofread for spelling and grammar",
    "File is exported at the correct resolution for its medium (72 DPI screen, 300 DPI print)",
  ];

  if (isPolitical) {
    items.push(
      "Required legal disclaimers are present and correctly formatted",
      "Content has been reviewed for opposition vulnerability",
      "Bilingual requirements have been met (if applicable)"
    );
  }

  return items;
}
