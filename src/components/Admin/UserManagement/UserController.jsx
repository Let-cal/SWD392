import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import {
  Backdrop,
  Button,
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
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import CreateStaffModal from "../HomePage/CreateStaffController/CreateStaffModal";
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
  const API_BASE_URL = "https://zodiacjewerlyswd.azurewebsites.net/api/users";

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, roleFilter]);

  const fetchUsers = () => {
    setLoading(true);
    let url = `${API_BASE_URL}?page=${page}&pageSize=${pageSize}&search=${search}`;
    if (roleFilter === "Customer") {
      url = `${API_BASE_URL}/customers?page=${page}&pageSize=${pageSize}&search=${search}`;
    } else if (roleFilter === "Admin") {
      url = `${API_BASE_URL}/admin?page=${page}&pageSize=${pageSize}&search=${search}`;
    } else if (roleFilter === "Staff") {
      url = `${API_BASE_URL}/staff?page=${page}&pageSize=${pageSize}&search=${search}`;
    }

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
          setData(data.data["list-data"]);
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

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
      fetchUsers();
    }
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRoleFilterChange = (event, newValue) => {
    setRoleFilter(newValue);
    setPage(1); // Reset to the first page when the role filter changes
  };

  const handleSearchButtonClick = () => {
    fetchUsers(); // Call fetchUsers when the user clicks the "Search" button
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1); // Reset to the first page when changing page size
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-between w-full items-center">
        <div>
          <h1 className="font-serif text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
            User Management
          </h1>

          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            sx={{
              width: "50%",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "gray",
              },
            }}
            onClick={handleOpenModal}
          >
            Create Staff
          </Button>
        </div>

        <div className="flex flex-row items-end w-[30%]">
          <TextField
            id="standard-textarea"
            label="Search"
            placeholder="Search email or full name"
            multiline={false}
            variant="standard"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
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
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#b2b251", // Customize indicator color here
          },
          "& .Mui-selected": {
            color: "#b2b251 !important", // Customize text color for selected tab
          },
        }}
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
      <CreateStaffModal isOpen={isModalOpen} onClose={handleCloseModal} onFetchAPI={fetchUsers}/>
    </div>
  );
}

export default UserController;
