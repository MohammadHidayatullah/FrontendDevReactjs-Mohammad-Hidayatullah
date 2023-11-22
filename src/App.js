/** @format */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Restaurant from "./pages/restaurant/Restaurant";
import DetailRestaurant from "./pages/restaurant/DetailRestaurant";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Restaurant />} />
        <Route path='/:id' element={<DetailRestaurant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
