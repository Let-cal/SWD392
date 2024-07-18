import LoginIcon from "@mui/icons-material/Login";
import { Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../LoginController/AuthContext.jsx";
import AvatarProfile from "./Avatar-profile.jsx";
import CartIcon from "./CartIconController/Cart-Icon.jsx";
import ColorTabs from "./Colored-tab.jsx";

function Header({ scrollToTrustedCompanies }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleSearch = (event) => {
    event.preventDefault();
    setSearchOpen((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scroll down
        setHeaderVisible(false);
      } else {
        // Scroll up
        setHeaderVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`header-container ${
        isHeaderVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-50"
      } sticky top-0 z-50 bg-white shadow flex gap-5 w-full text-black max-md:flex-wrap max-md:max-w-full items-end transition-transform duration-300 ease-in-out`}
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/761a3e35369fc6c259c389bd4b678d676da11023c4860c23c48806e300fd51ea?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
        className="shrink-0 max-w-full aspect-[0.88] w-[76px]"
        alt=""
      />

      <div className="title-header-Customer flex-auto text-4xl leading-10 cursor-pointer">
        <Link to="/customer-page">
          <span className="font-bold bg-gradient-custom-header-title bg-clip-text text-transparent">
            Z
          </span>
          <span className="bg-gradient-custom-header-title bg-clip-text text-transparent">
            odiacGems
          </span>
        </Link>
      </div>

      <nav className="flex gap-5 max-md:gap-2 items-center justify-between text-base leading-7 max-md:max-w-full">
        <ColorTabs scrollToTrustedCompanies={scrollToTrustedCompanies} />
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
          <TextField id="standard-basic" label="Search" variant="standard" />
        )}

        <CartIcon />

        {!isAuthenticated ? (
          <Link to="/CustomerProfile-order">
            <Button
              variant="contained"
              endIcon={<LoginIcon />}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Login
            </Button>
          </Link>
        ) : (
          <AvatarProfile />
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  scrollToTrustedCompanies: PropTypes.func,
};

export default Header;
