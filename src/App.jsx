import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavBar from "./Components/CustomNavBar";
import GrigliaItem from "./Components/GrigliaItem";
import Categoria from "./Components/Categoria";
import { Container, Row, Col } from "react-bootstrap";
import RegisterAndLogin from "./Components/RegisterAndLogin";

function App() {
  return (
    <body className="background-image">
      {/* <RegisterAndLogin /> */}
      <CustomNavBar />
      <Container className="d-flex mt-3 relative-container" fluid>
        <Row className="mt-3">
          <Col>
            <Categoria />
          </Col>
          <Col xs={12} md={9}>
            <GrigliaItem />
          </Col>
        </Row>
      </Container>
    </body>
  );
}

export default App;
