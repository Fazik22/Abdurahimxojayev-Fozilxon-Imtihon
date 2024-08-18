import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((store) => store.cart.items);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `https://headphones-server.onrender.com/products/${id}`
        );
        const fetchedProduct = await response.json();
        setProduct(fetchedProduct);

        const cartItem = cart.find((item) => item.id === id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchProduct();
  }, [id, cart]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="product-page">
      {product ? (
        <div className="product-details">
          <p style={{ marginBottom: "4.2rem" }}>
            Products / Gaming Headsets & Audio / <strong>{product.name}</strong>
          </p>
          <div className="product-wrapper">
            <img
              src={product.image_url}
              alt={product.name}
              style={{ border: "1px solid", width: "702px" }}
            />
            <div>
              <h3>{product.name}</h3>
              <p>
                <strong
                  style={{
                    fontSize: "1.8rem",
                    fontFamily: "Inter",
                    fontWeight: "500",
                    color: "#190D26",
                    lineHeight: "1.25",
                  }}
                >
                  LIGHTSPEED Wireless Gaming Headset + Base Station
                </strong>
              </p>
              <span
                style={{
                  display: "flex",
                  maxWidth: "15.9rem",
                  marginTop: "1.8rem",
                  marginBottom: "2.8rem",
                }}
              >
                <img src="../public/stars.png" alt="stars" />
                <p
                  style={{
                    fontFamily: "Inter",
                    fontWeight: "400",
                    color: "#454444",
                    paddingTop: "0.4rem",
                  }}
                >
                  (121)
                </p>
              </span>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "3.6rem",
                  fontWeight: "700",
                  color: "#190d26",
                  lineHeight: "1.25",
                  paddingTop: "3rem",
                  marginBottom: "1.5rem",
                  borderTop: "dashed",
                }}
              >
                <strong>${product.price} or 99.99/month</strong>
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "1.8rem",
                  fontWeight: "500",
                  color: "#0d2612",
                  paddingBottom: "2.8rem",
                  borderBottom: "dashed",
                }}
              >
                Suggested payments with 6 month special financing
              </p>
              <p
                style={{
                  marginTop: "2.9rem",
                  marginBottom: "3rem",
                  fontFamily: "Inter",
                  fontSize: "2.4rem",
                  fontWeight: "600",
                  color: "#0e020c",
                  lineHeight: "1.25",
                }}
              >
                Choose a color
              </p>
              <ul className="color_options">
                {product.color_options.map((color, index) => (
                  <li
                    key={index}
                    style={{
                      backgroundColor: color,
                      width: "66px",
                      height: "66px",
                      borderRadius: "50%",
                      border: "2px solid #0D2612",
                    }}
                  ></li>
                ))}
              </ul>
              <div className="quantity-controls">
                <div>
                  <button onClick={handleDecrease}>
                    <FiMinus />
                  </button>
                  <p>{quantity}</p>
                  <button onClick={handleIncrease}>
                    <GoPlus />
                  </button>
                </div>
                <p>Only 16 items left! Don’t miss it</p>
              </div>
              <div style={{display: "flex", gap: "1.7rem"}}>
                <button
                  className="add-to-cart"
                  onClick={handleAddToCart}
                  disabled={quantity <= 0}
                >
                  <FiShoppingCart
                    style={{ width: "2.4rem", marginRight: "1rem" }}
                  />
                  Add To Cart
                </button>
                <button className="heart">
                  <FaRegHeart style={{width: "3.5rem", height: "3.5rem"}}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading Product...</p>
      )}
    </div>
  );
};

export default ProductPage;
