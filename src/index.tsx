import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./assets/css/styles.css";
import CreatePage from "./components/CreatePage";
import HomePage from "./components/HomePage";
import PlayPage from "./components/PlayPage";
const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
  <HashRouter>
    <Routes>
      <Route path="*" element={<HomePage />}></Route>
      <Route path="/create" element={<CreatePage />}></Route>
      <Route path="/play" element={<PlayPage />}></Route>
    </Routes>
  </HashRouter>
);
