import {
  Col,
  Row,
  Button,
  Table,
  Container,
  Alert,
  Modal,
  Form,
  FormLabel,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCartAction,
  // createFatture,
  removeFromCartAction,
  resetCartAction,
} from "../redux/actions";
import ReturnButton from "./ReturnButton";
import CustomNavBar from "./CustomNavBar";
import DeveloperMenu from "./DeveloperMenu";
import { useState } from "react";
import Payment from "./Payment";

// qui dentro uso useSelector per recuperare di nuovo l'array di itmem
const Cart = ({ setUpdateNotification, updateNotification }) => {
  const cart = useSelector((state) => state.cart.content);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const contatoreCart = (cartItem, targetItem) => {
    return cartItem.reduce(
      (count, currentItem) =>
        currentItem.id === targetItem.id ? count + 1 : count,
      0
    );
  };

  const uniqueItemCart = cart.reduce((cartItem, currentItem) => {
    const existingItemIndex = cartItem.findIndex(
      (item) => item.id === currentItem.id
    );
    if (existingItemIndex === -1) {
      cartItem.push({ ...currentItem, quantity: 1 });
    } else {
      cartItem[existingItemIndex].quantity++;
    }
    return cartItem;
  }, []);

  const handleModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePurchase = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const payload = {
        userId: userId,
        items: uniqueItemCart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/fatture/purchase`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Errore durante la creazione della fattura");
      }
      const data = await response.json();
      console.log("Fattura creata:", data);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
      handleCloseModal();
      dispatch(resetCartAction());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CustomNavBar />
      <ReturnButton />
      <Container fluid style={{ minHeight: "100vh" }}>
        <DeveloperMenu
          setUpdateNotification={setUpdateNotification}
          updateNotification={updateNotification}
        />
        <h1 className="mt-1 text-center">CARRELLO</h1>
        {showSuccessAlert && (
          <Alert variant="success" className="text-center">
            Pagamento effettuato con successo!
          </Alert>
        )}
        {cart.length > 0 ? (
          <Row className="mt-4 mx-auto">
            <Col className="p-0" sm={12}>
              <div className="table-responsive">
                <Table striped bordered hover>
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
              </div>
            </Col>
            <Row className="d-flex">
              <Col sm={2} className="fw-bold mb-3 ms-4">
                TOTALE:{" "}
                {cart.reduce(
                  (acc, currentValue) => acc + parseFloat(currentValue.prezzo),
                  0
                )}
                €
              </Col>
              <Col>
                <Button onClick={handleModal}>Acquista</Button>
              </Col>

              {showModal && (
                <Payment
                  handleCloseModal={handleCloseModal}
                  handlePurchase={handlePurchase}
                />
              )}
            </Row>
          </Row>
        ) : (
          <h2>Nessun elemento nel carrello...</h2>
        )}
      </Container>
    </>
  );
};

export default Cart;
