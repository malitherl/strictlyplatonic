import React from "react";
import back from '../assets/images/icons/back.svg'
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <button onClick={goBack} style={{ padding: "10px 10px", cursor: "pointer", backgroundColor: "transparent", borderRadius: "50%", border: "2px solid #1a1a1a" }}>
      <img src={back} style={{width: "25px", height: "25px"}} alt="" />
    </button>
  );
};

export default BackButton;
