// Truncate helper (keeps layout tight)
truncate(text, max = 110) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

renderCard(it) {
  const { dense } = this.state;
  const title = it.title || it.short_title || it.id || it.__file;
  const short = it.short || it.short_title || it.description || "";
  const img = it._image;

  const card = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,.05)",
    transition: "transform .15s ease, box-shadow .15s ease",
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minHeight: "auto" // no forced tall cards
  };

  const titleStyle = {
    fontSize: 16,
    fontWeight: 700,
    color: "#0b2b5a",        // subtle Snowflake-ish dark
    lineHeight: 1.2
  };

  const imgStyle = {
    width: "100%",
    height: dense ? 110 : 140, // shorter image in 3-wide
    objectFit: "cover",
    background: "#f3f6fb",
    borderRadius: 8,
    display: img ? "block" : "none"
  };

  const descStyle = {
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.35,
    marginTop: 2
  };

  return (
    <div
      key={it.id || it.__file}
      style={card}
      onClick={() => this.openModal(it)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && this.openModal(it)}
    >
      <div style={titleStyle}>{title}</div>
      {img ? <img src={img} alt={title} style={imgStyle} /> : null}
      <div style={descStyle}>{this.truncate(short, dense ? 90 : 120)}</div>
    </div>
  );
}


render() {
  const {
    items = [],
    loading,
    error,
    selectedCategory = "All",
    dense = false
  } = this.state;

  // Build categories dynamically from JSON (plus "All")
  const categories = Array.from(
    new Set(
      items
        .map((it) => (it.category || "").trim())
        .filter(Boolean)
    )
  ).sort();
  const CATEGORIES = ["All", ...categories];

  // Filter by category (if present)
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter(
          (it) =>
            (it.category || "").toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  return (
    <div
      style={{
        fontFamily: "Arial, system-ui, -apple-system, Segoe UI, Roboto",
        // subtle Snowflake-ish background
        background: "linear-gradient(180deg,#F8FAFD 0%, #F1F6FF 100%)",
        minHeight: "100vh",
        padding: 20
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title + subtle density toggle */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h1
            style={{
              fontSize: 32,
              letterSpacing: 0.5,
              fontWeight: 800,
              color: "#29B5E8",             // Snowflake Blue
              margin: 0,
              paddingBottom: 6,
              borderBottom: "3px solid #E8F3FF",
              flex: 1
            }}
          >
            Snowflake PS App Catalog
          </h1>

          <div style={{ marginLeft: 12, fontSize: 13, color: "#666" }}>
            <span style={{ marginRight: 6 }}>View:</span>
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
              aria-label="Three-wide grid"
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
              aria-label="Single column"
            >
              1-wide
            </button>
          </div>
        </div>

        <div style={{ color: "#6b7280", margin: "6px 0 14px" }}>
          Click any card to view full details.
        </div>

        {/* Sidebar + grid */}
        <div style={{ display: "flex", gap: 16 }}>
          {/* Sidebar (dynamic categories) */}
          <aside
            style={{
              width: 200,
              borderRight: "1px solid #e5e7eb",
              paddingRight: 12,
              paddingTop: 6,
              flexShrink: 0
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8, color: "#027AFF" }}>
              Categories
            </div>
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
    </div>
  );
}
