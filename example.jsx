// Category palette (from your slide; adjust freely)
const CATEGORY_META = {
  "AI / ML Assistants":                 { icon: "🤖", color: "#7254A3" },  // Purple Moon
  "Business & Workflow Automation":     { icon: "⚙️", color: "#FF9F36" },  // Valencia Orange
  "Analytics & Dashboard Replacements": { icon: "📊", color: "#11567F" },  // Mid-Blue
  "Enrichment & Identity Resolution":   { icon: "🧩", color: "#29B5E8" },  // Snowflake Blue
  "Predictive & Scoring":               { icon: "📈", color: "#5B85B5" },  // Mid cool blue
  "Secure Collaboration":               { icon: "🔐", color: "#F5B800" },  // Warm gold
  "Legacy Tool Modernization":          { icon: "🧰", color: "#0B2B5A" },  // Midnight
  "Cost Management":                    { icon: "💸", color: "#2E7D32" },
  "Data Governance":                    { icon: "🏛️", color: "#0B5ED7" }
};

// Light tint for chips / hovers
const hexToRgb = (hex) => {
  const n = hex.replace("#",""); 
  const bigint = parseInt(n.length===3 ? n.split("").map(c=>c+c).join("") : n, 16);
  return { r: (bigint>>16)&255, g: (bigint>>8)&255, b: bigint&255 };
};
const tint = (hex, a=0.14) => {
  const {r,g,b} = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const getCatMeta = (name) => {
  const m = CATEGORY_META[name] || { icon: "🗂️", color: "#94a3b8" };
  return { ...m, light: tint(m.color, 0.16) };
};



---


<aside style={{ width: 220, borderRight: "1px solid #e5e7eb", paddingRight: 12, paddingTop: 6, flexShrink: 0 }}>
  <div style={{ fontWeight: 700, marginBottom: 8, color: "#027AFF" }}>Categories</div>

  {/* "All" stays first */}
  <div
    onClick={() => this.setState({ selectedCategory: "All" })}
    style={{
      padding: "8px 10px",
      borderRadius: 10,
      cursor: "pointer",
      background: selectedCategory === "All" ? "#E8F3FF" : "transparent",
      color: selectedCategory === "All" ? "#027AFF" : "#333",
      marginBottom: 6,
      display: "flex",
      alignItems: "center",
      gap: 8
    }}
  >
    <span style={{ width: 8, height: 8, borderRadius: 99, background: "#027AFF" }} />
    All
  </div>

  {/* dynamic categories with colored dots + icons */}
  {categories.map((cat) => {
    const meta = getCatMeta(cat);
    const active = selectedCategory === cat;
    return (
      <div
        key={cat}
        onClick={() => this.setState({ selectedCategory: cat })}
        style={{
          padding: "8px 10px",
          borderRadius: 10,
          cursor: "pointer",
          background: active ? meta.light : "transparent",
          color: active ? meta.color : "#1f2937",
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          gap: 8
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 99, background: meta.color }} />
        <span style={{ fontSize: 16 }}>{meta.icon}</span>
        <span style={{ lineHeight: 1 }}>{cat}</span>
      </div>
    );
  })}
</aside>



----

{/* category chip */}
{(it.category) && (() => {
  const meta = getCatMeta(it.category);
  return (
    <div style={{
      marginTop: 6,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "2px 8px",
      borderRadius: 999,
      background: meta.light,
      color: meta.color,
      fontSize: 12,
      fontWeight: 600
    }}>
      <span>{meta.icon}</span>
      <span style={{ whiteSpace: "nowrap" }}>{it.category}</span>
    </div>
  );
})()}



---

<main style={{ flex: 1, background: "rgba(255,255,255,.5)", borderRadius: 14, padding: 12 }}>
  {/* ...your grid... */}
</main>
