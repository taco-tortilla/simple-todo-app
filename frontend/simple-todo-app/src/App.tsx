import { useState } from "react";
import { Task } from "./components/Task";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Grid2 from "@mui/material/Grid2";
import { AddTaskModal } from "./components/AddTaskModal";

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ margin: "0 auto", maxWidth: "300px", padding: "40px" }}>
        <Grid2 container justifyContent="space-between" alignItems="center">
          <Typography
            variant="h1"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: "15px",
              paddingBottom: "15px",
            }}
          >
            Todo
          </Typography>
          <AddIcon onClick={handleOpen} />
        </Grid2>
        <Stack spacing={1}>
          <Task title={"sample"} deadline={"2024/10/13"} />
          <Task title={"sample"} deadline={"2024/10/13"} />
          <Task title={"sample"} deadline={"2024/10/13"} />
          <Task title={"sample"} deadline={"2024/10/13"} />
          <Task title={"sample"} deadline={"2024/10/13"} />
          <Task title={"sample"} deadline={"2024/10/13"} />
          <Task title={"sample"} deadline={"2024/10/13"} />
          <Task title={"sample"} deadline={"2024/10/13"} />
          <Task title={"sample"} deadline={"2024/10/13"} />
          <Task title={"sample"} deadline={"2024/10/13"} />
        </Stack>
      </Box>
      <AddTaskModal open={open} handleClose={handleClose} />
    </>
  );
}

export default App;
