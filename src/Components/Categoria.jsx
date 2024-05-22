import { useEffect } from "react";
import { Row, Dropdown, Col, DropdownItem, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./../redux/actions/index";
import { useSelector } from "react-redux";

const Categoria = () => {
  const categories = useSelector((state) => state.categories.available);
  const dispatch = useDispatch();
  return (
    <Row className="mt-3">
      <Col>
        <h2 className="text-center">Categoria</h2>
        <ListGroup defaultActiveKey="/category">
          {categories.map((category) => (
            <ListGroup.Item action href="/category" key={category.id}>
              {category.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};
export default Categoria;
