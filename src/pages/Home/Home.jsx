import { useEffect, useState } from "react";
import { scrollToTop } from "../../utilities/scrollToTop";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner.jsx";
import { useLoaderData, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AllForumCard from "./AllForumCard/AllForumCard";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import ErrorElement from "./../../components/shared/ErrorElement/ErrorElement";
import { useForm } from "react-hook-form";

const Home = () => {
  const [forums, setForums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const { register, handleSubmit } = useForm();

  const handlePostForm = async (data) => {
    console.log(data);
  };

  return (
    <section>
      <div className="pt-10 container mx-auto px-4">
        <div className="border p-5 rounded-lg max-w-3xl my-6 mx-auto">
          <h2 className="text-2xl font-bold mb-3">Create a post</h2>
          <form onSubmit={handleSubmit(handlePostForm)} className="space-y-1">
            <div>
              <textarea
                {...register("description")}
                className="bg-base-200 text-base-content w-full focus:outline-none border-2 p-4 rounded-lg focus:border-blue-300  "
                rows={5}
                placeholder="Write here"
                required
              ></textarea>
            </div>
            <div>
              <input
                type="submit"
                className="btn btn-info btn-wide text-base-100"
                value="Post"
              />
            </div>
          </form>
        </div>

        {/* all forums container */}
        <div className="flex flex-col gap-7">
          {forums?.map((forum, index) => (
            <AllForumCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
