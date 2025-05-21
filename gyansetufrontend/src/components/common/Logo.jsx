// src/components/common/Logo.jsx
import React from "react";

const Logo = ({ size = 100, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx="50" fill="#8A2BE2" />
      <path
        d="M25 50L50 35L75 50L50 65L25 50Z"
        stroke="white"
        strokeWidth="4"
      />
      <path d="M35 65V40L65 25V50" stroke="white" strokeWidth="4" />
      <path d="M75 60V75L45 90V75" stroke="white" strokeWidth="4" />
    </svg>
  );
};

export default Logo;
