import React from "react";
import "../customcss/Coverpage.css"; // Import the CSS file for styling

const ButtonofCoverpage = () => {
  return (
    <div className="text-center">
      {/* Adding the slogan */}
      <h3
        className="mb-3 text-light slogan"
        style={{ fontSize: "3rem", fontWeight: "bold" }}
        aria-label="School Slogan"
      >
        IN KNOWLEDGE WE TRUST
      </h3>
    </div>
  );
};

const Coverpage = () => {
  return (
    <div className="cover-container">
      <video className="cover-video" autoPlay loop muted>
        <source src="/images/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <ButtonofCoverpage />
      </div>
    </div>
  );
};

export default Coverpage;
