import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Consultores from "../pages/comercial/consultores/Consultores";
import Clientes from "../pages/comercial/clientes/clientes";

import axios from 'axios';

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': window.csrf_token
};

axios.defaults.baseURL = "http://localhost:8000/";
//axios.defaults.baseURL = "http://phplaravel-831378-2861340.cloudwaysapps.com/";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
        
              <Route path="/" element={<Consultores/>}/>
              <Route path="/comercial/clientes" element={<Clientes/>}/>

          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App