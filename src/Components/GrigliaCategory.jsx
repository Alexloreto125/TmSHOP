import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../assets/ItemCss.css";
// import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../redux/actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GrigliaCategory = () => {
  const category = useSelector((state) => state.categories.available);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(" SONO USE DISPATCH PER FETCHARE LE CATEGORIE");
    dispatch(fetchCategories());
  }, []);

  return (
    <Container className="ms-3">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-around">
        {category.map((categoria, index) => (
          <Col key={categoria.id} xs={12} md={4} lg={3} className="p-0 mb-2">
            <Card
              className={`category-cover cardSize ${
                hoveredIndex === index ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                console.log("Card cliccata:", categoria.id);

                navigate(`/categoria/${categoria.id}`);
              }}
            >
              <Card.Img variant="top" src={categoria.image} />
              <Card.Body>
                <Card.Title>{categoria.name}</Card.Title>{" "}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GrigliaCategory;
