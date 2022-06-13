import React from "react";

const baseStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5px",
  marginBottom: "5px",
  padding: "20px",
  borderWidth: "0.5px",
  borderRadius: 5,
  borderColor: "#677BF7",
  borderStyle: "dashed",
  borderOpacity: 0.7,
  outline: "none",
  height: "140px",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const UploaderPlaceholder = () => (
  <div style={baseStyle}>
    <p className="font-nunito text-11px text-grey-420">
      Drag and drop or{" "}
      <span className="text-blurple-link opacity-80">pick a file</span>
    </p>
  </div>
);

UploaderPlaceholder.defaultProps = {
  isMultiple: false,
};

export default UploaderPlaceholder;
