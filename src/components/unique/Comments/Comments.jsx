import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import PropTypes, { string } from "prop-types";

const Comments = ({ comments }) => {
  const [initialComments, setInitialComments] = useState([]);

  const { user } = useAuth();
  useEffect(() => {
    setInitialComments(comments?.slice(0, 2));
  }, [comments]);

  const handleShowAllComments = () => {
    setInitialComments(comments);
  };

  return (
    <div className="mx-4 mb-4 space-y-4 mt-6">
      <ul>
        {comments.length ? (
          initialComments?.map((comment, index) => (
            <li key={index} className="border rounded-lg py-2.5 px-4 mb-3">
              <h6 className="font-bold">{comment?.comment_author}</h6>
              <p>{comment?.comment_text}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-400 font-semibold text-xl">
            No comment have been yet!
          </p>
        )}
      </ul>

      <div
        onClick={handleShowAllComments}
        className={`text-center 
          ${comments.length <= 2  ? "hidden" : 'block' }
          ${initialComments.length > 2  && "hidden" }
        
        `}
      >
        <button className="btn rounded-full btn-wide text-blue-400">
          View all Comments
        </button>
      </div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(string),
  handleShowAllComments: PropTypes.func,
};

export default Comments;
