import React, { useState } from "react";
import Main from "./components/Main";
import NextPage from './components/NextPage';
import { Route, Routes } from "react-router-dom";
import './App.css'

const App = () => {
  const [products, setProducts] = useState()
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main setProducts={setProducts}/>} />
        <Route path='/next' element={<NextPage products={products}/>}/>
      </Routes>
    </div>
  );
};

export default App;
