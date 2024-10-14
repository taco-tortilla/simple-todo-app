import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

export default function ErrorComponent() {
  const reload = () => {
    window.location.reload();
  };
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
        <Typography
          variant="h5"
          sx={{ paddingBottom: "50px", fontWeight: "bold" }}
        >
          Sorry, an error has occurred :(
        </Typography>
        <Button
          variant="outlined"
          disableElevation
          disableFocusRipple
          disableRipple
          onClick={reload}
          sx={{ color: "white", borderColor: "white" }}
        >
          retry
        </Button>
      </Grid2>
    </Box>
  );
}
