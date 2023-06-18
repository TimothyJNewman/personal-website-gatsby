import React from 'react';
import CoverImage from '../components/cover-image';
import Layout from '../components/layout';
import LayoutSingleColumn from '../components/layout-single-column';

const About = () => {
  const seo = {
    title: 'About',
    summary: 'Some things about me',
  };
  return (
    <Layout seo={seo}>
      <LayoutSingleColumn>
        <section className="mx-auto max-w-screen-md px-2 text-left w-full">
          <CoverImage title="About" />
          <div className="markdown-text">
            <div>
              <p><strong>Hello, welcome to my personal corner of the internet!😀😀😀</strong> I am an undergraduate pursuing <strong>Electrical and Electronic Engineering</strong> at Imperial College London. Currently, I am interning at Mediatek UK, specifically in the radio-frequency division. My interests lie in analog and digital IC design, PCB design, machine learning, and software engineering. </p>

              <h2 id="cocurricularactivities">Co-Curricular Activities 🔭📈🎻📷</h2>
              <p>Apart from my studies, I am part of a few clubs and societies at my college union.</p>
              <ul>
                <li><strong><a href="https://iclastronomy.wixsite.com/website">Astrosoc:</a></strong> Since my first year I have been involved in the society. Last year I was equipment officer and this year I am president. I have been involved in managing our inventory, organizing events such as our collaboration with the Fellwanderers society and guest lectures. We had lots of fun with our new NexStar 6SE goto telescope.</li>
                <li><strong>Spacesoc</strong> We hope to participate in the National Rocketry Challenge in June and are designing a small rocket with a class G motor. My role is that of electronics engineer and I am redesigning a flight computer based on the STM32 with GPS, temperature, pressure and humidity sensors and radio to transmit all of this data.</li>
                <li><strong><a href="https://www.investmentsoc.com/">Investment Soc:</a></strong> In my second year, I was involved with this society. In this society, members pitch stocks and bonds to be added to the student-run fund. Although I didn't pitch anything, I learnt so much from the sessions. I attended the Securities Education Course organized by the society which covered the fundamentals of finance and the finance industry. I also helped out with the website.</li>
                <li><strong><a href="https://www.union.ic.ac.uk/arts/sinfonietta/">Sinfonietta:</a></strong> In my second year, I was involved with this society. Playing the violin in a full orchestra has been my dream and now I get to play awesome pieces from composers such as Tchaikovsky. Initially, I found the pieces really difficult since I had never played at such a high level before. However, I practiced in all the spare time I could muster and managed to gain a decent understanding.</li>
                <li><strong>PhotoSoc:</strong> In my second year, I was involved with this society. I visited the dark room and observed B&amp;W film development but have not had the time to try it myself. I also went on a photowalk to Richmond Park. Hopefully in the future, I will be able to attend more photowalks.</li>
                <li><strong>Fellwanderers:</strong> In my second year, I hiked along Seven Sisters Cliffs in Sussex which was a 22km journey with a lot of elevation. This year, I collaborated with them in organizing a hiking and stargazing trip at the South Downs which was lots of fun but required a <em>lot</em> of planning.</li>
                <li><strong>EESoc:</strong> I attended a careers fair and took part in the <strong>Mums and Dads scheme</strong> which was a system to help freshers integrate into the college. </li>
              </ul>
              <h2 id="myhopesandwishes">My hopes and wishes 🌠</h2>
              <p>In the coming year, I would like to become proficient in digital design, image processing and PCB design. Outside of academics, I would like to gain my driver's license and to acquire a serious astrophotography setup.</p>
              <p><strong>If you are curious to know how I created this website, I have written an <a href="/project/creating-this-personal-website">article explaining it</a>. I love meeting new people so why not head over to the <a href="/contact">contact page</a> and drop me a message?</strong></p>
            </div>
          </div>
        </section>
      </LayoutSingleColumn>
    </Layout>
  );
};

export default About;
