import { useState } from "react";
import { TaskCard } from "./TaskCard";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Grid2 from "@mui/material/Grid2";
import { AddTaskModal } from "./AddTaskModal";
import { useGetTask } from "../api/tasks";
import ErrorComponent from "./ErrorComponent";

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
    <>
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
        {tasks?.map((task) => (
          <TaskCard task={task} key={task.id} refresh={refresh} />
        ))}
      </Stack>
      <AddTaskModal open={open} handleClose={handleClose} refresh={refresh} />
    </>
  );
}
