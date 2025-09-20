import React from "react";

interface ClearIconProps {
  className?: string;
  size?: number;
}

const ClearIcon: React.FC<ClearIconProps> = ({ className = "", size = 14 }) => {
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
        cursor: "pointer",
      }}
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClearIcon;
