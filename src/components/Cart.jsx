import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increase,
  decrease,
} from "../store/cartSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import { VscChromeClose } from "react-icons/vsc";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((store) => store.cart.items);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id) => {
    dispatch(increase(id));
  };

  const handleDecrease = (id) => {
    dispatch(decrease(id));
  };

  const totalPrice = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  return (
    <section style={{marginBottom: "4rem"}}>
      <div className="back">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeftLong style={{ width: "2.4rem", marginRight: "0.9rem" }} />
        </button>
        <p>Back to Shopping</p>
      </div>
      <h1>SHOPPING CART</h1>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="carts">
          <div>
            <div className="products-wrapper">
              <p>Product</p>
              <div className="price-wrapper">
                <p>Quantity</p>
                <p>Price</p>
              </div>
            </div>
            <ul className="cart-wrapper">
              {items.map((item, index) => (
                <li key={item + index} className="cart-item">
                  <button
                    className="remove"
                    onClick={() => handleRemove(item.id)}
                  >
                    <VscChromeClose />
                  </button>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{ border: "1px solid", width: "15.5rem" }}
                  />
                  <div className="product">
                    <div>
                      <p>
                        <strong>{item.brand_name}</strong>
                      </p>
                      <p>{item.name}</p>
                    </div>
                    <div className="quantity-wrapper">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        disabled={item.quantity === 1}
                      >
                        <FiMinus />
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => handleIncrease(item.id)}>
                        <GoPlus />
                      </button>
                    </div>
                    <p className="product-price">${item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="total_price">
            <p className="card_totals">
              <strong>CART TOTALS</strong>
            </p>
            <div style={{marginTop: "3.7rem"}}>
              <p>Shipping (3-5 Business Days)</p>
              <strong>Free</strong>
            </div>
            <div>
              <p>TAX (estimated for the United States (US))</p>
              <strong>$0</strong>
            </div>
            <div style={{paddingBottom: "4.1rem", borderBottom: "dashed"}}>
              <p>Subtotal</p>
              <strong>${totalPrice}</strong>
            </div>
            <div>
              <p style={{fontWeight: "500"}}>Total</p>
              <p>
                <strong>${totalPrice}</strong>
              </p>
            </div>
            <button className="proceed">PROCEED TO CHECKOUT</button>
            <div className="back">
              <button onClick={() => navigate(-1)}>
                <FaArrowLeftLong
                  style={{ width: "2.4rem", marginRight: "0.9rem" }}
                />
              </button>
              <p>Back to Shopping</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
