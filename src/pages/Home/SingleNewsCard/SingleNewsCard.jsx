import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { scrollToTop } from "../../../utilities/scrollToTop";
import { CiLocationArrow1 } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuPenSquare } from "react-icons/lu";

const SingleNewsCard = ({ singleNews }) => {
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    scrollToTop();
  }, []);

  const { username, release_date, thumbnail_img, description } = singleNews;

  const [initialDes, setInitialDes] = useState(
    description?.split(" ").slice(0, 20).join(" ")
  );

  const handleShowFullDescription = () => {
    setInitialDes(description);
  };

  const handleCommentForm = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className=" max-w-3xl mx-auto">
        <article className="border rounded-lg  border-opacity-10 justify-between flex flex-col">
          {/* forum article text */}
          <div className="p-5 pb-1">
            <div className=" space-y-4">
              <ul className="flex flex-wrap gap-4 justify-between  items-center">
                <li>
                  <span className="text- font-semibold text-md">
                    {username}
                  </span>
                  <div className="flex items-center gap-2">
                    <CiCalendar className="text-custom-primary text-xl" />
                    <small className="text-gray-400">{release_date}</small>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex items-center gap-3">
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Delete"
                      className={` btn`}
                    >
                      <RiDeleteBin5Fill className="text-lg text-red-400" />
                    </button>{" "}
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Update"
                      className={`btn`}
                    >
                      <LuPenSquare className="text-md text-info" />
                    </button>{" "}
                  </div>
                </li>
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
              <span>0</span>
              <AiOutlineLike className="text-lg" />
            </div>
            <div className="flex items-center gap-2">
              <span>0</span>
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
      </div>
    </div>
  );
};

SingleNewsCard.propTypes = {
  singleNews: PropTypes.object.isRequired,
};

export default SingleNewsCard;