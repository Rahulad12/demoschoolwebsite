import React, { useState } from "react";
import "../customcss/WhyChooseSchool.css";

const WhyChooseSchool = () => {
  const [activeTab, setActiveTab] = useState("tabs-1");

  return (
    <div className="section why-us" data-section="section2">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 text-center">
            <div className="section-heading">
              <h2 className="fs-2 text-white my-3">
                Why Choose Deepika School?
              </h2>
              <p className="text-light">
                Discover the best reasons to choose Deepika School for your child's future.
              </p>
            </div>
          </div>

          <div className="col-md-12">
            <div id="tabs">
              <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                  <a
                    href="#BestEducation"
                    onClick={() => setActiveTab("tabs-1")}
                    className={`nav-link ${
                      activeTab === "tabs-1" ? "active" : ""
                    }`}
                  >
                    Best Education
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#ExtraCurriculum"
                    onClick={() => setActiveTab("tabs-2")}
                    className={`nav-link ${
                      activeTab === "tabs-2" ? "active" : ""
                    }`}
                  >
                    Extra Curriculum
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#Outing"
                    onClick={() => setActiveTab("tabs-3")}
                    className={`nav-link ${
                      activeTab === "tabs-3" ? "active" : ""
                    }`}
                  >
                    Outing
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#Event"
                    onClick={() => setActiveTab("tabs-4")}
                    className={`nav-link ${
                      activeTab === "tabs-4" ? "active" : ""
                    }`}
                  >
                    Event
                  </a>
                </li>
              </ul>

              <section className="tabs-content mt-4">
                <article
                  className={`tab-pane ${
                    activeTab === "tabs-1" ? "active" : ""
                  }`}
                >
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <img
                        src="/images/1.jpg"
                        alt="Best Education"
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-6">
                      <h4 className="text-primary">Best Education</h4>
                      <p className="text-light">
                        Our school provides a well-rounded curriculum with the best educational practices.
                      </p>
                    </div>
                  </div>
                </article>

                <article
                  className={`tab-pane ${
                    activeTab === "tabs-2" ? "active" : ""
                  }`}
                >
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <img
                        src="/images/extra-activity.jpg"
                        alt="Extra Curriculum"
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-6">
                      <h4 className="text-primary">Extra Curriculum</h4>
                      <p className="text-light">
                        We focus on extracurricular activities to enhance the overall growth of students.
                      </p>
                    </div>
                  </div>
                </article>

                <article
                  className={`tab-pane ${
                    activeTab === "tabs-3" ? "active" : ""
                  }`}
                >
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <img
                        src="/images/2.jpg"
                        alt="Outing"
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-6">
                      <h4 className="text-primary">Outing</h4>
                      <p className="text-light">
                        Regular outings and excursions make learning fun and interactive for students.
                      </p>
                    </div>
                  </div>
                </article>

                <article
                  className={`tab-pane ${
                    activeTab === "tabs-4" ? "active" : ""
                  }`}
                >
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <img
                        src="/images/event1.jpg"
                        alt="Event"
                        className="img-fluid rounded"
                      />
                    </div>
                    <div className="col-md-6">
                      <h4 className="text-primary">Events</h4>
                      <p className="text-light">
                        Our school organizes regular events to foster creativity and collaboration.
                      </p>
                    </div>
                  </div>
                </article>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSchool;
