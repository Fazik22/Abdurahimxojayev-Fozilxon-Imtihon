import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  saveColors,
  setLoading as setLoadingColors,
} from "../store/colorsSlice";
import {
  saveBrands,
  setLoading as setLoadingBrands,
} from "../store/brandsSlice";

const Aside = ({
  selectedBrand,
  setSelectedBrand,
  selectedColor,
  setSelectedColor,
}) => {
  const { colors, brands } = useSelector((store) => store);
  const { colors: colorsList, loading: loadingColors } = colors;
  const { brands: brandsList, loading: loadingBrands } = brands;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchColors() {
      dispatch(setLoadingColors(true));
      try {
        const response = await fetch(
          `https://headphones-server.onrender.com/colors`
        );
        if (!response.ok) {
          throw new Error("Error");
        }
        const fetchedColors = await response.json();
        dispatch(saveColors(fetchedColors));
      } catch (error) {
        console.error(error.message);
      } finally {
        dispatch(setLoadingColors(false));
      }
    }

    async function fetchBrands() {
      dispatch(setLoadingBrands(true));
      try {
        const response = await fetch(
          `https://headphones-server.onrender.com/brands`
        );
        if (!response.ok) {
          throw new Error("Error");
        }

        const fetchedBrands = await response.json();
        dispatch(saveBrands(fetchedBrands));
      } catch (error) {
        console.error(error.message);
      } finally {
        dispatch(setLoadingBrands(false));
      }
    }

    fetchColors();
    fetchBrands();
  }, []);
  return (
    <aside>
      <h2>BRAND</h2>
      {loadingBrands && <p>Loading Brands...</p>}
      <ul className="brands-wrapper">
        {brandsList.map((brand, index) => (
          <li key={`${brand + index}`}>
            <input
              type="radio"
              id={brand}
              name="brand"
              onChange={() => setSelectedBrand(brand)}
              checked={selectedBrand === brand}
            />
            <label htmlFor={brand}>{brand}</label>
          </li>
        ))}
        <button
          className="reset"
          style={{ marginTop: "1rem", marginBottom: "1rem", cursor: "pointer"}}
          onClick={() => setSelectedBrand("")}
        >
          Reset
        </button>
      </ul>

      <h2>CONNECTIVITY</h2>
      <ul className="connectivity-wrapper">
        <li>
          <input type="radio" name="connectivity" />
          <label>2.4 GHz wireless technology</label>
        </li>
        <li>
          <input type="radio" name="connectivity" />
          <label>3.5mm audio input</label>
        </li>
        <li>
          <input type="radio" name="connectivity" />
          <label>Bluetooth</label>
        </li>
        <li>
          <input type="radio" name="connectivity" />
          <label>LIGHTSPEED wireless</label>
        </li>
        <li>
          <input type="radio" name="connectivity" />
          <label>Wired USB input</label>
        </li>
        <li>
          <input type="radio" name="connectivity" />
          <label>USB-C</label>
        </li>
      </ul>

      <h2>COLORS</h2>
      {loadingColors && <p>Loading Colors...</p>}
      <ul className="colors-wrapper">
        {colorsList.map((color, index) => (
          <li key={`${color + index}`}>
            <button
              onClick={() => setSelectedColor(color)}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "1px solid",
                backgroundColor: color,
                cursor: "pointer",
                outlineOffset: "2px",
                outline: selectedColor === color ? "2px solid #000" : "",
              }}
            ></button>
          </li>
        ))}
        <button
          className="reset"
          style={{ marginTop: "3rem", marginBottom: "1rem", cursor: "pointer"}}
          onClick={() => setSelectedColor("")}
        >
          Reset
        </button>
      </ul>
    </aside>
  );
};

export default Aside;
