import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdmissionButton.css";

function AdmissionButton() {
  const navigate = useNavigate();

  return (
    <button
      className="admission-btn"
      onClick={() => navigate("/admissions")}
    >
      Admissions Ongoing
    </button>
  );
}

export default AdmissionButton;