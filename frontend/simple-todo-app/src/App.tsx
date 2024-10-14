import Box from "@mui/material/Box";
import Loading from "./components/Loading";
import { TaskList } from "./components/TaskList";
import { Suspense } from "react";

function App() {
  return (
    <Box sx={{ height: "100vh" }}>
      <Suspense fallback={<Loading />}>
        <TaskList />
      </Suspense>
    </Box>
  );
}

export default App;
