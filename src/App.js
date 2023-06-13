import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";

import Navbar from "./components/Navbar";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
function App() {
  return (
    <Grid>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/search" element={<Search />} />

        </Routes>
      </BrowserRouter>
    </Grid>
  );
}

export default App;
