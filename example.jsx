{this.state.showModal ? this.renderModal() : null}



---


return (
  <div style={{ height:"100vh", display:"flex", /* ... */ }}>
    <aside>{/* ... */}</aside>

    <main>{/* title + sticky tools + grid scroller */}</main>

    {/* ⬇️ place modal here, NOT inside <main> */}
    {this.state.showModal ? this.renderModal() : null}
  </div>
);



----


onClick={() => this.openModal(it)}



----


openModal = (it) => {
  this.setState({ selectedItem: it, showModal: true, galleryIndex: 0 }, () => {
    this.modalContentRef?.current && (this.modalContentRef.current.scrollTop = 0);
  });
};

closeModal = () => this.setState({ showModal: false, selectedItem: null });





---


const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: 24,
  zIndex: 9999,  // high enough over sticky headers
};



----


<div style={overlay} onClick={this.closeModal}>
  <div style={dialog} onClick={(e) => e.stopPropagation()}>
    {/* modal content */}
  </div>
</div>
