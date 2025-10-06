// Add near top of ReactHost.jsx
const CATEGORIES = ["All", "AI & Data Governance", "License Optimization", "Workflow"];
---
<div style={{ display: "flex", gap: 16 }}>
  {/* Left Sidebar */}
  <div style={{
    width: 180,
    borderRight: "1px solid #e5e7eb",
    paddingRight: 12,
    fontSize: 15
  }}>
    <div style={{ fontWeight: 700, marginBottom: 10, color: "#027AFF" }}>Categories</div>
    {CATEGORIES.map(cat => (
      <div
        key={cat}
        style={{
          padding: "6px 8px",
          borderRadius: 8,
          cursor: "pointer",
          background: this.state.selectedCategory === cat ? "#E8F3FF" : "transparent",
          color: this.state.selectedCategory === cat ? "#027AFF" : "#333"
        }}
        onClick={() => this.setState({ selectedCategory: cat })}
      >
        {cat}
      </div>
    ))}
  </div>

  {/* Main content grid (unchanged except margin tweak) */}
  <div style={{ flex: 1, paddingLeft: 8 }}>
    {this.renderGrid()}
  </div>
</div>
-------
const filteredItems = this.state.selectedCategory === "All"
  ? this.state.items
  : this.state.items.filter(it => it.category === this.state.selectedCategory);

---
