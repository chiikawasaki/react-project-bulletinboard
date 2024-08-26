import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import New from "./threads/new";
import Home from "./home";
import ThreadContent from "./threads/threadId";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/threads/new`} element={<New />} />
        <Route path={`/threads/:thread_id`} element={<ThreadContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
