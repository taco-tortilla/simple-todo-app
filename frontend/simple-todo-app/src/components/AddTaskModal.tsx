import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import Grid2 from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { Notification } from "./Notification";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#424242",
  borderRadius: "5px",
};

export function AddTaskModal({ open, handleClose }: Props) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
  }, []);

  const handleClickDelete = () => {
    setNotificationOpen(true);
    handleClose();
  };

  const handleNotificationClose = (reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotificationOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        slotProps={{
          backdrop: { timeout: 300 },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid2 container spacing={1} sx={{ padding: "16px" }}>
              <TextField
                variant="standard"
                placeholder="task"
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
            </Grid2>
            <Divider />
            <Box sx={{ padding: "16px" }}>
              <Box sx={{ paddingBottom: "16px" }}>
                <TextField
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
              </Box>
              <Grid2 container justifyContent="space-between">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "#424242",
                  }}
                />
                <AddIcon
                  onClick={handleClickDelete}
                  sx={{ fontSize: "medium" }}
                />
              </Grid2>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Notification
        open={notificationOpen}
        handleClose={handleNotificationClose}
        message="task added"
      />
    </div>
  );
}
