// --- Category icons (neutral) ---
const CATEGORY_META = {
  "AI / ML Assistants":                 { icon: "🤖" },
  "Business & Workflow Automation":     { icon: "⚙️" },
  "Analytics & Dashboard Replacements": { icon: "📊" },
  "Enrichment & Identity Resolution":   { icon: "🧩" },
  "Predictive & Scoring":               { icon: "📈" },
  "Secure Collaboration":               { icon: "🔐" },
  "Legacy Tool Modernization":          { icon: "🧰" },
  "Cost Management":                    { icon: "💸" },
  "Data Governance":                    { icon: "🏛️" }
};

// --- Two-color Snowflake-ish palette (alternating down the sidebar) ---
const ALT_PALETTE = ["#29B5E8", "#11567F"]; // Snowflake Blue, Mid-Blue

// small utilities
const hexToRgb = (hex) => {
  const n = hex.replace("#","");
  const v = parseInt(n.length===3 ? n.split("").map(c=>c+c).join("") : n, 16);
  return { r:(v>>16)&255, g:(v>>8)&255, b:v&255 };
};
const tint = (hex, a=0.16) => {
  const {r,g,b} = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

// unified chip color to keep the grid cohesive
const CHIP_COLOR = ALT_PALETTE[0];
