import React from "react";
const footerStyle={
  backgroundColor: "#007bff",
  color: "white",
  height: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems:"center"
}
const Footer = () => {
  return (
    <div
      className="footer"
      style={footerStyle}
    >
      <p>&copy; {new Date().getFullYear()} My Company. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
