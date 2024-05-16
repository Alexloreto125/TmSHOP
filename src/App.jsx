import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavBar from "./Components/CustomNavBar";
import GrigliaItem from "./Components/GrigliaItem";
import Categoria from "./Components/Categoria";
import { Container, Row, Col } from "react-bootstrap";
import RegisterAndLogin from "./Components/RegisterAndLogin";

function App() {
  return (
    <>
      {/* <RegisterAndLogin /> */}
      <CustomNavBar />
      <Container className="d-flex mt-3" fluid>
        <Row>
          <Col>
            <Categoria />
          </Col>
          <Col xs={12} md={9}>
            <GrigliaItem />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
