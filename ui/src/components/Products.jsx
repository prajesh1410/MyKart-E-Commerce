import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState(popularProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try{
        const res = await axios.get(cat ? `http://localhost:5500/api/products?category=${cat}` : "http://localhost:5500/api/products");
        setProducts(res.data);
      }catch(err){}
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
    cat && setFilteredProducts(
      products.filter((item) => 
        Object.entries(filters).every(([key, value]) => 
          item[key].includes(value)
        )
      )
    );
  }
  , [products, cat, filters]);
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "desc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);
  return (
    <Container>
      {cat 
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />) 
        : products.slice(0,8).map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
