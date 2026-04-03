/**
 * Design Patterns section generator
 * Page templates, user flows, feedback patterns
 */

import type { BrandIdentityInput } from "../../types/index.js";

export function generatePatternsSection(input: BrandIdentityInput): string {
  const isPolitical = ["campaign", "pac", "advocacy_org"].includes(input.client_type);

  return `
    <section class="section" id="patterns">
      <h2>Design Patterns</h2>
      <p class="rationale">Reusable patterns for common page types and user interactions. These combine components into higher-order templates.</p>

      <div class="subsection">
        <h3>Page Templates</h3>
        ${generatePageTemplates(input, isPolitical)}
      </div>

      <div class="subsection">
        <h3>User Flows</h3>
        ${generateUserFlows(isPolitical)}
      </div>

      <div class="subsection">
        <h3>Feedback Patterns</h3>
        ${generateFeedbackPatterns()}
      </div>

      <div class="subsection">
        <h3>Empty States</h3>
        ${generateEmptyStates()}
      </div>
    </section>
  `;
}

function generatePageTemplates(input: BrandIdentityInput, isPolitical: boolean): string {
  const templates = [
    {
      name: "Landing Page",
      wireframe: "Hero (full-width, headline + CTA) → Value props (3-column grid) → Social proof (testimonials/logos) → Feature detail (alternating image/text) → Final CTA (full-width)",
      notes: "Hero headline uses Display type. CTA button is primary accent color. Above-the-fold content should communicate the core value proposition in under 5 seconds.",
    },
    {
      name: "Dashboard",
      wireframe: "Sidebar nav (left) → Top bar (breadcrumbs + user menu) → Stat cards row → Primary content area (charts/tables) → Activity feed (right panel, optional)",
      notes: "Use the card component for all data containers. Stats use the Stat/Metric component. Charts use brand colors in the defined sequence.",
    },
    {
      name: "Settings / Profile",
      wireframe: "Left nav (settings categories) → Content area (form sections with headers) → Save bar (sticky bottom)",
      notes: "Group related settings under clear headings. Use toggle switches for boolean settings. Save button becomes active only when changes are detected.",
    },
  ];

  if (isPolitical) {
    templates.push(
      {
        name: "Donation Page",
        wireframe: "Hero (emotional headline + progress bar) → Donation amount selector (preset amounts + custom) → Donor info form → Payment → Thank you / share",
        notes: "Amount buttons use primary accent. Progress bar shows goal completion. Form must be as short as possible — name, email, payment only. Add recurring option as a toggle.",
      },
      {
        name: "Issue Page",
        wireframe: "Hero (issue headline + hero image) → Problem statement → Position/solution → Evidence/data → CTA (take action / share / donate)",
        notes: "Structure mirrors the brand story: challenge → transformation → resolution. Use pull quotes for key statements. Keep paragraphs to 3 sentences max.",
      }
    );
  }

  return templates
    .map(
      (t) => `
    <div class="pattern-card">
      <h4>${t.name}</h4>
      <div class="wireframe-description"><strong>Layout:</strong> ${t.wireframe}</div>
      <p class="rationale">${t.notes}</p>
    </div>
  `
    )
    .join("");
}

function generateUserFlows(isPolitical: boolean): string {
  const flows = [
    {
      name: "Onboarding",
      steps: "Welcome screen → Account creation (email/social) → Profile setup (progressive, 2-3 steps max) → Dashboard with guided tour overlay",
      notes: "Each step should have a progress indicator. Allow skipping non-essential steps. First screen after onboarding should demonstrate immediate value.",
    },
    {
      name: "Authentication",
      steps: "Login form (email + password) → Optional 2FA → Success redirect. Password reset: email input → confirmation → reset link → new password form",
      notes: "Show password toggle on all password fields. Clear error messages ('Wrong password' not 'Authentication failed'). Remember me checkbox.",
    },
    {
      name: "Search & Filter",
      steps: "Search input (prominent) → Results list (with result count) → Filter sidebar/panel → Sort controls → Pagination or infinite scroll",
      notes: "Show result count immediately. Filters update results without page reload. Active filters shown as removable chips/tags above results.",
    },
  ];

  if (isPolitical) {
    flows.push({
      name: "Take Action (Advocacy)",
      steps: "Landing page (issue context) → Pre-filled message to official → Review/edit message → Submit → Confirmation + share prompt",
      notes: "Pre-fill as much as possible. Let users edit the message to feel ownership. Confirmation should include specific next actions (share, donate, attend event).",
    });
  }

  return flows
    .map(
      (f) => `
    <div class="pattern-card">
      <h4>${f.name}</h4>
      <div class="flow-steps"><strong>Flow:</strong> ${f.steps}</div>
      <p class="rationale">${f.notes}</p>
    </div>
  `
    )
    .join("");
}

function generateFeedbackPatterns(): string {
  const patterns = [
    { state: "Success", pattern: "Green alert banner or toast notification. Checkmark icon. Auto-dismiss after 5 seconds. Message confirms the specific action taken ('Email sent to 3 recipients').", color: "Semantic success color" },
    { state: "Error", pattern: "Red alert banner (persistent, not auto-dismiss). X icon. Specific error message with suggested fix ('Card declined. Try a different payment method.'). Inline field errors highlighted in red.", color: "Semantic error color" },
    { state: "Loading", pattern: "Skeleton screens for initial page loads. Spinner for actions (button loading state). Progress bar for multi-step processes with known duration. Never show a blank page.", color: "Neutral with shimmer animation" },
    { state: "Empty", pattern: "Illustration or icon + friendly headline + description + primary CTA. Example: 'No results found. Try broadening your search or check the filters.'", color: "Neutral with accent CTA" },
  ];

  return `
    <table class="brand-table">
      <thead><tr><th>State</th><th>Pattern</th><th>Color</th></tr></thead>
      <tbody>
        ${patterns.map((p) => `<tr><td><strong>${p.state}</strong></td><td>${p.pattern}</td><td>${p.color}</td></tr>`).join("")}
      </tbody>
    </table>
  `;
}

function generateEmptyStates(): string {
  return `
    <p>Every empty state should include three elements:</p>
    <ol>
      <li><strong>Visual:</strong> A simple illustration or icon that relates to the content type (not a generic "nothing here" image)</li>
      <li><strong>Message:</strong> A friendly, specific headline ("No campaigns yet") + helpful description ("Create your first campaign to start reaching voters")</li>
      <li><strong>Action:</strong> A primary CTA button that resolves the empty state ("Create Campaign")</li>
    </ol>
    <p class="rationale">Empty states are onboarding opportunities. They should guide users toward value, not dead-end them.</p>
  `;
}
