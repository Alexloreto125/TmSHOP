import { useEffect } from "react";
import { Row, Dropdown, Col, DropdownItem, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./../redux/actions/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Categoria = () => {
  const categories = useSelector((state) => state.categories.available);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    // <Row className="mt-3">
    <Col>
      <h2 className="text-center text-dark bg-body-secondary mt-2 p-2 border rounded">
        Categoria
      </h2>
    </Col>
    // </Row>
  );
};
export default Categoria;
