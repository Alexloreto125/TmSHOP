import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../assets/Profile.css";

const ProfileInformation = () => {
  return (
    // <Container className="d-flex  justify-content-center">
    //   <Row
    //     xs={12}
    //     md={6}
    //     className="border Profile-Info justify-content-center mt-3"
    //   >
    //     <Col md={12} className="ms-5 fw-bold fs-4 ">
    //       <span className="fst-italic">Nome :</span>
    //       <Col>Alex</Col>
    //     </Col>
    //     <Col md={12} className="ms-5 fw-bold fs-4 ">
    //       <span className="fst-italic"> Email : </span>
    //       <Col>Alex</Col>
    //     </Col>
    //     <Col md={12} className="ms-5 fw-bold fs-4 ">
    //       <span className="fst-italic"> Password </span>
    //     </Col>
    //     <Col md={12} className="ms-5 fw-bold fs-4 ">
    //       <span className="fst-italic"> phone : </span>
    //       <Col>Alex</Col>
    //     </Col>
    //   </Row>
    // </Container>

    <>
      <Container>
        <Row>
          <Col xs={0} lg={2}></Col>
          <Col xs={12} lg={7} className="py-3">
            <Card className="Card-Info">
              <div id="Image-Info" />
              <Card.Body className="d-flex flex-column" id="CardBody">
                <Col xs={12} id="Profile-position">
                  <Card.Img
                    className="ProfileImg"
                    // src={profile.image}
                    src="../public/assets/bike.jpg"
                    alt="Profile Image"
                  />
                </Col>
                <Card.Title id="Card-Title">
                  <Row className="align-items-center mb-3">
                    <Col xs={12} md={6} className="text-center text-md-start">
                      <span className="NotAvailable">Name not available</span>
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
                      <span style={{ color: "red" }}>Email not available</span>
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
                      <span style={{ color: "red" }}>
                        Password not available
                      </span>
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
                      <span style={{ color: "red" }}>Phone not available</span>
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
