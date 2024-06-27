import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import PropTypes, { string } from "prop-types";
const LikeCommentCount = ({ likes, comments }) => {
  return (
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
  );
};

LikeCommentCount.propTypes = {
  likes: PropTypes.arrayOf(string),
  comments: PropTypes.arrayOf(string),
};

export default LikeCommentCount;
