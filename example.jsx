render() {
  // minimal new state fields: selectedCategory, dense
  const {
    items = [],
    loading,
    error,
    selectedCategory = "All",
    dense = false
  } = this.state;

  // categories (can move to a top-level const if you prefer)
  const CATEGORIES = ["All", "AI & Data Governance", "License Optimization", "Workflow"];

  // simple filter (expects optional `category` in each JSON)
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((it) => (it.category || "").toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        padding: 20,
        maxWidth: 1200,
        margin: "0 auto"
      }}
    >
      {/* Title + subtle density toggle */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <h1
          style={{
            fontSize: 32,
            letterSpacing: 0.5,
            fontWeight: 800,
            color: "#027AFF",
            margin: 0,
            paddingBottom: 6,
            borderBottom: "3px solid #E8F3FF",
            flex: 1
          }}
        >
          Snowflake PS App Catalog
        </h1>

        {/* subtle view toggle */}
        <div style={{ marginLeft: 12, fontSize: 13, color: "#666" }}>
          <span style={{ marginRight: 6 }}>View:</span>
          <button
            onClick={() => this.setState({ dense: false })}
            style={{
              border: "none",
              background: "transparent",
              color: !dense ? "#027AFF" : "#aaa",
              fontWeight: !dense ? 700 : 400,
              cursor: "pointer",
              marginRight: 6
            }}
            aria-label="Three-wide grid"
          >
            3-wide
          </button>
          <button
            onClick={() => this.setState({ dense: true })}
            style={{
              border: "none",
              background: "transparent",
              color: dense ? "#027AFF" : "#aaa",
              fontWeight: dense ? 700 : 400,
              cursor: "pointer"
            }}
            aria-label="Single column"
          >
            1-wide
          </button>
        </div>
      </div>

      {/* Top note line (kept from your version) */}
      <div style={{ color: "#6b7280", margin: "6px 0 14px" }}>
        Click any card to view full details.
      </div>

      {/* Layout: sidebar + grid */}
      <div style={{ display: "flex", gap: 16 }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 180,
            borderRight: "1px solid #e5e7eb",
            paddingRight: 12,
            paddingTop: 6,
            flexShrink: 0
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8, color: "#027AFF" }}>Categories</div>
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <div
                key={cat}
                onClick={() => this.setState({ selectedCategory: cat })}
                style={{
                  padding: "6px 8px",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: active ? "#E8F3FF" : "transparent",
                  color: active ? "#027AFF" : "#333",
                  marginBottom: 4
                }}
              >
                {cat}
              </div>
            );
          })}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1 }}>
          {loading && <div>Loading…</div>}
          {error && !loading && (
            <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: dense
                ? "repeat(1, 1fr)"
                : "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16
            }}
          >
            {filteredItems.map((it) => this.renderCard(it))}
          </div>
        </main>
      </div>

      {this.renderModal()}
    </div>
  );
}
