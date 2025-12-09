// import {type ColumnDef } from "@tanstack/react-table";
// export const categoryColumns: ColumnDef<any>[] = [
//   {
//     header: "Name",
//     accessorKey: "name",
//   },
//   {
//     header: "Created At",
//     accessorKey: "createdAt",
//   },
// ];

import type { ColumnDef } from "@tanstack/table-core";

type Category = {
  _id: string;
  name: string;
  createdAt: string;
};

export const categoryColumns: ColumnDef<Category>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original; // now TS knows its Category type

      return (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => console.log("Edit", item)}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
          >
            Edit
          </button>

          <button
            onClick={() => console.log("Delete", item._id)}
            className="px-2 py-1 text-xs bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];
