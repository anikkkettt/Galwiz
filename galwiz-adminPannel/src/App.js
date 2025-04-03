import React, { useEffect, useState, useContext } from "react";
import Login from "./components/login/Login";
import IsLoading from "./reusableComponent/isLoading/IsLoading";

import MainComponent from "./components/layouts/MainComponent";
import { useNavigate, Route, Routes } from "react-router-dom";

import axios from "axios";
import { UserDataContext } from "./useContext/UserContext";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const { updateAdminData, adminData } = useContext(UserDataContext);
  const getUserDataApi = async () => {
    try {
      const res = await axios.get("/api/v1/admin/");
      console.log(res);
      setIsAuthenticated(true);
      updateAdminData(res.data.admin);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserDataApi();
  }, []);

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : isAuthenticated ? (
        <div>
          <MainComponent />
        </div>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      )}
    </>
  );
};

export default App;
