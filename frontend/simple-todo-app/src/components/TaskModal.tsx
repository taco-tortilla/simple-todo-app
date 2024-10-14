import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Grid2 from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { Notification } from "./Notification";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import { Task, TaskForm } from "../types/task";
import { dateToTimestamp, timestampToDate } from "../utilities/date";
import { Controller, useForm } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import { ErrorText } from "./ErrorText";
import { UpdateTaskRequest } from "../api/requests/tasksRequest";
import { useDeleteTask, usePutTask } from "../api/tasks";

interface Props {
  open: boolean;
  handleClose: () => void;
  task: Task;
  refresh: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#424242",
  borderRadius: "5px",
  "@media (max-width:600px)": {
    width: "90%",
  },
};

export function TaskModal({ open, handleClose, task, refresh }: Props) {
  const { trigger: putTrigger } = usePutTask(String(task.id));
  const { trigger: deleteTrigger } = useDeleteTask(String(task.id));
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<TaskForm>({
    defaultValues: {
      title: task.title,
      description: task.description.replace(/\\n/g, "\n"),
      isDone: task.isDone,
      deadlineDate: timestampToDate(task.deadlineAt),
    },
  });

  useEffect(() => {
    reset({
      title: task.title,
      description: task.description.replace(/\\n/g, "\n"),
      isDone: task.isDone,
      deadlineDate: timestampToDate(task.deadlineAt),
    });
  }, [reset, task]);

  const handleClickDelete = async () => {
    await deleteTrigger();
    setNotificationOpen(true);
    refresh();
    handleClose();
  };

  const handleNotificationClose = (reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  const onSubmit = async (data: TaskForm) => {
    const deadlineat =
      data.deadlineDate !== "" ? dateToTimestamp(data.deadlineDate) : null;

    const request: UpdateTaskRequest = {
      title: data.title,
      description: data.description,
      isDone: data.isDone,
      deadlineat: deadlineat,
    };
    await putTrigger(request);
    refresh();
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          reset();
        }}
        slotProps={{
          backdrop: { timeout: 300 },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid2
                container
                spacing={1}
                sx={{ padding: "16px", width: "100%" }}
              >
                <Grid2 size={1}>
                  <Controller
                    name="isDone"
                    control={control}
                    render={({ field }) => {
                      const handleCheckboxChange = (
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const isChecked = e.target.checked;
                        field.onChange(isChecked);
                        handleClose();
                        handleSubmit(onSubmit)();
                      };
                      return (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          sx={{
                            padding: 0,
                            color: "#9e9e9e",
                            "&.Mui-checked": {
                              color: "#9e9e9e",
                            },
                          }}
                          disableRipple
                          onChange={handleCheckboxChange}
                        />
                      );
                    }}
                  />
                </Grid2>
                <Grid2 size={11}>
                  <Controller
                    name="title"
                    control={control}
                    rules={{
                      required: { value: true, message: "タイトルは必須だよ" },
                      maxLength: {
                        value: 255,
                        message: "255文字以内で入力してね",
                      },
                    }}
                    render={({ field, formState: { errors } }) => (
                      <>
                        <TextField
                          {...field}
                          variant="standard"
                          placeholder="task"
                          sx={{
                            "& .MuiInputBase-input": {
                              color: "white",
                            },
                            width: "100%",
                          }}
                          slotProps={{
                            input: { disableUnderline: true },
                          }}
                        />
                        {errors.title && (
                          <ErrorText>{errors.title.message}</ErrorText>
                        )}
                      </>
                    )}
                  />
                </Grid2>
              </Grid2>
              <Divider />
              <Box sx={{ padding: "16px" }}>
                <Box sx={{ paddingBottom: "16px" }}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={task.description.replace(/\\n/g, "\n")}
                    rules={{
                      maxLength: {
                        value: 500,
                        message: "500文字以内で入力してね",
                      },
                    }}
                    render={({ field, formState: { errors } }) => (
                      <>
                        <TextField
                          {...field}
                          variant="standard"
                          placeholder="description"
                          multiline
                          rows={3}
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              color: "white",
                            },
                          }}
                          slotProps={{
                            input: { disableUnderline: true },
                          }}
                        />
                        {errors.description && (
                          <ErrorText>{errors.description.message}</ErrorText>
                        )}
                      </>
                    )}
                  />
                </Box>
                <Grid2 container justifyContent="space-between">
                  <Controller
                    name="deadlineDate"
                    control={control}
                    defaultValue={timestampToDate(task.deadlineAt)}
                    rules={{
                      maxLength: {
                        value: 500,
                        message: "500文字以内で入力してね",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        style={{
                          border: "none",
                          outline: "none",
                          backgroundColor: "#424242",
                        }}
                      />
                    )}
                  />
                  <Box>
                    <DeleteIcon
                      onClick={handleClickDelete}
                      sx={{ fontSize: "medium", paddingRight: "10px" }}
                    />
                    <DoneIcon
                      onClick={handleSubmit(onSubmit)}
                      sx={{ fontSize: "medium" }}
                    />
                  </Box>
                </Grid2>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Notification
        open={notificationOpen}
        handleClose={handleNotificationClose}
        message="task deleted"
      />
    </div>
  );
}
