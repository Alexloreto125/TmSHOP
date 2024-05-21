import React, { useState } from "react";
import { Button, Form, FormControl, Modal, Nav, Tab } from "react-bootstrap";
import "../assets/AnimatedCss.css";
import { FaHome, FaUser, FaCog, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../redux/actions";

const DeveloperMenu = ({ setUpdateNotification, updateNotification }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const [formType, setFormType] = useState("create");
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3001/api/categories/${categoryIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Categoria eliminata");
        // setUpdateNotification(!updateNotification);
        closeForm();
        dispatch(fetchCategories());
      } else {
        console.log(response.statusText);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

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

  const handleDeleteChange = (e) => {
    setCategoryIdToDelete(e.target.value);
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

    const token = sessionStorage.getItem("token");

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
            dispatch(fetchCategories());
            return data;
          });
        } else if (response.status === 500) {
          console.log(response.message);
        } else throw new Error();
      })
      .catch((err) => {
        console.log(err.message);
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
          <Modal.Title className="text-dark">Gestione Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <Tab.Container defaultActiveKey="create">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="create">Crea Categoria</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="delete">Elimina Categoria</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="create">
                <Form onSubmit={handleFormSubmit}>
                  <Form.Label>Categoria:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci nome Categoria"
                    onChange={(e) => handleChange(e, "name")}
                    className="mb-2"
                    value={category.name}
                  />
                  <Form.Label>Descrizione:</Form.Label>
                  <FormControl
                    className="mt-2 mb-2"
                    type="text"
                    placeholder="Inserisci descrizione"
                    onChange={(e) => handleChange(e, "description")}
                    value={category.description}
                  />
                  <Button variant="primary" type="submit">
                    Invia
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="delete">
                <Form onSubmit={handleDeleteSubmit}>
                  <Form.Label>ID Categoria:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci ID Categoria"
                    onChange={handleDeleteChange}
                    className="mb-2"
                    value={categoryIdToDelete}
                  />
                  <Button variant="danger" type="submit">
                    Elimina
                  </Button>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeveloperMenu;
