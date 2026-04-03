/**
 * Voice & Tone section generator
 * Produces: voice attributes matrix, tone variations by context, vocabulary guidance
 */

import type { BrandIdentityInput, VoiceAttribute, ToneVariation } from "../../types/index.js";

export function generateVoiceToneSection(input: BrandIdentityInput): string {
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(input.client_type);
  const attributes = generateVoiceAttributes(input);
  const toneVariations = generateToneVariations(input, isPolitical);
  const vocabulary = generateVocabulary(input, isPolitical);

  const attributeRows = attributes
    .map(
      (a) => `
    <tr>
      <td><strong>${a.attribute}</strong></td>
      <td>${a.doThis}</td>
      <td>${a.dontDoThis}</td>
      <td><em>"${a.example}"</em></td>
    </tr>
  `
    )
    .join("");

  const toneRows = toneVariations
    .map(
      (t) => `
    <tr>
      <td><strong>${t.context}</strong></td>
      <td>${t.toneAdjustment}</td>
      <td><em>"${t.example}"</em></td>
    </tr>
  `
    )
    .join("");

  return `
    <section class="section" id="voice-tone">
      <h2>Voice & Tone</h2>

      <div class="subsection">
        <h3>Voice Attributes</h3>
        <p class="rationale">These attributes define how ${input.client_name} sounds in every communication. Voice is consistent; tone adapts to context.</p>
        <table class="brand-table">
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Do This</th>
              <th>Don't Do This</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            ${attributeRows}
          </tbody>
        </table>
      </div>

      <div class="subsection">
        <h3>Tone by Context</h3>
        <p class="rationale">The voice stays the same. The tone adjusts based on the situation and channel.</p>
        <table class="brand-table">
          <thead>
            <tr>
              <th>Context</th>
              <th>Tone Adjustment</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            ${toneRows}
          </tbody>
        </table>
      </div>

      <div class="subsection">
        <h3>Vocabulary Guidance</h3>
        ${vocabulary}
      </div>
    </section>
  `;
}

function generateVoiceAttributes(input: BrandIdentityInput): VoiceAttribute[] {
  const personality = input.brand_personality;
  const emotion = input.primary_emotion;

  const baseAttributes: VoiceAttribute[] = [
    {
      attribute: "Direct",
      doThis: "Lead with the point. Use short, active sentences. Say what you mean.",
      dontDoThis: "Bury the message in qualifiers, jargon, or passive voice.",
      example: "We're building a better future for ${input.geography}.",
    },
    {
      attribute: personality[0] ? capitalize(personality[0]) : "Confident",
      doThis: `Speak with conviction. Use definitive language. Show, don't hedge.`,
      dontDoThis: `Use weak qualifiers ('maybe', 'sort of', 'we think'). Don't apologize for having a position.`,
      example: `${input.client_name} delivers results — not excuses.`,
    },
    {
      attribute: personality[1] ? capitalize(personality[1]) : "Approachable",
      doThis: "Write like you talk. Use contractions. Address people directly.",
      dontDoThis: "Sound robotic, corporate, or condescending. Don't talk at people — talk with them.",
      example: "Here's what this means for you and your family.",
    },
  ];

  if (emotion === "trust" || emotion === "calm") {
    baseAttributes.push({
      attribute: "Steady",
      doThis: "Present facts clearly. Acknowledge complexity without creating confusion.",
      dontDoThis: "Use alarmist language, ALL CAPS, or excessive exclamation marks.",
      example: "The data is clear. Here's what we're doing about it.",
    });
  } else if (emotion === "urgency" || emotion === "empowerment") {
    baseAttributes.push({
      attribute: "Activating",
      doThis: "Create momentum. Use action verbs. Make the next step clear and easy.",
      dontDoThis: "Demand or guilt-trip. Don't create panic — create purpose.",
      example: "Your voice matters. Add it now — it takes 30 seconds.",
    });
  }

  return baseAttributes;
}

