export const sorters = [
  {
    label: "Price Low to High",
    comparer: (a, b) => parseFloat(a.price) - parseFloat(b.price),
  },
  {
    label: "Price High to Low",
    comparer: (a, b) => parseFloat(b.price) - parseFloat(a.price),
  },
  {
    label: "Popular first",
    comparer: (a, b) => parseFloat(b.rate) - parseFloat(a.rate),
  },
];

export const colorFilters = ["Black", "Red", "White", "Blue", "Gray", "Brown"];
