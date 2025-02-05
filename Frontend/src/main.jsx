import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePost from "./components/CreatePost.jsx";
import Home from "./components/Home.jsx";
import { Provider } from "react-redux";
import facebookStore from "./store/index.js";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

const router = createBrowserRouter([
  {
    path:"/signup",
    element:<Signup/>
  }, 
  {
    path:"/login",
    element:<Login/>
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/create-post", element: <CreatePost /> },
    ],
  },
 
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={facebookStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
