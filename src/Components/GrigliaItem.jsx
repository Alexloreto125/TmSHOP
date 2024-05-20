import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../assets/ItemCss.css";
// import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import { method } from "lodash";
import { Container, Dropdown } from "react-bootstrap";

const GrigliaItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/categories", {
          method: "GET", // Puoi cambiare il metodo in base alle tue necessità (GET, POST, ecc.)
          headers: {
            Authorization: `Bearer ${token}`, // Aggiungi il token negli header
            "Content-Type": "application/json", // Aggiungi altri header se necessari
          },
        });
        if (!response.ok) {
          throw new Error("Errore nella richiesta dei dati");
        }
        const data = await response.json();
        setItems(data.content); // Imposta i dati nel tuo stato
        setLoading(false);
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const handleCategorySelect = (category) => {
  //   setSelectedCategory(category);
  // };

  if (loading) {
    return <div>Caricamento...</div>;
  }
  // console.log(items);
  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {items.map((item, index) => (
          <Col key={item.id} xs={12} md={6} lg={3} className="p-0 mb-4">
            <Card
              className={`category-cover cardSize ${
                hoveredIndex === index ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)} // Imposta l'indice quando il mouse entra nella card
              onMouseLeave={() => setHoveredIndex(null)} // Resetta l'indice quando il mouse esce dalla card
              onClick={() => console.log("Card cliccata:", item)} // Azione da eseguire al clic sulla card
            >
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>{" "}
                {/* Assumi che ci sia una chiave title nel tuo oggetto item */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* <Dropdown className="d-md-none">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Seleziona Categoria
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {items.map((item) => (
            <Dropdown.Item
              key={item.id}
              onClick={() => handleCategorySelect(item)}
            >
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown> */}
    </Container>
  );
};

export default GrigliaItem;
