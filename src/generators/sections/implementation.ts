/**
 * Implementation Guide section generator
 * Design principles, developer docs, do's and don'ts
 */

import type { BrandIdentityInput } from "../../types/index.js";

export function generateImplementationSection(input: BrandIdentityInput): string {
  return `
    <section class="section" id="implementation">
      <h2>Implementation Guide</h2>

      <div class="subsection">
        <h3>Design Principles</h3>
        ${generateDesignPrinciples(input)}
      </div>

      <div class="subsection">
        <h3>Developer Guidelines</h3>
        ${generateDevGuidelines()}
      </div>

      <div class="subsection">
        <h3>Implementation Do's and Don'ts</h3>
        ${generateImplDosDonts()}
      </div>
    </section>
  `;
}

function generateDesignPrinciples(input: BrandIdentityInput): string {
  const personality = input.brand_personality;

  const principles = [
    {
      name: "Clarity Over Cleverness",
      description: "Every design decision should make things clearer, not just more interesting. If a user has to think about how something works, simplify it. The brand's visual identity should enhance comprehension, not compete with content.",
      example: "Use the type hierarchy (Display → Headline → Body) consistently. Don't get creative with size relationships mid-page — let the system do its job.",
    },
    {
      name: "Consistency Builds Trust",
      description: `${input.client_name}'s brand feels ${personality[0] || "trustworthy"} because every touchpoint follows the same rules. Consistency isn't boring — it's the foundation of recognition. Every time someone sees the brand, they should instantly know it.`,
      example: "The same button style, the same color meaning, the same spacing rhythm — everywhere. A user who learns the pattern on one page should never be surprised on another.",
    },
    {
      name: "Accessibility Is Non-Negotiable",
      description: "Accessibility isn't a feature — it's a baseline. Every color combination meets WCAG AA. Every interactive element is keyboard-navigable. Every image has alt text. Designing for accessibility makes the experience better for everyone.",
      example: "If a color combination doesn't meet 4.5:1 contrast ratio, change the color — don't add a fallback pattern. Build accessible from the start, not as an afterthought.",
    },
  ];

  return principles
    .map(
      (p) => `
    <div class="principle-card">
      <h4>${p.name}</h4>
      <p>${p.description}</p>
      <p class="rationale"><strong>Example:</strong> ${p.example}</p>
    </div>
  `
    )
    .join("");
}

function generateDevGuidelines(): string {
  return `
    <div class="dev-guidelines">
      <h4>Token Usage</h4>
      <ul>
        <li>Always use design tokens instead of hardcoded values. <code>var(--color-primary-500)</code> not <code>#1B365D</code>.</li>
        <li>When the design changes, tokens change in one place and propagate everywhere.</li>
        <li>If you need a value that doesn't exist as a token, discuss with the design team before adding it.</li>
      </ul>

      <h4>Component Architecture</h4>
      <ul>
        <li>Components are self-contained. They bring their own styles and manage their own state.</li>
        <li>Variants use props, not CSS overrides. <code>&lt;Button variant="secondary"&gt;</code> not <code>&lt;Button className="secondary-override"&gt;</code>.</li>
        <li>All interactive components must support keyboard navigation and screen readers.</li>
      </ul>

      <h4>Responsive Approach</h4>
      <ul>
        <li>Mobile-first CSS: start with mobile styles, add complexity at larger breakpoints.</li>
        <li>Use the spacing scale for all margins and padding. No magic numbers.</li>
        <li>Test at every breakpoint, not just desktop and mobile. Tablet is where most layouts break.</li>
      </ul>

      <h4>Animation & Motion</h4>
      <ul>
        <li>Respect <code>prefers-reduced-motion</code>. Disable all non-essential animation when set.</li>
        <li>Use motion tokens for consistent timing. <code>var(--motion-duration-normal)</code> for standard transitions.</li>
        <li>Animation should provide feedback, not decoration. Loading spinners yes, parallax scrolling no.</li>
      </ul>

      <h4>Performance</h4>
      <ul>
        <li>Load Google Fonts with <code>display=swap</code> to prevent FOIT.</li>
        <li>Use system font stack as fallback: <code>-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif</code>.</li>
        <li>Lazy-load images below the fold. Use responsive <code>srcset</code> for all images.</li>
      </ul>
    </div>
  `;
}

function generateImplDosDonts(): string {
  const items = [
    { type: "do", text: "Use CSS custom properties for all token values" },
    { type: "dont", text: "Hardcode hex colors or pixel values in component styles" },
    { type: "do", text: "Build components with keyboard navigation from the start" },
    { type: "dont", text: "Add aria attributes as an afterthought — plan them during component design" },
    { type: "do", text: "Use semantic HTML elements (button, nav, main, aside)" },
    { type: "dont", text: "Use divs with onClick handlers instead of actual buttons" },
    { type: "do", text: "Test components in isolation before integrating into pages" },
    { type: "dont", text: "Build page-specific components — make them reusable from day one" },
    { type: "do", text: "Follow the spacing scale for all layout decisions" },
    { type: "dont", text: "Add arbitrary padding/margin values to make things 'look right'" },
  ];

  const dosHtml = items
    .filter((i) => i.type === "do")
    .map((i) => `<li class="impl-do">${i.text}</li>`)
    .join("");

  const dontsHtml = items
    .filter((i) => i.type === "dont")
    .map((i) => `<li class="impl-dont">${i.text}</li>`)
    .join("");

  return `
    <div class="impl-grid">
      <div>
        <h4>Do</h4>
        <ul>${dosHtml}</ul>
      </div>
      <div>
        <h4>Don't</h4>
        <ul>${dontsHtml}</ul>
      </div>
    </div>
  `;
}
