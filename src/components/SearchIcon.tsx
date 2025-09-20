import React from "react";

interface SearchIconProps {
  className?: string;
  size?: number;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  className = "",
  size = 16,
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        flexShrink: 0,
      }}
    ></svg>
  );
};

export default SearchIcon;
