export default interface Filter {
  query: string | null;
  carModelYear: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  country: string | null;
  city: string | null;
  description: string | null;
}
