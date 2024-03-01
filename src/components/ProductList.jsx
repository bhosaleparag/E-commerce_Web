import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')){
      const fetchProducts = async () => {
        const response = await api.get("/products");
        setProducts(response.data);
      };
      fetchProducts();
    }else{
      navigate("/login")
    }
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sort === "asc") {
      return a.price - b.price;
    } else if (sort === "desc") {
      return b.price - a.price;
    }
    return 0;
  });
  const handleAddCart = (data)=>{
    const existcart = localStorage.getItem('cart') ?
    JSON.parse(localStorage.getItem('cart')) : [];
    existcart.push(data)
    localStorage.setItem('cart', JSON.stringify(existcart));
    navigate("/cart")
  }

  return (
    <>
    <nav>
      <select value={sort} onChange={(e)=>{setSort(e.target.value)}}>
        <option value="">Sort by</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      <input type="text" placeholder="Filter by name" value={filter} 
        onChange={(e)=>{setFilter(e.target.value)}}/>
      <span className="emoji" onClick={() => navigate("/cart")}>🛒</span>
    </nav>
      <div className="products">
        {sortedProducts.map((product) => (
          <div className="product-card">
            <img src={product.image} alt={product.title} className="product-image"/>
            {expanded === product.id ? (
              <div className="product-description">
                <p className="product-description-title">Description: 
                <span onClick={() =>(setExpanded(null))} style={{float: "right", cursor:"pointer"}}>❌</span></p>
                <p className="product-description-data">{product.description}</p>
              </div>) : (
              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-category">category: {product.category}</p>
                <p className="product-price">Price: {product.price}</p>
                <p className="product-rating">
                  {product.rating.rate}★{" "}
                  <span className="product-reviews">
                    {product.rating.count} reviews
                  </span>
                </p>
                <div className="product-btns">
                  <button className="product-btn-desc" 
                  onClick={() => (setExpanded(expanded === product.id ? null : product.id))}>
                  show Description{" "}</button>
                  <span className="emoji" onClick={() => handleAddCart(product)}>🛒</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
