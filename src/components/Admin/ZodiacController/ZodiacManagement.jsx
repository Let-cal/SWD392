import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Table from "./TableZodiac";

function ZodiacManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedZodiac, setSelectedZodiac] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://zodiacjewerly.azurewebsites.net/api/zodiacs"
        );
        setData(response.data.data);
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

    fetchData();
  }, [enqueueSnackbar]);

  const handleZodiacChange = (event) => {
    setSelectedZodiac(event.target.value);
  };

  const filteredData = selectedZodiac
    ? data.filter((zodiac) => zodiac["name-zodiac"] === selectedZodiac)
    : data;

  return (
    <div>
      <div className="flex flex-row justify-between w-full items-center">
        <h1 className="font-serif text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
          Order Management
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
        <Table data={filteredData} />
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
