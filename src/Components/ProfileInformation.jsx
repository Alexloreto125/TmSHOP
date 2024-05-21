import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../assets/Profile.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMeProfile } from "../redux/actions/userAction";

const ProfileInformation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    console.log("SONO USE DISPATCH PER IL PROFIEL", user);

    dispatch(fetchMeProfile());
  }, []);
  return (
    <>
      <Container fluid>
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
                        // onClick={() => handleFieldEdit("name")}
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
                        // onClick={() => handleFieldEdit("email")}
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
                        // onClick={() => handleFieldEdit("password")}
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
                        // onClick={() => handleFieldEdit("phone")}
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
      </Container>
    </>
  );
};
export default ProfileInformation;
