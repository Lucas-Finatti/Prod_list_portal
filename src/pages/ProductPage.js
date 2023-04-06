import React from "react";
import Navigation from '../navigation/navigation'
import ProductList from "../components/product_component";
import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/ProductPage.css'

// define a baseURL para as requisições feitas usando o axios
axios.defaults.baseURL = 'https://prodlist.onrender.com/'

const Product = () => {
    // define um estado para armazenar a lista de produtos
    const [products, setProducts] = useState([]);

    // faz uma requisição para o servidor para obter a lista de produtos
    useEffect(() => {
        const getData = async (url) => {
            const response = await axios.get(url);
            setProducts(response.data);
        }

        getData('https://prodlist.onrender.com/product/');
    }, []);

    // renderiza o componente Navigation, um título e o componente ProductList,
    // passando a lista de produtos como parametro
    return (
        <>
            <Navigation></Navigation>
            <h1>Shopping List</h1>
            <ProductList products={products}/>
        </>
    )
}

export default Product
