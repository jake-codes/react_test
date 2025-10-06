const SF_BLUE     = "#29B5E8";
const SF_MID_BLUE = "#11567F";
const SF_ORANGE   = "#FF9F36";
const HEADER_BG   = "#E8F3FF";  // subtle blue
const SIDEBAR_BG  = "#F7FAFF";  // even lighter panel blue


-------


render() {
  const {
    items = [],
    loading,
    error,
    selectedCategory = "All",
    dense = false
  } = this.state;

  // Build dynamic category list
  const categories = Array.from(
    new Set(items.map((it) => (it.category || "").trim()).filter(Boolean))
  ).sort();
  const CATEGORIES = ["All", ...categories];

  // Filtered items
  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter(
          (it) =>
            (it.category || "").toLowerCase() === selectedCategory.toLowerCase()
        );

  // ---- Layout containers (header sticky, sidebar sticky, grid scrolls) ----
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg,#F8FAFD 0%, #F1F6FF 100%)"
      }}
    >
      {/* HEADER (sticky, spans full width including over sidebar) */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          background: HEADER_BG,
          borderBottom: "1px solid #dbe7fb"
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <h1
            style={{
              fontFamily: "Arial, system-ui, -apple-system, Segoe UI, Roboto",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: 0.4,
              color: SF_BLUE,
              margin: 0,
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
                color: !dense ? SF_MID_BLUE : "#94a3b8",
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
                color: dense ? SF_MID_BLUE : "#94a3b8",
                fontWeight: dense ? 700 : 400,
                cursor: "pointer"
              }}
              aria-label="Single column"
            >
              1-wide
            </button>
          </div>
        </div>
      </div>

      {/* BODY (fills remaining height; grid area scrolls) */}
      <div
        style={{
          flex: 1,
          minHeight: 0,              // critical for child overflow scrolling
          display: "flex",
          gap: 16
        }}
      >
        {/* SIDEBAR (sticky inside body) */}
        <aside
          style={{
            width: 240,
            flexShrink: 0,
            borderRight: "1px solid #e5e7eb",
            background: SIDEBAR_BG,
            position: "sticky",
            top: 0,                   // relative to body scroll
            alignSelf: "flex-start",
            height: "100%",
            padding: "14px 12px"
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: 10, color: SF_MID_BLUE }}>
            Categories
          </div>

          {/* “All” */}
          <div
            onClick={() => this.setState({ selectedCategory: "All" })}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              cursor: "pointer",
              background: selectedCategory === "All" ? "#E8F3FF" : "transparent",
              color: selectedCategory === "All" ? SF_MID_BLUE : "#333",
              marginBottom: 6,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 99, background: SF_BLUE }} />
            All
          </div>

          {/* dynamic categories with alternating blue/orange TEXT (subtle) */}
          {categories.map((cat, idx) => {
            const isActive = selectedCategory === cat;
            const textColor = isActive
              ? SF_MID_BLUE
              : (idx % 2 === 0 ? SF_MID_BLUE : SF_ORANGE); // alternate like the slide
            const bg = isActive ? "#E8F3FF" : "transparent";
            const dot = "#cbd5e1"; // neutral dot to avoid color clash

            return (
              <div
                key={cat}
                onClick={() => this.setState({ selectedCategory: cat })}
                style={{
                  padding: "8px 10px",
                  borderRadius: 10,
                  cursor: "pointer",
                  background: bg,
                  color: textColor,
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: isActive ? 700 : 600
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 99, background: dot }} />
                <span style={{ lineHeight: 1 }}>{cat}</span>
              </div>
            );
          })}
        </aside>

        {/* MAIN (scrolls) */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            overflowY: "auto",        // only the grid scrolls
            padding: "12px 12px 20px",
          }}
        >
          <div style={{ color: "#6b7280", margin: "0 0 12px" }}>
            Click any card to view full details.
          </div>

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


----


renderChip(it) {
  if (!it.category) return null;
  const meta = getCatMeta(it.category);
  return (
    <div style={{
      marginTop: "auto",                 // 👈 key: push to bottom in a column
      alignSelf: "flex-start",
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
}


---


// 3-wide layout
return (
  <div
    key={it.id || it.__file}
    style={{
      ...base,
      padding: 12,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      height: "100%"                // 👈 let it stretch
    }}
    onClick={() => this.openModal(it)}
  >
    <div style={titleStyle}>{title}</div>
    {img ? <img src={img} alt={title} style={{ width:"100%", height:140, objectFit:"cover", background:"#f3f6fb", borderRadius:8 }} /> : null}
    <div style={{ color:"#475569", fontSize:14, lineHeight:1.35 }}>{this.truncate(desc, 120)}</div>

    {this.renderChip(it)}           {/* 👈 chip uses marginTop:'auto' so it sticks to bottom */}
  </div>
);



---



// 1-wide layout
return (
  <div
    key={it.id || it.__file}
    style={{ ...base, padding: 12, display: "flex", alignItems: "center", gap: 14 }}
    onClick={() => this.openModal(it)}
  >
    {/* left media ... unchanged */}
    <div style={{ width:180, minWidth:180, height:120, background:"#f3f6fb", borderRadius:8, overflow:"hidden" }}>
      {img ? <img src={img} alt={title} style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : null}
    </div>

    {/* right content becomes a column that fills height */}
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
      <div style={titleStyle}>{title}</div>
      <div style={{ color:"#475569", fontSize:14, lineHeight:1.35 }}>{this.truncate(desc, 180)}</div>

      {this.renderChip(it)}         {/* 👈 sits at bottom of the column */}
    </div>
  </div>
);
