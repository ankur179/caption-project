import React from "react";
import Home from "./routes/Home";
import About from "./routes/About";
import Reservations from "./routes/Reservations";
import Menu from "./routes/Menu";
import Login from "./routes/Login";
import Order from "./routes/Order";

import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/about" element = {<About />}/>
        <Route path = "/menu" element = {<Menu />}/>
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/order" element = {<Order />}/>
        <Route path = "/reservations" element = {<Reservations />}/>
      </Routes>
    </>
  );
}

export default App;
  