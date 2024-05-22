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
import ProfilePage from "./Components/ProfilePage";
import GrigliaCategory from "./Components/GrigliaCategory";
import ProfileInformation from "./Components/ProfileInformation";
import Items from "./Components/Items";

function App() {
  const [categories, setCategories] = useState([]);
  const [updateNotification, setUpdateNotification] = useState(false);
  const isLoading = useSelector((state) => state.categories.isLoading);
  const token = sessionStorage.getItem("token");
  return (
    <>
      <CustomNavBar />
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
        <Route
          path="/home"
          element={
            <Container className="d-flex background-image" fluid>
              <Categoria />
              {isLoading && <Spinner animation="border" variant="warning" />}
              <GrigliaCategory updateNotification={updateNotification} />

              <DeveloperMenu
                setUpdateNotification={setUpdateNotification}
                updateNotification={updateNotification}
              />
            </Container>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/me" element={<ProfileInformation />} />
        <Route path="/categoria/:categoriaId" element={<Items />} />
      </Routes>
    </>
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
            
          </>
        ) : (
          <RegisterAndLogin onLogin={handleLogin} />
        )} */
}
