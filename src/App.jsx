import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavBar from "./Components/CustomNavBar";
import GrigliaItem from "./Components/GrigliaItem";
import Categoria from "./Components/Categoria";
import { Container, Row, Col } from "react-bootstrap";
import RegisterAndLogin from "./Components/RegisterAndLogin";
import { useEffect, useState } from "react";
import DeveloperMenu from "./Components/DeveloperMenu";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [categories, setCategories] = useState([]);
  const [updateNotification, setUpdateNotification] = useState(false);
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
