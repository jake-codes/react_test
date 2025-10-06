<main
  style={{
    flex: 1,
    minWidth: 0,
    height: "100vh",
    display: "flex",
    flexDirection: "column",   // header + scroller
    background: "#fff"         // change to "#F0F7FF" if you want a blue panel
  }}
>
  {/* fixed header inside main */}
  <div
    style={{
      position: "sticky",
      top: 0,
      zIndex: 2,
      background: "#F8FAFD",   // or match page bg
      padding: "12px 18px 8px",
      borderBottom: "1px solid #e5e7eb"
    }}
  >
    <h1
      style={{
        fontSize: 32,
        letterSpacing: 0.5,
        fontWeight: 800,
        color: "#29B5E8",
        margin: "0 0 6px 0"
      }}
    >
      Snowflake PS App Catalog
    </h1>

    <div style={{ color: "#6b7280", display: "flex", justifyContent: "space-between" }}>
      <span>Click any card to view full details.</span>
      <span style={{ fontSize: 13 }}>
        View:&nbsp;
        <button
          onClick={() => this.setState({ dense: false })}
          style={{
            border: "none",
            background: "transparent",
            color: !this.state.dense ? "#027AFF" : "#94a3b8",
            fontWeight: !this.state.dense ? 700 : 400,
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
            color: this.state.dense ? "#027AFF" : "#94a3b8",
            fontWeight: this.state.dense ? 700 : 400,
            cursor: "pointer"
          }}
        >
          1-wide
        </button>
      </span>
    </div>
  </div>

  {/* grid scroller */}
  <div
    style={{
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: "12px 18px 20px"
    }}
  >
    {this.state.loading && <div>Loading…</div>}
    {this.state.error && !this.state.loading && (
      <div style={{ color: "crimson", marginBottom: 12 }}>{this.state.error}</div>
    )}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: this.state.dense
          ? "repeat(1, 1fr)"
          : "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 16,
        alignItems: "stretch",          // 🔧 stop “smooshing”
        gridAutoRows: "1fr"             // 🔧 consistent row height
      }}
    >
      {filtered.map((it) => this.renderCard(it))}
    </div>
  </div>
</main>




---


// 3-wide
return (
  <div
    key={it.id || it.__file}
    style={{
      ...base,
      padding: 12,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      height: "100%",                    // 🔧 lets it stretch within gridAutoRows:1fr
      boxSizing: "border-box"
    }}
    onClick={() => this.openModal(it)}    // keep onClick here
  >
    <div style={titleStyle}>{title}</div>
    {img ? (
      <img
        src={img}
        alt={title}
        style={{ width: "100%", height: 140, objectFit: "cover", background: "#f3f6fb", borderRadius: 8 }}
      />
    ) : null}
    <div style={{ color: "#475569", fontSize: 14, lineHeight: 1.35 }}>
      {this.truncate(desc, 120)}
    </div>

    {this.renderChip(it)}                 {/* marginTop:'auto' inside renderChip */}
  </div>
);



---



// overlay
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: 24,
  zIndex: 9999,          // 🔧 was 1000; raise above sticky headers
};

// ...
return (
  <div
    style={overlay}
    onClick={() => this.closeModal()}    // clicking outside closes
    onKeyDown={(e) => { if (e.key === "Escape") this.closeModal(); }}
  >
    <div
      style={dialog}
      onClick={(e) => e.stopPropagation()}   // 🔧 prevent overlay from closing immediately
      role="dialog"
      aria-modal="true"
    >
      {/* …rest unchanged… */}
    </div>
  </div>
);





---


<aside style={{
  width: 220,
  flexShrink: 0,
  position: "sticky",
  top: 0,
  alignSelf: "flex-start",
  height: "100vh",
  overflowY: "auto",
  background: "#0F3E5C",     // 🔵 Snowflake-y deep blue
  color: "#fff",
  padding: "16px 12px",
  boxShadow: "inset -1px 0 0 rgba(255,255,255,.08)"
}}>
  {/* …category items… use white/blue/orange text like before */}
</aside>
