import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../assets/ItemCss.css";
// import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";

const GrigliaItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/categories");
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
    <Row>
      {items.map((item) => (
        <Col key={item.id} xs={12} md={3} className="p-0 mb-4">
          <Card className="book-cover d-flex flex-column cardSize">
            <Card.Img variant="top" src={item.imageSrc} />{" "}
            {/* Assumi che ci sia una chiave imageSrc nel tuo oggetto item */}
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>{" "}
              {/* Assumi che ci sia una chiave title nel tuo oggetto item */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

    // <Row>
    //   <Col xs={12} md={3} className="p-0 mb-4">
    //     <Card className="book-cover d-flex flex-column cardSize ">
    //       <Card.Img variant="top" src="" />
    //       <Card.Body>
    //         <Card.Title>TITOLO ITEM</Card.Title>
    //       </Card.Body>
    //     </Card>
    //   </Col>
    //   <Col xs={12} md={3} className="p-0 mb-4">
    //     <Card className="book-cover d-flex flex-column cardSize">
    //       <Card.Img variant="top" src="" />
    //       <Card.Body>
    //         <Card.Title>TITOLO ITEM</Card.Title>
    //       </Card.Body>
    //     </Card>
    //   </Col>
    //   <Col xs={12} md={3} className="p-0 mb-4">
    //     <Card className="book-cover d-flex flex-column cardSize">
    //       <Card.Img variant="top" src="" />
    //       <Card.Body>
    //         <Card.Title>TITOLO ITEM</Card.Title>
    //       </Card.Body>
    //     </Card>
    //   </Col>
    //   <Col xs={12} md={3} className="p-0 mb-4">
    //     <Card className="book-cover d-flex flex-column cardSize">
    //       <Card.Img variant="top" src="" />
    //       <Card.Body>
    //         <Card.Title>TITOLO ITEM</Card.Title>
    //       </Card.Body>
    //     </Card>
    //   </Col>
    //   <Col xs={12} md={3} className="p-0 mb-4 ">
    //     <Card className="book-cover d-flex flex-column cardSize">
    //       <Card.Img variant="top" src="" />
    //       <Card.Body>
    //         <Card.Title>TITOLO ITEM</Card.Title>
    //       </Card.Body>
    //     </Card>
    //   </Col>
    //   <Col xs={12} md={3} className="p-0 mb-4  ">
    //     <Card className="book-cover d-flex flex-column cardSize">
    //       <Card.Img variant="top" src="" />
    //       <Card.Body>
    //         <Card.Title>TITOLO ITEM</Card.Title>
    //       </Card.Body>
    //     </Card>
    //   </Col>
    // </Row>
  );
};

export default GrigliaItem;
