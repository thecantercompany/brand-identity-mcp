/**
 * Design System Foundations section generator
 * Spacing, layout grid, breakpoints
 */

import type { BrandIdentityInput } from "../../types/index.js";

export function generateFoundationsSection(input: BrandIdentityInput): string {
  return `
    <section class="section" id="foundations">
      <h2>Design System Foundations</h2>
      <p class="rationale">These foundations ensure visual consistency across every screen and component. The 8px base unit creates a rhythmic, harmonious layout system.</p>

      <div class="subsection">
        <h3>Spacing Scale</h3>
        <p>All spacing uses an 8px base unit. This creates consistent rhythm across layouts.</p>
        <table class="brand-table">
          <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
          <tbody>
            <tr><td><code>space-0.5</code></td><td>4px</td><td>Tight inline spacing, icon-to-label gap</td></tr>
            <tr><td><code>space-1</code></td><td>8px</td><td>Compact element padding, list item gaps</td></tr>
            <tr><td><code>space-1.5</code></td><td>12px</td><td>Input padding, small card padding</td></tr>
            <tr><td><code>space-2</code></td><td>16px</td><td>Standard padding, paragraph spacing</td></tr>
            <tr><td><code>space-3</code></td><td>24px</td><td>Card padding, section element gaps</td></tr>
            <tr><td><code>space-4</code></td><td>32px</td><td>Section padding on mobile</td></tr>
            <tr><td><code>space-6</code></td><td>48px</td><td>Section padding on tablet</td></tr>
            <tr><td><code>space-8</code></td><td>64px</td><td>Section padding on desktop</td></tr>
            <tr><td><code>space-12</code></td><td>96px</td><td>Page-level spacing, hero padding</td></tr>
            <tr><td><code>space-16</code></td><td>128px</td><td>Major section breaks</td></tr>
          </tbody>
        </table>
      </div>

      <div class="subsection">
        <h3>Layout Grid</h3>
        <p>12-column responsive grid with fixed gutters and fluid columns.</p>
        <table class="brand-table">
          <thead><tr><th>Breakpoint</th><th>Width</th><th>Columns</th><th>Gutter</th><th>Margin</th></tr></thead>
          <tbody>
            <tr><td><strong>Mobile</strong></td><td>375px</td><td>4</td><td>16px</td><td>16px</td></tr>
            <tr><td><strong>Tablet</strong></td><td>768px</td><td>8</td><td>24px</td><td>32px</td></tr>
            <tr><td><strong>Desktop</strong></td><td>1024px</td><td>12</td><td>24px</td><td>48px</td></tr>
            <tr><td><strong>Wide</strong></td><td>1440px</td><td>12</td><td>32px</td><td>auto (max content: 1280px)</td></tr>
          </tbody>
        </table>
      </div>

      <div class="subsection">
        <h3>Breakpoints</h3>
        <table class="brand-table">
          <thead><tr><th>Name</th><th>Min Width</th><th>CSS</th></tr></thead>
          <tbody>
            <tr><td><code>sm</code></td><td>640px</td><td><code>@media (min-width: 640px)</code></td></tr>
            <tr><td><code>md</code></td><td>768px</td><td><code>@media (min-width: 768px)</code></td></tr>
            <tr><td><code>lg</code></td><td>1024px</td><td><code>@media (min-width: 1024px)</code></td></tr>
            <tr><td><code>xl</code></td><td>1280px</td><td><code>@media (min-width: 1280px)</code></td></tr>
            <tr><td><code>2xl</code></td><td>1536px</td><td><code>@media (min-width: 1536px)</code></td></tr>
          </tbody>
        </table>
      </div>

      <div class="subsection">
        <h3>Border Radius</h3>
        <table class="brand-table">
          <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
          <tbody>
            <tr><td><code>radius-sm</code></td><td>4px</td><td>Small inputs, tags, chips</td></tr>
            <tr><td><code>radius-md</code></td><td>8px</td><td>Cards, buttons, inputs</td></tr>
            <tr><td><code>radius-lg</code></td><td>12px</td><td>Modals, large cards</td></tr>
            <tr><td><code>radius-xl</code></td><td>16px</td><td>Hero sections, feature cards</td></tr>
            <tr><td><code>radius-full</code></td><td>9999px</td><td>Pills, avatars, circular elements</td></tr>
          </tbody>
        </table>
      </div>

      <div class="subsection">
        <h3>Elevation (Shadows)</h3>
        <table class="brand-table">
          <thead><tr><th>Level</th><th>CSS Value</th><th>Usage</th></tr></thead>
          <tbody>
            <tr><td><code>shadow-sm</code></td><td><code>0 1px 2px rgba(0,0,0,0.05)</code></td><td>Subtle lift for cards at rest</td></tr>
            <tr><td><code>shadow-md</code></td><td><code>0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)</code></td><td>Hover states, dropdown menus</td></tr>
            <tr><td><code>shadow-lg</code></td><td><code>0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)</code></td><td>Modals, popovers, elevated panels</td></tr>
            <tr><td><code>shadow-xl</code></td><td><code>0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)</code></td><td>Toast notifications, floating elements</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  `;
}
