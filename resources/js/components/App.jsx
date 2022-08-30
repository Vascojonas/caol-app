import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Comercial from "../pages/Comercial";

import axios from 'axios';

// axios.defaults.headers.common = {
//   'X-Requested-With': 'XMLHttpRequest',
//   'X-CSRF-TOKEN': window.csrf_token
// };

axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
              <Route path="/" element={<Comercial/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App