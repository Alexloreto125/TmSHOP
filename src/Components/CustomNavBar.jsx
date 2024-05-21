import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../assets/NavBarCss.css";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomNavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const navigate = useNavigate();

  return (
    <Navbar expand="md" data-bs-theme="info" className="backgroundTm ">
      <Container fluid>
        <Navbar.Brand
          className={`text-white fw-bold fst-italic ${
            isDropdownOpen ? "logo-hidden" : ""
          }`}
        >
          <Link to={"/home"} className="Link-Navbar">
            <img
              src="public\assets\logo.png"
              alt="logo-TM RACING"
              className="logo rounded"
            />
            <span>TM Racing SHOP</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          onShow={handleDropdownOpen}
          onHide={handleDropdownClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img
                src="public\assets\logo.png"
                alt="logo-TM RACING"
                className="logo-dropdown rounded"
              />{" "}
              TM Racing Shop
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-2 d-flex align-items-center">
              <Link to={"/home"} className="text-white fs-5 Link-Profile me-3">
                Home
              </Link>
              <Link to={"/home"} className="text-white fs-5 Link-Profile me-3">
                Contact us
              </Link>
            </Nav>
            <Form className="d-flex align-items-center ms-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Nav>
              <NavDropdown
                title={<CgProfile className="profile-icon" />}
                id="offcanvasNavbarDropdown"
                className="dropdown-toggle"
              >
                <NavDropdown.Item>
                  <Link to={"/profile"}>Profilo</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Impostazioni
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Esci
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
export default CustomNavBar;
