import { type Category } from "./category";

export type SubCategory = {
  _id: string;
  name: string;
  category: Category | string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};
