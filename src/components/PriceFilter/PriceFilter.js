import React, { useState } from "react";
import styles from "./PriceFilter.module.css";

const PriceFilter = ({ onChange, className }) => {
  const [minVal, setMinVal] = useState(null);
  const [maxVal, setMaxVal] = useState(null);

  const handleChange = (event, type = "max") => {
    const currentValue = event.target.value === "" ? null : event.target.value;

    if (type === "min") {
      setMinVal(currentValue);
    } else {
      setMaxVal(currentValue);
    }

    onChange([
      type === "min" ? currentValue : minVal,
      type === "max" ? currentValue : maxVal,
    ]);
  };

  return (
    <div className={className}>
      <h3>Price:</h3>
      <input
        type="number"
        value={minVal}
        onChange={(e) => handleChange(e, "min")}
        placeholder="min"
        className={styles.input}
      />
      <input
        type="number"
        value={maxVal}
        onChange={(e) => handleChange(e)}
        placeholder="max"
        className={styles.input}
      />
    </div>
  );
};

export default PriceFilter;
