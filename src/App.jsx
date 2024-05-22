import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavBar from "./Components/CustomNavBar";
// import GrigliaItem from "./Components/GrigliaItem";
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
import ItemsGriglia from "./Components/ItemsGriglia";
import ItemInfo from "./Components/ItemInfo";
import Cart from "./Components/Cart";

function App() {
  const [categories, setCategories] = useState([]);
  const [updateNotification, setUpdateNotification] = useState(false);
  const isLoading = useSelector((state) => state.categories.isLoading);
  const token = sessionStorage.getItem("token");
  return (
    <>
      <CustomNavBar />
      <DeveloperMenu
        setUpdateNotification={setUpdateNotification}
        updateNotification={updateNotification}
      />
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
        <Route
          path="/home"
          element={
            <Container className="background-image" fluid>
              <Categoria />
              <Row>
                {isLoading && <Spinner animation="border" variant="warning" />}

                <GrigliaCategory updateNotification={updateNotification} />
              </Row>
            </Container>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/me" element={<ProfileInformation />} />
        <Route path="/categoria/:categoriaId" element={<ItemsGriglia />} />
        <Route path="/item/:itemId" element={<ItemInfo />} />
        <Route path="/cart" element={<Cart />} />
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
