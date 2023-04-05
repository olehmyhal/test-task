import React, { useState } from "react";
import debounce from "lodash/debounce";
import styles from "./SearchInput.module.css";

const SearchInput = ({ onChange }) => {
  const [value, setValue] = useState("");

  const handleDebouncedChange = debounce(onChange, 1000);

  function handleChange(event) {
    setValue(event.target.value);
    handleDebouncedChange(event.target.value);
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className={styles.search}
      placeholder="Search..."
    />
  );
};

export default SearchInput;
