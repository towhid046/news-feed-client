import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

import PropTypes from "prop-types";
import { scrollToTop } from "../../../utilities/scrollToTop";
import { GoShieldLock } from "react-icons/go";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import { useForm } from "react-hook-form";

const AllForumCard = () => {
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleCommentForm = (data) => {
    console.log(data);
  };

  const thumbnail_img =
    "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600";
  const release_date = "12/12/2005";
  const description = `Objectively myocardinate error-free schemas via resource maximizing niche markets. Credibly develop strategic infrastructures and cooperative "outside the box" thinking. Compellingly underwhelm sticky portals through granular value. Interactively.`;
  const author = {
    img: "",
    name: "Author Username",
  };

  const [initialDes, setInitialDes] = useState(
    description?.split(" ").slice(0, 20).join(" ")
  );

  const handleShowFullDescription = () => {
    setInitialDes(description);
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
                    {author.name}
                  </span>
                  <p>
                    <em>
                      <small className={`flex items-center gap-2`}>
                        <MdOutlinePeopleAlt />
                        Member
                      </small>
                    </em>
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <small className="text-gray-400">{release_date}</small>
                  <CiCalendar className="text-custom-primary text-xl" />
                </li>
              </ul>
              <p>
                {initialDes}
                <em
                  onClick={handleShowFullDescription}
                  className={`${
                    initialDes.split(" ").length > 20 && "hidden"
                  } text-info cursor-pointer`}
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
              className="max-h-80 w-full p-4"
              src={thumbnail_img}
              alt="News Image"
            />
          </figure>

          {/* Like and comment count */}
          <div className="mx-4 mb-4 flex justify-between items-center ">
            <p>Like : 0 </p>
            <div className="flex items-center gap-2">
              <span>0</span>
              <FaRegCommentAlt className="text-xl" />
            </div>
          </div>

          {/* like and comment */}
          <div className="mx-4 mb-4 border-t pt-3 space-y-5">
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Like"
              className={`flex items-center gap-1 btn`}
            >
              <>
                <AiOutlineLike className="text-xl" />
                <span>Like </span>
              </>
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
        </article>
      </div>
    </div>
  );
};

// AllForumCard.propTypes = {
//   forum: PropTypes.object.isRequired,
//   handleUpVote: PropTypes.func,
//   handleDownVote: PropTypes.func,
//   loading: PropTypes.bool,
// };

export default AllForumCard;
