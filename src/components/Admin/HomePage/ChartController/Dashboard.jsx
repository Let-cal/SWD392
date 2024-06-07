

import { Container, Grid, Paper, Typography } from "@mui/material";
import LineChartComponent from "./LineChartComponent";
import PieChartComponent from "./PieChartComponent";

function Dashboard() {
  return (
    <div className="w-full flex flex-row">
      <div className="w-[70%]">
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={8} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 450,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  <span className="font-bold font-serif">Sale Overview</span>
                </Typography>
                <LineChartComponent />
              </Paper>
            </Grid>

          </Grid>
        </Container>
      </div>
      <div className="w-[30%]">
        {/* Pie Chart */}
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 450,
              }}
            >
              <Typography variant="h6" gutterBottom>
                <span className="font-bold font-serif"> Sale By Item</span>
              </Typography>
              <PieChartComponent />
            </Paper>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Dashboard;
