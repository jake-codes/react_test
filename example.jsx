const mediaListRaw = Array.isArray(selectedItem.media) ? selectedItem.media : [selectedItem.media];
const mediaList = mediaListRaw.filter(Boolean).map(this.resolveMediaPath);
const currentSrc = mediaList[galleryIndex] || null;
const isVideo = currentSrc && /\.mp4($|\?)/i.test(currentSrc);
const meta = getCatMeta(selectedItem.category || "");





----


// LEFT: fills full modal height, colored bg, media centered
const leftCol = {
  alignSelf: "stretch",       // ⬅️ stretch to full dialog height
  height: "100%",             // ⬅️ ensure full height
  width: "min(420px, 40vw)",
  borderRadius: 12,
  background: meta.color,
  display: "flex",
  flexDirection: "column",
  padding: 10,
  overflow: "hidden",
};

const mediaWrap = {
  flex: 1,                    // ⬅️ take all available height
  display: "flex",
  alignItems: "center",       // ⬅️ perfectly centered
  justifyContent: "center",   // ⬅️ perfectly centered
  overflow: "hidden",
  borderRadius: 10,
  background: "rgba(255,255,255,.08)",
};

const mediaStyle = {
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  objectFit: "contain"
};



----



// category pill styles (reuse your existing catPill if you have it)
const catPillRight = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 12px",
  borderRadius: 999,
  background: meta.light,
  color: meta.color,
  fontWeight: 700,
  fontSize: 12
};

...

{/* RIGHT: replace title with category pill */}
<div style={rightCol}>
  <div style={{ padding: "4px 8px 6px" }}>
    <div style={catPillRight}>
      <span style={{ fontSize: 16 }}>{meta.icon}</span>
      <span style={{ whiteSpace: "nowrap" }}>{selectedItem.category || "Uncategorized"}</span>
    </div>
  </div>

  <div style={body} ref={this.modalContentRef}>
    <div
      className="markdown-body"
      style={{ color: "#111827", lineHeight: 1.35, margin: 0 }}
      dangerouslySetInnerHTML={{ __html: this.markdownToHtml(selectedItem.markdown || "") }}
    />
  </div>
</div>





----


{/* dots … (if multiple) */}

<div style={{ display: "flex", justifyContent: "flex-start", marginTop: 8 }}>
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 10px", borderRadius: 999,
    background: "rgba(255,255,255,.18)", color: "#fff",
    fontWeight: 700, fontSize: 12
  }}>
    <span style={{ fontSize: 16 }}>{meta.icon}</span>
    <span style={{ whiteSpace: "nowrap" }}>{selectedItem.category || "Uncategorized"}</span>
  </div>
</div>




----



background: `linear-gradient(180deg, ${meta.color} 0%, rgba(0,0,0,.08) 100%)`
