import {  type ColumnDef } from "@tanstack/react-table";

export const subCategoryColumns: ColumnDef<any>[] = [
  {
    header: "Sub Category",
    accessorKey: "name",
  },
  {
    header: "Parent Category",
    accessorFn: (row) => row.category?.name,
  },
];