function generateToneVariations(input: BrandIdentityInput, isPolitical: boolean): ToneVariation[] {
  const variations: ToneVariation[] = [
    {
      context: "Social Media",
      toneAdjustment: "Warmer and more conversational. Shorter sentences. Emoji used sparingly.",
      example: "Big news for ${input.geography}. Here's what's happening and why it matters.",
    },
    {
      context: "Email / Newsletter",
      toneAdjustment: "Personal and direct. Write as one human to another. Use 'you' more than 'we.'",
      example: "You've probably heard about [issue]. Let me tell you what we're doing about it.",
    },
    {
      context: "Press / Media",
      toneAdjustment: "More formal but still clear. Lead with facts. Keep opinions attributed.",
      example: "${input.client_name} today announced a new initiative aimed at [outcome].",
    },
    {
      context: "Website / Landing Pages",
      toneAdjustment: "Scannable and benefit-focused. Headlines carry the story. Body text adds depth.",
      example: "Real solutions. Real results. See what ${input.client_name} is doing for ${input.geography}.",
    },
  ];

  if (isPolitical) {
    variations.push(
      {
        context: "Fundraising Appeal",
        toneAdjustment: "Urgent but respectful. Emphasize stakes and shared purpose. Never guilt-trip.",
        example: "This race is closer than anyone expected. Your $25 today helps us reach 5,000 more voters.",
      },
      {
        context: "Voter Outreach",
        toneAdjustment: "Friendly and empowering. Make voting feel easy and important, not like homework.",
        example: "Your polling place is [location]. Doors open at 7am. Your voice, your vote.",
      },
      {
        context: "Opposition Response",
        toneAdjustment: "Firm and factual. Correct the record without mirroring the attacker's tone.",
        example: "The facts tell a different story. Here's the record.",
      },
      {
        context: "Crisis / Difficult News",
        toneAdjustment: "Lead with empathy, follow with action. Acknowledge pain before presenting plans.",
        example: "This isn't the outcome anyone wanted. Here's what we're doing next.",
      }
    );
  } else {
    variations.push(
      {
        context: "Customer Support",
        toneAdjustment: "Empathetic and solution-focused. Acknowledge the problem before jumping to fixes.",
        example: "That's frustrating — let's get this sorted out. Here's what I recommend.",
      },
      {
        context: "Product Announcements",
        toneAdjustment: "Enthusiastic but grounded. Lead with the benefit, not the feature.",
        example: "Starting today, [benefit]. We built this because you asked for it.",
      }
    );
  }

  return variations;
}

function generateVocabulary(input: BrandIdentityInput, isPolitical: boolean): string {
  let preferred: string[];
  let avoid: string[];

  if (isPolitical) {
    preferred = [
      "community", "neighbors", "families", "working people",
      "accountability", "transparency", "action", "results",
      "your voice", "our future", "common sense", "real solutions",
    ];
    avoid = [
      "stakeholders", "constituents (use 'neighbors' or 'people')",
      "leverage", "synergy", "pivot", "disruption",
      "fight/war/battle (use 'work for', 'stand up for')",
      "radical/extreme (about opponents — use 'out of touch')",
    ];
  } else {
    preferred = [
      "people (not 'users')", "build", "simple", "clear",
      "together", "real", "works", "better",
      "you/your", "today", "here's how",
    ];
    avoid = [
      "synergy", "leverage", "disrupt", "paradigm",
      "utilize (use 'use')", "facilitate (use 'help')",
      "best-in-class", "cutting-edge", "world-class",
      "circle back", "move the needle",
    ];
  }

  const preferredList = preferred.map((w) => `<li>${w}</li>`).join("");
  const avoidList = avoid.map((w) => `<li>${w}</li>`).join("");

  return `
    <div class="vocabulary-grid">
      <div class="vocab-column preferred">
        <h4>Preferred Words</h4>
        <ul>${preferredList}</ul>
      </div>
      <div class="vocab-column avoid">
        <h4>Words to Avoid</h4>
        <ul>${avoidList}</ul>
      </div>
    </div>
  `;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
