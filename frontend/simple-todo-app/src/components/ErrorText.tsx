import Typography from "@mui/material/Typography";

export function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="caption" color="error" fontWeight="bold">
      {children}
    </Typography>
  );
}
