import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../assets/ItemCss.css";
// import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import { method } from "lodash";
import { Container, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../redux/actions";
import { useSelector } from "react-redux";

const GrigliaItem = () => {
  const items = useSelector((state) => state.categories.available);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(" SONO USE DISPATCH PER FETCHARE LE CATEGORIE");
    dispatch(fetchCategories());
  }, []);

  return (
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
  );
};

export default GrigliaItem;
