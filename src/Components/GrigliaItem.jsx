import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../assets/ItemCss.css";
// import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import { method } from "lodash";

const GrigliaItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MTU4NjE3NjYsImV4cCI6MTcxNjQ2NjU2Niwic3ViIjoiMTEzOGVmZTUtNGMzZC00ODIxLTg4ZjktNDVkZDJmNzRlNDRiIn0.PRZrWy6cpSS4ZL7vexvSbtLyGo5l_M3fdQbM9mKzmGgSL_TBPGVMLYB7fbLigVEL";
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

    fetchData(); // Chiama la funzione per fare la fetch quando il componente viene montato
  }, []);

  if (loading) {
    return <div>Caricamento...</div>;
  }
  console.log(items);
  return (
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
            <Card.Img variant="top" src={item.imageSrc} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>{" "}
              {/* Assumi che ci sia una chiave title nel tuo oggetto item */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default GrigliaItem;
