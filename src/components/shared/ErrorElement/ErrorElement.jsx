import PropTypes from "prop-types";
const ErrorElement = ({ error }) => {
  return (
    <div className="flex items-center justify-center text-3xl font-bold italic text-gray-400">
      <h2>{error}</h2>
    </div>
  );
};

ErrorElement.propTypes = {
  error: PropTypes.string,
};

export default ErrorElement;
