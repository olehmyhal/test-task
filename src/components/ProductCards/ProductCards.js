import React from "react";
import {
  ERROR,
  LOADER,
  PRODUCT_ITEM,
  EMPTY_ITEMS,
} from "../../constants/dataTestId";
import styles from "./ProductCards.module.css";

const ProductCards = ({ isError, isLoading, items }) => {
  if (isError) {
    return (
      <div className={styles.error_message} data-testid={ERROR}>
        Error occured!
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.error_message} data-testid={LOADER}>
        Loading...
      </div>
    );
  }

  if (!Boolean(items.length)) {
    return (
      <div className={styles.error_message} data-testid={EMPTY_ITEMS}>
        Oops we dont have any items
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {items.map(({ name, price, rate, color }) => (
        <div
          key={`${name}__${color}__${price}`}
          className={styles.item}
          data-testid={PRODUCT_ITEM}
        >
          <h2>{name}</h2>
          <h4>Price: ${price}</h4>
          <h5>Rate: {rate} / 5.0</h5>
          <h5>Color: {color}</h5>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
