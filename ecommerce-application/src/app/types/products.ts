export interface Product {
  id: number;
  price: number;
  name: string;
  category: string;
  isNew: boolean;
  image: string;
}
export interface ProductProps {
  initialProducts: Product[];
}
export enum RoleTypes  {
admin = "admin",
user = "user",
}