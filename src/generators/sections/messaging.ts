/**
 * Messaging Framework section generator
 * Produces: elevator pitch, boilerplate, tagline options, key messages, audience messaging
 */

import type { BrandIdentityInput, KeyMessage } from "../../types/index.js";

export function generateMessagingSection(input: BrandIdentityInput): string {
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(input.client_type);
  const elevatorPitch = generateElevatorPitch(input, isPolitical);
  const boilerplates = generateBoilerplates(input, isPolitical);
  const taglines = generateTaglines(input, isPolitical);
  const keyMessages = generateKeyMessages(input, isPolitical);

  const taglineHtml = taglines
    .map(
      (t, i) => `
    <div class="tagline-option">
      <h4>Option ${i + 1}: "${t.tagline}"</h4>
      <p class="rationale"><strong>Rationale:</strong> ${t.rationale}</p>
    </div>
  `
    )
    .join("");

  const messageHtml = keyMessages
    .map(
      (m) => `
    <div class="key-message">
      <h4>${m.pillar}</h4>
      <p><strong>Headline:</strong> ${m.headline}</p>
      <p><strong>Supporting point:</strong> ${m.supportingPoint}</p>
      <p><strong>Proof point:</strong> ${m.proofPoint}</p>
    </div>
  `
    )
    .join("");

  return `
    <section class="section" id="messaging">
      <h2>Messaging Framework</h2>

      <div class="subsection">
        <h3>Elevator Pitch</h3>
        <blockquote class="elevator-pitch">${elevatorPitch}</blockquote>
        <p class="rationale"><em>25 words or fewer. This is what anyone on the team should be able to say when asked "What is ${input.client_name}?"</em></p>
      </div>

      <div class="subsection">
        <h3>Boilerplate</h3>
        <div class="boilerplate">
          <h4>Short Version (50 words)</h4>
          <p>${boilerplates.short}</p>
        </div>
        <div class="boilerplate">
          <h4>Full Version (100 words)</h4>
          <p>${boilerplates.full}</p>
        </div>
      </div>

      <div class="subsection">
        <h3>Tagline Options</h3>
        <p class="rationale">Three directions, each rooted in the brand's core emotion of <strong>${input.primary_emotion}</strong>.</p>
        ${taglineHtml}
      </div>

      <div class="subsection">
        <h3>Key Messages</h3>
        <p class="rationale">These pillars form the backbone of all communications. Each can stand alone or combine with others.</p>
        ${messageHtml}
      </div>
    </section>
  `;
}

function generateElevatorPitch(input: BrandIdentityInput, isPolitical: boolean): string {
  if (isPolitical) {
    return `${input.client_name} is ${input.brand_personality[0] || "bold"}, ${input.brand_personality[1] || "principled"} leadership for ${input.geography} — putting ${input.target_audience} first with real solutions and genuine accountability.`;
  }
  return `${input.client_name} brings ${input.brand_personality[0] || "clear"}, ${input.brand_personality[1] || "thoughtful"} solutions to ${input.target_audience} in ${input.geography} — because ${input.description}.`;
}

function generateBoilerplates(input: BrandIdentityInput, isPolitical: boolean): { short: string; full: string } {
  if (isPolitical) {
    return {
      short: `${input.client_name} is a ${input.client_type === "campaign" ? "campaign" : "political organization"} dedicated to delivering ${input.brand_personality[0] || "real"} results for the people of ${input.geography}. With a focus on ${input.primary_emotion} and accountability, ${input.client_name} puts ${input.target_audience} at the center of every decision.`,
      full: `${input.client_name} is a ${input.client_type === "campaign" ? "campaign" : "political organization"} built on the belief that ${input.description}. Serving ${input.target_audience} across ${input.geography}, ${input.client_name} brings a ${input.brand_personality.slice(0, 3).join(", ")} approach to the issues that matter most. In a political landscape defined by noise and division, ${input.client_name} stands for clarity, action, and genuine accountability. Every policy position, public statement, and community engagement is grounded in a simple commitment: earn trust through results, not rhetoric.${input.election_cycle ? ` In the ${input.election_cycle} cycle, ${input.client_name} is building a movement that turns conviction into action at the ballot box.` : ""}`,
    };
  }

  return {
    short: `${input.client_name} delivers ${input.brand_personality[0] || "innovative"} solutions for ${input.target_audience} in ${input.geography}. Founded on the principle that ${input.description}, the brand brings ${input.primary_emotion} and clarity to everything it does.`,
    full: `${input.client_name} was founded on a simple idea: ${input.description}. Serving ${input.target_audience} across ${input.geography}, the brand has built a reputation for ${input.brand_personality.slice(0, 3).join(", ")} solutions that deliver measurable results. In a market crowded with options, ${input.client_name} stands apart by prioritizing ${input.primary_emotion} and genuine value. Whether through its products, services, or community engagement, ${input.client_name} is committed to setting a new standard — one built on accountability, not empty promises.`,
  };
}

