

import React, { useState, useMemo } from "react";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/api/categoryApi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import TableList from "@/components/common/data-table";
import type { ColumnDef } from "@tanstack/react-table";

export default function CategoryDashboard(): JSX.Element {
  const { data, isLoading: loadingCategories } = useGetCategoriesQuery();
  const categories = Array.isArray(data) ? data : data?.categories || [];

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [name, setName] = useState("");
  const [editing, setEditing] = useState<any>(null);

  // 🔍 category search input
  const [searchCategory, setSearchCategory] = useState("");

  // Start Edit
  const startEdit = (cat: any) => {
    setEditing(cat);
    setName(cat.name);
  };

  const cancelEdit = () => {
    setEditing(null);
    setName("");
  };

  // Submit Create or Update
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!name.trim()) return alert("Enter category name");

    try {
      if (editing) {
        await updateCategory({
          id: editing._id || editing.id,
          name,
        }).unwrap();
      } else {
        await createCategory({ name }).unwrap();
      }

      setName("");
      setEditing(null);
    } catch (err: any) {
      alert(err?.data?.message || "Operation failed");
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    try {
      await deleteCategory(id).unwrap();
    } catch (err: any) {
      alert(err?.data?.message || "Delete failed");
    }
  };

  //  FILTER SEARCH
  const filteredCategories = useMemo(() => {
    return categories.filter((c: any) => {
      const text = searchCategory.toLowerCase();

      return (
        c.name.toLowerCase().includes(text) ||
        String(c._id || c.id).toLowerCase().includes(text)
      );
    });
  }, [categories, searchCategory]);

  // TABLE DATA
  const tableData = filteredCategories.map((c: any) => ({
    id: c._id || c.id,
    name: c.name,
    ...c,
  }));


  const columns: ColumnDef<any>[] = [
  {
    header: "S.No",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "USERNAME",
    accessorKey: "name",
    cell: ({ row }) => (
      <span className="font-medium">{}</span>
    ),
  },
  // {
  //   header: "Category ID",
  //   accessorKey: "id",
  // },
  {
    header: "uSER COUNT",
    accessorKey: "count",
  },
  {
    header: "Category Name",
    accessorKey: "name",
  },
  {
    header: "PERMISSION",
    accessorKey: "Permission",
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2 justify-center">
        <Button
          size="sm"
          variant="outline"
          onClick={() => startEdit(row.original)}
        >
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];


  return (
    <Card className="bg-white rounded-lg shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Category Management</CardTitle>
      </CardHeader>

      <CardContent>
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-2 mb-6"
        >
          <Input
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button type="submit">
            {editing ? "Update" : "Create"}
          </Button>

          {editing && (
            <Button variant="outline" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </form>

        {/* 🔍 SEARCH BAR */}
        <div className="mb-4">
          <Input
            placeholder="Search Category..."
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          />
        </div>

        {/* TABLE LIST */}
        {loadingCategories ? (
          <p>Loading...</p>
        ) : (
          <TableList
            data={tableData}
            columns={columns}
            showSearchInput={false}
            showFilter={false}
          />
        )}
      </CardContent>
    </Card>
  );
}
