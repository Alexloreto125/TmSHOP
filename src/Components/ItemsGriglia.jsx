import { useEffect } from "react";
import "../assets/ItemCss.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Dropdown,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { fetchItemByCategory } from "../redux/actions";
import ReturnButton from "./ReturnButton";
import DeveloperMenu from "./DeveloperMenu";

const ItemsGriglia = ({ updateNotification }) => {
  const isLoading = useSelector((state) => state.categories.isLoading);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.available);
  const navigate = useNavigate();
  const { categoriaId } = useParams();
  const items = useSelector((state) => state.items.available);

  useEffect(() => {
    dispatch(fetchItemByCategory(categoriaId));
  }, [dispatch, categoriaId]);

  useEffect(() => {
    dispatch(fetchItemByCategory(categoriaId));
  }, [dispatch, updateNotification]);

  // console.log(items);
  if (isLoading) {
    return <Spinner animation="border" variant="warning" />;
  }
  return (
    <Container fluid>
      <ReturnButton />
      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        className="g-4 justify-content-around mt-3"
      >
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Seleziona Categoria
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {categories.map((categoria) => (
                <Dropdown.Item
                  onClick={() => {
                    console.log("categoria cliccata");
                    navigate(`/categoria/${categoria.id}`);
                  }}
                  key={categoria.id}
                >
                  {categoria.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        {items.map((item) => (
          <Col key={item.id} xs={6} md={4} lg={3} className="p-0 mb-2">
            <Card
              className="item-cover cardSize"
              onClick={() => {
                console.log("Item cliccato:", item);

                navigate(`/item/${item.id}`);
              }}
            >
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>{item.prezzo} €</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemsGriglia;
