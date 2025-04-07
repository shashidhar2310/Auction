import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../App"; // AuthContext from App.jsx

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Link to="/" className="navbar-brand">
          IPL Auction
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-4">
            <Link className="nav-link" to="/">Home</Link>

            {!user ? (
              <>
                <Link className="nav-link" to="/register">Register</Link>
                <Link className="nav-link" to="/login">Login</Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/auction">Add Player</Link>
                <Link className="nav-link" to="/players">Players List</Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light btn-sm"
                >
                  Logout
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
