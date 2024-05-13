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

const CustomNavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Navbar expand="md" data-bs-theme="info" className="backgroundTm ">
      <Container fluid>
        <Navbar.Brand
          href="#"
          className={`text-white fw-bold fst-italic ${
            isDropdownOpen ? "logo-hidden" : ""
          }`}
        >
          <img
            src="public\assets\logo.png"
            alt="logo-TM RACING"
            className="logo rounded"
          />
          <span>TM Racing SHOP</span>
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
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1" className="text-white fs-5">
                Home
              </Nav.Link>
              <Nav.Link href="#action2" className="text-white fs-5">
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
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
                <NavDropdown.Item href="#action3">Profilo</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Impostazioni
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Esci</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
export default CustomNavBar;
