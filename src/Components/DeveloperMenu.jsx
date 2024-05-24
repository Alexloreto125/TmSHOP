import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
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
  const [itemIdToDelete, setItemIdToDelete] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
  const [error, setError] = useState({});
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
    setSelectedFile(e.target.files[0]);
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
      descrizione: selectedItem.description,
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
        console.log("Categoria eliminata");
        // setUpdateNotification(!updateNotification);
        closeForm();
        dispatch(fetchCategories());
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
    }
  };
  //   } else if (formType === "createItem") {
  //     try {
  //       dispatch(handleItemFormSubmit(item));
  //       setItem(initialItem);
  //       closeForm();
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   }
  // };

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

          if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const imageResponse = await fetch(
              `http://localhost:3001/item/uploadItem/${data.itemRicambio.id}`,
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
              setSelectedFile(null);
              console.log("Item creato con immagine", data);
              setUpdateNotification((prev) => !prev);
              closeForm(); // Assumi che closeForm sia una funzione definita nel tuo componente
              dispatch(fetchCategories());
              setError({});
            } else {
              const imageData = await imageResponse.json();
              setError({ general: imageData.message });
              throw new Error(imageData.message);
            }
          } else {
            setItem(initialItem);
            console.log("Item creato senza immagine", data);
            setUpdateNotification((prev) => !prev);
            closeForm(); // Assumi che closeForm sia una funzione definita nel tuo componente
            dispatch(fetchCategories());
            setError({});
          }
        } else {
          const data = await response.json();
          const newErrors = {};

          if (data.errors) {
            data.errors.forEach((error) => {
              newErrors[error.field] = error.message;
            });
          } else {
            newErrors.general = data.message;
          }

          setError(newErrors);
          throw new Error(data.message);
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
        console.log("Categoria modificata");
        closeForm();
        dispatch(fetchCategories());
      } else {
        console.log(response.statusText);
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
        console.log("ITEM modificata");
        closeForm();
        dispatch(fetchCategories());
      } else {
        console.log(response.statusText);
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err);
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
                  <Button variant="primary" type="submit">
                    Invia
                  </Button>
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
                  <Button variant="danger" type="submit">
                    MODIFICA
                  </Button>
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
                  <Button variant="primary" type="submit">
                    Invia
                  </Button>
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
                  {error.name && <Alert variant="danger">{error.name}</Alert>}
                  <Form.Label>Prezzo:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci prezzo"
                    onChange={(e) => handleChangeItem(e, "prezzo")}
                    className="mb-2"
                    value={item.prezzo}
                  />
                  {error.prezzo && (
                    <Alert variant="danger">{error.prezzo}</Alert>
                  )}
                  <Form.Label>Category ID:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci ID Categoria"
                    onChange={(e) => handleChangeItem(e, "categoryID")}
                    className="mb-2"
                    value={item.category_id}
                  />
                  {error.category_id && (
                    <Alert variant="danger">{error.category_id}</Alert>
                  )}
                  <Form.Label>Codice:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci codice"
                    onChange={(e) => handleChangeItem(e, "codice")}
                    className="mb-2"
                    value={item.codice}
                  />
                  {error.codice && (
                    <Alert variant="danger">{error.codice}</Alert>
                  )}
                  <Form.Label>Descrizione:</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Inserisci descrizione"
                    onChange={(e) => handleChangeItem(e, "descrizione")}
                    className="mb-2"
                    value={item.descrizione}
                  />
                  {error.descrizione && (
                    <Alert variant="danger">{error.descrizione}</Alert>
                  )}
                  <Form.Label>Immagine:</Form.Label>
                  <FormControl
                    type="file"
                    placeholder="Inserisci Immagine"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  <Button variant="primary" type="submit">
                    Invia
                  </Button>
                  {error.general && (
                    <Alert variant="danger">{error.image}</Alert>
                  )}
                  {/* {console.log(item)} */}
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
