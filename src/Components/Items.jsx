import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { fetchItemByCategory } from "../redux/actions";

const Items = () => {
  const { categoriaId } = useParams();
  const isLoading = useSelector((state) => state.categories.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItemByCategory(categoriaId));
  }, [dispatch, categoriaId]);

  const items = useSelector((state) => state.items.available);
  console.log(items);
  if (isLoading) {
    return <Spinner animation="border" variant="warning" />;
  }
  return (
    <Container className="ms-3">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-around">
        {items.map((item) => (
          <Col key={item.id} xs={12} md={4} lg={3} className="p-0 mb-2">
            <Card className="item-cover cardSize">
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Items;
