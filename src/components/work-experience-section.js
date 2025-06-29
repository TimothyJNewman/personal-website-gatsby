import React from "react";
import ExperienceCard from "./experience-card";
import MediatekLogo from "../images/MediaTek_logo.svg";
import BuhlerLogo from "../images/Buhler_logo.svg";
import EnsilicaLogo from "../images/EnSilica_logo.webp";

const WorkExperienceSection = () => (
  <section>
    <div className="flex items-center justify-between">
      <h2 className="my-4 font-normal font-serif">Work Experience</h2>
    </div>
    <ExperienceCard
      title={"Graduate Analog Integrated Circuit Engineer"}
      img={EnsilicaLogo}
      date={"09/2024-present"}
      description="Working mainly on RF projects in design, verification and validation roles. Using leading technology nodes and industry tools."
      company={"EnSilica PLC"}
      location={"Abingdon, Oxfordshire, United Kingdom"}
    />
    <ExperienceCard
      title={"Hardware Verification Intern"}
      img={MediatekLogo}
      date={"04/2023-09/2023"}
      description="Over a 6 month period, I worked in the RF division where I verified designs both at top-level and at individual subcomponent level. I also wrote scripts for post-silicon checking and improved an existing regression checker script. My tools were mainly the Cadence suite, Verilog-AMS and the Linux environment. Besides technical skills, I learnt to present ideas in daily meetings and through documentation."
      company={"Mediatek UK"}
      location={"Maidstone, Kent, United Kingdom"}
    />
    <ExperienceCard
      title={"Front-end Software Developer"}
      img={BuhlerLogo}
      date={"07/2022-09/2022"}
      description="Developed a desktop a GUI using ElectronJS, ReactJS and TailwindUI for querying an internal data management platform. Setup CI/CD pipeline on Azure DevOps with test, build and publish stages to distribute application for user testing. Presented applications to both technical and non-technical users to gain feedback which was then incorporated into later versions."
      company={"Bühler UK Ltd"}
      location={"London, United Kingdom"}
    />
  </section>
);

export default WorkExperienceSection;