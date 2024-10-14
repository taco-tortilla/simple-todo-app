import Box from "@mui/material/Box";
import Loading from "./components/Loading";
import { TaskList } from "./components/TaskList";
import { Suspense } from "react";

function App() {
  return (
    <Box sx={{ padding: "40px" }}>
      <Suspense fallback={<Loading />}>
        <TaskList />
      </Suspense>
    </Box>
  );
}

export default App;
