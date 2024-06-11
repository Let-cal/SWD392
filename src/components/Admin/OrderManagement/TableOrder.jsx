import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import InforOrder from "./InfoOrder";

const Table = ({ data }) => {
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex bg-gray-100 text-xs  uppercase font-semibold text-gray-600">
        <div className="w-1/5 px-4 text-center py-2">Order Number</div>
        <div className="w-1/5 px-4 text-center py-2">User ID</div>
        <div className="w-1/5 px-4 text-center py-2">Date</div>
        <div className="w-1/5 px-4 text-center py-2">Status</div>
        <div className="w-1/5 px-4 text-center py-2">Total</div>
        <div className="w-1/5 px-4 text-center py-2">Action</div>
      </div>
      {Array.isArray(data) &&
        data.map((Orders) => (
          <InforOrder
            key={Orders.OrderNumber}
            OrderNumber={Orders.OrderNumber}
            UserID={Orders.UserID}
            Date={Orders.Date}
            Status={Orders.Status}
            TotalPrice={Orders.TotalPrice}
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

Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Table;
