import { useState, useMemo, useEffect } from "react";
import debounce from "lodash/debounce";

const DEBOUNCE_TIMEOUT = 1000;

const useItems = (itemsData) => {
  const [items, setItems] = useState(itemsData);
  const [checkSorting, setCheckSorting] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [colorFilterValues, setColorFilterValues] = useState([]);
  const [priceFilterValues, setPriceFilterValues] = useState([null, null]);

  useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  const handleDebouncedChangePrice = debounce(
    setPriceFilterValues,
    DEBOUNCE_TIMEOUT
  );

  const handleDebouncedChangeSearch = debounce(
    setSearchValue,
    DEBOUNCE_TIMEOUT
  );

  const handleChangeColorState = (val) => {
    if (colorFilterValues.includes(val)) {
      setColorFilterValues(
        colorFilterValues.filter((colorFilterValue) => colorFilterValue !== val)
      );
      return;
    }

    setColorFilterValues([...colorFilterValues, val]);
    return;
  };

  const handleSortItems = (sorter) => {
    setCheckSorting(new Date().toISOString());
    setItems(items.sort(sorter));
  };

  const filteredItems = useMemo(() => {
    let renderItems = [...items];

    if (Boolean(colorFilterValues.length)) {
      renderItems = renderItems.filter((renderItem) =>
        colorFilterValues.includes(renderItem.color)
      );
    }

    if (Boolean(searchValue.trim())) {
      renderItems = renderItems.filter((renderItem) =>
        renderItem.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (
      Boolean(priceFilterValues[0]) &&
      Boolean(priceFilterValues[1]) &&
      priceFilterValues[0] <= priceFilterValues[1]
    ) {
      renderItems = renderItems.filter(
        (renderItem) =>
          renderItem.price >= priceFilterValues[0] &&
          renderItem.price <= priceFilterValues[1]
      );
    }

    return renderItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorFilterValues, priceFilterValues, searchValue, items, checkSorting]);

  return {
    items: filteredItems,
    handleChangeColorState,
    handleDebouncedChangePrice,
    handleDebouncedChangeSearch,
    handleSortItems,
  };
};

export default useItems;
