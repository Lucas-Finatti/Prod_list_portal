import '../styles/product_component.css'
import '../styles/scrollbar.css'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react';

function ProductList({products}) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const addToCart = (product) => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItemIndex = cartItems.findIndex(item => (
        item.id === product.id &&
        item.name === product.name &&
        item.image === product.image &&
        item.value === product.value
      ));
    
      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
      } else {
        cartItems.push({...product, quantity: 1});
      }
    
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log(localStorage);
  };

  const handleSearch = (searchTerm) => {
      const searchRegex = new RegExp(searchTerm, 'i');
      setFilteredProducts(products.filter((product) => (
        searchRegex.test(product.name) ||
        searchRegex.test(product.category)
      )));
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === 'asc') {
        return a.value - b.value;
      } else {
        return b.value - a.value;
      }
    });
    setFilteredProducts(sortedProducts);
  };

  return (
    <div>
      <div class='SearchBar-container'>
        <SearchBar class='SearchBar' onSearch={handleSearch} />
      </div>
        <button onClick={() => handleSortOrder('asc')}>less</button>
        <button onClick={() => handleSortOrder('desc')}>more</button>
      <div className="product_list">


        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
            <p key={index}>
            <div className="product_container">
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} />
                <div>R$:{product.value}</div>
                <input type="button" onClick={() => addToCart(product)} value="ADD" />
            </div> 
            </p>
        ))
        ) : (
        <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  )
}
export default ProductList
