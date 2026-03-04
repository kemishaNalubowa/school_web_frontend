import React from "react";
import "./AdmissionCTA.css";

const AdmissionCTA = () => {
  return (
    <section className="admission-section">

      <div className="admission-content">
        <h2>Apply for Admission</h2>

        <div className="admission-line"></div>

        <p>
          JOKS is a <strong>supportive community</strong> that nurtures 
          students in both intellectual, talent-oriented and ethically built ways.
        </p>
      </div>

      <div className="admission-btn-container">
        <button className="read-more-btn">
          Read more →
        </button>
      </div>

      {/* <div className="admissions-pill">
        Admissions Ongoing
      </div> */}

    </section>
  );
};

export default AdmissionCTA;