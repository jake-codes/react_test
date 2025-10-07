const leftCol = {
  gridArea: "left",
  height: "95vh",                // matches modal height
  width: "min(420px, 40vw)",
  background: "#11567F",         // Executive KPI Dashboard Suite blue
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  position: "relative",
  padding: 20,                   // more padding for breathing room
  boxSizing: "border-box"
};

const mediaWrap = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  borderRadius: 10,
  background: "rgba(255,255,255,.08)",
  padding: 20                    // more padding inside image area
};

const mediaStyle = {
  maxWidth: "90%",
  maxHeight: "85%",
  objectFit: "contain",
  borderRadius: 8
};



---

const rightCol = {
  gridArea: "right",
  height: "95vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  padding: 20                    // more padding for the text content
};

const body = {
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  paddingBottom: 24              // extra space at bottom so it doesn’t feel tight
};




---

background: "#F9FAFB",
