/**
 * Design Tokens section generator
 * JSON token structure for developer handoff
 */

import type { BrandIdentityInput } from "../../types/index.js";

export function generateTokensSection(input: BrandIdentityInput): string {
  const tokens = buildTokens(input);

  return `
    <section class="section" id="design-tokens">
      <h2>Design Tokens</h2>
      <p class="rationale">Design tokens are the atomic values of the design system — colors, spacing, typography, and effects stored as platform-agnostic key-value pairs. These can be consumed by CSS custom properties, Tailwind config, or any design tool.</p>

      <div class="subsection">
        <h3>Token Naming Convention</h3>
        <p>Tokens follow the pattern: <code>{category}-{property}-{variant}</code></p>
        <ul>
          <li><code>color-primary-500</code> — Color category, primary property, 500 shade</li>
          <li><code>space-4</code> — Spacing category, scale step 4</li>
          <li><code>font-size-body</code> — Font category, size property, body variant</li>
          <li><code>radius-md</code> — Border-radius category, medium variant</li>
        </ul>
      </div>

      <div class="subsection">
        <h3>Token Structure (JSON)</h3>
        <pre><code>${JSON.stringify(tokens, null, 2)}</code></pre>
      </div>

      <div class="subsection">
        <h3>CSS Custom Properties</h3>
        <p>For web implementations, tokens map directly to CSS custom properties:</p>
        <pre><code>${generateCssProperties(tokens)}</code></pre>
      </div>
    </section>
  `;
}

function buildTokens(input: BrandIdentityInput): Record<string, unknown> {
  // Use emotion-based defaults — these match the color palette generator
  const emotionColors: Record<string, Record<string, string>> = {
    trust: { primary: "#1B365D", "primary-light": "#4A6FA5", secondary: "#E8DCC8", accent: "#D4A843" },
    excitement: { primary: "#E63946", "primary-light": "#1D3557", secondary: "#F1FAEE", accent: "#F4A261" },
    calm: { primary: "#5F7161", "primary-light": "#3D5A3E", secondary: "#FAF3E8", accent: "#C07850" },
    urgency: { primary: "#C8102E", "primary-light": "#1A1A2E", secondary: "#E8E8E8", accent: "#F59E0B" },
    empowerment: { primary: "#6B21A8", "primary-light": "#4C1D95", secondary: "#EDE9FE", accent: "#F59E0B" },
    hope: { primary: "#2563EB", "primary-light": "#1E40AF", secondary: "#DBEAFE", accent: "#FBBF24" },
  };

  const colors = emotionColors[input.primary_emotion] || emotionColors.trust;

  return {
    color: {
      primary: { "500": colors.primary, "400": colors["primary-light"] },
      secondary: { "100": colors.secondary },
      accent: { "500": colors.accent },
      neutral: { "900": "#1a1a1a", "700": "#4a4a4a", "500": "#737373", "300": "#b3b3b3", "100": "#f5f5f5" },
      semantic: {
        success: "#27AE60",
        warning: "#F39C12",
        error: "#E74C3C",
        info: "#2980B9",
      },
    },
    typography: {
      "font-family": {
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
      },
      "font-size": {
        display: "3.5rem",
        headline: "2.5rem",
        "title-1": "2rem",
        "title-2": "1.5rem",
        "title-3": "1.25rem",
        body: "1rem",
        callout: "1rem",
        subheadline: "0.875rem",
        footnote: "0.8125rem",
        caption: "0.75rem",
      },
      "font-weight": {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      "line-height": {
        tight: "1.1",
        snug: "1.25",
        normal: "1.5",
        relaxed: "1.6",
        loose: "1.75",
      },
    },
    spacing: {
      "0.5": "0.25rem",
      "1": "0.5rem",
      "1.5": "0.75rem",
      "2": "1rem",
      "3": "1.5rem",
      "4": "2rem",
      "6": "3rem",
      "8": "4rem",
      "12": "6rem",
      "16": "8rem",
    },
    border: {
      radius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        full: "9999px",
      },
      width: {
        thin: "1px",
        medium: "1.5px",
        thick: "2px",
      },
    },
    shadow: {
      sm: "0 1px 2px rgba(0,0,0,0.05)",
      md: "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)",
      lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
      xl: "0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)",
    },
    motion: {
      duration: {
        instant: "50ms",
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
        "very-slow": "600ms",
      },
      easing: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
        "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  };
}

function generateCssProperties(tokens: Record<string, unknown>): string {
  const lines: string[] = [":root {"];

  function flatten(obj: unknown, prefix: string): void {
    if (typeof obj === "string") {
      lines.push(`  --${prefix}: ${obj};`);
    } else if (typeof obj === "object" && obj !== null) {
      for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
        flatten(value, prefix ? `${prefix}-${key}` : key);
      }
    }
  }

  for (const [category, value] of Object.entries(tokens)) {
    flatten(value, category);
  }

  lines.push("}");
  return lines.join("\n");
}
