import { useForm } from "react-hook-form";
import { Tooltip } from "react-tooltip";
import { TiDelete } from "react-icons/ti";
import swal from "sweetalert";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PropTypes from "prop-types";

const UpdatePost = ({ refetch, setIsUpdateFormOpen, updatableNews }) => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const { description, thumbnail_img, _id } = updatableNews;

  const handleUpdateNewsData = async (data) => {
    const updatedPost = {
      description: data.description,
      thumbnail_img: data?.imgUrl,
    };

    try {
      const res = await axiosPublic.put(`/update-news/${_id}`, updatedPost);
      if (res?.data?.modifiedCount) {
        swal("Updated", "Your post have been updated successfully", "success");
        refetch();
        setIsUpdateFormOpen(false);
      }
    } catch (error) {
      console.error(error.message);
    } 
  };

  return (
    <section>
      {/* modal */}
      <div className="fixed bg-black bg-opacity-70 flex left-0 top-0 items-center min-h-screen justify-center w-full  z-50">
        <div className="border relative md:p-10 p-5 rounded-lg w-full my-6 mx-auto lg:max-w-[50%] bg-white md:max-w-[70%] max-w-[95%]">
          <div className="mb-3 flex items-enter justify-between">
            <h2 className="text-2xl font-bold">Update your post</h2>
            <button
              onClick={() => setIsUpdateFormOpen(false)}
              className=" relative md:-top-5 -top-3 md:-right-5 -right-3"
            >
              <TiDelete className="text-3xl text-red-400" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdateNewsData)}
            className="space-y-1"
          >
            <div>
              <textarea
                {...register("description")}
                defaultValue={description}
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
                defaultValue={thumbnail_img}
                className="bg-base-200 text-base-content w-full focus:outline-none border-2 focus:border-blue-300   input"
                required
              />
            </div>
            <div className="flex justify-end pt-5">
              <input
                type="submit"
                className="btn btn-info md:w-max md:btn-md w-full text-base-100"
                value="Update"
              />
            </div>
          </form>
          <div className="absolute md:right-32 md:bottom-10">
            <button
              onClick={() => setIsUpdateFormOpen(false)}
              className="btn md:block hidden"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <Tooltip id="my-tooltip" />
    </section>
  );
};

UpdatePost.propTypes = {
  refetch: PropTypes.func.isRequired,
  setIsUpdateFormOpen: PropTypes.func.isRequired,
  updatableNews: PropTypes.object.isRequired,
};

export default UpdatePost;