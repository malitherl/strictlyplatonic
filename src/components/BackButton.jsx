import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back one page
  };

  return (
    <button onClick={goBack} style={{ padding: "10px 20px", cursor: "pointer" }}>
      Go Back
    </button>
  );
};

export default BackButton;
