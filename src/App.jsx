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
      <RegisterAndLogin />
      {/* <CustomNavBar />
      <Container className="d-flex mt-3 ms-2">
        <Categoria />
        <GrigliaItem />
      </Container> */}
    </>
  );
}

export default App;
