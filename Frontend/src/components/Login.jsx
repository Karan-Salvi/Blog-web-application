import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let emailElement = useRef();
  let passwordElement = useRef();

  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const responce = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: emailElement.current.value,
          password: passwordElement.current.value,
        }),
      });

      emailElement.current.value = "";
      passwordElement.current.value = "";
      const data = await responce.json();
      console.log(data);
      console.log(typeof data.status);
      if (data.status === "3" || data.status === "1") {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("Some went wrong while sending the data..");
    }
  };

  return (
    <div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <form className=" w-75" onSubmit={handleOnSubmit}>
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">
              Email address :
            </label>
            <input
              type="email"
              className="form-control w-100"
              id="email"
              name="email"
              ref={emailElement}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password :
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              ref={passwordElement}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
