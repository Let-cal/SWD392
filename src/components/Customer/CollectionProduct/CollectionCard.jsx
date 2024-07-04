import { defineElement } from "@lordicon/element";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { format, parse } from "date-fns";
import lottie from "lottie-web";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./carousel.css"; // Import CSS file for managing animation effects
defineElement(lottie.loadAnimation);

const CollectionCard = ({ collection }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 260,
        margin: "0 auto",
        transition: "transform 0.5s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardMedia
        className="h-40 w-full object-cover"
        image={collection["image-collection"]}
        title={collection["name-collection"]}
      />
      <CardContent className="px-6 py-4">
        <Typography gutterBottom variant="h5" component="div">
          {collection["name-collection"]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Open: {collection["date-open"]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Close: {collection["date-close"]}
        </Typography>
      </CardContent>
      <button
        className={`flex flex-row justify-center items-center absolute add-to-cart-button ${
          isHovered ? "visible" : ""
        }`}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <p> Add to cart</p>
        <lord-icon
          src="https://cdn.lordicon.com/mfmkufkr.json"
          trigger="loop"
          delay="1000"
          style={{ width: "20%", height: "40px" }}
          colors="primary:white"
        ></lord-icon>
      </button>
    </Card>
  );
};

CollectionCard.propTypes = {
  collection: PropTypes.shape({
    "image-collection": PropTypes.string.isRequired,
    "name-collection": PropTypes.string.isRequired,
    "date-open": PropTypes.string.isRequired,
    "date-close": PropTypes.string.isRequired,
  }).isRequired,
};

const CollectionsCarousel = () => {
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const { enqueueSnackbar } = useSnackbar();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCollections = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        enqueueSnackbar("Token not found, please log in again", {
          variant: "error",
        });
        return;
      }

      try {
        const response = await axios.get(
          `https://zodiacjewerlyswd.azurewebsites.net/api/collections?page=${page}&pageSize=${pageSize}&sort=id`,
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          if (Array.isArray(response.data.data.data)) {
            const formattedData = response.data.data.data.map((collection) => ({
              ...collection,
              "date-open": format(
                parse(
                  collection["date-open"],
                  "EEEE, MMMM d, yyyy h:mm a",
                  new Date()
                ),
                "yyyy-MM-dd HH:mm:ss"
              ),
              "date-close": format(
                parse(
                  collection["date-close"],
                  "EEEE, MMMM d, yyyy h:mm a",
                  new Date()
                ),
                "yyyy-MM-dd HH:mm:ss"
              ),
            }));
            setTotalPages(response.data.data["total-page"]);
            setCollections(formattedData);
          } else {
            console.error(
              "list-data is not an array:",
              response.data.data.data
            );
            throw new Error(
              "Unexpected response structure: list-data is not an array"
            );
          }
        } else {
          console.error("Unexpected response structure:", response.data);
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
        enqueueSnackbar("Failed to load collections", { variant: "error" });
      }
    };

    fetchCollections();
  }, [page, enqueueSnackbar]);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", mb: 4 }}>
        <h2>
          <span className="flex justify-between items-end font-serif">
            Dealing Collections
          </span>
          <div className="shrink-0 mt-2.5 h-px bg-black border border-black border-solid font-serif"></div>
        </h2>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: "100%",
          mb: 2,
          overflow: "hidden", // Hide content overflow
        }}
      >
        <IconButton
          onClick={handleBack}
          disabled={page === 1}
          sx={{
            borderRadius: "50%",
            position: "absolute",
            left: 0,
            zIndex: 1,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              transform: "scale(1.1)",
            },
          }}
        >
          <ArrowBack />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: `${100 * totalPages}%`, // Adjust width based on totalPages
            transform: `translateX(-${(page - 1) * (70 / totalPages)}%)`, // Adjust translateX based on currentPage
            transition: "transform 0.5s ease-in-out", // Add transition for smooth animation
          }}
        >
          <TransitionGroup component={null}>
            {collections.length > 0
              ? collections.map((collection) => (
                  <CSSTransition
                    key={collection.id}
                    timeout={300}
                    classNames="slide"
                  >
                    <CollectionCard collection={collection} />
                  </CSSTransition>
                ))
              : null}
          </TransitionGroup>
        </Box>
        <IconButton
          onClick={handleNext}
          disabled={
            page === totalPages ||
            !collections.length ||
            collections.length < pageSize
          }
          sx={{
            borderRadius: "50%",
            position: "absolute",
            right: 0,
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              transform: "scale(1.1)",
            },
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary">
        Page {page} of {totalPages}
      </Typography>
    </Box>
  );
};

export default CollectionsCarousel;
