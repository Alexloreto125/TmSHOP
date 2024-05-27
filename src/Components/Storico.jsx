import { Col, Container, Row } from "react-bootstrap";
import CustomNavBar from "./CustomNavBar";
import ReturnButton from "./ReturnButton";

const Storico = () => {
  return (
    <>
      <CustomNavBar />
      <ReturnButton />
      <Container style={{ minHeight: "100vh" }}>
        <Row className="d-flex flex-column">
          <h1 className=" mb-5 text-center">
            <span className="text-white fs-4 fw-bold mx-auto mb-2 ">
              Storico Ordini
            </span>
            <img src="./public/assets/default.png" style={{ width: "60px" }} />
          </h1>
          <Col className="border-bottom mb-5 d-flex align-items-center">
            <span className=" fs-4 fw-bold "> Ordine n#</span>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Storico;
