export interface Product {
  id: number;
  price: number;
  name: string;
  category: string;
  isNew: boolean;
  image: string;
}

export enum RoleTypes  {
admin = "admin",
user = "user",
}