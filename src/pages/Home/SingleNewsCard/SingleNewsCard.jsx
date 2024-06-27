import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import PropTypes from "prop-types";
import { scrollToTop } from "../../../utilities/scrollToTop";
import { CiLocationArrow1 } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuPenSquare } from "react-icons/lu";
import useAuth from "./../../../hooks/useAuth";
import swal from "sweetalert";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import UpdatePost from "./../../../components/unique/UpdatePost/UpdatePost";
import { useNavigate } from "react-router-dom";
import Comments from "./../../../components/unique/Comments/Comments";
import NewsImage from "../../../components/unique/NewsImage/NewsImage";
import LikeCommentCount from "./../../../components/unique/LikeCommentCount/LikeCommentCount";

const SingleNewsCard = ({ singleNews, refetch }) => {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const [updatableNews, setUpdatableNews] = useState({});
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

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

  const handleComment = async (data) => {
    if (!user) {
      swal({
        title: "Login first",
        text: "Please login to add comment & like on post!",
        icon: "info",
        buttons: true,
        dangerMode: false,
      }).then(async (pressOk) => {
        if (pressOk) {
          navigate("/login");
        }
      });
      return;
    }

    const newComment = {
      comment_author: user?.username,
      comment_text: data.comment,
    };
    try {
      const res = await axiosPublic.put(`/comments?id=${_id}`, newComment);
      if (res?.data?.modifiedCount) {
        swal(
          "Comment Added!!",
          "Your comment have been added successfully",
          "success"
        );
        refetch();
        reset();
      }
    } catch (error) {
      console.error(error.message);
    }
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

  const handleLikeButton = async (id, username) => {
    if (!user) {
      swal({
        title: "Login first",
        text: "Please login to like & comment on post!",
        icon: "info",
        buttons: true,
        dangerMode: false,
      }).then(async (pressOk) => {
        if (pressOk) {
          navigate("/login");
        }
      });
      return;
    }

    try {
      const { data } = await axiosPublic.put(
        `/likes?id=${id}&username=${username}`
      );
      if (data.modifiedCount) {
        refetch();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="  xl:w-[60%] lg:w-[70%] md:w-[90%] w-full mx-auto">
      <article className="border rounded-lg  border-opacity-10 justify-between flex flex-col">
        {/* forum article text */}
        <div className="p-5 pb-1 mb-3">
          <div className=" space-y-4">
            <ul className="flex flex-wrap gap-4 justify-between  items-center">
              <li>
                <p className="text- font-semibold text-lg">
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
                className={`
                  text-blue-400 cursor-pointer
                  ${description.split(" ").length <= 20 ? "hidden" : "block"}
                  ${initialDes.split(" ").length > 20 && "hidden"}
                   `}
              >
                ...see more
              </em>
            </p>
          </div>
        </div>

        {/* forum article image */}
        {thumbnail_img && <NewsImage thumbnail_img={thumbnail_img} />}

        {/* Like and comment count */}
        <LikeCommentCount likes={likes} comments={comments} />

        {/* like and comment */}
        <div className="mx-4 mb-4 border-t pt-3  flex justify-between md:gap-5 gap-3 ">
          <button
            onClick={() => handleLikeButton(_id, user?.username)}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Like"
            className={`flex items-center gap-1 btn
              ${likes.includes(user?.username) && "text-blue-400"}
              `}
          >
            <AiOutlineLike className="text-xl" />
            <span>Like </span>
          </button>{" "}
          <form className="w-full" onSubmit={handleSubmit(handleComment)}>
            <div className="join w-full">
              <input
                {...register("comment")}
                className="input  join-item
                  bg-base-200 text-base-content w-full  focus:outline-none border-2 focus:border-blue-200 
                  "
                placeholder="What do you think about this post, Leave a comment!!"
                required
              />
              <button className=" join-item rounded-r-lg bg-gray-200 py-2.5 px-4 hover:bg-gray-300 transition hover:text-info duration-150">
                <CiLocationArrow1 className="text-xl " />
              </button>
            </div>
          </form>
        </div>

        {/* display the comments */}
        <Comments comments={comments} />
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
