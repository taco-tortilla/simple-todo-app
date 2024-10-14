import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import styled from "@emotion/styled";
import { TaskModal } from "./TaskModal";

interface Props {
  title: string;
  deadline: string;
}

export function Task({ title, deadline }: Props) {
  const [open, setOpen] = useState(false);
  const CustomeCard = styled(CardContent)`
    &:last-child {
      padding: 10px;
    }
  `;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 300,
          backgroundColor: "#424242",
          color: "white",
        }}
        onClick={handleOpen}
      >
        <CustomeCard>
          <Grid2 container spacing={1}>
            <Checkbox
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
              {title}
            </Typography>
          </Grid2>
          <Typography variant="caption" sx={{ paddingLeft: "32px" }}>
            {deadline}
          </Typography>
        </CustomeCard>
      </Card>
      <TaskModal open={open} handleClose={handleClose} />
    </>
  );
}
