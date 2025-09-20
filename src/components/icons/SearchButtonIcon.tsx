import React from "react";

interface SearchButtonIconProps {
  className?: string;
  size?: number;
  variant?: "default" | "filled" | "outline";
}

const SearchButtonIcon: React.FC<SearchButtonIconProps> = ({
  className = "",
  size = 20,
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
          <>
            <path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              fill="currentColor"
            />
            <circle
              cx="10.5"
              cy="10.5"
              r="8.5"
              stroke="white"
              strokeWidth="2"
            />
          </>
        );

      case "outline":
        return (
          <>
            <path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="10.5"
              cy="10.5"
              r="8.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </>
        );

      default:
        return (
          <>
            <path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="10.5"
              cy="10.5"
              r="8.5"
              stroke="currentColor"
              strokeWidth="2"
            />
          </>
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

export default SearchButtonIcon;
