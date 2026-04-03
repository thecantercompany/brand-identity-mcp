/**
 * UI Components section generator
 * 30+ components with anatomy, states, accessibility, code-ready specs
 */

import type { BrandIdentityInput, ComponentSpec } from "../../types/index.js";

export function generateComponentsSection(input: BrandIdentityInput): string {
  const components = getComponents();
  const categories = [...new Set(components.map((c) => c.category))];

  const categorySections = categories
    .map((cat) => {
      const catComponents = components.filter((c) => c.category === cat);
      const componentCards = catComponents
        .map(
          (c) => `
        <div class="component-card">
          <h4>${c.name}</h4>
          <p>${c.description}</p>
          <div class="component-details">
            <div><strong>Anatomy:</strong> ${c.anatomy.join(" &rarr; ")}</div>
            <div><strong>States:</strong> ${c.states.join(", ")}</div>
            <div><strong>Accessibility:</strong> ${c.accessibility}</div>
            <div class="component-specs">
              <strong>Specs:</strong>
              <table class="spec-table">
                ${Object.entries(c.specs)
                  .map(([k, v]) => `<tr><td>${k}</td><td><code>${v}</code></td></tr>`)
                  .join("")}
              </table>
            </div>
          </div>
        </div>
      `
        )
        .join("");

      return `
        <div class="subsection">
          <h3>${cat}</h3>
          <div class="component-grid">${componentCards}</div>
        </div>
      `;
    })
    .join("");

  return `
    <section class="section" id="components">
      <h2>UI Components</h2>
      <p class="rationale">Each component is specified with anatomy, all interactive states, accessibility requirements, and code-ready dimensions. Developers can implement directly from these specs.</p>
      ${categorySections}
    </section>
  `;
}

