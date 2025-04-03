import React, { useContext, useEffect } from "react";
import "./App.css";
import AllComponent from "./sections/AllComponent";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import userDataContext from "./store/userData-context";
import axios from "./api/axios";

function App() {
  const userDataCtx = useContext(userDataContext);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/dashboard");
      userDataCtx.userDataHandler(res.data.user);
    } catch (error) {
      userDataCtx.authFalse();
    }
  };

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <AllComponent />
    </div>
  );
}

export default App;
