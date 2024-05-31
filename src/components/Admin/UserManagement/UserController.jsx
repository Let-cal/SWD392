import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import CustomTab from "../TabsToTable";

function UserManagement() {
  return (
    <div >
      {" "}
      <div className="flex flex-row justify-between w-full items-center">
        <h1 className="text-[30px] text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
          Total Users
        </h1>
        <TextField
          id="standard-textarea"
          label="Search"
          placeholder="Search name of user account"
          multiline
          variant="standard"
          sx={{ width: "30%" }}
        />
      </div>
      <section className="w-full mt-8">
        <CustomTab />
        <div className="flex justify-center mt-6">
          <Pagination count={10} showFirstButton showLastButton />
        </div>
      </section>
    </div>
  );
}

export default UserManagement;