function getComponents(): ComponentSpec[] {
  return [
    // Navigation
    { name: "Header / Nav Bar", category: "Navigation", description: "Primary site navigation. Fixed or sticky at top.", anatomy: ["Logo", "Nav links", "CTA button", "Mobile menu toggle"], states: ["Default", "Scrolled (condensed)", "Mobile (hamburger)"], accessibility: "role='navigation', aria-label, keyboard nav with Tab/Enter/Escape", specs: { height: "64px (desktop), 56px (mobile)", padding: "0 space-4 (desktop), 0 space-2 (mobile)", background: "White or primary color", "z-index": "1000" } },
    { name: "Tab Bar", category: "Navigation", description: "Horizontal tab navigation for sectioned content.", anatomy: ["Tab items", "Active indicator", "Optional icons"], states: ["Default", "Active", "Hover", "Disabled"], accessibility: "role='tablist', aria-selected, arrow key navigation between tabs", specs: { height: "48px", "tab-padding": "space-2 space-3", "indicator-height": "2px", "indicator-color": "Primary" } },
    { name: "Sidebar", category: "Navigation", description: "Vertical navigation for dashboards and admin panels.", anatomy: ["Logo/brand", "Nav groups", "Nav items", "Collapse toggle"], states: ["Expanded", "Collapsed (icons only)", "Mobile (overlay)"], accessibility: "role='navigation', aria-expanded on collapse, focus trap when overlay", specs: { "width-expanded": "256px", "width-collapsed": "64px", padding: "space-2", "item-height": "40px" } },
    { name: "Breadcrumbs", category: "Navigation", description: "Hierarchical page location indicator.", anatomy: ["Links", "Separators", "Current page (text)"], states: ["Default", "Hover on links", "Truncated (for deep hierarchies)"], accessibility: "nav with aria-label='Breadcrumb', aria-current='page' on last item", specs: { "font-size": "14px", "separator-margin": "0 space-1", color: "Neutral secondary" } },

    // Buttons
    { name: "Button — Primary", category: "Buttons", description: "Main call-to-action. One per visible section.", anatomy: ["Label", "Optional icon (left or right)"], states: ["Default", "Hover", "Active/Pressed", "Disabled", "Loading"], accessibility: "Minimum 44x44px touch target. aria-disabled when disabled. aria-busy when loading.", specs: { padding: "space-1.5 space-3", "border-radius": "radius-md", "font-weight": "600", "font-size": "16px", "min-height": "44px" } },
    { name: "Button — Secondary", category: "Buttons", description: "Supporting action. Outlined variant.", anatomy: ["Label", "Optional icon"], states: ["Default", "Hover", "Active", "Disabled"], accessibility: "Same touch target and ARIA requirements as primary.", specs: { padding: "space-1.5 space-3", border: "1.5px solid primary", background: "transparent", "font-size": "16px" } },
    { name: "Button — Tertiary/Ghost", category: "Buttons", description: "Low-emphasis action. Text-only or subtle background.", anatomy: ["Label", "Optional icon"], states: ["Default", "Hover (subtle background)", "Active", "Disabled"], accessibility: "Must still be visually distinguishable as interactive.", specs: { padding: "space-1 space-2", background: "transparent", "hover-background": "Neutral 5% opacity" } },
    { name: "Icon Button", category: "Buttons", description: "Action with icon only. Requires aria-label.", anatomy: ["Icon", "Optional tooltip"], states: ["Default", "Hover", "Active", "Disabled"], accessibility: "MUST have aria-label. Tooltip on hover/focus.", specs: { size: "40px x 40px", "icon-size": "20px", "border-radius": "radius-md or radius-full" } },

    // Inputs
    { name: "Text Input", category: "Inputs", description: "Single-line text entry.", anatomy: ["Label", "Input field", "Helper text", "Error message", "Optional icon"], states: ["Default", "Focused", "Filled", "Error", "Disabled", "Read-only"], accessibility: "Label linked via htmlFor/id. aria-describedby for helper/error. aria-invalid on error.", specs: { height: "44px", padding: "space-1.5 space-2", "border-radius": "radius-md", border: "1px solid neutral", "focus-ring": "2px primary" } },
    { name: "Textarea", category: "Inputs", description: "Multi-line text entry.", anatomy: ["Label", "Textarea field", "Character count", "Helper text"], states: ["Default", "Focused", "Filled", "Error", "Disabled"], accessibility: "Same labeling as text input. Resizable with min/max constraints.", specs: { "min-height": "96px", padding: "space-2", "border-radius": "radius-md" } },
    { name: "Select / Dropdown", category: "Inputs", description: "Choose from a list of options.", anatomy: ["Label", "Trigger button", "Dropdown panel", "Options", "Optional search"], states: ["Closed", "Open", "Option hover", "Option selected", "Disabled"], accessibility: "role='listbox', aria-expanded, aria-activedescendant. Arrow key navigation.", specs: { "trigger-height": "44px", "option-height": "40px", "dropdown-max-height": "280px", "dropdown-shadow": "shadow-lg" } },
    { name: "Checkbox", category: "Inputs", description: "Toggle a boolean option.", anatomy: ["Check box", "Label", "Optional helper text"], states: ["Unchecked", "Checked", "Indeterminate", "Hover", "Focused", "Disabled"], accessibility: "role='checkbox', aria-checked. Clickable label area.", specs: { size: "20px x 20px", "border-radius": "radius-sm", "label-gap": "space-1.5" } },
    { name: "Radio Button", category: "Inputs", description: "Choose one from a group.", anatomy: ["Radio circle", "Label"], states: ["Unselected", "Selected", "Hover", "Focused", "Disabled"], accessibility: "role='radiogroup' on container, role='radio' on items. Arrow keys to navigate.", specs: { size: "20px x 20px", "border-radius": "radius-full", "label-gap": "space-1.5" } },
    { name: "Toggle / Switch", category: "Inputs", description: "On/off binary control.", anatomy: ["Track", "Thumb", "Label", "Optional status text"], states: ["Off", "On", "Hover", "Focused", "Disabled"], accessibility: "role='switch', aria-checked. Label must describe what's being toggled.", specs: { "track-width": "44px", "track-height": "24px", "thumb-size": "20px", "border-radius": "radius-full" } },
    { name: "Slider", category: "Inputs", description: "Select a value from a range.", anatomy: ["Track", "Fill", "Thumb", "Label", "Value display"], states: ["Default", "Hover", "Active/Dragging", "Disabled"], accessibility: "role='slider', aria-valuemin, aria-valuemax, aria-valuenow. Arrow keys adjust.", specs: { "track-height": "4px", "thumb-size": "20px", "min-width": "200px" } },

    // Feedback
    { name: "Alert / Banner", category: "Feedback", description: "Persistent message about a state or action.", anatomy: ["Icon", "Title", "Message", "Optional action", "Optional dismiss"], states: ["Info", "Success", "Warning", "Error"], accessibility: "role='alert' for urgent, role='status' for informational. aria-live='polite'.", specs: { padding: "space-2 space-3", "border-radius": "radius-md", "border-left": "4px solid semantic color", gap: "space-2" } },
    { name: "Toast / Snackbar", category: "Feedback", description: "Temporary notification that auto-dismisses.", anatomy: ["Icon", "Message", "Optional action", "Dismiss button"], states: ["Entering", "Visible", "Exiting"], accessibility: "role='status', aria-live='polite'. Auto-dismiss after 5s. Pause on hover.", specs: { "min-width": "300px", "max-width": "560px", padding: "space-2 space-3", "border-radius": "radius-lg", shadow: "shadow-xl" } },
    { name: "Modal / Dialog", category: "Feedback", description: "Overlay that requires user attention.", anatomy: ["Backdrop", "Container", "Header", "Body", "Footer actions", "Close button"], states: ["Opening", "Open", "Closing"], accessibility: "role='dialog', aria-modal='true'. Focus trap. Escape to close. Return focus on close.", specs: { "max-width": "560px (sm), 720px (md), 960px (lg)", padding: "space-4", "border-radius": "radius-lg", "backdrop-opacity": "0.5" } },
    { name: "Progress Bar", category: "Feedback", description: "Visual indicator of completion.", anatomy: ["Track", "Fill", "Optional label", "Optional percentage"], states: ["Default", "Indeterminate (animated)", "Complete"], accessibility: "role='progressbar', aria-valuenow, aria-valuemin='0', aria-valuemax='100'.", specs: { height: "8px (default), 4px (slim)", "border-radius": "radius-full", "fill-color": "Primary" } },
    { name: "Skeleton Screen", category: "Feedback", description: "Loading placeholder matching content layout.", anatomy: ["Animated placeholder shapes matching expected content"], states: ["Loading (animated shimmer)"], accessibility: "aria-busy='true' on parent container. aria-label='Loading'.", specs: { "border-radius": "radius-md", "animation-duration": "1.5s", "shimmer-color": "Neutral 10% to 5% opacity" } },

    // Data Display
    { name: "Card", category: "Data Display", description: "Contained unit of related content.", anatomy: ["Optional image/media", "Header", "Body", "Optional footer/actions"], states: ["Default", "Hover (if clickable)", "Active", "Selected"], accessibility: "If clickable, entire card is one interactive element. Heading for card title.", specs: { padding: "space-3", "border-radius": "radius-lg", border: "1px solid neutral light", shadow: "shadow-sm" } },
    { name: "Table", category: "Data Display", description: "Structured data in rows and columns.", anatomy: ["Header row", "Body rows", "Optional footer", "Optional sorting controls"], states: ["Default", "Row hover", "Row selected", "Sortable header hover"], accessibility: "Proper <thead>/<tbody>. scope='col' on headers. aria-sort for sortable.", specs: { "cell-padding": "space-2 space-3", "header-background": "Neutral 3%", "row-height": "48px min", "border-bottom": "1px solid neutral light" } },
    { name: "Avatar", category: "Data Display", description: "User or entity visual representation.", anatomy: ["Image or initials", "Optional status indicator", "Optional badge"], states: ["Image loaded", "Image fallback (initials)", "Image error (generic icon)"], accessibility: "alt text for image. aria-label if no visible text identifies the person.", specs: { "size-sm": "32px", "size-md": "40px", "size-lg": "56px", "size-xl": "80px", "border-radius": "radius-full" } },
    { name: "Badge / Tag", category: "Data Display", description: "Label or status indicator.", anatomy: ["Text", "Optional icon", "Optional remove button"], states: ["Default", "Hover (if interactive)", "Active"], accessibility: "If removable, aria-label on remove button describing what's being removed.", specs: { padding: "space-0.5 space-1.5", "border-radius": "radius-full", "font-size": "12px", "font-weight": "500" } },
    { name: "Stat / Metric", category: "Data Display", description: "Key number with label.", anatomy: ["Value (large)", "Label", "Optional trend indicator", "Optional icon"], states: ["Default", "Loading", "Error"], accessibility: "Use aria-label to provide full context: 'Revenue: $42,000, up 12%'.", specs: { "value-size": "Display or Headline from type scale", "label-size": "Caption", gap: "space-1" } },

    // Media
    { name: "Image Container", category: "Media", description: "Responsive image with loading states.", anatomy: ["Image", "Optional caption", "Optional overlay"], states: ["Loading (skeleton)", "Loaded", "Error (fallback)"], accessibility: "Meaningful alt text. Decorative images use alt=''.", specs: { "border-radius": "radius-md", "aspect-ratios": "16:9, 4:3, 1:1, 3:2", "object-fit": "cover" } },
    { name: "Video Player", category: "Media", description: "Embedded video with custom controls.", anatomy: ["Video surface", "Play/pause", "Progress bar", "Volume", "Fullscreen"], states: ["Paused (poster)", "Playing", "Buffering", "Ended"], accessibility: "Keyboard controls. Captions track. aria-label on all controls.", specs: { "border-radius": "radius-lg", "aspect-ratio": "16:9", "controls-height": "48px" } },
  ];
}
