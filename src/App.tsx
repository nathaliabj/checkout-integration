import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/product";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
