import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Modal,
  Row,
} from "react-bootstrap";
import "../assets/Profile.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchMeProfile,
  updateProfileFetch,
} from "../redux/actions/userAction";
import CustomNavBar from "./CustomNavBar";
import ReturnButton from "./ReturnButton";

const ProfileInformation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const [editedUser, setEditedUser] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    phone: user.phone,
  });

  const [opentModal, setOpenModal] = useState(false);

  const [fieldToEdit, setFieldToEdit] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleFieldSave = (field) => {
    dispatch(updateProfileFetch(field, editedUser[field]))
      .then(() => {
        dispatch(fetchMeProfile());
        handleCloseModal();
      })
      .catch((error) => {
        console.log("Errore durante il salvataggio", error);
      });
  };

  const handleOpenModal = (field) => {
    setOpenModal(true);
    setFieldToEdit(field);
    switch (field) {
      case "name":
        setEditedUser({ ...editedUser, name: "" });
        break;
      case "email":
        setEditedUser({ ...editedUser, email: "" });
        break;
      case "password":
        setEditedUser({ ...editedUser, password: "" });
        break;
      case "phone":
        setEditedUser({ ...editedUser, phone: "" });
        break;
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditedUser({
      ...editedUser,
      [fieldToEdit]: user[fieldToEdit],
    });
  };

  useEffect(() => {
    console.log("SONO USE DISPATCH PER IL PROFIEL", user);

    dispatch(fetchMeProfile());
  }, []);

  return (
    <>
      <CustomNavBar />
      <ReturnButton />
      <Container style={{ minHeight: "100vh" }}>
        <Row>
          <Col xs={0} lg={2}></Col>
          <Col xs={12} lg={9} className="py-3">
            <Card className="Card-Info">
              <div id="Image-Info" />
              <Card.Body className="d-flex flex-column" id="CardBody">
                <Col xs={12} id="Profile-position">
                  <Card.Img
                    className="ProfileImg"
                    src={user.avatarURL}
                    alt="Profile Image"
                  />
                </Col>
                <Card.Title id="Card-Title">
                  <Row className="align-items-center mb-3">
                    <Col xs={12} md={6} className="text-center text-md-start">
                      <span className="NotAvailable">
                        {user.name ? user.name : "Name not available"}
                      </span>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                      <Button
                        className="Verify btn-edit"
                        onClick={() => handleOpenModal("name")}
                        onMouseEnter={(event) => {
                          event.target.style.backgroundColor = "red";
                          event.target.style.color = "white";
                        }}
                        onMouseLeave={(event) => {
                          event.target.style.backgroundColor = "lightgrey";
                          event.target.style.color = "black";
                        }}
                      >
                        Modifica nome
                      </Button>
                    </Col>
                  </Row>
                  <Row className="align-items-center mb-3">
                    <Col xs={12} md={6} className="text-center text-md-start">
                      {user.email ? (
                        <span style={{ color: "black" }}>{user.email}</span>
                      ) : (
                        <span style={{ color: "red" }}>
                          Email not available
                        </span>
                      )}
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                      <Button
                        className="Verify btn-edit"
                        onClick={() => handleOpenModal("email")}
                        onMouseEnter={(event) => {
                          event.target.style.backgroundColor = "red";
                          event.target.style.color = "white";
                        }}
                        onMouseLeave={(event) => {
                          event.target.style.backgroundColor = "lightgrey";
                          event.target.style.color = "black";
                        }}
                      >
                        Modifica email
                      </Button>
                    </Col>
                  </Row>
                  <Row className="align-items-center mb-3">
                    <Col xs={12} md={6} className="text-center text-md-start">
                      {user.password ? (
                        <span style={{ color: "black" }}>{user.password}</span>
                      ) : (
                        <span style={{ color: "red" }}>
                          Email not available
                        </span>
                      )}
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                      <Button
                        className="Verify btn-edit"
                        onClick={() => handleOpenModal("password")}
                        onMouseEnter={(event) => {
                          event.target.style.backgroundColor = "red";
                          event.target.style.color = "white";
                        }}
                        onMouseLeave={(event) => {
                          event.target.style.backgroundColor = "lightgrey";
                          event.target.style.color = "black";
                        }}
                      >
                        Modifica password
                      </Button>
                    </Col>
                  </Row>
                  <Row className="align-items-center mb-3">
                    <Col xs={12} md={6} className="text-center text-md-start">
                      {user.phone ? (
                        <span style={{ color: "black" }}>{user.phone}</span>
                      ) : (
                        <span style={{ color: "red" }}>
                          Phone not available
                        </span>
                      )}
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                      <Button
                        className="Verify btn-edit"
                        onClick={() => handleOpenModal("phone")}
                        onMouseEnter={(event) => {
                          event.target.style.backgroundColor = "red";
                          event.target.style.color = "white";
                        }}
                        onMouseLeave={(event) => {
                          event.target.style.backgroundColor = "lightgrey";
                          event.target.style.color = "black";
                        }}
                      >
                        Modifica phone
                      </Button>
                    </Col>
                  </Row>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={opentModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica {fieldToEdit}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type={fieldToEdit === "password" ? "password" : "text"}
              name={fieldToEdit}
              value={editedUser[fieldToEdit]}
              onChange={handleInputChange}
              placeholder={`Enter ${fieldToEdit}`}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annulla
            </Button>
            <Button
              variant="primary"
              onClick={() => handleFieldSave(fieldToEdit)}
            >
              Modifica
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};
export default ProfileInformation;
