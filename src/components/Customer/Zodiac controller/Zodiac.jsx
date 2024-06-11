import PropTypes from "prop-types";
import "./zodiac.css";
function ZodiacSignCard({ name, imageSrc }) {
  return (
    <button className="button-zodiac flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-md">
      <img
        src={imageSrc}
        alt={`${name} zodiac sign symbol`}
        className="w-20 h-[50px] mb-4"
      />
      <div className="text text-x0.8 font-semibold">{name}</div>
      <span className="star"></span>
    </button>
  );
}
ZodiacSignCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};
function ZodiacSignList() {
  const zodiacSigns = [
    {
      name: "Aries",
      imageSrc: "/images/Icon/Icon-1.svg",
    },
    {
      name: "Taurus",
      imageSrc: "/images/Icon/Icon-2.svg",
    },
    {
      name: "Gemini",
      imageSrc: "/images/Icon/Icon-3.svg",
    },
    {
      name: "Cancer",
      imageSrc: "/images/Icon/Icon-4.svg",
    },
    {
      name: "Leo",
      imageSrc: "/images/Icon/Icon-5.svg",
    },
    {
      name: "Virgo",
      imageSrc: "/images/Icon/Icon-6.svg",
    },
    {
      name: "Libra",
      imageSrc: "/images/Icon/Icon-7.svg",
    },
    {
      name: "Scorpio",
      imageSrc: "/images/Icon/Icon-8.svg",
    },
    {
      name: "Sagittarius",
      imageSrc: "/images/Icon/Icon-9.svg",
    },
    {
      name: "Capricorn",
      imageSrc: "/images/Icon/Icon-10.svg",
    },
    {
      name: "Aquarius",
      imageSrc: "/images/Icon/Icon-11.svg",
    },
    {
      name: "Pisces",
      imageSrc: "/images/Icon/Icon-12.svg",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12">
      {zodiacSigns.map((sign) => (
        <ZodiacSignCard
          key={sign.name}
          name={sign.name}
          imageSrc={sign.imageSrc}
        />
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="container mx-auto px-0 py-8">
      <h1 className="font-serif text-2xl md:text-4xl  ">Zodiac Signs</h1>
      <div className="shrink-0 mb-8 h-px bg-black border border-black border-solid"></div>
      <ZodiacSignList />
    </div>
  );
}
