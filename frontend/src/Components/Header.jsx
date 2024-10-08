import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import "../customcss/Header.css";

const Header = () => {
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const logoutHandler = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate("/");
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <Navbar expand="lg" fixed="top" className="header-navbar">
      <Container fluid className="nav-container">
        <Navbar.Brand as={Link} to="/" className="text-white">
          <span className="text-warning mx-2">DEEPIKA</span>SCHOOL
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-item">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-item">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/event" className="nav-item">
              Event
            </Nav.Link>
            <Nav.Link as={Link} to="/activities" className="nav-item">
              Activities
            </Nav.Link>
            <Nav.Link as={Link} to="/notice" className="nav-item">
              Notice
            </Nav.Link>

            {userRole === "User" && (
              <Nav.Link onClick={logoutHandler} className="nav-item">
                <i className="fas fa-sign-out-alt"></i>
                <span className="mx-2">Logout</span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
