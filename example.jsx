renderModal() {
  const { showModal, selectedItem } = this.state;
  if (!showModal || !selectedItem) return null;

  const title = selectedItem.title || selectedItem.id || selectedItem.__file;
  const mediaSrc = selectedItem._image; // same field you already set

  // overlay
  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 24,
    zIndex: 1000,
  };

  // dialog becomes a side-by-side layout
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
  };

  // LEFT: media column is sticky (doesn't scroll)
  const leftCol = {
    position: "sticky",
    top: 24,                 // matches overlay padding so it sits flush
    alignSelf: "flex-start",
    width: "min(420px, 40vw)"
  };
  const mediaStyle = {
    width: "100%",
    height: "calc(90vh - 48px)", // stay within viewport
    objectFit: "contain",
    display: mediaSrc ? "block" : "none",
    background: "#f6f8fa",
    borderRadius: 12,
  };

  // RIGHT: scrollable content with sticky header (X always visible)
  const rightCol = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
    overflow: "hidden"
  };
  const header = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    background: "#fff",
    borderBottom: "1px solid #eee",
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };
  const body = {
    overflowY: "auto",
    padding: 12
  };
  const closeBtn = {
    border: "1px solid #d0d7de",
    background: "#f6f8fa",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 600
  };

  // simple media type check
  const isVideo = mediaSrc && /\.mp4($|\?)/i.test(mediaSrc);

  return (
    <div style={overlay} onClick={this.closeModal} onKeyDown={(e)=>{ if(e.key==="Escape") this.closeModal(); }}>
      <div style={dialog} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* LEFT: fixed media */}
        <div style={leftCol}>
          {isVideo ? (
            <video src={mediaSrc} style={mediaStyle} controls playsInline />
          ) : (
            <img src={mediaSrc} alt={title} style={mediaStyle} />
          )}
        </div>

        {/* RIGHT: sticky header + scrollable content */}
        <div style={rightCol}>
          <div style={header}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
            <button style={closeBtn} onClick={this.closeModal} aria-label="Close">✕</button>
          </div>

          <div style={body} ref={this.modalContentRef}>
            <div
              style={{ color: "#111827", lineHeight: 1.6 }}
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
