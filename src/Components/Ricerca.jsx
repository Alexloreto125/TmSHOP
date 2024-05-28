import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNavBar from "./CustomNavBar";
import ReturnButton from "./ReturnButton";
import { Card, Col, Container, Row } from "react-bootstrap";

const Ricerca = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <CustomNavBar />
      <ReturnButton />

      <Container style={{ minHeight: "100vh" }}>
        <h1 className="mt-3 text-center">Risultati della Ricerca</h1>
        <Row className="mt-4 mx-auto">
          {results.length > 0 ? (
            results.map((item) => (
              <Col key={item.id} xs={6} md={4} lg={3} className="p-0 mb-4">
                <Card
                  style={{ height: "300px" }}
                  className="item-cover cardSize mt-2"
                  onClick={() => {
                    console.log("Item cliccato:", item);
                    navigate(`/item/${item.id}`);
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt="item selected"
                  />
                  <Card.Body>
                    <Card.Title className="text-truncate">
                      {item.name}
                    </Card.Title>
                    <Card.Text className="text-truncate">
                      {item.description}
                    </Card.Text>
                    <Card.Text className="fs-5 fw-bold">
                      {item.prezzo} €
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h2 className="text-center">Nessun risultato trovato...</h2>
          )}
        </Row>
      </Container>
    </>
    //   </Row>
    // </Container>
  );
};

export default Ricerca;
