import React, { useState, useMemo } from "react";
import {
  useGetSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} from "@/api/subCategoryApi";
import { useGetCategoriesQuery } from "@/api/categoryApi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import TableList from "@/components/common/data-table";
import type { ColumnDef } from "@tanstack/react-table";

export default function SubCategoryDashboard() {
  const { data: catData } = useGetCategoriesQuery();
  const categories = Array.isArray(catData) ? catData : catData?.categories || [];

  const { data: subData, isLoading: loadingSub } = useGetSubCategoriesQuery();
  const subCategories = Array.isArray(subData)
    ? subData
    : subData?.subCategories || [];

  const [createSub] = useCreateSubCategoryMutation();
  const [updateSub] = useUpdateSubCategoryMutation();
  const [deleteSub] = useDeleteSubCategoryMutation();

  const [editing, setEditing] = useState<any>(null);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [filterCategory, setFilterCategory] = useState("all");
  const [searchSubCategory, setSearchSubCategory] = useState("");

  const resetForm = () => {
    setEditing(null);
    setName("");
    setCategoryId("");
  };

  const startEdit = (sub: any) => {
    setEditing(sub);
    setName(sub.name);
    setCategoryId(String(sub.category?._id || sub.category));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) return alert("Please fill all fields");

    try {
      if (editing) {
        await updateSub({
          id: editing._id || editing.id,
          name,
          categoryId,
        }).unwrap();
      } else {
        await createSub({ name, categoryId }).unwrap();
      }
      resetForm();
    } catch (error: any) {
      alert(error?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteSub(id).unwrap();
    } catch (error: any) {
      alert(error?.data?.message || "Delete failed");
    }
  };

  // FILTER + SEARCH
  const filteredSubCategories = useMemo(() => {
    return subCategories.filter((s) => {
      const matchCategory =
        filterCategory === "all" ||
        (s.category?._id || s.category) === filterCategory;

      const matchSearch = s.name
        .toLowerCase()
        .includes(searchSubCategory.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [subCategories, filterCategory, searchSubCategory]);

  // FLATTENED DATA (important fix)
  const tableData = filteredSubCategories.map((s) => ({
    id: s._id || s.id,
    name: s.name,
    categoryName: s.category?.name || s.category,
    ...s, // flatten — now row.original contains the whole object
  }));

  // COLUMNS

  const columns: ColumnDef<any>[] = [
    {
      header: "s.NO",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "Category",
      accessorKey: "categoryName",
    },
    {
      header: "SubCategory",
      accessorKey: "name",
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
            onClick={() => handleDelete(row.original._id || row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];


  return (
    <Card className="bg-white rounded-lg shadow">
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl font-bold">SubCategory Management</CardTitle>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c._id} value={String(c._id)}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="SubCategory Name"
          />

          <Button type="submit">{editing ? "Update" : "Create"}</Button>

          {editing && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </form>
      </CardHeader>

      <CardContent>
        {/* FILTERS */}
        <div className="flex flex-col md:flex-row gap-3 items-center mb-4">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="min-w-[180px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c._id} value={String(c._id)}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Search SubCategory..."
            value={searchSubCategory}
            onChange={(e) => setSearchSubCategory(e.target.value)}
          />
        </div>

        {/* TABLE */}
        {loadingSub ? (
          <p>Loading...</p>
        ) : (
          <TableList data={tableData} columns={columns} showSearchInput={false} showFilter={false} />
        )}
      </CardContent>
    </Card>
  );
}








