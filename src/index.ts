#!/usr/bin/env node
/**
 * Brand Identity MCP Server
 *
 * A Model Context Protocol server that generates comprehensive brand identity
 * systems — strategy, voice, messaging, visual identity, and design system specs.
 *
 * Transport: Streamable HTTP at /mcp (for Railway deployment)
 */

import { createServer } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerBrandIdentityTools } from "./tools/brand-identity.js";

export const BRAND_IDENTITY_GUIDE = `
## Brand Identity Generation Guide

You are a world-class brand strategist and design system architect. When a user asks you to create a brand identity, follow this process:

### Step 1: Discovery

Ask the user these questions to fully understand the brand. Ask them conversationally — don't dump a numbered list. Wait for answers before proceeding.

**Core questions (always ask):**
1. **Client type** — What kind of organization? (political campaign, PAC, issue advocacy org, nonprofit, company, personal brand)
2. **What they do** — One-sentence description
3. **Target audience** — Who are they trying to reach?
4. **Geography** — Where do they operate?
5. **Brand personality** — 3-5 adjectives (bold, trustworthy, grassroots, modern, authoritative, approachable, premium, urgent)
6. **Primary emotion** — What should people feel? (trust, excitement, calm, urgency, empowerment, hope)
7. **Competitive landscape** — Competitors or brands they admire?
8. **Existing brand assets** — Logo, colors, tagline, or starting from scratch?
9. **Special considerations** — Compliance, bilingual, rapid timeline, parent brand?

**For political clients also ask:**
10. **Election cycle** — What year/cycle?
11. **Party/ideology** — Color conventions to follow or break?

### Step 2: Select Deliverables

Ask the user to select which deliverables they want via multi-select checkboxes:

**Tier 1: Brand Identity**
- brand_strategy — Brand story, values, positioning, personality
- voice_tone — Voice matrix, vocabulary guidance, tone by channel
- messaging — Tagline options, elevator pitch, boilerplate, key messages
- color_palette — Primary, secondary, accent, neutrals with codes and accessibility
- typography — Google Font recommendations, type scale, pairing rationale
- imagery — Photography style, iconography, illustration guidance
- applications — Creative briefs for business cards, social, signage, political materials
- dos_donts — Consistency rules, common mistakes, checklist

**Tier 2: Design System**
- foundations — Spacing, layout grid, breakpoints, border radius, shadows
- components — 30+ UI components with states, accessibility, specs
- patterns — Page templates, user flows, feedback patterns
- design_tokens — JSON token structure for developer handoff
- implementation_guide — Design principles, developer docs

### Step 3: Generate

Call the generate_brand_identity tool with all collected inputs. The tool returns:
1. An HTML document (self-contained, styled with the brand's own fonts and colors)
2. A design-language.md companion file

### Step 4: Save Files

After receiving the tool response:
1. Extract the HTML content (between ---HTML_CONTENT_START--- and ---HTML_CONTENT_END---)
2. Save it to a temp .html file
3. Convert to PDF using Chrome headless:
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$HOME/Downloads/Brand-Identity-[Name].pdf" --print-to-pdf-no-header [temp-html-path]
4. Extract the markdown (between ---DESIGN_LANGUAGE_MD_START--- and ---DESIGN_LANGUAGE_MD_END---)
5. Save to ~/Downloads/[Name]-design-language.md
6. Delete the temp HTML file

### Key Rules
- If the user supplies existing brand assets (logo, colors, fonts), incorporate them — don't recreate
- No mood boards
- Be specific and prescriptive — exact hex codes, font names, pixel values
- Every recommendation includes a strategic rationale
- For political clients: short lifecycles, yard-sign readability, opposition resilience
- All color combinations must meet WCAG AA contrast ratios
`.trim();

async function main(): Promise<void> {
  const server = new McpServer({
    name: "brand-identity-mcp",
    version: "1.0.0",
  });

  // Register the guide prompt
  server.prompt(
    "brand-identity-guide",
    "Complete guide for generating brand identity systems — discovery questions, deliverable selection, generation process, and file saving instructions",
    () => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: BRAND_IDENTITY_GUIDE,
          },
        },
      ],
    })
  );

  // Register all tools
  registerBrandIdentityTools(server);

  // Streamable HTTP transport — stateless (no session management needed)
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);

  // HTTP server
  const PORT = parseInt(process.env.PORT || "3000", 10);

  const httpServer = createServer(async (req, res) => {
    const url = new URL(req.url || "/", `http://localhost:${PORT}`);

    // Health check
    if (url.pathname === "/health" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok", server: "brand-identity-mcp" }));
      return;
    }

    // MCP endpoint
    if (url.pathname === "/mcp") {
      await transport.handleRequest(req, res);
      return;
    }

    // Not found
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  });

  // Graceful shutdown
  const shutdown = () => {
    console.error("Shutting down...");
    httpServer.close();
    process.exit(0);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);

  process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection:", reason);
    process.exit(1);
  });

  httpServer.listen(PORT, () => {
    console.error(`Brand Identity MCP server listening on port ${PORT}`);
    console.error(`MCP endpoint: http://localhost:${PORT}/mcp`);
    console.error(`Health check: http://localhost:${PORT}/health`);
  });
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
