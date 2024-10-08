import React from "react";
import { Container, Image } from "react-bootstrap";
import "../customcss/aboutscreen.css";

const AboutScreen = () => {
  return (
    <>
      <section className="about-image-section">
        <Image
          src="images/schoolimage.jpg"
          className="about-bg-image"
          alt="about-background"
          fluid
        />
      </section>
      <Container className="about-container" style={{ marginTop: "5rem" }}>
        <h1 className="about-heading">About Us</h1>

        <p className="about-para text-dark">
          Deepika School is a Private educational institution, which is located
          in Koteshwor, Kathamandu-35, Nepal. It is affiliated to the National
          Examinations Board (NEB) and approved by the Ministry of Education. It
          offers education programs from Grade one to Grade Ten programs.
          Deepika School is a leading force in child education, providing
          co-educational secondary schooling to students from our convenient
          location in Kathmandu, Nepal. As its basis is a model of integrated
          learning that is, learning that combines practice, critical thinking,
          and innovation. Deepika School provides up to secondary level
          education with moderate fee structures and also provides a scholarship
          scheme for deserving students.
        </p>

        <h1 className="about-heading ">Our Vision</h1>
        <p className="text-dark">It is a vision to bring quality education to students who wish to become so we always stand on ” In knowledge, we trust”. Academically competent and techno, Creative and critical thinkers, Ethical and exemplary in behaviors and Responsible national and global citizens.</p>
      </Container>
    </>
  );
};

export default AboutScreen;
