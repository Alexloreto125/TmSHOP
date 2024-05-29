import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormControl,
  Modal,
  Nav,
  Tab,
} from "react-bootstrap";
import "../assets/AnimatedCss.css";
import { FaHome, FaUser, FaCog, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCategories, fetchItemByCategory } from "../redux/actions";
import { useParams } from "react-router-dom";
// import { handleItemFormSubmit } from "./../redux/actions/index";

const DeveloperMenu = ({ setUpdateNotification, updateNotification }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const initialCategory = {
    name: "",
    description: "",
  };
  const initialItem = {
    name: "",
    prezzo: "",
    categoryID: null,
    codice: "",
    descrizione: "",
    image: "",
  };

  const [item, setItem] = useState(initialItem);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileEdit, setSelectedFileEdit] = useState(null);
  const [itemIdToDelete, setItemIdToDelete] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
  const [error, setError] = useState({
    category: null,
    item: null,
    editCategory: null,
    editItem: null,
  });
  const [errorItem, setErrorItem] = useState(null);
  const defaultImageUrl =
    "http://res.cloudinary.com/alexstrive/image/upload/v1716543242/pepwgnzlzjracbk5uttn.png";

  ///? ITEM TO UPDATE
  const [itemToUpdate, setItemToUpdate] = useState({
    name: "",
    prezzo: "",
    categoryID: null,
    codice: "",
    descrizione: "",
    image: "",
  });
  const [itemIdToEdit, setItemIdToEdit] = useState("");

  ///? CATEGORY TO UPDATE
  const [categoryToUpdate, setCategoryToUpdate] = useState({
    name: "",
    description: "",
  });
  const [categoryIdToEdit, setCategoryIdToEdit] = useState("");
  // const [itemToUpdate, setItemToUpdate] = useState(null)

  const handleChangeItem = (e, key) => {
    setItem({
      ...item,
      [key]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(null);
    setSelectedFile(e.target.files[0]);
  };
  const handleFileEdit = (e) => {
    setSelectedFileEdit(e.target.files[0]);
  };

  const handleChangeCategory = (e, key) => {
    setCategory({
      ...category,
      [key]: e.target.value,
    });
  };

  const handleDeleteItem = (e) => {
    setItemIdToDelete(e.target.value);
  };

  const handleDeleteChange = (e) => {
    // if (e.target.name === "item") {
    //   setItemIdToDelete(e.target.value);
    // } else {
    setCategoryIdToDelete(e.target.value);
    // }
  };
  const handleEditCategory = (selectedCategory) => {
    // Popola lo stato con i dati della categoria selezionata
    setCategoryToUpdate({
      name: selectedCategory.name,
      description: selectedCategory.description,
    });
    setCategoryIdToEdit(selectedCategory.id);
  };
  const handleEditItem = (selectedItem) => {
    // Popola lo stato con i dati della categoria selezionata
    setItemToUpdate({
      name: selectedItem.name,
      prezzo: selectedItem.prezzo,
      categoryID: selectedItem.categoryID,
      codice: selectedItem.codice,
      descrizione: selectedItem.descrizione,
      image: "",
    });
    setItemIdToEdit(selectedItem.id);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    const formType = e.target.name;
    const token = sessionStorage.getItem("token");
    const url =
      formType === "deleteCategory"
        ? `http://localhost:3001/api/categories/${categoryIdToDelete}`
        : `http://localhost:3001/item/${itemIdToDelete}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(" eliminata");
        // setUpdateNotification(!updateNotification);
        closeForm();
        dispatch(fetchCategories());
        setUpdateNotification(!updateNotification);
      } else {
        console.log(response.statusText);
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err);
    }
  };

  /// CATEGORY FETCH POST
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formType = e.target.name;
    if (formType === "createCategory") {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Token non presente. Effettua il login.");
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:3001/api/categories/create",
          {
            method: "POST",
            body: JSON.stringify(category),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setError({ category: null });
          console.log(data.category.id);

          if (selectedFile !== null) {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const imageResponse = await fetch(
              `http://localhost:3001/api/categories/upload/${data.category.id}`,
              {
                method: "PUT",
                body: formData,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (imageResponse.ok) {
              setCategory(initialCategory);
              console.log("Categoria creata", data);
              closeForm();
              dispatch(fetchCategories());
              setError({ category: null });
            } else {
              const errorData = await imageResponse.json();
              console.log(errorData.message);
              setError({ category: errorData.message });
              return;
            }
          } else {
            setCategory(initialCategory);
            setSelectedFile(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = ""; // Reset file input
            }
            console.log("Categoria creata", data);
            closeForm();
            dispatch(fetchCategories());
            setError({ category: null });
          }
        } else {
          const errorData = await response.json();
          console.log(errorData.message);
          setError({ category: errorData.message });
        }
      } catch (err) {
        console.log(err.message);
        setError("Si è verificato un errore. Si prega di riprovare.");
      }
    }
  };

  function generateRandomCode(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  // const { categoriaId } = useParams();
  ///ITEM FETCH POST
  const handleFormSubmitItem = async (e) => {
    e.preventDefault();
    const formType = e.target.name;
    if (formType === "createItem") {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError({ general: "Token non presente. Effettua il login." });
        return;
      }
      if (!item.codice) {
        item.codice = generateRandomCode(7);
      }

      try {
        const response = await fetch("http://localhost:3001/item/add", {
          method: "POST",
          body: JSON.stringify({ ...item, image: defaultImageUrl }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.itemRicambio.id);
          setError({ item: null });
          console.log(" PRIMA DELL'IF ", selectedFile);
          setItem(initialItem);
          console.log("Item creato senza immagine", data);
          closeForm();
          setUpdateNotification((prev) => !prev);

          if (selectedFile) {
            console.log(" DOPO L'IF ", selectedFile);
            const formData = new FormData();
            formData.append("image", selectedFile);
            console.log(" FORMDATA ", formData);

            const imageResponse = await fetch(
              `http://localhost:3001/item/upload/${data.itemRicambio.id}`,
              {
                method: "PUT",
                body: formData,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (imageResponse.ok) {
              setItem(initialItem);
              console.log("Item creato con immagine", data);

              console.log(" ALLA FINE", selectedFile);
              setUpdateNotification((prev) => !prev);
              closeForm();
              dispatch(fetchCategories());
              setError({ item: null });
            } else {
              setItem(initialItem);
              console.log("Item creato senza immagine", data);
              closeForm();
              setUpdateNotification((prev) => !prev);
              const errorData = await imageResponse.json();
              console.log(errorData.message);
              setError({ item: errorData.message });
            }
          }
        } else {
          const errorData = await response.json();
          console.log(errorData.message);
          closeForm();
          setUpdateNotification(!updateNotification);
          setError({ item: errorData.message });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  ///FETCH EDIT CATEGORY PUT
  const handleEditCategorySubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const url = `http://localhost:3001/api/categories/update/${categoryIdToEdit}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(categoryToUpdate),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.category.id);
        setError({ editCategory: null });
        if (selectedFileEdit) {
          const formData = new FormData();
          formData.append("image", selectedFileEdit);
          const imageResponse = await fetch(
            `http://localhost:3001/api/categories/upload/${data.category.id}`,
            {
              method: "PUT",
              body: formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (imageResponse.ok) {
            console.log("Categoria modificata");
            closeForm();
            dispatch(fetchCategories());
            setUpdateNotification(!updateNotification);
            setError({ editCategory: null });
          } else {
            const imageData = await imageResponse.json();
            setError({ editCategory: imageData.message });
            return;
          }
        } else {
          setCategory(initialCategory);
          setSelectedFileEdit(null);

          console.log("Categoria modificata", data);
          closeForm();
          dispatch(fetchCategories());
          setError({ editCategory: null });
        }
      } else {
        const data = await response.json();
        setError({ editCategory: data.message });
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err);
    }
  };

  ///FETCH EDIT ITEM PUT
  const handleEditItemSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const url = `http://localhost:3001/item/${itemIdToEdit}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(itemToUpdate),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setError({ editItem: null });
        if (selectedFileEdit) {
          const formData = new FormData();
          formData.append("image", selectedFileEdit);
          const imageResponse = await fetch(
            `http://localhost:3001/item/upload/${data.id}`,
            {
              method: "PUT",
              body: formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (imageResponse.ok) {
            console.log("Item modificato");
            closeForm();
            dispatch(fetchCategories());
            setUpdateNotification(!updateNotification);
            setError({ editItem: null });
          } else {
            const imageData = await imageResponse.json();
            setError({ editItem: imageData.message });
            return;
          }
        } else {
          setItem(initialItem);
          setSelectedFileEdit(null);

          console.log("Item modificato", data);
          closeForm();
          dispatch(fetchCategories());
          setError({ editItem: null });
        }
      } else {
        const data = await response.json();
        setError({ editItem: data.message });
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className={`menu-container ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaCog />}
      </button>
      <ul className={`menu-items ${isOpen ? "open" : ""}`}>
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
      <Modal
        show={showForm}
        onHide={closeForm}
        centered
        className="modaleDeveloper"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Gestione Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark ">
          <Tab.Container defaultActiveKey="create">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="create">Crea Categoria</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="editCategory">Modifica Categoria</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="delete">Elimina Categoria</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="createItem">Crea Item</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="editItem">Modifica Item</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="deleteItem">Elimina Item</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="create">
                <Form name="createCategory" onSubmit={handleFormSubmit}>
                  <Form.Label>Categoria:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci nome Categoria"
                    onChange={(e) => handleChangeCategory(e, "name")}
                    className="mb-2"
                    value={category.name}
                  />

                  <Form.Label>Descrizione:</Form.Label>
                  <FormControl
                    className="mt-2 mb-2"
                    type="text"
                    placeholder="Inserisci descrizione"
                    onChange={(e) => handleChangeCategory(e, "description")}
                    value={category.description}
                  />
                  <Form.Label>Immagine:</Form.Label>
                  <FormControl
                    type="file"
                    placeholder="Inserisci Immagine"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  <Col className="d-flex ">
                    <Button variant="primary" type="submit" className="me-2">
                      Invia
                    </Button>
                    {error.category ? (
                      <Alert variant="danger"> {error.category} </Alert>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="editCategory">
                <Form name="editCategory" onSubmit={handleEditCategorySubmit}>
                  <Form.Label>ID Categoria:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci ID Categoria"
                    value={categoryIdToEdit}
                    className="mb-2"
                    required
                    onChange={(e) => setCategoryIdToEdit(e.target.value)}
                  />
                  <Form.Label>Nome:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Modifica Nome Categoria"
                    value={categoryToUpdate.name}
                    className="mb-2"
                    onChange={(e) =>
                      setCategoryToUpdate({
                        ...categoryToUpdate,
                        name: e.target.value,
                      })
                    }
                  />
                  <Form.Label>Descrizione:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Modifica Descrizione Categoria"
                    value={categoryToUpdate.description}
                    className="mb-2"
                    onChange={(e) =>
                      setCategoryToUpdate({
                        ...categoryToUpdate,
                        description: e.target.value,
                      })
                    }
                  />
                  <Form.Label>Immagine:</Form.Label>
                  <FormControl
                    type="file"
                    placeholder="Inserisci Immagine"
                    onChange={handleFileEdit}
                    // ref={fileInputRef}
                    className="mb-2"
                  />
                  <Col className="d-flex ">
                    <Button variant="primary" type="submit" className="me-2">
                      MODIFICA
                    </Button>
                    {error.editCategory ? (
                      <Alert variant="danger"> {error.editCategory} </Alert>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="editItem">
                <Form name="editItem" onSubmit={handleEditItemSubmit}>
                  <Form.Label>ID Item:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci ID Item"
                    onChange={(e) => setItemIdToEdit(e.target.value)}
                    className="mb-2"
                    value={itemIdToEdit}
                  />
                  <Form.Label>Nome:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Modifica Nome Item"
                    value={itemToUpdate.name}
                    onChange={(e) =>
                      setItemToUpdate({
                        ...itemToUpdate,
                        name: e.target.value,
                      })
                    }
                    className="mb-2"
                  />
                  <Form.Label>Descrizione:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Modifica Descrizione Item"
                    value={itemToUpdate.descrizione}
                    onChange={(e) =>
                      setItemToUpdate({
                        ...itemToUpdate,
                        descrizione: e.target.value,
                      })
                    }
                    className="mb-2"
                  />
                  <Form.Label>Prezzo :</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci Prezzo Item"
                    value={itemToUpdate.prezzo}
                    onChange={(e) =>
                      setItemToUpdate({
                        ...itemToUpdate,
                        prezzo: e.target.value,
                      })
                    }
                    className="mb-2"
                  />
                  <Form.Label>Codice :</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Modifica Codice Item"
                    value={itemToUpdate.codice}
                    onChange={(e) =>
                      setItemToUpdate({
                        ...itemToUpdate,
                        codice: e.target.value,
                      })
                    }
                    className="mb-2"
                  />

                  <Form.Label>Categoria id Item :</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Modifica Categoria id Item"
                    value={itemToUpdate.categoryID}
                    onChange={(e) =>
                      setItemToUpdate({
                        ...itemToUpdate,
                        categoryID: e.target.value,
                      })
                    }
                    className="mb-2"
                  />
                  <Form.Label>Immagine:</Form.Label>
                  <FormControl
                    type="file"
                    placeholder="Inserisci Immagine"
                    onChange={handleFileEdit}
                    className="mb-2"
                  />
                  <Col className="d-flex ">
                    <Button variant="primary" type="submit" className="me-2">
                      MODIFICA
                    </Button>
                    {error.editItem ? (
                      <Alert variant="danger"> {error.editItem} </Alert>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="createItem">
                <Form name="createItem" onSubmit={handleFormSubmitItem}>
                  <Form.Label>Nome:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci nome"
                    onChange={(e) => handleChangeItem(e, "name")}
                    className="mb-2"
                    value={item.name}
                  />

                  <Form.Label>Prezzo:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci prezzo"
                    onChange={(e) => handleChangeItem(e, "prezzo")}
                    className="mb-2"
                    value={item.prezzo}
                  />

                  <Form.Label>Category ID:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci ID Categoria"
                    onChange={(e) => handleChangeItem(e, "categoryID")}
                    className="mb-2"
                    value={item.category_id}
                  />

                  <Form.Label>Codice:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci codice"
                    onChange={(e) => handleChangeItem(e, "codice")}
                    className="mb-2"
                    value={item.codice}
                  />

                  <Form.Label>Descrizione:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci descrizione"
                    onChange={(e) => handleChangeItem(e, "descrizione")}
                    className="mb-2"
                    value={item.descrizione}
                  />

                  <Form.Label>Immagine:</Form.Label>
                  <FormControl
                    type="file"
                    placeholder="Inserisci Immagine"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  <Col className="d-flex ">
                    <Button variant="primary" type="submit" className="me-2">
                      INVIA
                    </Button>
                    {error.item ? (
                      <Alert variant="danger"> {error.item} </Alert>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="delete">
                <Form name="deleteCategory" onSubmit={handleDeleteSubmit}>
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
              <Tab.Pane eventKey="deleteItem">
                <Form name="deleteItem" onSubmit={handleDeleteSubmit}>
                  <Form.Label>ID Item:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci ID Categoria"
                    onChange={handleDeleteItem}
                    className="mb-2"
                    value={itemIdToDelete}
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
