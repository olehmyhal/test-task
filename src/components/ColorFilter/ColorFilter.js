import React from "react";
import classNames from "classnames";
import styles from "./ColorFilter.module.css";

const ColorFilter = ({ colorFilters, onChange, className }) => {
  return (
    <div className={classNames(styles.options, className)}>
      <h3>Colors:</h3>
      {colorFilters.map((colorFilter, index) => (
        <label key={index} className={styles.item}>
          <input
            type="checkbox"
            name={colorFilter}
            onClick={() => onChange(colorFilter)}
            className={styles.input}
          />
          {colorFilter}
        </label>
      ))}
    </div>
  );
};

export default ColorFilter;
