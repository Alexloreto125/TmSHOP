import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Card, Container } from "react-bootstrap";

const ItemInfo = () => {
  const { itemId } = useParams();
  console.log(itemId);
  const items = useSelector((state) => state.items.available);
  const item = items.find((item) => item.id == itemId);

  console.log(item);

  if (!item) {
    return (
      <Container>
        <h2>Articolo non trovato...</h2>
      </Container>
    );
  }
  return (
    <>
      <Card className="item-cover cardSize">
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <Card.Text>{item.prezzo} €</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ItemInfo;
