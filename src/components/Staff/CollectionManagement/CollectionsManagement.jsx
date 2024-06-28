import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { format } from "date-fns";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import CreateCollectionDialog from "./CreateCollectionDialog";
import DateFilterPopover from "./FilterByDate";
import SearchCollections from "./SearchCollections";
import TableCollections from "./TableCollections";

const CollectionsManagement = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  // Function to fetch collections
  const fetchCollections = async () => {
    const token = localStorage.getItem("token");
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
      const formattedData = response.data.data["list-data"].map(
        (collection) => ({
          ...collection,
          "date-open": format(
            new Date(collection["date-open"]),
            "yyyy-MM-dd HH:mm:ss"
          ),
          "date-close": format(
            new Date(collection["date-close"]),
            "yyyy-MM-dd HH:mm:ss"
          ),
        })
      );
      setCollections(formattedData);
      setFilteredData(formattedData);
      setTotalPages(response.data.data["total-page"]);
    } catch (error) {
      console.error("Error fetching collections:", error);
      enqueueSnackbar("Failed to load collections", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [page, pageSize]); // Update useEffect dependencies

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchName(value);
    const filtered = collections.filter((collection) =>
      collection["name-collection"].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterByDate = (dateOpen, dateClose) => {
    let filtered = collections;

    if (dateOpen) {
      filtered = filtered.filter(
        (collection) => new Date(collection["date-open"]) >= dateOpen
      );
    }

    if (dateClose) {
      filtered = filtered.filter(
        (collection) => new Date(collection["date-close"]) <= dateClose
      );
    }

    setFilteredData(filtered);
  };

  const toggleCreateDialog = () => {
    setOpenCreateDialog(!openCreateDialog);
  };

  const handleCreateSuccess = () => {
    // Refresh collections or handle success action
    fetchCollections();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h1 className="font-serif text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
            Collections Management
          </h1>
          <Button
            variant="contained"
            endIcon={<AddCircleOutlineIcon />}
            sx={{
              width: "60%",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "gray",
              },
            }}
            onClick={toggleCreateDialog}
          >
            Create Collection
          </Button>
        </div>
        <div className="flex items-center space-x-2 w-[30%]">
          <SearchCollections value={searchName} onChange={handleSearch} />
          <DateFilterPopover onFilter={handleFilterByDate} />
        </div>
      </div>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div>
          <TableCollections data={filteredData} />
          <div className="flex justify-center mt-6">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      )}

      <CreateCollectionDialog
        open={openCreateDialog}
        onClose={toggleCreateDialog}
        onSuccess={handleCreateSuccess}
        enqueueSnackbar={enqueueSnackbar}
      />
    </div>
  );
};

export default CollectionsManagement;
