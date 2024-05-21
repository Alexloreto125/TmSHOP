import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../assets/ItemCss.css";
// import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import { method } from "lodash";
import { Container, Dropdown } from "react-bootstrap";

const GrigliaItem = ({ updateNotification }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/categories", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Errore nella ricezione dati dal server");
      }

      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    console.log(
      "sono componentDidMount! ma ascolto anche i cambiamenti di updateNotification"
    );

    fetchData();
  }, [updateNotification]);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    // <Container>
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-around">
        {items.map((item, index) => (
          <Col key={item.id} xs={12} md={4} lg={3} className="p-0 mb-2">
            <Card
              className={`category-cover cardSize ${
                hoveredIndex === index ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => console.log("Card cliccata:", item)}
            >
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>{" "}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    // </Row>
    // </Container>
  );
};

export default GrigliaItem;
