import { Col, Container, Row } from "react-bootstrap";
import CustomNavBar from "./CustomNavBar";
import ReturnButton from "./ReturnButton";
import DeveloperMenu from "./DeveloperMenu";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllStorico } from "../redux/actions";
import "../assets/Storico.css";
const Storico = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storico = useSelector((state) => state.storico.storico);
  //   console.log(storico);
  const userId = sessionStorage.getItem("userId");
  console.log(userId);
  useEffect(() => {
    console.log("FETCHO GLI STORICI");

    dispatch(getAllStorico(userId));
  }, []);

  return (
    <>
      <CustomNavBar />
      <DeveloperMenu />
      <ReturnButton />
      <Container style={{ minHeight: "100vh" }}>
        <Row className="d-flex flex-column">
          <h1 className=" mb-5 text-center">
            <span className="text-white fs-4 fw-bold mx-auto mb-2 ">
              Storico Ordini
            </span>
            <img src="./public/assets/default.png" style={{ width: "60px" }} />
          </h1>

          {storico.length > 0
            ? storico.map((ordine, index) => (
                <Col
                  className="border-bottom mb-5 d-flex align-items-center"
                  key={index}
                >
                  <Link
                    to={`/ordine/${ordine.numero}`}
                    className="Link-Storico"
                  >
                    <span className=" fs-4 fw-bold">
                      {" "}
                      Ordine n# {ordine.numero}
                    </span>
                  </Link>
                </Col>
              ))
            : " Nessun ordine disponibile"}
        </Row>
      </Container>
    </>
  );
};

export default Storico;
