// TableCollections.jsx
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import InforCollection from "./InfoCollection";

const TableCollections = ({ data }) => {
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex bg-gray-100 text-xs uppercase font-semibold text-gray-600">
        <div className="w-1/5 px-4 text-center py-2">Collection Number</div>
        <div className="w-1/5 px-4 text-center py-2">Name</div>
        <div className="w-1/5 px-4 text-center py-2">Status</div>
        <div className="w-1/5 px-4 text-center py-2">Date Open</div>
        <div className="w-1/5 px-4 text-center py-2">Date Close</div>
        <div className="w-1/5 px-4 text-center py-2">Image</div>
        <div className="w-1/5 px-4 text-center py-2">Action</div>
      </div>
      {Array.isArray(data) &&
        data.map((collection) => (
          <InforCollection
            key={collection.id}
            CollectionNumber={collection.id.toString()}
            Name={collection["name-collection"]}
            Status={collection.status === 1 ? "Available" : "Unavailable"}
            date_open={collection["date-open"]}
            date_close={collection["date-close"]}
            image={
              <img
                src={collection["image-collection"]}
                alt={collection["name-collection"]}
                style={{ width: "50px", height: "50px" }}
              />
            }
            Action={
              <Button
                variant="contained"
                endIcon={<VisibilityIcon />}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                View details
              </Button>
            }
          />
        ))}
    </div>
  );
};

TableCollections.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TableCollections;
