import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLoading, saveProducts } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";
import { FiShoppingCart } from "react-icons/fi";


const Main = ({ selectedBrand, selectedColor, sortBy, setSortBy }) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.products);
  const cart = useSelector((store) => store.cart.items)

  useEffect(() => {
    async function fetchProducts() {
      dispatch(setLoading(true));

      let query = "https://headphones-server.onrender.com/products";
      let params = [];

      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (selectedColor) {
        params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      }

      if (params.length) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(query);
        const fetchedProducts = await response.json();
        dispatch(saveProducts(fetchedProducts));
      } catch (error) {
        console.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColor]);

  const sortedProducts = [...(products || [])].sort((p1, p2) => {
    if (sortBy === "cheap") {
      return p1.price - p2.price;
    }

    if (sortBy === "expensive") {
      return p2.price - p1.price;
    }

    return 0;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart({...product, quantity: 1}));
  };
  return (
    <main className="main">
      {loading && <p>Loading Products...</p>}
      <ul className="products">
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <img
              src={product.image_url}
              alt={product.name}
              style={{ border: "1px solid", height: "299px" }}
            />
            <div className="product-card">
              <Link to={`/product/${product.id}`}>
              <h3>{product.name}</h3>
              </Link>
              <p style={{ marginBottom: "1.2rem", fontSize: "1.8rem" }}>
                <strong>{product.brand_name}</strong>
              </p>
              <p
                style={{
                  textAlign: "start",
                  fontSize: "1.8rem",
                  fontWeight: "300",
                  lineHeight: "1.25",
                  color: "#190D26",
                  marginBottom: "2.1rem",
                }}
              >
                {product.description}
              </p>
              <ul className="color_options">
                {product.color_options.map((color, index) => (
                  <li
                    key={index}
                    style={{ backgroundColor: color }}
                    className="color_option"
                  ></li>
                ))}
              </ul>
              <p className="price">
                <strong>${product.price}</strong>
              </p>
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(product)}
                disabled={cart.some((item) => item.id === product.id)}
              >
             <FiShoppingCart style={{width: "2.4rem", marginRight: "1rem"}}/> Add To Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
