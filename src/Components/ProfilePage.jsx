import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { RxBorderSplit } from "react-icons/rx";
import "../assets/Profile.css";

import { CiLogout } from "react-icons/ci";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Row className="d-flex flex-column">
          <h1 className="border-bottom mb-5">
            <span className="text-dark fs-4 fw-bold mx-auto mb-2">Profilo</span>
          </h1>
          <Col className="border-bottom mb-5 d-flex align-items-center">
            <RxBorderSplit className="me-3 fs-4 fw-bold" />
            <span className=" fs-4 fw-bold ">
              {" "}
              <Link className="Link-Profile">I tuoi ordini </Link>
            </span>
          </Col>
          <Col className="border-bottom mb-5 d-flex align-items-center">
            {" "}
            <RiAccountCircleFill className="me-3 fs-4 fw-bold" />
            <span className=" fs-4 fw-bold ">
              {" "}
              <Link className="Link-Profile" to={"/me"}>
                {" "}
                Informazioni sul tuo account{" "}
              </Link>
            </span>
          </Col>
          <Col className=" mb-5 d-flex align-items-center">
            {" "}
            <CiLogout className="me-3 fs-4 fw-bold" />
            <span className=" fs-4 fw-bold ">
              {" "}
              <Link
                className="Link-Profile"
                onClick={() => {
                  sessionStorage.removeItem("token");
                }}
                to={"/"}
              >
                {" "}
                LogOut{" "}
              </Link>{" "}
            </span>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
