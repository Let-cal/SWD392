import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import AvatarProfile from "./Avatar-profile.jsx";
import CartIcon from "./Cart-Icon.jsx";
import ColorTabs from "./Colored-tab.jsx";
function Header() {
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset >= 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    if (mediaQuery.matches) {
      window.addEventListener("scroll", handleScroll);
    }

    const handleResize = () => {
      if (mediaQuery.matches) {
        window.addEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
        setSticky(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const [isSearchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const toggleSearch = (event) => {
    event.preventDefault();
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);
  return (
    <header
      className={`header-container flex gap-5 w-full text-black max-md:flex-wrap max-md:max-w-full items-end ${
        isSticky ? "sticky" : ""
      }`}
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/761a3e35369fc6c259c389bd4b678d676da11023c4860c23c48806e300fd51ea?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
        className=" shrink-0 max-w-full aspect-[0.88] w-[76px]"
        alt=""
      />
      <div className="title-header flex-auto text-4xl leading-10">
        <span className="font-bold bg-gradient-custom-header-title bg-clip-text text-transparent">
          Z
        </span>
        <span className="bg-gradient-custom-header-title bg-clip-text text-transparent">
          odiacGems
        </span>
      </div>
      <nav className="flex gap-5 max-md:gap-2 items-center justify-between text-base leading-7  max-md:max-w-full">
        <ColorTabs />
        <div className="shrink-0 w-px border border-solid bg-neutral-500 border-neutral-500 h-[22px]" />
        <a
          href="#"
          className="p-0 m-0 border-none bg-transparent cursor-pointer transition duration-300 ease-in-out transform hover:scale-125"
          onClick={toggleSearch}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/af2729b48b540aebe63c9e1602f27f3aa437c301f4e68fb007d942413ce0a6bc?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
            alt="Search icon"
            className="shrink-0 self-start border border-white border-solid aspect-square fill-black stroke-[0.75px] stroke-white w-[19px]"
          />
        </a>
        {isSearchOpen && (
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            inputRef={searchInputRef}
          />
        )}
        <CartIcon />
        <AvatarProfile />

        {/* <Link to="/login">
          <Button
            variant="contained"
            endIcon={<LoginIcon />}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Login
          </Button>
        </Link> */}
      </nav>
    </header>
  );
}

export default Header;
