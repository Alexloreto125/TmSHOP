import { Col, Container, Row } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-dark text-white py-3">
        <Container fluid>
          <Row>
            <Col className="text-center">
              &copy; {currentYear} Alex. All rights reserved.
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="text-center">
              <span className="text-white me-3">
                <a
                  href="https://www.linkedin.com/in/alex-loreto-6b5615250/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white me-3 ms-2"
                  style={{
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  Alex Loreto <FaLinkedin />
                </a>
              </span>
              <span className="text-white me-3">
                alex3012_ <FaDiscord />
              </span>

              <span className="text-white me-3">
                <a
                  href="mailto:alexloreto125@gmail.com"
                  className="text-white ms-2"
                  style={{
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  alexloreto125@gmail.com <MdMarkEmailUnread />
                </a>
              </span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
