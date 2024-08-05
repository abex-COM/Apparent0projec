import React from "react";
import { Link } from "react-router-dom";
// import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink } from "mdbreact";
const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f4f8",
      color: "#333",
      margin: 0,
      padding: 0,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      width: "100%",
      backgroundColor: "#007bff",
      padding: "1rem",
      color: "#fff",
      display: "flex",
      justifyContent: "space-around",
    },
    navLink: {
      color: "#fff",
      margin: "0 15rem",
      textDecoration: "none",
      fontWeight: "bold",
  
    },
    mainContent: {
      width: "30%",
      maxWidth: "800px",
      padding: "1rem",
      flex: "1",
    },
    link: {
      display: "block",
      padding: "1rem",
      margin: "1rem 0",
      textDecoration: "none",
      color: "#fff",
      backgroundColor: "#007bff",
      borderRadius: "8px",
      textAlign: "center",
      fontSize: "1.2rem",
      fontWeight: "bold",
      transition: "background-color 0.3s, transform 0.3s",
      
    },
    linkHovered: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    footer: {
      width: "100%",
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "1rem",
      textAlign: "center",
    },
  };
export default function Header() {
    return (
      <header style={styles.header}>
        <nav>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
          <Link to="/signin" style={styles.navLink}>
            Sign In
          </Link>
          <Link to="/signup" style={styles.navLink}>
            Sign Up
          </Link>
        </nav>
      </header>
    );
  }