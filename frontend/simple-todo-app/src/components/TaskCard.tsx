import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import styled from "@emotion/styled";
import { TaskModal } from "./TaskModal";
import { timestampToDate } from "../utilities/date";
import { Task } from "../types/task";
import { usePutTask } from "../api/tasks";
import { UpdateTaskRequest } from "../api/requests/tasksRequest";

const CustomeCard = styled(CardContent)`
  &:last-child {
    padding: 10px;
  }
`;

interface Props {
  task: Task;
  refresh: () => void;
}

export function TaskCard({ task, refresh }: Props) {
  const { trigger } = usePutTask(String(task.id));
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleChecked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const request: UpdateTaskRequest = {
      title: task.title,
      description: task.description,
      isDone: e.target.checked,
      deadlineat: task.deadlineAt,
    };
    await trigger(request);
    refresh();
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 300,
          backgroundColor: "#424242",
          color: "white",
          opacity: task.isDone ? "0.4" : "1",
        }}
        onClick={handleOpen}
      >
        <CustomeCard>
          <Grid2 container spacing={1}>
            <Checkbox
              checked={task.isDone}
              onChange={handleChecked}
              sx={{
                padding: 0,
                color: "#9e9e9e",
                "&.Mui-checked": {
                  color: "#9e9e9e",
                },
              }}
              disableRipple
              onClick={handleCheckboxClick}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "medium",
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              {task.title}
            </Typography>
          </Grid2>
          <Typography variant="caption" sx={{ paddingLeft: "32px" }}>
            {timestampToDate(task.deadlineAt)}
          </Typography>
        </CustomeCard>
      </Card>
      <TaskModal
        open={open}
        handleClose={handleClose}
        task={task}
        refresh={refresh}
      />
    </>
  );
}
