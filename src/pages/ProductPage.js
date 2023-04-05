import React from "react";
import Navigation from '../navigation/navigation'
import ProductList from "../components/product_component";
import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/ProductPage.css'
axios.defaults.baseURL = '127.0.0.1:5000/product/'

const Product = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getData = async (url) => {
            const response = await axios.get(url);
            setProducts(response.data);
        }

        getData('http://127.0.0.1:5000/product/');
    }, []);

    return (
        <>
            <Navigation></Navigation>
            <h1>Shopping List</h1>
            <ProductList products={products}/>
        </>
    )
}

export default Product