function generateTaglines(input: BrandIdentityInput, isPolitical: boolean): { tagline: string; rationale: string }[] {
  const emotionTaglines: Record<string, { tagline: string; rationale: string }[]> = {
    trust: [
      { tagline: `Real Results for ${input.geography}.`, rationale: "Leads with credibility. 'Real' differentiates from opponents who overpromise. Simple, memorable, works at yard-sign scale." },
      { tagline: `Built on Trust. Driven by Action.`, rationale: "Two-part structure creates rhythm. Links the brand's emotional foundation (trust) with its operational promise (action)." },
      { tagline: `Your Future. Our Commitment.`, rationale: "Puts the audience first ('Your') and makes a personal promise. Works across all channels from social to signage." },
    ],
    excitement: [
      { tagline: `The Future Starts Here.`, rationale: "Forward-looking and energetic. Creates a sense of momentum and possibility. Geographic double meaning works for local brands." },
      { tagline: `Bold Moves. Real Change.`, rationale: "Pairs ambition with tangibility. The rhythm is punchy and memorable — works as a rally cry." },
      { tagline: `Ready for What's Next.`, rationale: "Positions the brand as forward-thinking without being vague. Invites the audience into the journey." },
    ],
    calm: [
      { tagline: `Steady Leadership. Clear Results.`, rationale: "Emphasizes reliability in a world of chaos. The parallel structure is easy to remember." },
      { tagline: `The Thoughtful Choice.`, rationale: "Appeals to deliberate decision-makers. Implies that choosing this brand is itself an act of wisdom." },
      { tagline: `Clarity in Every Decision.`, rationale: "Positions the brand as a antidote to complexity and noise. Works across touchpoints." },
    ],
    urgency: [
      { tagline: `Now Is the Time.`, rationale: "Creates immediacy without panic. Simple enough for yard signs, powerful enough for rally speeches." },
      { tagline: `Act Now. Change Everything.`, rationale: "Two imperatives that build momentum. The escalation from action to transformation is motivating." },
      { tagline: `Too Important to Wait.`, rationale: "Frames inaction as the risk. Empowers the audience to act by making the stakes clear." },
    ],
    empowerment: [
      { tagline: `Your Voice. Your Power.`, rationale: "Gives ownership to the audience. Parallel possessives create a sense of personal agency." },
      { tagline: `Together, We Build.`, rationale: "Collective action language that's inclusive without being vague. The 'build' verb implies tangible progress." },
      { tagline: `Strength in Numbers.`, rationale: "Classic community organizing frame. Works for coalitions, movements, and grassroots campaigns." },
    ],
    hope: [
      { tagline: `A Better Tomorrow, Built Today.`, rationale: "Bridges aspiration and action. The time contrast (tomorrow/today) creates urgency within optimism." },
      { tagline: `Believe in What's Possible.`, rationale: "Aspirational without being naive. Invites the audience to raise their expectations." },
      { tagline: `Hope in Action.`, rationale: "Transforms a feeling into a strategy. Three words that reframe optimism as a practical force." },
    ],
  };

  return emotionTaglines[input.primary_emotion] || emotionTaglines.trust;
}

function generateKeyMessages(input: BrandIdentityInput, isPolitical: boolean): KeyMessage[] {
  if (isPolitical) {
    return [
      {
        pillar: "Accountability",
        headline: `${input.client_name} delivers on promises — no excuses, no exceptions.`,
        supportingPoint: "Every commitment comes with a timeline and a metric. The people of " + input.geography + " deserve to know what they're getting and when.",
        proofPoint: "[Insert specific track record, voting history, or organizational milestone]",
      },
      {
        pillar: "Community First",
        headline: `Every decision starts with one question: how does this help ${input.target_audience}?`,
        supportingPoint: "Policy positions aren't developed in a vacuum — they come from listening to real people with real concerns in " + input.geography + ".",
        proofPoint: "[Insert community engagement data, town halls held, constituent meetings]",
      },
      {
        pillar: "Action Over Rhetoric",
        headline: `Results you can see. Progress you can measure.`,
        supportingPoint: "While others debate, " + input.client_name + " acts. The track record speaks louder than any campaign promise.",
        proofPoint: "[Insert tangible outcomes, legislation passed, initiatives launched]",
      },
    ];
  }

  return [
    {
      pillar: "Quality & Reliability",
      headline: `${input.client_name} — built to perform, designed to last.`,
      supportingPoint: `${input.target_audience} shouldn't have to choose between quality and accessibility. ${input.client_name} delivers both.`,
      proofPoint: "[Insert customer satisfaction data, quality metrics, or testimonials]",
    },
    {
      pillar: "Customer-Centric",
      headline: `We built this because you asked for it.`,
      supportingPoint: "Every feature, service, and decision is informed by what " + input.target_audience + " actually need — not what we think they want.",
      proofPoint: "[Insert user research data, feature request tracking, or co-creation stories]",
    },
    {
      pillar: "Innovation with Purpose",
      headline: `Smarter solutions for the problems that matter.`,
      supportingPoint: input.client_name + " doesn't innovate for its own sake. Every improvement is measured by its impact on the people it serves.",
      proofPoint: "[Insert product improvements, efficiency gains, or impact metrics]",
    },
  ];
}
