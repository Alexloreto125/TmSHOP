import React, { useState } from "react";
import { Button, Form, FormControl, Modal, Nav } from "react-bootstrap";
import "../assets/AnimatedCss.css";
import { FaHome, FaUser, FaCog, FaTimes } from "react-icons/fa";

const DeveloperMenu = ({ setUpdateNotification, updateNotification }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const initialCategory = {
    name: "",
    description: "",
  };

  const [category, setCategory] = useState(initialCategory);
  const handleChange = (e, key) => {
    setCategory({
      ...category,
      [key]: e.target.value,
    });
  };

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/categories/create", {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setCategory(initialCategory);
            console.log("Categoria creata ", data);
            setUpdateNotification(!updateNotification);
            closeForm();
            // return data;
          });
        } else throw new Error("STORTO API");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`menu-container ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        {isOpen ? <FaCog /> : <FaTimes />}
      </button>
      <ul className="menu-items">
        <li onClick={openForm}>
          <FaHome />
        </li>
        <li>
          <FaUser />
        </li>
        <li>
          <FaCog />
        </li>
      </ul>
      <Modal show={showForm} onHide={closeForm} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Crea Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <Form onSubmit={handleFormSubmit}>
            <Form.Label>Categoria: </Form.Label>
            <FormControl
              type="text"
              name="homeInput"
              placeholder="Inserisci nome Categoria"
              onChange={(e) => {
                handleChange(e, "name");
              }}
              className="mb-2"
              value={category.name}
            />
            <Form.Label>Descrizione: </Form.Label>
            <FormControl
              className="mt-2 mb-2"
              type="text"
              name="homeInput"
              placeholder="Inserisci descrizione"
              onChange={(e) => {
                handleChange(e, "description");
              }}
              value={category.description}
            />
            <Button variant="primary" type="submit">
              Invia
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeveloperMenu;
