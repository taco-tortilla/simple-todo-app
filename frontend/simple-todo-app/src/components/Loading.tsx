import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Grid2 } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid2 textAlign="center">
        <Grid2>
          <CircularProgress size="70px" sx={{ color: "white" }} />
          <Typography
            variant="h6"
            sx={{ paddingTop: "30px", fontWeight: "bold" }}
          >
            Now Loading...
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
}
