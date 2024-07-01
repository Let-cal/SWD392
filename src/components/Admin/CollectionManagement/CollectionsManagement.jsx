import { Backdrop, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { format, parse } from "date-fns";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import DateFilterPopover from "./FilterByDate";
import SearchCollections from "./SearchCollections";
import TableCollections from "./TableCollections";

const CollectionsManagement = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCollections = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
      enqueueSnackbar("Token not found, please log in again", {
        variant: "error",
      });
      setLoading(false);
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

      // Check if the response structure is as expected
      if (response.data && response.data.data) {
        // Update the condition to check for the correct structure
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

          setCollections(formattedData);
          setFilteredData(formattedData);
          setTotalPages(response.data.data["total-page"]);
        } else {
          console.error("list-data is not an array:", response.data.data.data);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [page, pageSize]); // Trigger fetchCollections when page or pageSize changes

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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h1 className="font-serif text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
            Collections Management
          </h1>
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
        <>
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
        </>
      )}
    </div>
  );
};

export default CollectionsManagement;
