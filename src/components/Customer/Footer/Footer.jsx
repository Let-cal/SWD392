import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton, TextField } from "@mui/material";

function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-10">
      <div className="container mx-auto">
        <div className="border-t border-gray-300 mt-16 mb-10"></div>
        <div className="flex flex-col md:flex-row items-center md:justify-between md:gap-5 px-4">
          <TextField
            id="contact-email"
            label="Please contact us via email if you have any questions."
            variant="standard"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton className="mt-1.5">
                  <ArrowRightAltIcon fontSize="large" />
                </IconButton>
              ),
            }}
          />
        </div>
        <nav className="flex flex-wrap justify-center gap-5 mt-6 text-base text-neutral-500">
          <a
            href="#"
            className="hover:scale-110 transition duration-200 ease-in-out"
          >
            CONTACT
          </a>
          <a
            href="#"
            className="hover:scale-110 transition duration-200 ease-in-out"
          >
            TERMS OF SERVICES
          </a>
          <a
            href="#"
            className="hover:scale-110 transition duration-200 ease-in-out"
          >
            ABOUT
          </a>
        </nav>
        <div className="border-t border-gray-300 my-6"></div>
        <div className="flex flex-col md:flex-row items-center justify-between px-4">
          <div className="text-center md:text-left text-base text-neutral-500 mb-4 md:mb-0">
            <span className="text-black">© 2024 HO CHI MINH.</span> Terms of use{" "}
            <span className="text-black">and</span> privacy policy.
          </div>
          <div className="flex gap-4">
            <FacebookIcon
              className="cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:shadow-lg"
              fontSize="large"
            />
            <InstagramIcon
              className="cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:shadow-lg"
              fontSize="large"
            />
            <LinkedInIcon
              className="cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:shadow-lg"
              fontSize="large"
            />
            <img
              className="w-[33px] cursor-pointer transition-transform duration-300 transform hover:scale-125 hover:shadow-lg"
              src="/images/Icon/icons8-zalo.svg"
              alt="Zalo Icon"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
