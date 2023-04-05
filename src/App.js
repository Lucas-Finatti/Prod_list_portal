import { Route, Routes } from "react-router-dom";
import Product from "./pages/ProductPage";
import Cart from "./pages/CartPage";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Routes> 
      <Route path='/' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
  );
}

export default App;
