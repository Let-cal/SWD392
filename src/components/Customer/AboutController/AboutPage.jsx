import Footer from "../Footer/Footer";
import Header from "../Header/header";
import Content from "./AboutContent";

const AboutPage = () => {
  return (
    <div>
      <Header />
      <section className="w-[1250px] mt-[10%] flex flex-row items-start justify-center pt-0 px-0 pb-[155px] box-border max-w-full lg:pb-[101px] lg:box-border mq450:pb-[43px] mq450:box-border mq1050:pb-[66px] mq1050:box-border">
        <Content />
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
