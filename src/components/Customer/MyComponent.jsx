import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReasonChoose from "./BenefitOfPage/ReasonChoose.jsx";
import CardStack from "./CartStackInImage/CardStack.jsx";
import "./CartStackInImage/CollectionCard.css";
import CollectionsCarousel from "./CollectionProduct/CollectionCard.jsx";
import Footer from "./Footer/Footer.jsx";
import Header from "./Header/header.jsx";
import Zodiac from "./Zodiac controller/Zodiac.jsx";
function Hero() {
  const images = [
    "/images/gabrielle-henderson-XTp4ZzD76Xw-unsplash.jpg",
    "/images/jasmin-chew-MIyo2hqbAzk-unsplash.jpg",
    "/images/jasmin-chew-WKD2vIe8Rb0-unsplash.jpg",
    "/images/juan-burgos-3_XeNGVbTQA-unsplash.jpg",
    "/images/kateryna-hliznitsova-ceSCZzjTReg-unsplash.jpg",
    "/images/mike-von-qsJ5itg93WY-unsplash.jpg",
  ];
  return (
    <section className="bg-custom-gradient flex overflow-hidden flex-col items-start pt-20 pr-20 pb-6 pl-10 mt-6 w-full text-white max-w-[1249px] min-h-[646px] max-md:px-5 max-md:max-w-full ">
      <div className="Collection__content flex flex-row justify-between w-full">
        <div>
          <div className="relative mt-6 max-md:max-w-full text-6xl">
            <span className="font-bold bg-white font-serif bg-clip-text text-transparent">
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

function useIntersectionObserver(ref, options) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
}

function MyComponent() {
  const zodiacRef = useRef(null);
  const monthlyDealsRef = useRef(null);
  const reasonChooseRef = useRef(null);
  const trustedCompaniesRef = useRef(null);

  useIntersectionObserver(zodiacRef, { threshold: 0.1 });
  useIntersectionObserver(monthlyDealsRef, { threshold: 0.1 });
  useIntersectionObserver(reasonChooseRef, { threshold: 0.1 });
  useIntersectionObserver(trustedCompaniesRef, { threshold: 0.1 });

  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTrustedCompanies = () => {
    trustedCompaniesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state?.scrollTo === "TrustedCompanies") {
      scrollToTrustedCompanies();
    }
  }, [location]);

  return (
    <div>
      <Header
        scrollToTrustedCompanies={() =>
          navigate("/customer-page", {
            state: { scrollTo: "TrustedCompanies" },
          })
        }
      />
      <div className="flex flex-col items-center px-20 pb-0 bg-white max-md:px-5 max-sm:mt-[130px]">
        <Hero />

        <section ref={trustedCompaniesRef} className="fade-in-section">
          <Zodiac />
        </section>
        <section ref={monthlyDealsRef} className="fade-in-section">
          <CollectionsCarousel />
        </section>
        <section
          ref={reasonChooseRef}
          className="fade-in-section max-md:hidden max-sm:hidden"
        >
          <ReasonChoose scrollToTrustedCompanies={scrollToTrustedCompanies} />
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default MyComponent;
