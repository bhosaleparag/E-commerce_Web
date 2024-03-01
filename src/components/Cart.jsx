import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = React.useState({
    name: '',
    address: '',
    creditCardNumber: '',
  });
  const [expanded, setExpanded] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    } else {
      navigate("/login");
    }
  }, []);

  const handleRemoveFromCart = (product) => {
    const data = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(data));
    setCart(data);
  };

  const handleCheckout = () => {
    localStorage.removeItem("cart");
    setShowPopup(!showPopup);
    setCart([]);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    setShowPopup(false)
    
  };
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="checkout">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="emoji"
          style={{ fontSize: "37px" }}
        >
          ↩️
        </span>
        <h1>Cart</h1>
        {cart.length !== 0 && (
          <button className="product-btn-desc" onClick={handleCheckout}>
            checkout{" "}
          </button>
        )}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <form onSubmit={handleFormSubmit} style={{minHeight: "40vh"}}>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="creditCardNumber"
                placeholder="Credit Card Number"
                value={formData.creditCardNumber}
                onChange={handleInputChange}
              />
            <button type="submit" className="product-btn-desc">submit</button>
            </form>
          </div>
        </div>
      )}
      {cart.length === 0 && (
        <h3 style={{ textAlign: "center" }}>No items in cart.</h3>
      )}
      <div className="products">
        {cart?.map((product) => (
          <div className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            {expanded === product.id ? (
              <div className="product-description">
                <p className="product-description-title">
                  Description:
                  <span
                    onClick={() => setExpanded(null)}
                    style={{ float: "right", cursor: "pointer" }}
                  >
                    ❌
                  </span>
                </p>
                <p className="product-description-data">
                  {product.description}
                </p>
              </div>
            ) : (
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
                  <button
                    className="product-btn-desc"
                    onClick={() =>
                      setExpanded(expanded === product.id ? null : product.id)
                    }
                  >
                    show Description{" "}
                  </button>
                  <span
                    className="emoji"
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    🚫
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
