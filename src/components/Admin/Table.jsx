import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import InfoUser from "./InfoUser.jsx";

const Table = ({ data }) => {
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex bg-gray-100 text-xs uppercase font-semibold text-gray-600">
        <div className="w-1/5 px-4 py-2">User Code</div>
        <div className="w-1/5 px-4 py-2">Full Name</div>
        <div className="w-1/5 px-4 py-2">Email</div>
        <div className="w-1/5 px-4 py-2">Join Date</div>
        <div className="w-1/5 px-4 py-2">Status</div>
      </div>
      {Array.isArray(data) &&
        data.map((user) => (
          <InfoUser
            key={user.userCode}
            userCode={user.userCode}
            fullName={user.fullName}
            email={user.email}
            joinDate={user.joinDate}
            status={user.status}
          >
            <Button
              variant="contained"
              endIcon={<EditIcon />}
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "gray",
                },
              }}
            >
              Edit
            </Button>
          </InfoUser>
        ))}
    </div>
  );
};
Table.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Table;
