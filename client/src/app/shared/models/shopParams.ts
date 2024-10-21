export class ShopParams {
  priceRange: {
    low: number;
    high: number;
  } = {
      low: 0,
      high: 100000000
    }
  sort = "title";
  pageNumber = 1;
  pageSize = 5;
  search = "";
}
