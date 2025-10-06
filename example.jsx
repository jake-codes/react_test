render() {
  const { items = [], loading, error, selectedCategory = "All", dense = false } = this.state;

  // dynamic categories
  const categories = Array.from(new Set(items.map(it => (it.category || "").trim()).filter(Boolean))).sort();

  const filtered =
    selectedCategory === "All" ? items :
    items.filter(it => (it.category || "").toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        background: "linear-gradient(180deg,#F8FAFD 0%, #F1F6FF 100%)",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial"
      }}
    >
      {/* Sidebar (icons; sticks to top) */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
          height: "100vh",
          overflowY: "auto",
          borderRight: "1px solid #e5e7eb",
          background: "#fff",
          padding: "16px 12px"
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 10, color: "#027AFF" }}>Categories</div>

        {/* All first */}
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

        {/* Dynamic categories with your icon/color meta (from CATEGORY_META) */}
        {categories.map((cat) => {
          const meta = getCatMeta(cat); // you already have this helper
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
                gap: 8,
                fontWeight: active ? 700 : 600
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: 99, background: meta.color }} />
              <span style={{ fontSize: 16 }}>{meta.icon}</span>
              <span style={{ lineHeight: 1 }}>{cat}</span>
            </div>
          );
        })}
      </aside>

      {/* Main column (ONLY this scrolls) */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          overflowY: "auto",
          padding: "16px 18px"
        }}
      >
        {/* Title is in main, not over sidebar */}
        <h1
          style={{
            fontSize: 32,
            letterSpacing: 0.5,
            fontWeight: 800,
            color: "#29B5E8",
            margin: "0 0 8px 0",
            borderBottom: "3px solid #E8F3FF",
            paddingBottom: 6
          }}
        >
          Snowflake PS App Catalog
        </h1>

        <div style={{ color: "#6b7280", margin: "6px 0 14px" }}>
          Click any card to view full details.
          <span style={{ float: "right", fontSize: 13 }}>
            View:&nbsp;
            <button
              onClick={() => this.setState({ dense: false })}
              style={{
                border: "none",
                background: "transparent",
                color: !dense ? "#027AFF" : "#94a3b8",
                fontWeight: !dense ? 700 : 400,
                cursor: "pointer",
                marginRight: 6
              }}
            >
              3-wide
            </button>
            <button
              onClick={() => this.setState({ dense: true })}
              style={{
                border: "none",
                background: "transparent",
                color: dense ? "#027AFF" : "#94a3b8",
                fontWeight: dense ? 700 : 400,
                cursor: "pointer"
              }}
            >
              1-wide
            </button>
          </span>
        </div>

        {loading && <div>Loading…</div>}
        {error && !loading && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

        {/* GRID: fix “smooshing” by stretching rows and cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: dense
              ? "repeat(1, 1fr)"
              : "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 16,
            alignItems: "stretch"           // ensure equal-height lanes
          }}
        >
          {filtered.map((it) => this.renderCard(it))}
        </div>
      </main>
    </div>
  );
}


-----


.markdown-body h1 { color: #29B5E8; margin: 6px 0 6px; }
.markdown-body h2 { color: #11567F; margin: 6px 0 4px; }
.markdown-body h3 { color: #5B85B5; margin: 4px 0 2px; }

.markdown-body p, .markdown-body ul, .markdown-body ol, .markdown-body li {
  margin-top: 4px;
  margin-bottom: 4px;
}
.markdown-body ul, .markdown-body ol { padding-left: 18px; }
