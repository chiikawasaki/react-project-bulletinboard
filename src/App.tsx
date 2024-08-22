import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import New from "./threads/new";
import Home from "./home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/threads/new`} element={<New />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
