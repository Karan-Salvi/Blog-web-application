import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let fullNameElement = useRef();
  let emailElement = useRef();
  let passwordElement = useRef();

  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const responce = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullNameElement.current.value,
          email: emailElement.current.value,
          password: passwordElement.current.value,
        }),
      });
      fullNameElement.current.value = "";
      emailElement.current.value = "";
      passwordElement.current.value = "";
      const data = await responce.json();
      console.log(data);
      navigate("/login");
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
            <label htmlFor="fullName" className="form-label">
              Full Name :
            </label>
            <input
              type="text"
              className="form-control w-100"
              id="fullName"
              name="fullName"
              ref={fullNameElement}
            />
          </div>
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

export default Signup;
