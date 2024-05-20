import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import Header from "./Header/header.jsx";
import Zodiac from "./Zodiac controller/Zodiac.jsx";

const latestProducts = [
  {
    name: "Lira Earrings",
    price: "$ 20,00",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/aae30422978342647c8d0d9193c8a66845f2bb0ae55e2f8c4877d6f67f292156?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
  },
  {
    name: "Hal Earrings",
    price: "$ 25,00",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d4d0e0c41c27a8ba8bf6d968218df6cc3aed36f2b2acc3b20439a7031c87c463?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
  },
  {
    name: "Kaede Hair Pin Set Of 3",
    price: "$ 30,00",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/19bff757d68beaff2705f47f3233c20dcc4b96aaeb729c00b0fe35c9db4f20ad?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
  },
];

const otherProducts = [
  {
    name: "Hair Pin Set of 3",
    price: "$ 30,00",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/85b98ed4e25a833586bc54c1d5c6457cfd243aeb3bf5249ca27fbce37631719b?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
  },
  {
    name: "Plaine Necklace",
    price: "$ 19,00",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a9e977caf29eb1b2eec1c3fae1d3171f992fe449c6cf1451fc6304cc7ed72cd8?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
  },
  {
    name: "Yuki Hair Pin Set of 3",
    price: "$ 29,00",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/17ba2627293335fe5285c0ef2c8c8fe27152c8e9df6d99e400f5abe71a4428d8?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
  },
];
const ProductsMonthly = ({
  imgSrc,
  title,
  subtitle,
  description,
  price,
  oldPrice,
}) => {
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
        className="absolute rounded-[3px] w-full flex justify-center items-center gap-3 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full transition-transform duration-300 bg-white text-black py-2 px-4 border border-black group-hover:translate-y-0"
      >
        Add to cart
        <AddShoppingCartIcon />
      </a>
    </article>
  );
};

const MonthlyDeals = () => (
  <section className="bg-white mt-24 w-full ">
    <h2 className="text-2xl md:text-4xl font-medium tracking-wider leading-10 text-zinc-800">
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
  return (
    <section className="flex overflow-hidden relative flex-col items-start pt-20 pr-20 pb-6 pl-10 mt-6 w-full text-white max-w-[1249px] min-h-[646px] max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/144da04db8c4d0e3e7a071c38f8b815a5f45c3ffeebd74750f24671c4845d030?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
        alt="Gold big hoops earrings"
        className="object-cover absolute inset-0 size-full"
      />
      <h1 className="relative mt-40 text-4xl font-medium leading-10 max-md:mt-10 max-md:max-w-full">
        Gold big hoops{" "}
      </h1>
      <div className="relative mt-6 text-2xl leading-9 max-md:max-w-full">
        $ 68,00
      </div>
      <button className="coolBeans">
        <span className="uppercase">v</span>IEW{" "}
        <span className="uppercase">p</span>RODUCT
      </button>

      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d38e1a62900002fc7486e3f846edf24e1daef083310ffcf46da38eccfc7482d?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
        alt="Scroll down arrow"
        className="self-center mt-48 max-w-full aspect-[6.67] w-[107px] max-md:mt-10"
      />
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <div className="flex flex-col grow text-xl leading-7 max-md:mt-10">
      <img
        loading="lazy"
        src={product.image}
        alt={product.name}
        className="w-full aspect-square"
      />
      <div className="mt-8 text-black">{product.name}</div>
      <div className="mt-5 font-medium capitalize text-stone-500">
        {product.price}
      </div>
    </div>
  );
}

function ProductGrid({ title, products }) {
  return (
    <>
      <div className="flex gap-5 mt-10 w-full font-medium max-w-[1249px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <h2 className="flex-auto text-4xl leading-10 text-black">{title}</h2>
        <button className="my-auto text-xl leading-7 capitalize text-stone-500 transition duration-300 ease-in-out transform hover:scale-125">
          View All
        </button>
      </div>
      <div className="px-px mt-11 w-full max-w-[1249px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {products.map((product, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index === 0 ? "w-[33%] max-md:ml-0" : "ml-5 w-[33%]"
              } max-md:w-full`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <>
      <div className="shrink-0 mt-64 max-w-full h-px border border-solid bg-zinc-300 border-zinc-300 w-[1249px] max-md:mt-10" />
      <div className="flex gap-5 self-end px-px mt-11 max-w-full text-base leading-7 text-neutral-500 w-[397px] max-md:mt-10 max-md:mr-2.5">
        <div className="flex-auto">Give an email, get the newsletter.</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4a81552353ddc6cf542340113428cce528e4e8dbfd18c5b359edfe4bba9e08f?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
          alt="Right arrow icon"
          className="shrink-0 self-start mt-1.5 aspect-[2.78] fill-neutral-500 w-[25px]"
        />
      </div>
      <nav className="flex gap-5 self-start ml-4 text-base leading-7 text-neutral-500 max-md:flex-wrap">
        <div>CONTACT</div>
        <div className="flex-auto">TERMS OF SERVICES</div>
        <div className="flex-auto">SHIPPING AND RETURNS</div>
      </nav>
      <div className="shrink-0 self-end mt-1 max-w-full h-px bg-black border border-black border-solid w-[397px] max-md:mr-2.5" />
      <div className="flex gap-5 px-px mt-12 w-full text-base leading-7 max-w-[1249px] text-neutral-500 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex-auto">
          <span className="text-black">© 2021 Shelly.</span> Terms of use{" "}
          <span className="text-black">and</span> privacy policy.
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/af02bd9a2ee1530da7c8449ac2778fe498b1beba541832fdb1cd40c233aa31b2?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
          alt="Payment methods"
          className="shrink-0 self-start max-w-full aspect-[8.33] w-[156px]"
        />
      </div>
    </>
  );
}

function MyComponent() {
  return (
    <div className="flex flex-col items-center px-20 pb-0 bg-white max-md:px-5">
      <Header />
      <Hero />
      <Zodiac />
      <MonthlyDeals />
      <ProductGrid title="Shop The Latest" products={latestProducts} />
      <ProductGrid title="" products={otherProducts} />
      <Footer />
    </div>
  );
}

export default MyComponent;
