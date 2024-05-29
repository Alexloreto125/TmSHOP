import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NoToken = () => {
  return (
    <Container
      fluid
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Row className="text-center">
        <Link to={"/"} className="text-white">
          EFFETTUA IL LOGIN
        </Link>
      </Row>
    </Container>
  );
};

export default NoToken;
