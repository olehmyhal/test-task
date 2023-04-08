import { render, screen } from "@testing-library/react";
import ProductCards from "./ProductCards";
import {
  ERROR,
  LOADER,
  PRODUCT_ITEM,
  EMPTY_ITEMS,
} from "../../constants/dataTestId";

const defaultDataParams = {
  isErorr: false,
  isLoading: false,
  items: [
    {
      name: "Sneakers",
      price: 150,
      color: "Yellow",
      rate: 4.5,
    },
    {
      name: "smth",
      price: 2000,
      color: "Red",
      rate: 3.0,
    },
    {
      name: "Sneakers",
      price: 300,
      color: "Black",
      rate: 5.0,
    },
  ],
};

describe("ProductCards", () => {
  it("Should return error message if isError is true", () => {
    render(<ProductCards {...defaultDataParams} isError={true} />);
    expect(screen.getByTestId(ERROR)).toBeInTheDocument();
  });

  it("Should return loader if isLoading is true", () => {
    render(<ProductCards {...defaultDataParams} isLoading={true} />);
    expect(screen.getByTestId(LOADER)).toBeInTheDocument();
  });

  it("Should return empty page if items length is 0", () => {
    render(<ProductCards {...defaultDataParams} items={[]} />);
    expect(screen.getByTestId(EMPTY_ITEMS)).toBeInTheDocument();
  });

  it("Should return items if items length is more than 0", () => {
    render(<ProductCards {...defaultDataParams} />);
    expect(screen.getAllByTestId(PRODUCT_ITEM)).toHaveLength(3);
  });
});
