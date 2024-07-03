import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import TableZodiac from "./TableZodiac";

function ZodiacManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedZodiac, setSelectedZodiac] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");
  console.log(token);
  const API_BASE_URL = "https://zodiacjewerlyswd.azurewebsites.net/api/zodiacs";
  useEffect(() => {
    fetchData();
  }, [page, selectedZodiac]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}?page=${page}&pageSize=${pageSize}&sort=id`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { "list-data": listData, "total-page": totalPage } =
        response.data.data; // Destructure correctly
      setData(listData);
      // Update total pages based on filtered or unfiltered data
      if (selectedZodiac) {
        setTotalPages(Math.ceil(listData.length / pageSize));
      } else {
        setTotalPages(totalPage);
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(
          `Error: ${error.response.status} - ${error.response.data}`,
          { variant: "error" }
        );
      } else if (error.request) {
        enqueueSnackbar("No response from server", { variant: "warning" });
      } else {
        enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleZodiacChange = (event) => {
    setSelectedZodiac(event.target.value);
    setPage(1); // Reset page when filter changes
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const filteredData = selectedZodiac
    ? data.filter((zodiac) => zodiac["name-zodiac"] === selectedZodiac)
    : data;
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1); // Reset to first page when changing page size
  };
  return (
    <div>
      <div className="flex flex-row justify-between w-full items-center">
        <h1 className="font-serif text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
          Zodiac Management
        </h1>
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Zodiac</InputLabel>
          <Select
            value={selectedZodiac}
            onChange={handleZodiacChange}
            label="Zodiac"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Aries">Aries</MenuItem>
            <MenuItem value="Taurus">Taurus</MenuItem>
            <MenuItem value="Gemini">Gemini</MenuItem>
            <MenuItem value="Cancer">Cancer</MenuItem>
            <MenuItem value="Leo">Leo</MenuItem>
            <MenuItem value="Virgo">Virgo</MenuItem>
            <MenuItem value="Libra">Libra</MenuItem>
            <MenuItem value="Scorpio">Scorpio</MenuItem>
            <MenuItem value="Sagittarius">Sagittarius</MenuItem>
            <MenuItem value="Capricorn">Capricorn</MenuItem>
            <MenuItem value="Aquarius">Aquarius</MenuItem>
            <MenuItem value="Pisces">Pisces</MenuItem>
          </Select>
        </FormControl>
      </div>

      <section className="w-full mt-8">
        <TableZodiac data={filteredData} onUpdate={fetchData} />
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

export default ZodiacManagement;
