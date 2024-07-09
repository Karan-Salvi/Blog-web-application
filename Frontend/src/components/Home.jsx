import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Postcard from "./Postcard";
import { postlistActions } from "../store/postListSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";
import Loader from "./Loader";

const Home = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const postlist = useSelector((store) => store.postlist);
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlog() {
      const responce = await fetch("http://localhost:8000/blog/posts", {
        method: "GET",
        credentials: "include",
      });

      const blogData = await responce.json();

      console.log(blogData.data);
      setBlogs(blogData.data);
    }
    fetchBlog();
  }, []);

  const item = {
    title: "Hi buuuddy",
    body: "Bhag itherse kyu aya hai ",
    tags: ["KKK"],
    reactions: {
      likes: "2",
      dislikes: "3",
    },
    views: "3",
  };

  return (
    <>
      <div
        className="container text-center overflow-y-scroll"
        style={{ height: "91vh" }}
      >
        {blogs.length === 0 ? (
          <Loader />
        ) : (
          <div className="row">
            {blogs.map((item) => (
              <Postcard item={item} key={item._id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
