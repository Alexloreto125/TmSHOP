import { Col, Container, FormControl, FormGroup, Row } from "react-bootstrap";
import "../assets/RegisterAndLogin.css";
// import "https://unicons.iconscout.com/release/v4.0.0/css/unicons.css";
import { MdAlternateEmail } from "react-icons/md";

const RegisterAndLogin = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css"
      />
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <div className="section">
        <Container>
          <Row className=" full-height justify-content-center">
            <Col className="col-12 text-center align-self-center py-5">
              <section className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <FormControl
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log" />
                <div className="card-3d-wrap mx-auto">
                  <div className="d-flex align-items-center">
                    <img
                      src="public\assets\logo.png"
                      alt="logo-TM RACING"
                      className="logo rounded"
                    />
                    <h4 className="fw-bold fst-italic">
                      TM Racing Shop By Alex
                    </h4>
                  </div>
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <FormGroup className="position-relative">
                            <FormControl
                              type="email"
                              className="form-style"
                              placeholder="Email"
                            />
                            <i className="input-icon uil uil-at" />
                          </FormGroup>
                          <FormGroup className=" mt-2 position-relative">
                            <FormControl
                              type="password"
                              className="form-style"
                              placeholder="Password"
                            />
                            <i className="input-icon uil uil-lock-alt" />
                          </FormGroup>
                          <a
                            // href="https://www.web-leb.com/code"
                            className="btn mt-4"
                          >
                            Login
                          </a>
                          <p className="mb-0 mt-4 text-center">
                            <a
                              //   href="https://www.web-leb.com/code"
                              className="link"
                            >
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-3 pb-3">Sign Up</h4>
                          <FormGroup className="position-relative">
                            <FormControl
                              type="text"
                              className="form-style"
                              placeholder="Full Name"
                            />
                            <i className="input-icon uil uil-user" />
                          </FormGroup>
                          <FormGroup className=" mt-2  position-relative">
                            <FormControl
                              type="tel"
                              className="form-style"
                              placeholder="Phone Number"
                            />
                            <i className="input-icon uil uil-phone" />
                          </FormGroup>
                          <FormGroup className=" mt-2 position-relative">
                            <FormControl
                              type="email"
                              className="form-style"
                              placeholder="Email"
                            />
                            <i className="input-icon uil uil-at" />
                          </FormGroup>
                          <FormGroup className=" mt-2 position-relative">
                            <FormControl
                              type="password"
                              className="form-style"
                              placeholder="Password"
                            />
                            <i className="input-icon uil uil-lock-alt" />
                          </FormGroup>
                          <a
                            // href="https://www.web-leb.com/code"
                            className="btn mt-4"
                          >
                            Register
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RegisterAndLogin;
