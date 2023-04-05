import React from "react";
import styles from "./SortBreadcrumbs.module.css";

const SortBreadcrumbs = ({ sorters, onSort }) => {
  return (
    <div className={styles.sorter}>
      {sorters.map(({ comparer, label }, index) => (
        <button
          onClick={() => onSort(comparer)}
          key={index}
          className={styles.button}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SortBreadcrumbs;
