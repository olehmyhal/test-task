import React from "react";
import {
  SearchInput,
  SortBreadcrumbs,
  PriceFilter,
  ColorFilter,
  ProductCards,
} from "../../components";
import useFetchItems from "../../hooks/useFetchItems";
import useItems from "../../hooks/useItems";
import { sorters, colorFilters } from "./helpers";
import styles from "./Main.module.css";

// const itemsEx = [
//   {
//     name: "Sneakers",
//     price: 150,
//     color: "Yellow",
//     rate: 4.5,
//   },
//   {
//     name: "smth",
//     price: 2000,
//     color: "Red",
//     rate: 3.0,
//   },
//   {
//     name: "Sneakers",
//     price: 300,
//     color: "Black",
//     rate: 5.0,
//   },
// ];

const Main = () => {
  const [itemsData, isLoading, error] = useFetchItems("/items.json");
  const {
    items,
    handleChangeColorState,
    handleDebouncedChangePrice,
    handleDebouncedChangeSearch,
    handleSortItems,
  } = useItems(itemsData);

  return (
    <div className={styles.container}>
      <SearchInput onChange={handleDebouncedChangeSearch} />
      <SortBreadcrumbs sorters={sorters} onSort={handleSortItems} />
      <div className={styles.main}>
        <div className={styles.filters}>
          <ColorFilter
            colorFilters={colorFilters}
            onChange={handleChangeColorState}
            className={styles.filter}
          />
          <PriceFilter
            onChange={handleDebouncedChangePrice}
            className={styles.filter}
          />
          <h4 className={styles.items_amount}>Total items: {items.length}</h4>
        </div>
        <div className={styles.products}>
          <ProductCards
            items={items}
            isError={Boolean(error)}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
