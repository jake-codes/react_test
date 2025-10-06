renderChip(it) {
  if (!it.category) return null;
  const meta = getCatMeta(it.category);
  return (
    <div style={{
      marginTop: "auto",          // ⬅️ pushes chip to the bottom
      marginBottom: 0,            // ⬅️ no extra bottom margin
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
      height: "100%"          // ⬅️ let the column stretch
    }}
    onClick={() => this.openModal(it)}
  >
    <div style={titleStyle}>{title}</div>
    {img ? <img src={img} alt={title} style={{ width:"100%", height:140, objectFit:"cover", background:"#f3f6fb", borderRadius:8 }} /> : null}
    <div style={{ color:"#475569", fontSize:14, lineHeight:1.35 }}>{this.truncate(desc, 120)}</div>

    {this.renderChip(it)}     {/* ⬅️ sits at consistent bottom */}
  </div>
);


---


// 1-wide
return (
  <div
    key={it.id || it.__file}
    style={{ ...base, padding: 12, display: "flex", alignItems: "center", gap: 14 }}
    onClick={() => this.openModal(it)}
  >
    <div style={{ width:180, minWidth:180, height:120, background:"#f3f6fb", borderRadius:8, overflow:"hidden" }}>
      {img ? <img src={img} alt={title} style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : null}
    </div>

    <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
      <div style={titleStyle}>{title}</div>
      <div style={{ color:"#475569", fontSize:14, lineHeight:1.35 }}>{this.truncate(desc, 180)}</div>

      {this.renderChip(it)}   {/* ⬅️ bottom of right column */}
    </div>
  </div>
);



----


const SF_BLUE     = "#29B5E8";
const SF_MID_BLUE = "#11567F";
const SF_ORANGE   = "#FF9F36";
const HEADER_BG   = "#E8F3FF";
const SIDEBAR_BG  = "#0F3E5C";   // ⬅️ deep Snowflake-y blue for the panel


----


render() {
  const { items = [], loading, error, selectedCategory = "All", dense = false } = this.state;

  const categories = Array.from(new Set(items.map(it => (it.category || "").trim()).filter(Boolean))).sort();
  const filtered =
    selectedCategory === "All" ? items :
    items.filter(it => (it.category || "").toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(180deg,#F8FAFD 0%, #F1F6FF 100%)"
    }}>
      {/* HEADER (sticky, spans full width) */}
      <div style={{ position:"sticky", top:0, zIndex:5, background: HEADER_BG, borderBottom:"1px solid #dbe7fb" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"14px 20px", display:"flex", alignItems:"center" }}>
          <h1 style={{ fontFamily:"Arial, system-ui, -apple-system, Segoe UI, Roboto", fontSize:30, fontWeight:800, letterSpacing:.4, color:SF_BLUE, margin:0, flex:1 }}>
            Snowflake PS App Catalog
          </h1>

          {/* View toggle (unchanged) */}
          <div style={{ marginLeft:12, fontSize:13, color:"#cbd5e1" }}>
            <span style={{ marginRight:6, color:"#64748b" }}>View:</span>
            <button onClick={() => this.setState({ dense:false })}
              style={{ border:"none", background:"transparent", color: !dense ? "#0EA5E9" : "#94a3b8", fontWeight: !dense ? 700 : 400, cursor:"pointer", marginRight:6 }}>
              3-wide
            </button>
            <button onClick={() => this.setState({ dense:true })}
              style={{ border:"none", background:"transparent", color: dense ? "#0EA5E9" : "#94a3b8", fontWeight: dense ? 700 : 400, cursor:"pointer" }}>
              1-wide
            </button>
          </div>
        </div>
      </div>

      {/* BODY: sidebar + scrolling grid */}
      <div style={{ flex:1, minHeight:0, display:"flex", gap:16 }}>
        {/* SIDEBAR (sticky; blue with white text) */}
        <aside style={{
          width:250, flexShrink:0, position:"sticky", top:0, alignSelf:"flex-start", height:"100%",
          background: SIDEBAR_BG, color: "#fff", padding:"14px 14px", boxShadow:"inset -1px 0 0 rgba(255,255,255,.08)"
        }}>
          <div style={{ fontWeight:800, marginBottom:10, color:"#E3F2FD" }}>Categories</div>

          {/* All */}
          <div
            onClick={() => this.setState({ selectedCategory:"All" })}
            style={{
              padding:"8px 10px", borderRadius:10, cursor:"pointer",
              background: selectedCategory==="All" ? "rgba(255,255,255,.12)" : "transparent",
              color:"#fff", marginBottom:6, display:"flex", alignItems:"center", gap:8
            }}>
            <span style={{ width:8, height:8, borderRadius:99, background:"#8ED8F8" }} />
            All
          </div>

          {/* Dynamic categories — subtle alternation on TEXT only */}
          {categories.map((cat, idx) => {
            const active = selectedCategory === cat;
            const textColor = active ? "#fff" : (idx % 2 === 0 ? "#B3E5FC" : SF_ORANGE);
            return (
              <div
                key={cat}
                onClick={() => this.setState({ selectedCategory:cat })}
                style={{
                  padding:"8px 10px", borderRadius:10, cursor:"pointer",
                  background: active ? "rgba(255,255,255,.12)" : "transparent",
                  color: textColor, marginBottom:6, display:"flex", alignItems:"center", gap:8, fontWeight: active ? 800 : 600
                }}>
                <span style={{ width:8, height:8, borderRadius:99, background:"rgba(255,255,255,.4)" }} />
                <span style={{ lineHeight:1 }}>{cat}</span>
              </div>
            );
          })}
        </aside>

        {/* MAIN (this is the only scroller) */}
        <main style={{ flex:1, minWidth:0, minHeight:0, overflowY:"auto", padding:"12px 12px 20px" }}>
          <div style={{ color:"#6b7280", margin:"0 0 12px" }}>Click any card to view full details.</div>

          {loading && <div>Loading…</div>}
          {error && !loading && <div style={{ color:"crimson", marginBottom:12 }}>{error}</div>}

          <div style={{
            display:"grid",
            gridTemplateColumns: dense ? "repeat(1, 1fr)" : "repeat(auto-fill, minmax(300px, 1fr))",
            gap:16
          }}>
            {filtered.map((it) => this.renderCard(it))}
          </div>
        </main>
      </div>

      {this.renderModal()}
    </div>
  );
}
