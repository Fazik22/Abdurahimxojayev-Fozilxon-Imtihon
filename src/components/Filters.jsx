import React from "react";

const Filters = ({sortBy, setSortBy}) => {
  return (
    <div className="filters">
      <p>Filter by:</p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <select
          name="price"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="cheap">cheap</option>
          <option value="expensive">expensive</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
