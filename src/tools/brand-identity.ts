/**
 * Brand Identity tool registration
 * Main tool: generate_brand_identity
 */

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { buildHtmlDocument } from "../generators/html.js";
import { buildDesignLanguageMd } from "../generators/design-language.js";
import type { BrandIdentityInput } from "../types/index.js";

const CLIENT_TYPES = [
  "campaign",
  "pac",
  "advocacy_org",
  "nonprofit",
  "company",
  "personal_brand",
] as const;

const EMOTIONS = [
  "trust",
  "excitement",
  "calm",
  "urgency",
  "empowerment",
  "hope",
] as const;

const DELIVERABLES = [
  "brand_strategy",
  "voice_tone",
  "messaging",
  "color_palette",
  "typography",
  "imagery",
  "applications",
  "dos_donts",
  "foundations",
  "components",
  "patterns",
  "design_tokens",
  "implementation_guide",
] as const;

export function registerBrandIdentityTools(server: McpServer): void {
  server.tool(
    "generate_brand_identity",
    "Generate a comprehensive brand identity system — strategy, voice, messaging, color palette, typography, imagery direction, and optional design system specs. Returns HTML (for PDF conversion) and design-language.md content. Works for any client with deep fluency in political campaigns, advocacy organizations, and issue-based branding.",
    {
      client_name: z
        .string()
        .min(1)
        .describe("Name of the client or organization"),
      client_type: z
        .enum(CLIENT_TYPES)
        .describe(
          "Type of organization: campaign, pac, advocacy_org, nonprofit, company, personal_brand"
        ),
      description: z
        .string()
        .min(1)
        .describe("One-sentence description of what the organization does"),
      target_audience: z
        .string()
        .min(1)
        .describe(
          "Who the brand is trying to reach (voters, donors, customers, etc.)"
        ),
      geography: z
        .string()
        .min(1)
        .describe("Where the organization operates (state, district, national)"),
      brand_personality: z
        .array(z.string())
        .min(1)
        .max(5)
        .describe(
          "3-5 adjectives describing how the brand should feel (bold, trustworthy, grassroots, modern, etc.)"
        ),
      primary_emotion: z
        .enum(EMOTIONS)
        .describe(
          "The primary emotion people should feel: trust, excitement, calm, urgency, empowerment, hope"
        ),
      competitors: z
        .string()
        .optional()
        .describe(
          "Main competitors or opponents, and any brands they admire"
        ),
      existing_assets: z
        .string()
        .optional()
        .describe(
          "Description of existing brand assets (logo, colors, tagline) or 'starting from scratch'"
        ),
      special_considerations: z
        .string()
        .optional()
        .describe(
          "Compliance requirements, bilingual needs, rapid timeline, parent brand alignment"
        ),
      election_cycle: z
        .string()
        .optional()
        .describe("Election year/cycle for political clients"),
      party_ideology: z
        .string()
        .optional()
        .describe("Party/ideology color conventions to follow or break"),
      deliverables: z
        .array(z.enum(DELIVERABLES))
        .min(1)
        .describe(
          "Which sections to include. Tier 1: brand_strategy, voice_tone, messaging, color_palette, typography, imagery, applications, dos_donts. Tier 2: foundations, components, patterns, design_tokens, implementation_guide."
        ),
    },
    async (params) => {
      try {
        const input: BrandIdentityInput = {
          client_name: params.client_name,
          client_type: params.client_type,
          description: params.description,
          target_audience: params.target_audience,
          geography: params.geography,
          brand_personality: params.brand_personality,
          primary_emotion: params.primary_emotion,
          competitors: params.competitors,
          existing_assets: params.existing_assets,
          special_considerations: params.special_considerations,
          election_cycle: params.election_cycle,
          party_ideology: params.party_ideology,
          deliverables: params.deliverables,
        };

        console.error(
          `Generating brand identity for: ${input.client_name} (${input.client_type})`
        );
        console.error(`Deliverables: ${input.deliverables.join(", ")}`);

        const html = buildHtmlDocument(input);
        const designLanguage = buildDesignLanguageMd(input);

        console.error(
          `Generated HTML: ${html.length} chars, MD: ${designLanguage.length} chars`
        );

        return {
          content: [
            {
              type: "text",
              text: `# Brand Identity Generated for ${input.client_name}\n\nThe HTML document and design-language.md have been generated.\n\n## Next Steps\n1. Save the HTML content below to a temp file\n2. Convert to PDF using Chrome headless: \`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$HOME/Downloads/Brand-Identity-${input.client_name.replace(/[^a-zA-Z0-9]/g, "-")}.pdf" --print-to-pdf-no-header [temp-html-path]\`\n3. Save the design-language.md to: ~/Downloads/${input.client_name.replace(/[^a-zA-Z0-9]/g, "-")}-design-language.md\n4. Clean up the temp HTML file\n\n## Deliverables included:\n${input.deliverables.map((d) => `- ${d.replace(/_/g, " ")}`).join("\n")}`,
            },
            {
              type: "text",
              text: `---HTML_CONTENT_START---\n${html}\n---HTML_CONTENT_END---`,
            },
            {
              type: "text",
              text: `---DESIGN_LANGUAGE_MD_START---\n${designLanguage}\n---DESIGN_LANGUAGE_MD_END---`,
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);
        console.error(`Error generating brand identity: ${message}`);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error generating brand identity: ${message}`,
            },
          ],
        };
      }
    }
  );
}
