import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const { items } = useSelector((store) => store.cart);

  return (
    <section className="hero">
      <div>
        <Link to="/">GameGeek</Link>
        <div>
          <ul>
            <li>
              <a href="#">Categories</a>
            </li>
            <li>
              <a href="#">Brands</a>
            </li>
            <li>
              <a href="#">What’s new</a>
            </li>
            <li>
              <a href="#">Sales</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>
        <div>
          <CiSearch />
          <FiUser />
          <Link to="/cart">
            <div className="cart">
              <FiShoppingCart />
              {items.length > 0 && <p>{items.length}</p>}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
