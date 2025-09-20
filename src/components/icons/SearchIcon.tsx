import React from "react";

interface SearchIconProps {
  className?: string;
  size?: number;
  variant?: "default" | "filled" | "outline" | "rounded";
}

const SearchIcon: React.FC<SearchIconProps> = ({
  className = "",
  size = 16,
  variant = "default",
}) => {
  const iconProps = {
    className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  const renderIcon = () => {
    switch (variant) {
      case "filled":
        return (
          <path
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
            fill="currentColor"
          />
        );

      case "outline":
        return (
          <path
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

      case "rounded":
        return (
          <path
            d="M20.5 20.5L15.5 15.5M18 10.5C18 14.9183 14.4183 18.5 10 18.5C5.58172 18.5 2 14.9183 2 10.5C2 6.08172 6.08172 2 10.5 2C14.9183 2 18.5 6.08172 18.5 10.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

      default:
        return (
          <path
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
    }
  };

  return (
    <svg
      {...iconProps}
      style={{
        display: "block",
        flexShrink: 0,
      }}
    >
      {renderIcon()}
    </svg>
  );
};

export default SearchIcon;
