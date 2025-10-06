state = {
  items: [],
  loading: true,
  error: "",
  selectedCategory: "All",
  dense: false,                 // false=3-wide, true=1-wide
  showModal: false,
  selectedItem: null,
  galleryIndex: 0               // NEW: which image in modal
};

openModal = (it) => {
  this.setState({ selectedItem: it, showModal: true, galleryIndex: 0 }, () => {
    if (this.modalContentRef?.current) this.modalContentRef.current.scrollTop = 0;
  });
};



----




renderCard(it) {
  const { dense } = this.state;
  const title = it.title || it.short_title || it.id || it.__file;
  const desc  = it.description || it.short || it.short_title || "";
  const img   = it._image;

  // Shared styles
  const base = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,.05)",
    transition: "transform .15s ease, box-shadow .15s ease",
    cursor: "pointer"
  };
  const titleStyle = { fontSize: 16, fontWeight: 700, color: "#0b2b5a", lineHeight: 1.2 };
  const descStyle  = { color: "#475569", fontSize: 14, lineHeight: 1.35, marginTop: 4 };

  // 1-wide layout: media LEFT, content RIGHT
  if (dense) {
    return (
      <div
        key={it.id || it.__file}
        style={{ ...base, padding: 12, display: "flex", alignItems: "center", gap: 14 }}
        onClick={() => this.openModal(it)}
      >
        {/* left media */}
        <div style={{
          width: 180, minWidth: 180, height: 120,
          background: "#f3f6fb", borderRadius: 8, overflow: "hidden"
        }}>
          {img ? (
            <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : null}
        </div>

        {/* right content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={titleStyle}>{title}</div>
          <div style={descStyle}>{this.truncate(desc, 180)}</div>
        </div>
      </div>
    );
  }

  // 3-wide layout: Title → Image → short description
  return (
    <div
      key={it.id || it.__file}
      style={{ ...base, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}
      onClick={() => this.openModal(it)}
    >
      <div style={titleStyle}>{title}</div>
      {img ? (
        <img
          src={img}
          alt={title}
          style={{ width: "100%", height: 140, objectFit: "cover", background: "#f3f6fb", borderRadius: 8 }}
        />
      ) : null}
      <div style={descStyle}>{this.truncate(desc, 120)}</div>
    </div>
  );
}


----


renderModal() {
  const { showModal, selectedItem, galleryIndex } = this.state;
  if (!showModal || !selectedItem) return null;

  const title = selectedItem.title || selectedItem.id || selectedItem.__file;

  // Build gallery list from item: prefer "images" array, else fallback to single image.
  const mediaList = Array.isArray(selectedItem.images) && selectedItem.images.length
    ? selectedItem.images
    : [selectedItem._image].filter(Boolean);

  const currentSrc = mediaList[galleryIndex] || null;
  const isVideo    = currentSrc && /\.mp4($|\?)/i.test(currentSrc);

  // Overlay + dialog
  const overlay = {
    position: "fixed", inset: 0, background: "rgba(0,0,0,.55)",
    display: "flex", justifyContent: "center", alignItems: "flex-start",
    padding: 24, zIndex: 1000
  };
  const dialog = {
    width: "min(1100px, 98vw)", maxHeight: "90vh", background: "#fff",
    borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,.25)",
    overflow: "hidden", display: "flex", gap: 16, padding: 16
  };

  // LEFT: sticky media column with Snowflake mid-blue background
  const leftCol = {
    position: "sticky", top: 24, alignSelf: "flex-start",
    width: "min(420px, 40vw)", borderRadius: 12,
    background: "#11567F",              // Snowflake MID-BLUE
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 8, overflow: "hidden"
  };
  const mediaStyle = {
    width: "100%", height: "calc(90vh - 64px)", objectFit: "contain",
    display: currentSrc ? "block" : "none"
  };

  // RIGHT: sticky header + scrollable body
  const rightCol = { flex: 1, display: "flex", flexDirection: "column", maxHeight: "90vh", overflow: "hidden" };
  const header   = {
    position: "sticky", top: 0, zIndex: 1, background: "#fff",
    borderBottom: "1px solid #eee",
    padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between"
  };
  const body     = { overflowY: "auto", padding: 12 };

  const closeBtn = {
    border: "1px solid #d0d7de", background: "#f6f8fa", borderRadius: 10,
    padding: "6px 10px", cursor: "pointer", fontWeight: 600
  };

  // Dots for gallery
  const dotsWrap = { display: "flex", gap: 6, justifyContent: "center", padding: "8px 0" };
  const dot = (i) => ({
    width: 9, height: 9, borderRadius: 999,
    background: i === galleryIndex ? "#29B5E8" : "#cbd5e1",
    cursor: "pointer"
  });

  return (
    <div style={overlay} onClick={() => this.closeModal()} onKeyDown={(e)=>{ if(e.key==="Escape") this.closeModal(); }}>
      <div style={dialog} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* LEFT: media on blue */}
        <div style={leftCol}>
          {currentSrc ? (
            isVideo ? (
              <video src={currentSrc} style={mediaStyle} controls playsInline />
            ) : (
              <img src={currentSrc} alt={title} style={mediaStyle} />
            )
          ) : null}
        </div>

        {/* RIGHT: content */}
        <div style={rightCol}>
          <div style={header}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
            <button style={closeBtn} onClick={() => this.closeModal()} aria-label="Close">✕</button>
          </div>

          {/* gallery dots (only if >1 image) */}
          {mediaList.length > 1 && (
            <div style={dotsWrap}>
              {mediaList.map((_, i) => (
                <div key={i} style={dot(i)} onClick={() => this.setState({ galleryIndex: i })} />
              ))}
            </div>
          )}

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


