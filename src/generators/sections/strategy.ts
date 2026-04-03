/**
 * Brand Strategy section generator
 * Produces: brand story, core values, positioning statement, brand personality
 */

import type { BrandIdentityInput } from "../../types/index.js";

export function generateStrategySection(input: BrandIdentityInput): string {
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(
    input.client_type
  );
  const personalityStr = input.brand_personality.join(", ");

  const brandStory = generateBrandStory(input, isPolitical);
  const values = generateCoreValues(input, isPolitical);
  const positioning = generatePositioning(input);
  const personality = generatePersonality(input);

  return `
    <section class="section" id="brand-strategy">
      <h2>Brand Strategy</h2>

      <div class="subsection">
        <h3>Brand Story</h3>
        ${brandStory}
      </div>

      <div class="subsection">
        <h3>Core Values</h3>
        ${values}
      </div>

      <div class="subsection">
        <h3>Positioning Statement</h3>
        ${positioning}
      </div>

      <div class="subsection">
        <h3>Brand Personality</h3>
        <p class="rationale"><strong>Personality traits:</strong> ${personalityStr}</p>
        ${personality}
      </div>
    </section>
  `;
}

function generateBrandStory(
  input: BrandIdentityInput,
  isPolitical: boolean
): string {
  const audienceLabel = input.target_audience;
  const geography = input.geography;

  if (isPolitical) {
    return `
      <div class="brand-story">
        <p><strong>The Challenge:</strong> In ${geography}, ${audienceLabel} face a landscape where their voices are often drowned out by political noise, special interests, and institutional inertia. The issues that matter most to everyday people — the ones that shape their families, livelihoods, and communities — deserve a champion who speaks plainly and acts decisively.</p>
        <p><strong>The Transformation:</strong> ${input.client_name} emerges as that champion. Born from the belief that ${input.description}, this ${input.client_type === "campaign" ? "campaign" : "organization"} brings a ${input.brand_personality[0] || "bold"}, ${input.brand_personality[1] || "authentic"} approach to the fight. Every policy position, every public statement, every piece of outreach is grounded in one conviction: the people of ${geography} deserve better, and they know it.</p>
        <p><strong>The Resolution:</strong> With a brand built on ${input.primary_emotion} and backed by genuine conviction, ${input.client_name} doesn't just ask for support — it earns it. The brand becomes synonymous with action, accountability, and a refusal to accept the status quo.${input.election_cycle ? ` In the ${input.election_cycle} cycle, this story culminates in a movement that turns belief into ballots.` : ""}</p>
      </div>
    `;
  }

  return `
    <div class="brand-story">
      <p><strong>The Challenge:</strong> In the ${input.geography} market, ${audienceLabel} are underserved by options that are either too generic to be useful or too complex to be accessible. The gap between what people need and what's available creates frustration, wasted time, and missed opportunities.</p>
      <p><strong>The Transformation:</strong> ${input.client_name} was founded on a simple premise: ${input.description}. By bringing a ${input.brand_personality[0] || "fresh"}, ${input.brand_personality[1] || "thoughtful"} perspective to the space, the brand redefines what ${audienceLabel} should expect. Every touchpoint is designed to feel ${input.brand_personality.slice(0, 3).join(", ")}.</p>
      <p><strong>The Resolution:</strong> ${input.client_name} becomes the brand that ${audienceLabel} trust instinctively — not because of marketing, but because of consistently delivered ${input.primary_emotion}. The brand story is written by the people it serves.</p>
    </div>
  `;
}

