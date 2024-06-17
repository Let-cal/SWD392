import UpdateIcon from "@mui/icons-material/Update";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import InfoZodiac from "./InfoZodiac";

const Table = ({ data }) => {
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-scroll h-[600px]">
      <div className="flex bg-gray-100 text-xs uppercase font-semibold text-gray-600">
        <div className="w-1/4 px-4 text-center py-2">Zodiac Number</div>
        <div className="w-1/4 px-4 text-center py-2">Zodiac Name</div>
        <div className="w-1/4 px-4 text-center py-2">Description</div>
        <div className="w-1/4 px-4 text-center py-2">Action</div>
      </div>
      {Array.isArray(data) &&
        data.map((zodiac) => (
          <InfoZodiac
            key={zodiac.id}
            id={zodiac.id}
            nameZodiac={zodiac["name-zodiac"]}
            desZodiac={zodiac["des-zodiac"]}
            Action={
              <Button
                variant="contained"
                endIcon={<UpdateIcon />}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                Update
              </Button>
            }
          />
        ))}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Table;
