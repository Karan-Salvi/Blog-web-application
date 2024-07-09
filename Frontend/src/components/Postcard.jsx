import { MdDelete } from "react-icons/md";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { MdReviews } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { postlistActions } from "../store/postListSlice";
const Postcard = ({ item }) => {
  const postlist = useSelector((store) => store.postlist);
  const dispatch = useDispatch();

  const handleOnDelete = () => {
    dispatch(postlistActions.removePost(item.id));
  };

  return (
    <>
      <div className="col-4">
        <div className="card m-3" style={{ width: "22.8rem", height: "32rem" }}>
          <div className="card-body">
            <img src={`${item.coverImageURL}`} class="card-img-top" alt="..." />
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text justify">{item.body}</p>
          </div>
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={handleOnDelete}
          >
            <MdDelete />
          </span>
          <div
            className="alert alert-success m-2 d-flex justify-content-between"
            role="alert"
          >
            <span>
              <SlLike />
            </span>{" "}
            <span>
              <SlDislike />
            </span>{" "}
            <span>
              <MdReviews />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Postcard;
