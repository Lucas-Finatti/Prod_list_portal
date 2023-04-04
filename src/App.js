import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
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
