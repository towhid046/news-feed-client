import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuPenSquare } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import { TiDelete } from "react-icons/ti";
import useAuth from "./../../../hooks/useAuth";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PropTypes from "prop-types";

const AddPost = ({ refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleOpenModal = () => {
    if (!user) {
      swal({
        title: "Login first",
        text: "Please login to create a new post!",
        icon: "info",
        buttons: true,
        dangerMode: false,
      }).then(async (pressOk) => {
        if (pressOk) {
          navigate("/login");
        }
      });
    }
    if (user) {
      setIsModalOpen(true);
    }
  };

  const handlePostForm = async (data) => {
    const newPost = {
      username: user?.username,
      release_date: moment().format("L"),
      description: data.description,
      thumbnail_img: data?.imgUrl,
      likes: [],
      comments: [],
    };
    try {
      const res = await axiosPublic.post("/add-news", newPost);
      if (res?.data?.insertedId) {
        swal("Added", "Your post have been added", "success");
        setIsModalOpen(false);
        refetch();
        reset();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section>
      <div className="border p-5 rounded-lg xl:w-[60%] lg:w-[70%] md:w-[90%] w-full mb-10 mx-auto">
        <h2 className="text-2xl font-bold mb-3">Create a post</h2>
        <button
          onClick={handleOpenModal}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Create a new post"
          className="bg-base-200 gap-12 w-full focus:outline-none border rounded-full py-3 px-8 flex items-center justify-between text-gray-400 "
        >
          <span>Create a new post</span>
          <LuPenSquare />
        </button>
      </div>

      {/* modal */}
      {isModalOpen && (
        <div className="fixed bg-black bg-opacity-70 flex left-0 top-0 items-center min-h-screen justify-center w-full  z-50">
          <div className="border relative md:p-10 p-5 rounded-lg w-full my-6 mx-auto lg:max-w-[50%] bg-white md:max-w-[70%] max-w-[95%]">
            <div className="mb-3 flex items-enter justify-between">
              <h2 className="text-2xl font-bold">Create a post</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className=" relative md:-top-5 -top-3 md:-right-5 -right-3"
              >
                <TiDelete className="text-3xl text-red-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit(handlePostForm)} className="space-y-1">
              <div>
                <textarea
                  {...register("description")}
                  className="bg-base-200 text-base-content w-full focus:outline-none border-2 p-4 rounded-lg focus:border-blue-300  "
                  rows={6}
                  placeholder="Write here"
                  required
                ></textarea>
              </div>
              <div>
                <label className="label">
                  <strong className="label-text">Image URL</strong>
                </label>
                <input
                  type="text"
                  {...register("imgUrl")}
                  placeholder="Pest image url"
                  className="bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-blue-300   input"
                  required
                />
              </div>
              <div className="flex justify-end pt-5">
                <input
                  type="submit"
                  className="btn btn-info md:w-max md:btn-md w-full text-base-100"
                  value="Post"
                />
              </div>
            </form>
            <div className="absolute md:right-28 md:bottom-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn md:block hidden"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Tooltip id="my-tooltip" />
    </section>
  );
};

AddPost.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default AddPost;