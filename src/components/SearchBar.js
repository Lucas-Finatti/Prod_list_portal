import { useState } from 'react';

function SearchBar({ onSearch }) {
  // Cria um estado para armazenar o termo de busca atual
  const [searchTerm, setSearchTerm] = useState('');

  // Função que é chamada quando o campo de busca é modificado
  const handleSearch = (e) => {
    // Atualiza o estado com o novo termo de busca
    setSearchTerm(e.target.value);
    // Chama a função de busca que foi passada como prop
    onSearch(e.target.value);
  };

  // Renderiza um campo de texto para busca com o valor e função de busca definidos acima
  return (
    <input
      type="text"
      placeholder="Search with name or category"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}

export default SearchBar;