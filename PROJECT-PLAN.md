# Brand Identity Skill — Project Plan

## What this is

A Claude skill (`/brand-identity`) that generates comprehensive brand identity systems and design system specifications. It produces two deliverables: a professionally designed PDF and a `design-language.md` file for quick reference.

The skill works for any client but has deep fluency in political campaigns, advocacy organizations, and issue-based branding.

## How it works

1. The user invokes `/brand-identity` with a client name
2. The skill asks clarifying questions (client type, audience, personality, existing assets, etc.)
3. The user selects which deliverables they want via checkboxes
4. The skill generates a self-contained HTML document, converts it to PDF, and creates a companion `design-language.md` file
5. Both files save to `~/Downloads/`

## Deliverables the skill can produce

### Tier 1: Brand identity (strategy + creative direction)

- Brand strategy (story, values, positioning, personality)
- Voice and tone (matrix, vocabulary, tone by channel)
- Messaging framework (tagline options, elevator pitch, boilerplate, key messages)
- Color palette (hex/RGB/HSL, accessibility ratings, dark mode, usage rules)
- Typography (Google Font recommendations, type scale, pairing rationale)
- Imagery direction (photography style, iconography, illustration guidance)
- Brand applications (creative briefs for business cards, social profiles, signage, political materials)
- Brand do's and don'ts

### Tier 2: Design system (technical specs)

- Foundations (semantic colors, 8px spacing scale, 12-column responsive grid, breakpoints)
- Components (30+ UI components with states, accessibility, code-ready specs)
- Patterns (page templates, user flows, feedback patterns)
- Design tokens (JSON structure for developer handoff)
- Implementation guide (design principles, developer docs)

## Architecture

- **Skill file:** `~/.claude/skills/brand-identity/SKILL.md`
- **Backup:** `Development/Brand Identity Skill/SKILL.md`
- **Output format:** PDF (generated from HTML via `wkhtmltopdf`) + `design-language.md`
- **GitHub repo:** `thecantercompany/brand-identity-skill`

## Design decisions

### PDF over Word

The HTML-to-PDF approach lets the document itself use the brand's recommended fonts and colors. The document becomes a demonstration of the brand identity, not just a description of it.

### Two-tier deliverable system

Not every client needs a full design system with component specs. Political campaigns usually need Tier 1 (brand identity) fast. Tech products or organizations building web apps need Tier 2. The checkbox selection keeps the skill flexible without overwhelming anyone.

### design-language.md as a companion file

The PDF is the presentation document. The markdown file is the working reference — easy to drop into a repo, share in a PR, or paste into a project brief.

### Existing assets respected, not recreated

If the user supplies a logo, colors, or fonts, the skill incorporates them into the system rather than generating alternatives. This is critical for clients who already have partial brand assets.

## Future enhancements

- HTML visual reference page with interactive color swatches and live type specimens (standalone, separate from PDF)
- SVG logo concept explorations for clients starting from scratch
- Sub-brand variant mode for organizations with parent brands
- Brand audit mode that analyzes an existing web presence and recommends improvements
- Rapid campaign mode — stripped-down output for campaigns that need brand basics in 24 hours
