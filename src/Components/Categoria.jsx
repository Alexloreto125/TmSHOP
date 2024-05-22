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
    <Row className="mt-3">
      <Col>
        <h2 className="text-center">Categoria</h2>
        {/* <ListGroup defaultActiveKey="/category">
          {categories.map((categoria) => (
            <ListGroup.Item
              action
              onClick={() => {
                navigate(`/categoria/${categoria.id}`);
              }}
              key={categoria.id}
            >
              {console.log("categoria cliccata")}

              {categoria.name}
            </ListGroup.Item>
          ))}
        </ListGroup> */}
      </Col>
    </Row>
  );
};
export default Categoria;
