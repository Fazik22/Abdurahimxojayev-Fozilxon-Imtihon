import React, { useState } from "react";
import Aside from "./Aside";
import Main from "./Main";
import Filters from "./Filters";

const Products = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortBy, setSortBy] = useState("");

  return (
    <>
      <img src="Gamers.png" alt="Gamers" />
      <Filters sortBy={sortBy} setSortBy={setSortBy} />
      <div className="main-wrapper">
        <Aside
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <Main
          selectedBrand={selectedBrand}
          selectedColor={selectedColor}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
    </>
  );
};

export default Products;
