import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavBar from "./Components/CustomNavBar";
import Categoria from "./Components/Categoria";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import RegisterAndLogin from "./Components/RegisterAndLogin";
import { useEffect, useState } from "react";
import DeveloperMenu from "./Components/DeveloperMenu";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePage from "./Components/ProfilePage";
import GrigliaCategory from "./Components/GrigliaCategory";
import ProfileInformation from "./Components/ProfileInformation";
import ItemsGriglia from "./Components/ItemsGriglia";
import ItemInfo from "./Components/ItemInfo";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import Storico from "./Components/Storico";
import StoricoInfo from "./Components/StoricoInfo";
import Ricerca from "./Components/Ricerca";
import NoToken from "./Components/NoToken";

function App() {
  const [categories, setCategories] = useState([]);
  const [updateNotification, setUpdateNotification] = useState(false);
  const isLoading = useSelector((state) => state.categories.isLoading);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
        <Route
          path="/home"
          element={
            token ? (
              <>
                <CustomNavBar />
                <Container
                  className="background-image"
                  fluid
                  style={{ minHeight: "100vh" }}
                >
                  <DeveloperMenu
                    setUpdateNotification={setUpdateNotification}
                    updateNotification={updateNotification}
                  />
                  <Categoria
                    setUpdateNotification={setUpdateNotification}
                    updateNotification={updateNotification}
                  />
                  <Row>
                    {isLoading && (
                      <Spinner animation="border" variant="warning" />
                    )}

                    <GrigliaCategory updateNotification={updateNotification} />
                  </Row>
                </Container>
              </>
            ) : (
              <NoToken />
            )
          }
        />
        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <NoToken />}
        />
        <Route
          path="/me"
          element={token ? <ProfileInformation /> : <NoToken />}
        />
        <Route
          path="/categoria/:categoriaId"
          element={
            token ? (
              <ItemsGriglia
                updateNotification={updateNotification}
                setUpdateNotification={setUpdateNotification}
              />
            ) : (
              <NoToken />
            )
          }
        />
        <Route
          path="/item/:itemId"
          element={
            token ? (
              <ItemInfo
                updateNotification={updateNotification}
                setUpdateNotification={setUpdateNotification}
              />
            ) : (
              <NoToken />
            )
          }
        />
        <Route
          path="/cart"
          element={
            token ? (
              <Cart
                updateNotification={updateNotification}
                setUpdateNotification={setUpdateNotification}
              />
            ) : (
              <NoToken />
            )
          }
        />
        <Route path="/storico" element={token ? <Storico /> : <NoToken />} />
        <Route
          path="/ordine/:storicoId"
          element={token ? <StoricoInfo /> : <NoToken />}
        />
        <Route path="/results" element={token ? <Ricerca /> : <NoToken />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
