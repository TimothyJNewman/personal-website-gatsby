import React from "react";
import ExperienceCard from "./experience-card";
import ImperialLogo from "../images/Imperial_logo.svg"
import ACSLogo from "../images/ACS_logo.svg"

const EducationExperienceSection = () => (
  <section>
    <div className="flex items-center justify-between">
      <h2 className="my-4 font-normal font-serif">Education</h2>
    </div>
    <ExperienceCard
      title={"MEng Electrical and Electronic Engineering"}
      img={ImperialLogo}
      date={"10/2020-06/2024"}
      description="Achieved 75.34% (First class honours). Relevant Modules: Analog Integrated Circuits, Digital Systems Design, Digital Signal Processing, Instrumentation, Electromagnetics, Digital Electronics and Computer Architecture, Machine Learning, Power Electronics, Optoelectronics, Full-Custom Integrated Circuits, Sensors, Hardware and Software Verification, Digital Image Processing, Computer Vision and Pattern Recognition and Radio-Frequency Subsystems Co-curricular activities: Violinist at Sinfonietta Orchestra, AstroSoc, Space Society"
      company={"Imperial College London"}
      location={"London, United Kingdom"}
    />
    <ExperienceCard
      title={"International Baccalaureate Diploma Program"}
      img={ACSLogo}
      date={"01/2014-11/2019"}
      description="Attained 41/45 with HL Math 7, HL Physics 7, HL Chemistry 7. Activities and societies: Symphonic Band, Astronomy Club, Science Research Challenge."
      company={"Anglo-Chinese School (Independent)"}
      location={"Singapore"}
    />
  </section>
);

export default EducationExperienceSection;