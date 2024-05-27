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
import CustomNavBar from "./CustomNavBar";

const ItemsGriglia = ({ updateNotification, setUpdateNotification }) => {
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
    <>
      <CustomNavBar />
      <ReturnButton />
      <Container fluid style={{ minHeight: "100vh" }}>
        <DeveloperMenu
          setUpdateNotification={setUpdateNotification}
          updateNotification={updateNotification}
        />
        <Row className="g-4 justify-content-around mt-3">
          <Col xs={12} md={3} className="d-flex flex-column align-items-start">
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

          <Col xs={12} md={9} className="d-flex flex-wrap">
            {items.map((item) => (
              <Col key={item.id} xs={6} md={4} lg={3} className="p-0 mb-4">
                <Card
                  style={{ height: "300px" }}
                  className="item-cover cardSize mt-2"
                  onClick={() => {
                    console.log("Item cliccato:", item);
                    navigate(`/item/${item.id}`);
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    // style={{ height: "150px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title
                      className="text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {item.name}
                    </Card.Title>
                    <Card.Text
                      className="text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {item.description}
                    </Card.Text>
                    <Card.Text className="fs-5 fw-bold">
                      {item.prezzo} €
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ItemsGriglia;
