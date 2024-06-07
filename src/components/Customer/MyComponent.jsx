import { defineElement } from "@lordicon/element";
import lottie from "lottie-web";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReasonChoose from "./BenefitOfPage/ReasonChoose.jsx";
import CardStack from "./CollectionCard/CardStack.jsx";
import "./CollectionCard/CollectionCard.css";
import Footer from "./Footer/Footer.jsx";
import Header from "./Header/header.jsx";
import Zodiac from "./Zodiac controller/Zodiac.jsx";
import TrustedCompanies from "./customer-productCard/productCard.jsx";
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);
const ProductsMonthly = ({ imgSrc, title, subtitle, price, oldPrice }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <article
      className={`group relative flex flex-col px-4 pb-8 bg-white text-2xl leading-8 text-zinc-800 w-full max-w-xs md:max-w-sm overflow-hidden ${
        isHovered ? "grayed" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imgSrc}
        alt={title}
        className="self-center -mt-10 aspect-[0.93] w-[150px] md:w-[207px]"
      />
      <h3 className="mt-6 md:mt-10 font-medium">{title}</h3>
      <p className="mt-2.5 text-base leading-6 text-neutral-500">{subtitle}</p>
      {oldPrice && (
        <p className="mt-5 text-base leading-6 text-neutral-500 line-through">
          {oldPrice}
        </p>
      )}
      <p className="mt-2.5">{price}</p>

      <a
        href="#"
        className="absolute rounded-[3px] w-full flex justify-center items-center gap-3 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full transition-transform duration-300 bg-black text-white py-2 px-4 border border-black group-hover:translate-y-0"
      >
        Add to cart
        <lord-icon
          src="https://cdn.lordicon.com/mfmkufkr.json"
          trigger="hover"
          style={{ width: "20%", height: "40px" }}
          colors="primary:white"
        ></lord-icon>
      </a>
    </article>
  );
};

const MonthlyDeals = () => (
  <section className="bg-white mt-24 w-full ">
    <h2 className="text-2xl md:text-4xl font-medium tracking-wider leading-10 text-zinc-800 font-serif">
      Monthly Deals
    </h2>
    <div className="shrink-0 mt-2.5 h-px bg-black border border-black border-solid"></div>
    <div className="flex flex-wrap gap-5 mt-10 justify-center bg-stone-200 p-4">
      <div className="w-full sm:w-2/5 lg:w-1/5 flex justify-center items-center ">
        <ProductsMonthly
          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/49522e66aa2f836f8703bf2eae56c2df0df907d4a6e1b45517e8100998d25032?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
          title="Singo Maple"
          subtitle="20% Off"
          description=""
          price="Rp 1.264.000"
          oldPrice="Rp 1.500.000"
        />
      </div>
      <div className="w-full sm:w-2/5 lg:w-1/5 flex justify-center items-center">
        <ProductsMonthly
          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/74d9df1af48b95d56e8bf09a331c6f3dec7c917253c70771f7437d2248068e84?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
          title="Singo Ebony"
          subtitle="20% Off"
          description=""
          price="Rp 1.264.000"
          oldPrice="Rp 1.500.000"
        />
      </div>
      <div className="w-full sm:w-2/5 lg:w-1/5 flex justify-center items-center">
        <ProductsMonthly
          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/4dd40d03e14a5ae6f55b3f2a51821729b7b76826c7f2d8b12790fe9500a3a06c?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
          title="Rakai Ebony"
          subtitle="15% Off"
          description=""
          price="Rp 1.118.000"
          oldPrice="Rp 1.280.000"
        />
      </div>
      <div className="w-full sm:w-2/5 lg:w-1/5 flex justify-center items-center">
        <ProductsMonthly
          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d1137c681b0f0b10f14c248ed55f431e5c344f992b074587c4125bcf9d823f2e?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
          title="Way Kambas Mini Maple"
          subtitle="10% Off"
          description=""
          price="Rp 1.024.000"
          oldPrice="Rp 1.280.000"
        />
      </div>
    </div>
  </section>
);

function Hero() {
  const images = [
    "public/images/gabrielle-henderson-XTp4ZzD76Xw-unsplash.jpg",
    "public/images/jasmin-chew-MIyo2hqbAzk-unsplash.jpg",
    "public/images/jasmin-chew-WKD2vIe8Rb0-unsplash.jpg",
    "public/images/juan-burgos-3_XeNGVbTQA-unsplash.jpg",
    "public/images/kateryna-hliznitsova-ceSCZzjTReg-unsplash.jpg",
    "public/images/mike-von-qsJ5itg93WY-unsplash.jpg",
  ];
  return (
    <section className="bg-custom-gradient flex absolute overflow-hidden relative flex-col items-start pt-20 pr-20 pb-6 pl-10 mt-6 w-full text-white max-w-[1249px] min-h-[646px] max-md:px-5 max-md:max-w-full">
      <div className="Collection__content flex flex-row justify-between w-full">
        <div>
          <div className="relative mt-6 max-md:max-w-full text-6xl">
            <span className="font-bold bg-white font-serif  bg-clip-text text-transparent">
              Z
            </span>
            <span className=" bg-clip-text bg-white font-serif text-transparent">
              odiacGems
            </span>
          </div>
          <h1 className="Collection__content-text opacity-80 font-serif relative mt-14 text-1xl w-3/5 leading-10 max-md:mt-10 max-md:max-w-full">
            Welcome to our e-commerce site, your go-to for zodiac-themed jewelry
            and fashion accessories. Discover bracelets, rings, and clothing
            designed with your zodiac sign in mind. Enter your birthdate to get
            personalized recommendations. We offer products for all genders, and
            special Couple Combos for two zodiac signs at a discount. Enjoy easy
            electronic payments and access via our mobile app. Start your
            celestial shopping journey with us today!
          </h1>
          <Link to="/AboutPage">
            <button className="coolBeans">
              <span className="uppercase">E</span>PLORE{" "}
              <span className="uppercase">M</span>ORE
            </button>
          </Link>
        </div>
        <CardStack images={images} />
      </div>
    </section>
  );
}

function MyComponent() {
  const trustedCompaniesRef = useRef(null);

  const scrollToTrustedCompanies = () => {
    trustedCompaniesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header scrollToTrustedCompanies={scrollToTrustedCompanies} />
      <div className="flex flex-col items-center px-20 pb-0 bg-white max-md:px-5 max-sm:mt-[130px]">
        <Hero />
        <Zodiac />
        <MonthlyDeals />
        <ReasonChoose />
        <div ref={trustedCompaniesRef}>
          <TrustedCompanies />
        </div>
        <Footer />
      </div>
    </div>
  );
}
ProductsMonthly.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  price: PropTypes.string.isRequired,
  oldPrice: PropTypes.string,
};

export default MyComponent;
