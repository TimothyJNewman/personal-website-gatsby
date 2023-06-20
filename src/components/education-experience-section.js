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
      description="Achieved 74.31% in year 1, 72.77% in year 2. Relevant Modules: Analog Integrated Circuits, Digital Systems Design, Digital Signal Processing, Instrumentation, Electromagnetics, Machine Learning, Power Electronics, Optoelectronics. Co-curricular activities: Violinist at Sinfonietta Orchestra, AstroSoc, Space Society"
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