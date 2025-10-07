const mediaListRaw = Array.isArray(selectedItem.media) ? selectedItem.media : [selectedItem.media];
const mediaList = mediaListRaw.filter(Boolean).map(this.resolveMediaPath);
const { galleryIndex = 0 } = this.state;
const count = mediaList.length;
const currentSrc = mediaList[galleryIndex] || null;
const isVideo = currentSrc && /\.mp4($|\?)/i.test(currentSrc);


---


const goPrev = (e) => {
  e.stopPropagation();
  if (!count) return;
  this.setState({ galleryIndex: (galleryIndex - 1 + count) % count });
};
const goNext = (e) => {
  e.stopPropagation();
  if (!count) return;
  this.setState({ galleryIndex: (galleryIndex + 1) % count });
};



---


const navBtnBase = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 32,
  height: 32,
  borderRadius: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  userSelect: "none",
  background: "rgba(255,255,255,.22)",
  border: "1px solid rgba(255,255,255,.45)",
  color: "#fff",
  backdropFilter: "blur(2px)",
  boxShadow: "0 1px 4px rgba(0,0,0,.15)"
};
const navLeft  = { ...navBtnBase, left: 12  };
const navRight = { ...navBtnBase, right: 12 };
const navIcon  = { fontSize: 16, lineHeight: 1, marginTop: -1 };




---



{/* subtle arrows (only show if multiple items) */}
{count > 1 && (
  <>
    <div style={navLeft}  onClick={goPrev} aria-label="Previous image">
      <span style={navIcon}>‹</span>
    </div>
    <div style={navRight} onClick={goNext} aria-label="Next image">
      <span style={navIcon}>›</span>
    </div>
  </>
)}



---


<div style={mediaWrap}>
  {currentSrc ? (
    isVideo
      ? <video src={currentSrc} style={mediaStyle} controls playsInline />
      : <img   src={currentSrc} alt=""       style={mediaStyle} />
  ) : null}
</div>



---



onModalKey = (e) => {
  const item = this.state.selectedItem;
  if (!this.state.showModal || !item) return;
  const list = Array.isArray(item.media) ? item.media.filter(Boolean) : [item.media].filter(Boolean);
  const n = list.length || 1;

  if (e.key === "ArrowRight") this.setState(({galleryIndex}) => ({ galleryIndex: (galleryIndex + 1) % n }));
  if (e.key === "ArrowLeft")  this.setState(({galleryIndex}) => ({ galleryIndex: (galleryIndex - 1 + n) % n }));
  if (e.key === "Escape") this.closeModal();
};

componentDidUpdate(prevProps, prevState) {
  if (!prevState.showModal && this.state.showModal) window.addEventListener("keydown", this.onModalKey);
  if (prevState.showModal && !this.state.showModal) window.removeEventListener("keydown", this.onModalKey);
}
componentWillUnmount() {
  window.removeEventListener("keydown", this.onModalKey);
}



---


const leftCol = {
  /* ... */
  background: "#11567F",  // Executive KPI / Snowflake Mid-Blue
  /* ... */
};


---


