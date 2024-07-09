import { Outlet, redirect, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";

function App() {
 
  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-between"
        style={{ height: "91vh" }}
      >
        <Sidebar />
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default App;
