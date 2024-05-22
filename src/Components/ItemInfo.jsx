import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../assets/ItemCss.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import store from "./../redux/store/index";
import {
  addToCartAction,
  removeFromCartAction,
} from "./../redux/actions/index";

const ItemInfo = () => {
  const { itemId } = useParams();
  console.log(itemId);
  const items = useSelector((state) => state.items.available);
  const item = items.find((item) => item.id == itemId);
  const dispatch = useDispatch();
  console.log(item);
  const cart = useSelector((state) => state.cart.content);

  if (!item) {
    return (
      <Container>
        <h2>Articolo non trovato...</h2>
      </Container>
    );
  }
  return (
    <Container className="mb-5" fluid>
      <Row className="mt-5" style={{ textAlign: "-moz-center" }}>
        <Col md={6} className="border-end border-light border-4">
          <Col className="border-light border border-4" id="Item-image-info">
            <Card.Img
              variant="top"
              src={item.image}
              className="border border-2 "
            />
          </Col>
        </Col>
        <Col md={6} className="d-flex flex-column text-start">
          <Col className="border-bottom  border-light border-4 mb-4">
            <h1>{item.name}</h1>
          </Col>
          <Col className="border-bottom border-light border-4 mb-4">
            <h3>
              Codice. <i>{item.codice}</i>
            </h3>
          </Col>
          <Col className="border-bottom  border-light border-4 mb-4">
            <h1>{item.descrizione}</h1>
          </Col>

          <Col className="d-flex align-items-center">
            <h2 className="me-3">Quantità</h2>
            <i
              className="bi bi-plus-circle iconeCart"
              onClick={() => {
                // vorrei aggiungere un item al carrello
                console.log("AGGIUNGO ITEM");

                dispatch(addToCartAction(item));
              }}
            ></i>

            <div
              className="border text-center ms-3 me-3"
              style={{ width: "40px" }}
            >
              {cart.length}
            </div>
            <i
              className="bi bi-dash-circle iconeCart"
              onClick={() => {
                // vorrei aggiungere un item al carrello
                console.log("RIMUOVO ITEM");

                dispatch(removeFromCartAction(cart.length - 1));
              }}
            ></i>
          </Col>
          <Col className="d-flex">
            <span className="fs-2 fw-bold">{item.prezzo}€</span>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemInfo;
