/**
 * Types for the Brand Identity MCP Server
 */

export type ClientType =
  | "campaign"
  | "pac"
  | "advocacy_org"
  | "nonprofit"
  | "company"
  | "personal_brand";

export type PrimaryEmotion =
  | "trust"
  | "excitement"
  | "calm"
  | "urgency"
  | "empowerment"
  | "hope";

export type Deliverable =
  // Tier 1: Brand Identity
  | "brand_strategy"
  | "voice_tone"
  | "messaging"
  | "color_palette"
  | "typography"
  | "imagery"
  | "applications"
  | "dos_donts"
  // Tier 2: Design System
  | "foundations"
  | "components"
  | "patterns"
  | "design_tokens"
  | "implementation_guide";

export interface BrandIdentityInput {
  client_name: string;
  client_type: ClientType;
  description: string;
  target_audience: string;
  geography: string;
  brand_personality: string[];
  primary_emotion: PrimaryEmotion;
  competitors?: string;
  existing_assets?: string;
  special_considerations?: string;
  election_cycle?: string;
  party_ideology?: string;
  deliverables: Deliverable[];
}

export interface ColorEntry {
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  usage: string;
  rationale: string;
}

export interface ColorPalette {
  primary: ColorEntry[];
  secondary: ColorEntry[];
  accent: ColorEntry[];
  neutrals: ColorEntry[];
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
    successDark: string;
    warningDark: string;
    errorDark: string;
    infoDark: string;
  };
}

export interface TypeScale {
  level: string;
  font: string;
  weight: string;
  sizeDesktop: string;
  sizeMobile: string;
  lineHeight: string;
  letterSpacing: string;
}

export interface FontRecommendation {
  name: string;
  role: "primary" | "secondary";
  googleFontsUrl: string;
  rationale: string;
  weights: string[];
}

export interface VoiceAttribute {
  attribute: string;
  doThis: string;
  dontDoThis: string;
  example: string;
}

export interface ToneVariation {
  context: string;
  toneAdjustment: string;
  example: string;
}

export interface KeyMessage {
  pillar: string;
  headline: string;
  supportingPoint: string;
  proofPoint: string;
}

export interface ComponentSpec {
  name: string;
  category: string;
  description: string;
  anatomy: string[];
  states: string[];
  accessibility: string;
  specs: Record<string, string>;
}

export interface GeneratedBrandIdentity {
  html: string;
  designLanguageMd: string;
}
