// Build gallery list from item: `media` is always an array (safe fallback if not)
const mediaList = Array.isArray(selectedItem.media)
  ? selectedItem.media.filter(Boolean)
  : [selectedItem.media].filter(Boolean);

const currentSrc = mediaList[galleryIndex] || null;
const isVideo = currentSrc && /\.mp4($|\?)/i.test(currentSrc);



---


// Category meta (color + icon)
const meta = getCatMeta(selectedItem.category || ""); // you already have getCatMeta()

// Sticky header as a full-width category banner
const header = {
  position: "sticky",
  top: 0,
  zIndex: 2,
  // Banner uses the category color
  background: meta.color,
  color: "#fff",
  padding: "10px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(0,0,0,.05)"
};

// Pill style (used if you decide banner is too bold)
const pill = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "4px 10px",
  borderRadius: 999,
  background: "rgba(255,255,255,.18)",
  color: "#fff",
  fontWeight: 700
};

const leftHeader = (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    {/* Emoji + category name */}
    <div style={pill}>
      <span style={{ fontSize: 16 }}>{meta.icon}</span>
      <span style={{ whiteSpace: "nowrap" }}>{selectedItem.category || "Uncategorized"}</span>
    </div>
  </div>
);

const closeBtn = {
  border: "1px solid rgba(255,255,255,.55)",
  background: "rgba(255,255,255,.22)",
  borderRadius: 10,
  padding: "6px 10px",
  cursor: "pointer",
  fontWeight: 600,
  color: "#fff"
};




----



{/* RIGHT: content */}
<div style={rightCol}>
  <div style={header}>
    {leftHeader}
    <button style={closeBtn} onClick={() => this.closeModal()} aria-label="Close">✕</button>
  </div>

  {/* gallery dots (only if >1 media item) */}
  {mediaList.length > 1 && (
    <div style={dotsWrap}>
      {mediaList.map((_, i) => (
        <div key={i} style={dot(i)} onClick={() => this.setState({ galleryIndex: i })} />
      ))}
    </div>
  )}

  <div style={body} ref={this.modalContentRef}>
    {/* keep your markdown exactly as-is; headings are already colored via CSS */}
    <div
      className="markdown-body"
      style={{ color: "#111827", lineHeight: 1.35, margin: 0 }}
      dangerouslySetInnerHTML={{
        __html: this.markdownToHtml(selectedItem.markdown || "")
      }}
    />
  </div>
</div>


