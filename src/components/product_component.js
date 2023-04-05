// Importação dos estilos e do componente SearchBar
import '../styles/product_component.css'
import '../styles/scrollbar.css'
import SearchBar from './SearchBar'
// Importação dos hooks useState e useEffect
import { useState, useEffect } from 'react';

function ProductList({products}) {
  // State para armazenar os produtos filtrados
  const [filteredProducts, setFilteredProducts] = useState([]);
  // State para armazenar a ordem de classificação
  const [sortOrder, setSortOrder] = useState('asc');

  // Efeito para atualizar os produtos filtrados sempre que a lista de produtos muda
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Função para adicionar um produto ao carrinho
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

  // Função para lidar com a pesquisa
  const handleSearch = (searchTerm) => {
      const searchRegex = new RegExp(searchTerm, 'i');
      // Filtra os produtos pelo nome ou categoria correspondentes ao termo de pesquisa
      setFilteredProducts(products.filter((product) => (
        searchRegex.test(product.name) ||
        searchRegex.test(product.category)
      )));
  };

  // Função para lidar com a ordem de classificação
  const handleSortOrder = (order) => {
    setSortOrder(order);
    // Ordena os produtos com base na ordem selecionada
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === 'asc') {
        return a.value - b.value;
      } else {
        return b.value - a.value;
      }
    });
    // Atualiza os produtos filtrados com a lista ordenada
    setFilteredProducts(sortedProducts);
  };

  return (
    <div>
      <div class='SearchBar-container'>
        {/* Componente SearchBar para lidar com a pesquisa */}
        <SearchBar class='SearchBar' onSearch={handleSearch} />
      </div>
        {/* Botões para selecionar a ordem de classificação */}
        <button onClick={() => handleSortOrder('asc')}>Menor preço</button>
        <button onClick={() => handleSortOrder('desc')}>Maior preço</button>
      <div className="product_list">
        {/* Renderiza a lista de produtos filtrados */}
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
        // Renderiza uma mensagem caso não haja produtos filtrados
        <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  )
}
export default ProductList