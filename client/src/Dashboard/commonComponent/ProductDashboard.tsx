import React, { useState, useMemo } from "react";

// API HOOKS
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/api/productApi";
import { useGetCategoriesQuery } from "@/api/categoryApi";
import { useGetSubCategoriesQuery } from "@/api/subCategoryApi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { ChevronDown, ChevronUp } from "lucide-react";
import TableList from "@/components/common/data-table";
import ReactQuill from "@/components/ReactQuill";

function TableImageCarousel({ images }: { images: { url: string }[] }) {
  if (!images || images.length === 0) {
    return <span className="text-gray-400">No Image</span>;
  }

  return (
    <div className="w-12 h-12 overflow-hidden">
      <img
        src={images[0].url}
        alt="product"
        className="w-12 h-12 object-cover rounded border"
      />
    </div>
  );
}

export default function ProductDashboard(): JSX.Element {
  const { data: productData } = useGetProductsQuery();
  const { data: catData } = useGetCategoriesQuery();
  const { data: subData } = useGetSubCategoriesQuery();

  const categories = Array.isArray(catData) ? catData : catData?.categories || [];
  const subCategories = Array.isArray(subData)
    ? subData
    : subData?.subCategories || [];

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // -------------------- Add/Edit Dialog States --------------------
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    bookingPrice: "",
    available: true,
    uploadType: "",
    pdfFile: null,
    images: [],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const resetForm = () => {
    setEditId(null);
    setForm({
      title: "",
      description: "",
      category: "",
      subCategory: "",
      bookingPrice: "",
      available: true,
      uploadType: "",
      pdfFile: null,
      images: [],
    });
    setImageFiles([]);
  };

  // -------------------- View Product Dialog States --------------------
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewProduct, setViewProduct] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // -------------------- Filters & Search --------------------
  const [globalSearch, setGlobalSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("1000000");
  const [appliedMin, setAppliedMin] = useState("0");
  const [appliedMax, setAppliedMax] = useState("1000000");

  const applyFilter = () => {
    setAppliedMin(minPrice);
    setAppliedMax(maxPrice);
  };


  // -------------------- Table Data --------------------
const tableData = useMemo(() => {
  if (!productData) return [];

  // STEP 1: Create Count Map
  const productCountMap: Record<string, number> = {};

  productData.products?.forEach((p: any) => {
    const key = `${p.category?._id}-${p.subCategory?._id}`;
    productCountMap[key] = (productCountMap[key] || 0) + 1;
  });

  // STEP 2: Build table rows
  return productData.products?.map((p: any) => {
    const key = `${p.category?._id}-${p.subCategory?._id}`;

    return {
      id: p._id,
      categoryName: p.category?.name || "-",
      subCategoryName: p.subCategory?.name || "-",
      title: p.title,
      description: p.description,
      price: Number(p.bookingPrice),
      available: p.available,
      images: p.images || [],
      pdfFile: p.pdfFile || null,
      count: productCountMap[key] || 0, // ✅ Correct
      raw: p,
    };
  });
}, [productData]);


  const filteredProducts = useMemo(() => {
    return tableData.filter((p) => {
      const text = globalSearch.toLowerCase();
      const priceNum = Number(p.price);

      const matchesSearch =
        p.title.toLowerCase().includes(text) ||
        p.categoryName.toLowerCase().includes(text) ||
        p.subCategoryName.toLowerCase().includes(text) ||
        String(p.price).includes(text);

      const matchesPrice =
        priceNum >= Number(appliedMin) && priceNum <= Number(appliedMax);

      return matchesSearch && matchesPrice;
    });
  }, [tableData, globalSearch, appliedMin, appliedMax]);

  // -------------------- Add/Edit Functions --------------------
  
  const startEdit = (item: any) => {
    setEditId(item.raw._id);
    setForm({
      title: item.raw.title,
      description: item.raw.description,
      category: item.raw.category?._id,
      subCategory: item.raw.subCategory?._id,
      bookingPrice: item.raw.bookingPrice,
      available: item.raw.available,
      uploadType: item.raw.images?.length ? "image" : item.raw.pdfFile ? "pdf" : "",
      images: item.raw.images || [],
      pdfFile: item.raw.pdfFile || null,
    });
    setImageFiles(item.raw.images || []);
    setShowModal(true); // only here, not in row click
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this product?")) {
      await deleteProduct(id);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!form.title || !form.bookingPrice || !form.category || !form.subCategory) {
        alert("Please fill Title, Price, Category and Subcategory.");
        return;
      }

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description ?? "");
      fd.append("bookingPrice", form.bookingPrice);
      fd.append("available", String(form.available));
      fd.append("categoryId", form.category);
      fd.append("subCategoryId", form.subCategory);

      if (form.uploadType === "image") {
        // Append new files
        imageFiles.forEach((file) => fd.append("images", file));

        // Append existing images for update
        if (editId && form.images?.length > 0) {
          fd.append("existingImages", JSON.stringify(form.images));
        }
      } else if (form.uploadType === "pdf") {
        if (form.pdfFile instanceof File) {
          fd.append("pdfFile", form.pdfFile);
        }
      }

      if (editId) {
        await updateProduct({ id: editId, data: fd }).unwrap();
      } else {
        await createProduct(fd).unwrap();
      }

      setShowModal(false);
      resetForm();
    } catch (err: any) {
      const msg = err?.data?.message || err?.error || err?.message || "Something went wrong";
      alert("Error: " + msg);
    }
  };

  // -------------------- View Product --------------------
  const handleRowClick = (product: any) => {
    if (!product) return;

    const fullProduct = product.raw ? product.raw : product;
    const normalizedImages =
      fullProduct.images && fullProduct.images.length > 0
        ? fullProduct.images
        : fullProduct.imageUrl
          ? [{ url: fullProduct.imageUrl }]
          : [];

    setViewProduct({
      ...fullProduct,
      categoryName: fullProduct.category?.name || "-",
      subCategoryName: fullProduct.subCategory?.name || "-",
      price: Number(fullProduct.bookingPrice),
      available: fullProduct.available ?? true,
      images: normalizedImages,
      pdfFile: fullProduct.pdfFile || null,
      description: fullProduct.description || "",
    });

    setCurrentImageIndex(0);
    setShowViewDialog(true);
  };

  // -------------------- Table Columns --------------------
  const columns = [
    { header: "S.No", cell: ({ row }: any) => row.index + 1 },
    { header: "Category", accessorKey: "categoryName" },
    { header: "SubCategory", accessorKey: "subCategoryName" },
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }: any) => (
        <div className="max-w-[150px] whitespace-nowrap overflow-x-scroll hide-scrollbar">
          {row.original.title}
        </div>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }: any) => (
        <div
          className="max-w-[200px] whitespace-nowrap overflow-x-scroll hide-scrollbar"
          dangerouslySetInnerHTML={{ __html: row.original.description }}
        />
      ),
    },
    { header: "Price", accessorKey: "price" },
    {
      header: "Available",
      accessorKey: "available",
      cell: ({ row }: any) => (row.original.available ? "Yes" : "No"),
    },
    {
      header: "Files",
      accessorKey: "images",
      cell: ({ row }: any) => {
        const { images, pdfFile } = row.original;
        if (images?.length) return <TableImageCarousel images={images} />;
        if (pdfFile) return <span>{pdfFile.name}</span>;
        return <span className="text-gray-400">No File</span>;
      },
    },
    // {
    //   header: "Actions",
    //   cell: ({ row }: any) => (
    //     <div className="flex gap-2">
    //       <Button size="sm" variant="outline" onClick={() => startEdit(row.original)}>
    //         Edit
    //       </Button>
    //       <Button size="sm" variant="destructive" onClick={() => handleDelete(row.original.id)}>
    //         Delete
    //       </Button>
    //     </div>
    //   ),
    // },

    {
      header: "Count",
      accessorKey: "count",
      cell: ({ row }: any) => (
        <span className="font-semibold">{row.original.count}</span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation(); // <-- prevent row click
              startEdit(row.original);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation(); // <-- prevent row click
              handleDelete(row.original.id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    }

  ];

  // -------------------- JSX Return --------------------
  return (
    <div className="p-5">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-semibold">Product Dashboard</h2>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Add Product
        </Button>
      </div>

      <Input
        placeholder="Search product, category, subcategory, price..."
        value={globalSearch}
        onChange={(e) => setGlobalSearch(e.target.value)}
        className="mb-3 w-1/3"
      />

      <div className="border rounded-lg p-3 bg-gray-50 mb-5">
        <button
          className="flex items-center gap-2 text-black font-semibold"
          onClick={() => setShowFilters(!showFilters)}
        >
          Advanced Filters {showFilters ? <ChevronUp /> : <ChevronDown />}
        </button>
        {showFilters && (
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              placeholder="Min Price"
              value={minPrice}
              type="number"
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              placeholder="Max Price"
              value={maxPrice}
              type="number"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <Button onClick={applyFilter}>Apply Filter</Button>
          </div>
        )}
      </div>
      <TableList
        data={filteredProducts}
        columns={columns}
        enableColumnToggle
        onRowClick={(row) => handleRowClick(row)}
      />

      {/* -------------------- Add/Edit Product Dialog -------------------- */}
      {/* -------------------- Add/Edit Product Dialog -------------------- */}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="w-[90vw] max-w-[1200px] p-0 overflow-hidden rounded-xl shadow-xl border">
          <div className="p-6 border-b bg-muted/40">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold tracking-tight">
                {editId ? "Edit Product" : "Add Product"}
              </DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="col-span-2">
                <Label>Product Title</Label>
                <Input
                  placeholder="Enter product title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <Label>Description</Label>
                <div className="border rounded-md overflow-hidden">
                  <ReactQuill
                    value={form.description}
                    onChange={(value) => setForm({ ...form, description: value })}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(val) => setForm({ ...form, category: val })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat: any) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategory */}
              <div>
                <Label>Subcategory</Label>
                <Select
                  value={form.subCategory}
                  onValueChange={(val) => setForm({ ...form, subCategory: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories
                      .filter((s: any) => s.category?._id === form.category)
                      .map((s: any) => (
                        <SelectItem key={s._id} value={s._id}>
                          {s.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={form.bookingPrice}
                  onChange={(e) =>
                    setForm({ ...form, bookingPrice: e.target.value })
                  }
                />
              </div>

              {/* Available */}
              <div>
                <Label>Available</Label>
                <select
                  value={form.available ? "true" : "false"}
                  onChange={(e) =>
                    setForm({ ...form, available: e.target.value === "true" })
                  }
                  className="border rounded-md h-10 px-3 w-full"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* Upload Type */}
              <div className="col-span-2 mt-4">
                <Label>Upload</Label>
                <Select
                  value={form.uploadType || ""}
                  onValueChange={(val) => {
                    setForm({ ...form, uploadType: val, pdfFile: null, images: [] });
                    setImageFiles([]);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select File Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>

                {/* Image Upload + Preview */}
                {form.uploadType === "image" && (
                  <div className="mt-2">
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        setImageFiles((prev) => [...prev, ...files]);
                      }}
                    />

                    {(form.images.length > 0 || imageFiles.length > 0) && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {/* Existing Images */}
                        {form.images.map((img: any, idx: number) => (
                          <div key={`existing-${idx}`} className="relative">
                            <img
                              src={img.url}
                              alt={`existing-${idx}`}
                              className="w-20 h-20 object-cover rounded border"
                            />
                            <button
                              type="button"
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-600"
                              onClick={() => {
                                const newImgs = form.images.filter((_, i) => i !== idx);
                                setForm({ ...form, images: newImgs });
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}

                        {/* Newly Uploaded Files */}
                        {imageFiles.map((file, idx) => (
                          <div key={`new-${idx}`} className="relative">
                            <img
                              src={file instanceof File ? URL.createObjectURL(file) : ""}
                              alt={file.name}
                              className="w-20 h-20 object-cover rounded border"
                            />
                            <button
                              type="button"
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-600"
                              onClick={() => {
                                setImageFiles((prev) => prev.filter((_, i) => i !== idx));
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* PDF Upload + Preview */}
                {form.uploadType === "pdf" && form.pdfFile && (
                  <div className="mt-2 relative inline-block">
                    <span className="mr-6">{form.pdfFile.name}</span>
                    <button
                      type="button"
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-600"
                      onClick={() => setForm({ ...form, pdfFile: null })}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          Dialog Actions
          <div className="p-4 border-t bg-muted/20 flex justify-end gap-3 sticky bottom-0">
            <Button
              variant="outline"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editId ? "Update Product" : "Save Product"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* -------------------- View Product Dialog -------------------- */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="w-[90vw] max-w-[800px] p-6 overflow-hidden rounded-xl shadow-xl border">
          {viewProduct && (
            <>
              <div className="flex justify-between items-center mb-4">
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  {viewProduct.title}
                </DialogTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowViewDialog(false)}
                >
                  Close
                </Button>
              </div>

              {/* ---------- IMAGE SECTION ---------- */}
              {viewProduct.images?.length > 0 ? (
                <div className="relative w-full h-64 mb-4 flex items-center justify-center">

                  {/* Image */}
                  <img
                    src={viewProduct.images[currentImageIndex].url}
                    alt="product"
                    className="object-cover w-full h-full rounded"
                  />

                  {/* Amazon-style image count overlay */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-md text-xs">
                    {currentImageIndex + 1} / {viewProduct.images.length}
                  </div>

                  {/* Navigation buttons */}
                  {viewProduct.images.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
                        onClick={() =>
                          setCurrentImageIndex(
                            (currentImageIndex - 1 + viewProduct.images.length) %
                            viewProduct.images.length
                          )
                        }
                      >
                        &lt;
                      </button>

                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
                        onClick={() =>
                          setCurrentImageIndex(
                            (currentImageIndex + 1) % viewProduct.images.length
                          )
                        }
                      >
                        &gt;
                      </button>
                    </>
                  )}
                </div>
              ) : viewProduct.pdfFile ? (
                <div className="mb-4">
                  <span>PDF File: {viewProduct.pdfFile.name}</span>
                </div>
              ) : (
                <span className="text-gray-400 mb-4">No Files</span>
              )}

              {/* ---------- PRODUCT DETAILS ---------- */}
              <div className="space-y-2">
                <div>
                  <strong>Category:</strong> {viewProduct.categoryName}
                </div>

                <div>
                  <strong>SubCategory:</strong> {viewProduct.subCategoryName}
                </div>

                <div>
                  <strong>Price:</strong> ${viewProduct.price}
                </div>

                <div>
                  <strong>Available:</strong> {viewProduct.available ? "Yes" : "No"}
                </div>

                <div>
                  <strong>Description:</strong>
                  <div
                    className="border rounded p-2 mt-1"
                    dangerouslySetInnerHTML={{ __html: viewProduct.description }}
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}



















