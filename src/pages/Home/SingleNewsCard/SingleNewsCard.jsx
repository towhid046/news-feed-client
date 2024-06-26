import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { scrollToTop } from "../../../utilities/scrollToTop";
import { CiLocationArrow1 } from "react-icons/ci";
import { set, useForm } from "react-hook-form";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuPenSquare } from "react-icons/lu";
import useAuth from "./../../../hooks/useAuth";
import swal from "sweetalert";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import UpdatePost from "./../../../components/unique/UpdatePost/UpdatePost";

const SingleNewsCard = ({ singleNews, refetch }) => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const { handleSubmit, register } = useForm();
  const [updatableNews, setUpdatableNews] = useState({});
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    scrollToTop();
  }, []);

  const {
    _id,
    username,
    release_date,
    thumbnail_img,
    description,
    likes,
    comments,
  } = singleNews;

  const [initialDes, setInitialDes] = useState("");

  useEffect(() => {
    setInitialDes(description?.split(" ").slice(0, 20).join(" "));
  }, [description]);

  const handleShowFullDescription = () => {
    setInitialDes(description);
  };

  const handleCommentForm = (data) => {
    console.log(data);
  };

  const handleRemovePost = (id, username) => {
    swal({
      title: "Are you sure?",
      text: "Want to delete this post, Once delete you can't revert it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (pressOk) => {
      if (pressOk) {
        const res = await axiosPublic.delete(
          `/delete-post?id=${id}&username=${username}`
        );
        if (res?.data?.deletedCount) {
          swal(
            "Success",
            "Your post have been deleted successfully!!",
            "success"
          );
          refetch();
        }
      }
    });
  };

  const handleUpdatePost = async (id) => {
    try {
      const res = await axiosPublic.get(`/news/${id}`);
      setUpdatableNews(res?.data);
      setIsUpdateFormOpen(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" max-w-3xl mx-auto">
      <article className="border rounded-lg  border-opacity-10 justify-between flex flex-col">
        {/* forum article text */}
        <div className="p-5 pb-1">
          <div className=" space-y-4">
            <ul className="flex flex-wrap gap-4 justify-between  items-center">
              <li>
                <p className="text- font-semibold text-md">
                  {username}{" "}
                  {user?.username === username && (
                    <span className="badge badge-neutral py-1"> You</span>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <CiCalendar className="text-custom-primary text-xl" />
                  <small className="text-gray-400">{release_date}</small>
                </div>
              </li>

              {user?.username === username && (
                <li>
                  <div className="flex items-center gap-3">
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Delete"
                      className={` btn`}
                      onClick={() => handleRemovePost(_id, user?.username)}
                    >
                      <RiDeleteBin5Fill className="text-lg text-red-400" />
                    </button>{" "}
                    <button
                      onClick={() => handleUpdatePost(_id)}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Update"
                      className={`btn`}
                    >
                      <LuPenSquare className="text-md text-info" />
                    </button>{" "}
                  </div>
                </li>
              )}
            </ul>
            <p>
              {initialDes}
              <em
                onClick={handleShowFullDescription}
                className={`${
                  initialDes.split(" ").length > 20 && "hidden"
                } text-blue-400 cursor-pointer`}
              >
                {" "}
                ...see more
              </em>
            </p>
          </div>
        </div>

        {/* forum article image */}
        <figure className="relative overflow-hidden ">
          <img
            className="max-h-80 w-full py-4"
            src={thumbnail_img}
            alt="News Image"
          />
        </figure>

        {/* Like and comment count */}
        <div className="mx-4 mb-4 flex justify-between items-center ">
          <div className="flex items-center gap-2">
            <span>{likes?.length}</span>
            <AiOutlineLike className="text-lg" />
          </div>
          <div className="flex items-center gap-2">
            <span>{comments.length}</span>
            <FaRegCommentAlt />
          </div>
        </div>

        {/* like and comment */}
        <div className="mx-4 mb-4 border-t pt-3 flex justify-between  gap-3 ">
          <button
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Like"
            className={`flex items-center gap-1 btn`}
          >
            <AiOutlineLike className="text-xl" />
            <span>Like </span>
          </button>{" "}
          <form onSubmit={handleSubmit(handleCommentForm)}>
            <div className="join">
              <input
                {...register("comment")}
                className="input  join-item
                  bg-base-200 text-base-content w-full  focus:outline-none  focus:border-blue-100 
                  "
                placeholder="Leave a comment"
                required
              />
              <button className=" join-item rounded-r-lg bg-gray-200 py-2.5 px-4 hover:bg-gray-300 transition duration-150">
                <CiLocationArrow1 className="text-xl" />
              </button>
            </div>
          </form>
        </div>

        <div className="mx-4 mb-4 space-y-4 mt-6">
          {/* display the comments */}
          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
      </article>

      {/* Update form modal */}
      {isUpdateFormOpen && (
        <UpdatePost
          refetch={refetch}
          updatableNews={updatableNews}
          setIsUpdateFormOpen={setIsUpdateFormOpen}
        />
      )}
    </div>
  );
};

SingleNewsCard.propTypes = {
  singleNews: PropTypes.object.isRequired,
  refetch: PropTypes.func,
};

export default SingleNewsCard;
