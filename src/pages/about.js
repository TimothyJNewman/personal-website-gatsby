import React from 'react';
import CoverImage from '../components/cover-image';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';
import WorkExperienceSection from '../components/work-experience-section';
import EducationExperienceSection from '../components/education-experience-section';

const About = () => {
  const seo = {
    title: 'About',
    summary: 'Some things about me',
  };
  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <section className="mx-auto lg:w-[54rem] px-2 text-left w-full">
          <CoverImage title="About" />
          <div className="markdown-text">
            <div>
              <p><strong>Hello, welcome to my personal corner of the internet!😀😀😀</strong> I am an analog design engineer and graduate <strong>Electrical and Electronic Engineering</strong> at Imperial College London. I work in the semiconductor industry with an interest in RF communication. Outside of my work, I enjoy programming, astronomy, photography, hiking and tinkering with my Linux PC. </p>

              <h2 id="myhopesandwishes">My hopes and wishes 🌠</h2>
              <p>In the coming year, I would like to learn to design more analog blocks and learn RF tools. Outside of work, I would like to gain my driver's license and to travel more around the UK.</p>
              </div>
          </div>
          <WorkExperienceSection />
          <EducationExperienceSection />
          <div className="markdown-text">
            <div>
              <p><strong>If you are curious to know how I created this website, I have written an <a href="/project/creating-this-personal-website">article explaining it</a>. I love meeting new people so why not head over to the <a href="/contact">contact page</a> and drop me a message?</strong></p>
              <p>Work in progress projects can be found at <a href="/showcase/">this showcase</a>.</p>
            </div>
          </div>
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default About;
