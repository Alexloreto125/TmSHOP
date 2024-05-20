import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import "../assets/RegisterAndLogin.css";
import { useState } from "react";
import { ImEyePlus } from "react-icons/im";
import { ImEyeMinus } from "react-icons/im";
import "react-phone-input-2/lib/style.css";

const RegisterAndLogin = ({ onLogin }) => {
  const [visible, setVisible] = useState(false);
  const [visibleReg, setVisibleReg] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [error, setError] = useState(null);
  const [errorLogin, setErrorLogin] = useState(null);

  const initialRegistrationState = {
    name: "",
    phone: "",
    email: "",
    password: "",
  };
  const initialLoginState = {
    email: "",
    password: "",
  };
  const [registration, setRegistration] = useState(initialRegistrationState);

  const [login, setLogin] = useState(initialLoginState);

  const handleLogin = (e, key) => {
    setLogin({
      ...login,
      [key]: e.target.value,
    });
  };

  const handleRegistration = (e, key) => {
    setRegistration({
      ...registration,
      [key]: e.target.value,
    });
  };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const toggleVisibilityReg = () => {
    setVisibleReg(!visibleReg);
  };

  const handleCheckboxChange = () => {
    setShowLoginForm(!showLoginForm);
    if (!showLoginForm) {
      setLogin(initialLoginState);
    } else {
      setRegistration(initialRegistrationState);
    }
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    console.log("submit", registration);

    fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: JSON.stringify(registration),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setRegistration(initialRegistrationState);
            return data;
          });
        } else if (response.status === 400) {
          return response.json().then((data) => {
            console.log(data);
            setError(data.message);
            throw new Error(data.message);
          });
        } else {
          throw new Error("Qualcosa è andato storto con la fetch");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setError(null);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log("submit", login);

    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setLogin(initialLoginState);
            console.log("Access Token: ", data.accessToken);
            onLogin(data.accessToken);
            return data;
          });
        } else if (response.status === 401 || response.status === 404) {
          return response.json().then((data) => {
            console.log(data);

            setErrorLogin(data.message);
            // setTimeout(() => setErrorLogin(null), 5000);
            throw new Error(data.message);
          });
        } else {
          throw new Error("Qualcosa è andato storto con la fetch");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setErrorLogin(null);
  };

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
                <h6
                  className="mb-0 p-2 rounded mx-auto"
                  style={{ backgroundColor: "#2b2e38", maxWidth: "440px" }}
                >
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <FormControl
                  style={{ backgroundColor: "#2b2e38" }}
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="reg-log" />
                <div className="card-3d-wrap mx-auto">
                  <div
                    className="d-flex align-items-center"
                    style={{
                      backgroundColor: "#2b2e38",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
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
                    <Form className="card-front" onSubmit={handleSubmitLogin}>
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <FormGroup className="position-relative">
                            <FormControl
                              value={login.email}
                              type="email"
                              className="form-style"
                              placeholder="Email *"
                              required
                              onChange={(e) => {
                                handleLogin(e, "email");
                              }}
                            />
                            <i className="input-icon uil uil-at" />
                          </FormGroup>
                          <FormGroup className=" mt-2 position-relative">
                            <FormControl
                              value={login.password}
                              type={visible ? "text" : "password"}
                              className="form-style"
                              placeholder="Password *"
                              required
                              onChange={(e) => {
                                handleLogin(e, "password");
                              }}
                            />
                            <i className="input-icon uil uil-lock-alt" />
                            <div
                              className="p-2 mt-5 position-absolute password"
                              onClick={toggleVisibility}
                            >
                              {visible ? (
                                <ImEyeMinus className="input-icon" />
                              ) : (
                                <ImEyePlus className="input-icon" />
                              )}
                            </div>
                          </FormGroup>

                          <Button
                            type="submit"
                            className="btn-dark mt-4"
                            disabled={
                              login.email === "" || login.password === ""
                            }
                          >
                            Login
                          </Button>
                          {errorLogin && (
                            <Alert
                              variant="danger"
                              className={errorLogin ? "fade-out-error" : ""}
                            >
                              {errorLogin}
                            </Alert>
                          )}

                          <p className="mb-0 mt-4 text-center">
                            <a className="link">Forgot your password?</a>
                          </p>
                        </div>
                      </div>
                    </Form>
                    <Form
                      className="card-back"
                      onSubmit={handleSubmitRegistration}
                    >
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-3 pb-3">Sign Up</h4>
                          <FormGroup className="position-relative">
                            <FormControl
                              value={registration.name}
                              type="text"
                              className="form-style"
                              placeholder="Full Name *"
                              required
                              onChange={(e) => {
                                handleRegistration(e, "name");
                              }}
                            />
                            <i className="input-icon uil uil-user" />
                          </FormGroup>
                          <FormGroup
                            className=" mt-2  position-relative"
                            controlId="formPhone"
                          >
                            <FormControl
                              className="form-style "
                              type="tel"
                              placeholder="Tel"
                              value={registration.phone}
                              onChange={(e) => {
                                handleRegistration(e, "phone");
                              }}
                            />
                            <i className="input-icon uil uil-phone" />
                          </FormGroup>
                          <FormGroup className=" mt-2 position-relative">
                            <FormControl
                              value={registration.email}
                              type="email"
                              className="form-style"
                              placeholder="Email *"
                              required
                              onChange={(e) => {
                                handleRegistration(e, "email");
                              }}
                            />
                            <i className="input-icon uil uil-at" />
                          </FormGroup>
                          <FormGroup className=" mt-2 position-relative">
                            <FormControl
                              value={registration.password}
                              type={visibleReg ? "text" : "password"}
                              className="form-style"
                              placeholder="Password *"
                              required
                              onChange={(e) => {
                                handleRegistration(e, "password");
                              }}
                            />
                            <i className="input-icon uil uil-lock-alt" />
                            <div
                              className="p-2 mt-5 position-absolute password"
                              onClick={toggleVisibilityReg}
                            >
                              {visibleReg ? (
                                <ImEyeMinus className="input-icon" />
                              ) : (
                                <ImEyePlus className="input-icon" />
                              )}
                            </div>
                          </FormGroup>
                          <Button
                            type="submit"
                            className="btn-dark mt-4"
                            disabled={
                              registration.name === "" ||
                              registration.email === "" ||
                              registration.phone === "" ||
                              registration.password === ""
                            }
                          >
                            Register
                          </Button>
                          {error && (
                            <Alert
                              variant="danger"
                              className={error ? "fade-out-error" : ""}
                            >
                              {error}
                            </Alert>
                          )}
                        </div>
                      </div>
                    </Form>
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
