import {  type Category } from "./category";
import { type SubCategory } from "./subCategory";

export type ProductImage = {
  public_id?: string;
  url: string;
};

export type Product = {
  _id: string;
  title: string;
  description?: string;
  bookingPrice: number;
  category: Category | string;
  subCategory: SubCategory | string;
  images?: ProductImage[];
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