function generateCoreValues(
  input: BrandIdentityInput,
  isPolitical: boolean
): string {
  const valueMap: Record<string, { name: string; definition: string }[]> = {
    trust: [
      {
        name: "Transparency",
        definition:
          "We say what we mean and show our work. No hidden agendas, no fine print.",
      },
      {
        name: "Accountability",
        definition:
          "We own our commitments and measure ourselves by results, not promises.",
      },
      {
        name: "Integrity",
        definition:
          "We hold ourselves to the same standards we expect of others.",
      },
    ],
    excitement: [
      {
        name: "Boldness",
        definition:
          "We take decisive action and aren't afraid to challenge conventions.",
      },
      {
        name: "Innovation",
        definition:
          "We find new solutions to old problems and never settle for 'good enough.'",
      },
      {
        name: "Energy",
        definition:
          "We bring momentum and enthusiasm to everything we do.",
      },
    ],
    calm: [
      {
        name: "Clarity",
        definition:
          "We cut through noise to deliver simple, understandable solutions.",
      },
      {
        name: "Reliability",
        definition: "We show up consistently and deliver what we promise.",
      },
      {
        name: "Thoughtfulness",
        definition:
          "We consider impact before action and prioritize lasting value over quick wins.",
      },
    ],
    urgency: [
      {
        name: "Action",
        definition:
          "We don't wait for permission to make a difference. The time is now.",
      },
      {
        name: "Impact",
        definition:
          "Every effort must move the needle. We measure in outcomes, not activities.",
      },
      {
        name: "Resilience",
        definition:
          "We push through obstacles because the stakes are too high to stop.",
      },
    ],
    empowerment: [
      {
        name: "Agency",
        definition:
          "We give people the tools and confidence to shape their own future.",
      },
      {
        name: "Community",
        definition:
          "We're stronger together. Collective action drives lasting change.",
      },
      {
        name: "Accessibility",
        definition:
          "Everyone deserves a seat at the table, regardless of background or resources.",
      },
    ],
    hope: [
      {
        name: "Optimism",
        definition:
          "We believe a better future is possible and work every day to build it.",
      },
      {
        name: "Inclusion",
        definition:
          "The future belongs to everyone. We build with, not for.",
      },
      {
        name: "Vision",
        definition:
          "We look beyond today's challenges to the opportunities they contain.",
      },
    ],
  };

  const values = valueMap[input.primary_emotion] || valueMap.trust;

  if (isPolitical) {
    values.push({
      name: "Service",
      definition:
        "Public service is a privilege. Every decision is made in the interest of the people we serve.",
    });
  }

  const valuesHtml = values
    .map(
      (v) => `
    <div class="value-card">
      <h4>${v.name}</h4>
      <p>${v.definition}</p>
    </div>
  `
    )
    .join("");

  return `<div class="values-grid">${valuesHtml}</div>`;
}

function generatePositioning(input: BrandIdentityInput): string {
  const category =
    input.client_type === "campaign"
      ? "candidate"
      : input.client_type === "pac"
        ? "political organization"
        : input.client_type === "advocacy_org"
          ? "advocacy organization"
          : input.client_type === "nonprofit"
            ? "nonprofit"
            : input.client_type === "personal_brand"
              ? "leader"
              : "brand";

  const differentiator =
    input.brand_personality.length > 0
      ? `combines ${input.brand_personality[0]} authenticity with ${input.brand_personality[1] || "strategic"} precision`
      : "delivers on its promises with clarity and conviction";

  return `
    <div class="positioning-statement">
      <p class="positioning-formula">For <strong>${input.target_audience}</strong> in <strong>${input.geography}</strong>,</p>
      <p class="positioning-formula"><strong>${input.client_name}</strong> is the <strong>${category}</strong> that</p>
      <p class="positioning-formula"><strong>${differentiator}</strong></p>
      <p class="positioning-formula">because <strong>${input.description}</strong>.</p>
    </div>
    <p class="rationale"><strong>Strategic rationale:</strong> This positioning occupies the intersection of ${input.primary_emotion} and ${input.brand_personality[0] || "authenticity"}, a space that ${input.competitors ? `competitors like ${input.competitors} have not claimed` : "remains unoccupied in this market"}.</p>
  `;
}

function generatePersonality(input: BrandIdentityInput): string {
  const traits = input.brand_personality;
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(
    input.client_type
  );

  const personaAge = isPolitical ? "mid-40s" : "early 30s";
  const personaContext = isPolitical
    ? "town hall meeting"
    : "industry conference";

  return `
    <div class="personality-persona">
      <p><strong>If ${input.client_name} were a person:</strong></p>
      <p>They'd be in their ${personaAge} — experienced enough to be credible but energetic enough to feel fresh. At a ${personaContext}, they're the one people gravitate toward: ${traits[0] || "confident"} without being arrogant, ${traits[1] || "approachable"} without being shallow. They speak in complete sentences, make eye contact, and remember your name.</p>
      <p>Their wardrobe is ${traits[2] || "polished"} but never stuffy. They carry themselves with quiet ${input.primary_emotion === "urgency" ? "intensity" : input.primary_emotion === "excitement" ? "energy" : "confidence"}. When they make a promise, people believe them — not because of rhetoric, but because of track record.</p>
    </div>
  `;
}
