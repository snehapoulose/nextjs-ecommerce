interface Product {
  id: number;
  price: number;
  name: string;
  category: string;
  isNew: boolean;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    price: 100,
    name: "Product 1",
    category: "Category 1",
    isNew: true,
    image: "/product1.jpg",
  },
];
export default mockProducts;
