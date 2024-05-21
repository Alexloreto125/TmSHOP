import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavBar from "./Components/CustomNavBar";
import GrigliaItem from "./Components/GrigliaItem";
import Categoria from "./Components/Categoria";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import RegisterAndLogin from "./Components/RegisterAndLogin";
import { useEffect, useState } from "react";
import DeveloperMenu from "./Components/DeveloperMenu";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const [categories, setCategories] = useState([]);
  const [updateNotification, setUpdateNotification] = useState(false);
  const isLoading = useSelector((state) => state.categories.isLoading);
  return (
    <body className="background-image">
      <CustomNavBar />
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
        <Route
          path="/home"
          element={
            <Container className="d-flex mt-3" fluid>
              <Categoria />
              {isLoading && <Spinner animation="border" variant="warning" />}
              <GrigliaItem updateNotification={updateNotification} />
            </Container>
          }
        />
      </Routes>
    </body>
  );
}

export default App;

{
  /* {isLoggedIn ? (
          <>
            <CustomNavBar />
            <Container className="d-flex mt-3" fluid>
              <Categoria />
              <GrigliaItem updateNotification={updateNotification} />
            </Container>
            <DeveloperMenu
              setUpdateNotification={setUpdateNotification}
              updateNotification={updateNotification}
            />
          </>
        ) : (
          <RegisterAndLogin onLogin={handleLogin} />
        )} */
}
