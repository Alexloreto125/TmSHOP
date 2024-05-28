import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../assets/NavBarCss.css";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import logo from "/assets/logo.png";

const CustomNavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cart = useSelector((state) => state.cart.content);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [imgSrc, setImgSrc] = useState(logo);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    setImgSrc(logo); // Forza il ricaricamento dell'immagine
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/item/search?q=${searchQuery}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        // Navigate to a search results page or display results in a dropdown
        navigate("/results", { state: { results: data } });
        console.log("Risultati della ricerca:", data);
      } else {
        navigate("/results");
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
              // src="public\assets\logo.png"
              src={imgSrc}
              alt="logo-TM RACING"
              className="logo rounded"
            />
            <span>TM Racing SHOP</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" md={"false"} />
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
                // src="public\assets\logo.png"
                src={imgSrc}
                alt="logo-TM RACING"
                className="logo-dropdown rounded"
              />{" "}
              TM Racing Shop
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-2 d-flex align-items-center">
              {isMobile ? (
                <>
                  <Link
                    to={"/profile"}
                    className="fs-5 mb-5 Link-Navbar-OffCanvas me-3"
                  >
                    Profile{" "}
                  </Link>
                  <Link
                    to={"/cart"}
                    className="fs-5 Link-Navbar-OffCanvas me-3"
                  >
                    Carrello
                  </Link>
                  <Link
                    to={"/home"}
                    className=" fs-5 Link-Navbar-OffCanvas me-3"
                  >
                    Home
                  </Link>
                </>
              ) : (
                ""
              )}

              {/* </Nav> */}
              <Form
                className="d-flex align-items-center ms-3"
                onSubmit={handleSearch}
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="ms-3"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  className="ms-3"
                  variant="outline-success"
                  type="submit"
                >
                  Search
                </Button>
              </Form>
              {/* <Nav> */}
              <NavDropdown
                title={<CgProfile className="profile-icon ms-3" />}
                id="offcanvasNavbarDropdown"
                className="dropdown-toggle"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profilo
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

              {cart.length > 0 ? (
                <i
                  className="bi bi-minecart-loaded ms-3 text-white"
                  onClick={() => {
                    console.log("carrellino pieno cliccato");
                    navigate("/cart");
                  }}
                ></i>
              ) : (
                <i
                  className="bi bi-minecart ms-3 text-white"
                  onClick={() => {
                    console.log("carrellino cliccato");
                    navigate("/cart");
                  }}
                ></i>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
export default CustomNavBar;
