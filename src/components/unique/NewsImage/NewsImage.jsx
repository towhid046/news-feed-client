import PropTypes from "prop-types";

const NewsImage = ({ thumbnail_img }) => {
  return (
    <figure className="relative overflow-hidden ">
      <img
        className="max-h-80 w-full py-4"
        src={thumbnail_img}
        alt="News Image"
      />
    </figure>
  );
};

NewsImage.propTypes = {
  thumbnail_img: PropTypes.any.isRequired,
};

export default NewsImage;
