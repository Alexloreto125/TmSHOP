import { Col, Row, Button, Table, Container } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../redux/actions";

const Cart = () => {
  // qui dentro uso useSelector per recuperare di nuovo l'array di itmem
  const cart = useSelector((state) => state.cart.content);
  const dispatch = useDispatch();
  const item = useSelector((state) => state.items.available); //LISTA DI ITEM
  const contatoreCart = (cartItem, targetItem) => {
    return cartItem.reduce(
      (count, currentItem) =>
        currentItem.id === targetItem.id ? count + 1 : count,
      0
    );
  };

  const uniqueItemCart = cart.reduce((cartItem, currentItem) => {
    // Verifica se l'elemento corrente è già presente nell'array risultante
    const existingItemIndex = cartItem.findIndex(
      (item) => item.id === currentItem.id
    );
    if (existingItemIndex === -1) {
      // Se non è presente, aggiungilo all'array con una proprietà "quantity" iniziale
      cartItem.push({ ...currentItem, quantity: 1 });
    } else {
      // Se è presente, incrementa la quantità di quell'elemento nell'array risultante
      cartItem[existingItemIndex].quantity++;
    }
    return cartItem;
  }, []);

  return (
    <Container>
      <h1 className="mt-1 text-center">CARRELLO</h1>
      {cart.length > 0 ? (
        <Row className="mt-4">
          <Col className="p-0">
            <Table>
              <thead>
                <tr>
                  <th>Immagine</th>
                  <th>Descrizione Prodotto</th>
                  <th>Prezzo</th>
                  <th>Quantità</th>
                </tr>
              </thead>

              {uniqueItemCart.map((item, i) => (
                <tbody key={i}>
                  <tr className="text-dark">
                    <td>
                      <img
                        className="item-cover-small"
                        src={item.image}
                        alt="item selected"
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.prezzo}</td>
                    <td>
                      <Col className="d-flex align-items-center">
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
                          {contatoreCart(cart, item)}
                        </div>
                        <i
                          className="bi bi-dash-circle iconeCart"
                          onClick={() => {
                            // vorrei aggiungere un item al carrello
                            console.log("RIMUOVO ITEM");

                            dispatch(
                              removeFromCartAction(
                                cart.findIndex(
                                  (cartItem) => cartItem.id === item.id
                                )
                              )
                            );
                          }}
                        ></i>
                      </Col>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Col>
          <Row>
            <Col sm={12} className="fw-bold mb-3 ms-4">
              TOTALE:{" "}
              {cart.reduce(
                (acc, currentValue) => acc + parseFloat(currentValue.prezzo),
                0
              )}
              €
            </Col>
          </Row>
        </Row>
      ) : (
        <h2>Nessun elemento nel carrello...</h2>
      )}
    </Container>
  );
};

export default Cart;
