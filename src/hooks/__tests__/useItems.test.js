import { renderHook, act } from "@testing-library/react-hooks";
import useItems from "./useItems";

describe("useItems", () => {
  const itemsData = [
    { id: 1, name: "Item 1", price: 10, color: "red" },
    { id: 2, name: "Item 2", price: 20, color: "green" },
    { id: 3, name: "Item 3", price: 30, color: "blue" },
  ];

  it("should set initial items data correctly", () => {
    const { result } = renderHook(() => useItems(itemsData));
    expect(result.current.items).toEqual(itemsData);
  });

  it("should filter items based on color filter values", () => {
    const { result } = renderHook(() => useItems(itemsData));

    // Select red color filter
    act(() => {
      result.current.handleChangeColorState("red");
    });

    expect(result.current.items).toEqual([
      { id: 1, name: "Item 1", price: 10, color: "red" },
    ]);

    // Select red and green color filters
    act(() => {
      result.current.handleChangeColorState("green");
    });

    expect(result.current.items).toEqual([
      { id: 1, name: "Item 1", price: 10, color: "red" },
      { id: 2, name: "Item 2", price: 20, color: "green" },
    ]);

    // Deselect green color filter
    act(() => {
      result.current.handleChangeColorState("green");
    });

    expect(result.current.items).toEqual([
      { id: 1, name: "Item 1", price: 10, color: "red" },
    ]);
  });

  it("should filter items based on search value", () => {
    const { result } = renderHook(() => useItems(itemsData));

    // Search for items containing "item 2"
    act(() => {
      result.current.handleDebouncedChangeSearch("item 2");
    });

    expect(result.current.items).toEqual([
      { id: 2, name: "Item 2", price: 20, color: "green" },
    ]);

    // Search for items containing "item"
    act(() => {
      result.current.handleDebouncedChangeSearch("item");
    });

    expect(result.current.items).toEqual(itemsData);
  });

  it("should filter items based on price range filter values", () => {
    const { result } = renderHook(() => useItems(itemsData));

    // Set price range filter to between 15 and 25
    act(() => {
      result.current.handleDebouncedChangePrice([15, 25]);
    });

    expect(result.current.items).toEqual([
      { id: 2, name: "Item 2", price: 20, color: "green" },
    ]);

    // Set price range filter to between 5 and 15
    act(() => {
      result.current.handleDebouncedChangePrice([5, 15]);
    });

    expect(result.current.items).toEqual([
      { id: 1, name: "Item 1", price: 10, color: "red" },
    ]);
  });

  it("should sort items based on sort function", () => {
    const { result } = renderHook(() => useItems(itemsData));

    // Sort items by price in ascending order
    act(() => {
      result.current.handleSortItems((a, b) => a.price - b.price);
    });

    expect(result.current.items).toEqual([
      { id: 1, name: "Product A", color: "red", price: 10 },
      { id: 2, name: "Product B", color: "blue", price: 20 },
      { id: 3, name: "Product C", color: "green", price: 30 },
    ]);
  });
});
