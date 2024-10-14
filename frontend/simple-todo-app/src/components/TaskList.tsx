import { useState } from "react";
import { TaskCard } from "./TaskCard";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Grid2 from "@mui/material/Grid2";
import { AddTaskModal } from "./AddTaskModal";
import { useGetTask } from "../api/tasks";
import ErrorComponent from "./ErrorComponent";
import Box from "@mui/material/Box";

export function TaskList() {
  const { tasks, isError, mutate } = useGetTask("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const refresh = () => {
    mutate();
  };

  if (isError) return <ErrorComponent />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "0 40px",
      }}
    >
      <Grid2
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: "40px", paddingRight: "16px" }}
      >
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
      <Box
        sx={{ overflow: "auto", marginBottom: "40px", paddingRight: "16px" }}
      >
        <Stack spacing={1}>
          {tasks?.map((task) => (
            <TaskCard task={task} key={task.id} refresh={refresh} />
          ))}
        </Stack>
      </Box>
      <AddTaskModal open={open} handleClose={handleClose} refresh={refresh} />
    </Box>
  );
}
