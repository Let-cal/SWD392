import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
function UserController() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, roleFilter]);

  const fetchUsers = () => {
    setLoading(true);
    const url = `https://zodiacjewerlyswd.azurewebsites.net/api/users?additionalProp1=string&additionalProp2=string&additionalProp3=string&sort=id&page=${page}&pageSize=${pageSize}&search=${search}`;

    fetch(url, {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    })
      .then((response) => {
        console.log("Response status: ", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Response data: ", data);
        if (data && data.success && Array.isArray(data.data["list-data"])) {
          const filteredData = data.data["list-data"].filter(
            (user) =>
              (roleFilter === "All" || user["role-name"] === roleFilter) &&
              (search.trim() === "" ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user["full-name"].toLowerCase().includes(search.toLowerCase()))
          );
          setData(filteredData);
          setTotalPages(data.data["total-page"]);
        } else {
          enqueueSnackbar("Failed to load users", { variant: "error" });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        enqueueSnackbar("Failed to load users", { variant: "error" });
        setLoading(false);
      });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRoleFilterChange = (event, newValue) => {
    setRoleFilter(newValue);
  };

  const handleSearchButtonClick = () => {
    fetchUsers(); // Gọi fetchUsers khi người dùng nhấn nút "Search"
  };
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1); // Reset to first page when changing page size
  };
  return (
    <div>
      <div className="flex flex-row justify-between w-full items-center">
        <h1 className="font-serif text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
          User Management
        </h1>
        <div className="flex flex-row items-end w-[30%] ">
          <TextField
            id="standard-textarea"
            label="Search"
            placeholder="Search email or full name"
            multiline
            variant="standard"
            value={search}
            onChange={handleSearchChange}
            sx={{ width: "100%" }}
          />
          <IconButton
            variant="contained"
            onClick={handleSearchButtonClick}
            sx={{ color: "black" }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <Tabs
        value={roleFilter}
        onChange={handleRoleFilterChange}
        aria-label="role filter tabs"
      >
        <Tab value="All" label="All" />
        <Tab value="Customer" label="Customer" />
        <Tab value="Admin" label="Admin" />
        <Tab value="Staff" label="Staff" />
      </Tabs>
      <section className="w-full mt-8">
        <TableUser data={data} updateUser={fetchUsers} />
        <div className="flex justify-center mt-6">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#b2b251",
                  color: "#fff",
                },
              }}
            />
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value={5}>5 per page</MenuItem>
              <MenuItem value={10}>10 per page</MenuItem>
              <MenuItem value={15}>15 per page</MenuItem>
            </Select>
          </Grid>
        </div>
      </section>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default UserController;
