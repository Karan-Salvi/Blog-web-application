import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { postlistActions } from "../store/postListSlice";
import { Form, Link } from "react-router-dom";

const CreatePost = () => {
  const [image, setImage] = useState();

  let titleElement = useRef();
  let bodyElement = useRef();

  const handleOnsubmit = async (event) => {
    event.preventDefault();
    let title = titleElement.current.value;
    let body = bodyElement.current.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);
    const responce = await fetch("http://localhost:8000/blog/addPost", {
      method: "POST",
      body: formData,
      credentials:"include"
    });
    const data = await responce.json();

    console.log(data);
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100vw" }}
      >
        <form className="w-50" onSubmit={handleOnsubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Enter Post Title :
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              ref={titleElement}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="form-label">
              Enter Post Description :
            </label>
            <textarea
              rows={4}
              type="text"
              className="form-control"
              id="body"
              aria-describedby="emailHelp"
              ref={bodyElement}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="coverImageURL" className="form-label">
              UpLoad CoverImage :
            </label>
            <input
              type="file"
              className="form-control"
              id="coverImageURL"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default CreatePost;
