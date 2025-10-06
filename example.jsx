resolveMediaPath = (src) => {
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) return src;         // absolute URL
  if (src.startsWith("/")) return src;               // already rooted
  // flat /data directory served by nginx
  return `/data/${src}`;
};



----


renderModal() {
  const { showModal, selectedItem, galleryIndex = 0 } = this.state;
  if (!showModal || !selectedItem) return null;

  const title = selectedItem.title || selectedItem.id || selectedItem.__file;

  // ① MEDIA: always expect an array `media: []`
  const mediaListRaw = Array.isArray(selectedItem.media) ? selectedItem.media : [selectedItem.media];
  const mediaList = mediaListRaw.filter(Boolean).map(this.resolveMediaPath);
  const currentSrc = mediaList[galleryIndex] || null;
  const isVideo = currentSrc && /\.mp4($|\?)/i.test(currentSrc);

  // ② CATEGORY meta + colors
  const meta = getCatMeta(selectedItem.category || "");
  const catPill = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,.18)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 12
  };

  // ③ Overlay + dialog (close button floats; NO header bar)
  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 24,
    zIndex: 9999,
  };
  const dialog = {
    width: "min(1100px, 98vw)",
    maxHeight: "90vh",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
    overflow: "hidden",
    display: "flex",
    gap: 16,
    padding: 16,
    position: "relative",
  };

  // ④ LEFT panel = category color bg, media area (flex:1), chip pinned bottom
  const leftCol = {
    position: "sticky",
    top: 24,
    alignSelf: "flex-start",
    width: "min(420px, 40vw)",
    borderRadius: 12,
    background: meta.color,        // ← colored background per category
    display: "flex",
    flexDirection: "column",
    padding: 10,
    overflow: "hidden",
  };
  const mediaWrap = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 10,
    background: "rgba(255,255,255,.08)",
  };
  const mediaStyle = { width: "100%", height: "100%", maxHeight: "calc(90vh - 120px)", objectFit: "contain" };

  // ⑤ RIGHT content (sticky title bar removed; keep markdown)
  const rightCol = { flex: 1, display: "flex", flexDirection: "column", maxHeight: "90vh", overflow: "hidden" };
  const body = { overflowY: "auto", padding: 4 };

  // ⑥ Floating close button (since header removed)
  const closeBtn = {
    position: "absolute",
    top: 8,
    right: 8,
    border: "1px solid rgba(0,0,0,.15)",
    background: "#f6f8fa",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 600,
    zIndex: 2,
  };

  // ⑦ Gallery dots (if multiple)
  const dotsWrap = { display: "flex", gap: 6, justifyContent: "center", padding: "8px 0" };
  const dot = (i) => ({
    width: 9, height: 9, borderRadius: 999,
    background: i === galleryIndex ? "#29B5E8" : "#cbd5e1",
    cursor: "pointer"
  });

  return (
    <div style={overlay} onClick={this.closeModal}>
      <div style={dialog} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button style={closeBtn} onClick={this.closeModal} aria-label="Close">✕</button>

        {/* LEFT: colored panel with media and category chip at bottom */}
        <div style={leftCol}>
          <div style={mediaWrap}>
            {currentSrc ? (
              isVideo
                ? <video src={currentSrc} style={mediaStyle} controls playsInline />
                : <img src={currentSrc} alt={title} style={mediaStyle} />
            ) : null}
          </div>

          {/* dots below media if there are multiple items */}
          {mediaList.length > 1 && (
            <div style={dotsWrap}>
              {mediaList.map((_, i) => (
                <div key={i} style={dot(i)} onClick={() => this.setState({ galleryIndex: i })} />
              ))}
            </div>
          )}

          {/* category pill pinned at bottom */}
          <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 8 }}>
            <div style={catPill}>
              <span style={{ fontSize: 16 }}>{meta.icon}</span>
              <span style={{ whiteSpace: "nowrap" }}>{selectedItem.category || "Uncategorized"}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: title + markdown (no header bar) */}
        <div style={rightCol}>
          <div style={{ padding: "4px 8px 6px" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0b2b5a" }}>
              {title}
            </div>
          </div>

          <div style={body} ref={this.modalContentRef}>
            <div
              className="markdown-body"
              style={{ color: "#111827", lineHeight: 1.35, margin: 0 }}
              dangerouslySetInnerHTML={{
                __html: this.markdownToHtml(selectedItem.markdown || "")
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}





---

background: `linear-gradient(180deg, ${meta.color} 0%, rgba(0,0,0,.08) 100%)`
