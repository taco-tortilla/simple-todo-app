import Snackbar from "@mui/material/Snackbar";

interface Props {
  open: boolean;
  handleClose: () => void;
  message: string;
}

export function Notification({ open, message, handleClose }: Props) {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={1500}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    />
  );
}
