import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import api from "./api/api";

function App() {
  useEffect(() => {
    api.get('/product').then(res=>{
      console.log(res)
    })
  }, [])

  return (
    <Routes> 
      <Route path='/' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
  );
}

export default App;
