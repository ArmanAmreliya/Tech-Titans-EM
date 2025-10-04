import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const Spinner = ({ size = "md", className }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
        sizes[size],
        className
      )}
    />
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  className: PropTypes.string,
};

export default Spinner;
