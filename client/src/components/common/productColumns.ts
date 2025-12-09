import {  type ColumnDef } from "@tanstack/react-table";

export const productColumns: ColumnDef<any>[] = [
  {
    header: "Product",
    accessorKey: "name",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Category",
    accessorFn: (row) => row.category?.name,
  },
  {
    header: "Sub Category",
    accessorFn: (row) => row.subCategory?.name,
  },
];
