import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const Payment = ({ handleCloseModal, handlePurchase }) => {
  const [formData, setFormData] = useState({
    NumeroCarta: "",
    Date: "",
    Cvv: "",
    Name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleExpiryDateChange = (e) => {
    const { value } = e.target;
    let formattedValue = value;

    if (value.length === 2 && !value.includes("/")) {
      formattedValue = `${value}/`;
    }

    if (formattedValue.length <= 7) {
      setFormData({
        ...formData,
        expiryDate: formattedValue,
      });
    }
  };
  return (
    <>
      <Modal show={true} onHide={handleCloseModal} className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>Modifica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Numero Carta:</Form.Label>
          <Form.Control
            type="text"
            name="NumeroCarta"
            value={formData.NumeroCarta}
            onChange={handleChange}
            placeholder="Inserisci il numero della carta"
            pattern="[0-9]*"
            maxLength="16"
            minLength="16"
            required
          />
        </Modal.Body>
        <Modal.Body>
          <Form.Label>Data:</Form.Label>
          <Form.Control
            type="text"
            name="expiryDate"
            placeholder="MM/YYYY"
            pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
            value={formData.expiryDate}
            onChange={handleExpiryDateChange}
            maxLength="7"
            required
          />
        </Modal.Body>
        <Modal.Body>
          <Form.Label>CVV:</Form.Label>
          <Form.Control
            type="text"
            name="Cvv"
            value={formData.Cvv}
            onChange={handleChange}
            placeholder="Inserisci il CVV"
            pattern="[0-9]*"
            maxLength="3"
            minLength="3"
            required
          />
        </Modal.Body>
        <Modal.Body>
          <Form.Label>Intestatario:</Form.Label>
          <Form.Control
            type="text"
            name="Intestatario"
            value={formData.name}
            onChange={handleChange}
            placeholder="Inserisci l'intestatario"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handlePurchase}>
            PAGA
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Payment;
