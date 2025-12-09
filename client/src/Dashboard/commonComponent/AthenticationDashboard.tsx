
// import React, { useState, useMemo } from "react";
// import {
//   useGetUsersQuery,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
//   useAdminCreateUserMutation,
// } from "@/api/authApi";

// import TableList from "@/components/common/data-table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import ReactQuill from "@/components/ReactQuill";

// const permissionsList = ["CREATE", "READ", "UPDATE", "DELETE"];

// export default function AuthenticationDashboard() {
//   const { data: users = [], isLoading: loadingUsers } = useGetUsersQuery();
//   const [updateUser] = useUpdateUserMutation();
//   const [deleteUser] = useDeleteUserMutation();
//   const [createUser] = useAdminCreateUserMutation();

//   const [editingUserId, setEditingUserId] = useState<string | null>(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);

//   const [userState, setUserState] = useState<any>({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//     category: "",
//     subCategory: "",
//     permissions: [],
//     address: "",
//   });

//   // ---------- OPEN EDIT ----------
//   const startEdit = (user: any) => {
//     setEditingUserId(user._id);

//     setUserState({
//       name: user.name,
//       email: user.email,
//       password: "", // hidden (NOT sent for update)
//       role: user.role,
//       category: user.category || "",
//       subCategory: user.subCategory || "",
//       permissions: user.permissions || [],
//       address: user.address || "",
//     });

//     setAvatarFile(null);
//     setDialogOpen(true);
//   };

//   // ---------- OPEN CREATE ----------
//   const startCreate = () => {
//     setEditingUserId(null);

//     setUserState({
//       name: "",
//       email: "",
//       password: "",  // visible in create mode
//       role: "",
//       category: "",
//       subCategory: "",
//       permissions: [],
//       address: "",
//     });

//     setAvatarFile(null);
//     setDialogOpen(true);
//   };

//   // ---------- SAVE USER ----------
//   const handleSaveUser = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("name", userState.name);
//       formData.append("email", userState.email);

//       // Only append password on Create
//       if (!editingUserId) formData.append("password", userState.password);

//       formData.append("role", userState.role);
//       formData.append("category", userState.category);
//       formData.append("subCategory", userState.subCategory);
//       formData.append("permissions", JSON.stringify(userState.permissions));
//       formData.append("address", userState.address);

//       if (avatarFile) formData.append("avatar", avatarFile);

//       if (editingUserId) {
//         await updateUser({ id: editingUserId, data: formData }).unwrap();
//       } else {
//         await createUser(formData).unwrap();
//       }

//       setDialogOpen(false);
//       setEditingUserId(null);

//       // Reset Form
//       setUserState({
//         name: "",
//         email: "",
//         password: "",
//         role: "",
//         category: "",
//         subCategory: "",
//         permissions: [],
//         address: "",
//       });

//       setAvatarFile(null);

//     } catch (err: any) {
//       alert(err?.data?.message || "Save failed");
//     }
//   };

//   // ---------- DELETE USER ----------
//   const handleDelete = async (userId: string) => {
//     if (!confirm("Delete this user?")) return;
//     try {
//       await deleteUser(userId).unwrap();
//     } catch (err: any) {
//       alert(err?.data?.message || "Delete failed");
//     }
//   };

//   // ---------- TABLE DATA ----------
//   const tableData = useMemo(() => {
//     return users.map((u: any, idx: number) => ({
//       serial: idx + 1,
//       _id: u._id,
//       name: u.name,
//       email: u.email,
//       role: u.role,
//       categoryName: u.category || "-",
//       subCategoryName: u.subCategory || "-",
//       permissionsText: u.permissions?.length ? u.permissions.join(", ") : "-",
//       created: new Date(u.createdAt).toLocaleDateString(),
//       updated: new Date(u.updatedAt).toLocaleDateString(),
//     }));
//   }, [users]);

//   // ---------- TABLE COLUMNS ----------
//   const columns: any[] = useMemo(
//     () => [
//       { header: "S.No", accessorKey: "serial" },
//       {
//         header: "Name",
//         accessorKey: "name",
//         cell: ({ row }: any) => (
//           <div className="max-w-[150px] whitespace-nowrap overflow-x-scroll hide-scrollbar">
//             {row.original.name}
//           </div>
//         ),
//       },
//       {
//         header: "Email",
//         accessorKey: "email",
//         cell: ({ row }: any) => (
//           <div className="max-w-[150px] whitespace-nowrap overflow-x-scroll hide-scrollbar">
//             {row.original.email}
//           </div>
//         ),
//       },
//       {
//         header: "Role",
//         accessorKey: "role",
//         cell: ({ row }: any) => (
//           <div className="max-w-[150px] whitespace-nowrap overflow-x-scroll hide-scrollbar">
//             {row.original.role}
//           </div>
//         ),
//       },
//       {
//         header: "Category",
//         accessorKey: "category",
//         cell: ({ row }: any) => (
//           <div className="max-w-[150px] whitespace-nowrap overflow-x-scroll hide-scrollbar">
//             {row.original.categoryName}
//           </div>
//         ),
//       },
//       {
//         header: "Sub Category",
//         accessorKey: "subCategoryName",
//         cell: ({ row }: any) => (
//           <div className="max-w-[150px] whitespace-nowrap overflow-x-scroll hide-scrollbar">
//             {row.original.subCategoryName}
//           </div>
//         ),
//       },
//       {
//         header: "Permissions",
//         accessorKey: "permissionsText",
//         cell: ({ row }: any) => (
//           <div className="max-w-[150px] whitespace-nowrap overflow-x-scroll hide-scrollbar">
//             {row.original.permissionsText}
//           </div>
//         ),
//       },

//       // { header: "Email", accessorKey: "email" },
//       // { header: "Role", accessorKey: "role" },

//       // { header: "Category", accessorKey: "categoryName" },
//       // { header: "Sub Category", accessorKey: "subCategoryName" },
//       // { header: "Permissions", accessorKey: "permissionsText" },
//       { header: "Created", accessorKey: "created" },
//       { header: "Updated", accessorKey: "updated" },
//       {
//         header: "Actions",
//         cell: ({ row }: any) => (
//           <div className="flex gap-2">
//             <Button
//               size="sm"
//               onClick={() =>
//                 startEdit(users.find((u) => u._id === row.original._id))
//               }
//             >
//               Edit
//             </Button>
//             <Button
//               size="sm"
//               variant="destructive"
//               onClick={() => handleDelete(row.original._id)}
//             >
//               Delete
//             </Button>
//           </div>
//         ),
//       },
//     ],
//     [users]
//   );

//   return (
//     <div className="p-6 bg-white rounded-lg shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Authentication / User Management</h1>
//         <Button onClick={startCreate}>Create User</Button>
//       </div>

//       <TableList data={tableData} columns={columns} showSearchInput showFilter />

//       {/* ---------- DIALOG ---------- */}
//       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//         <DialogContent className="max-w-3xl w-[90vw] p-6 space-y-4 max-h-[90vh] overflow-auto rounded-xl">
//           <DialogHeader>
//             <DialogTitle>
//               {editingUserId ? "Edit User" : "Create User"}
//             </DialogTitle>
//           </DialogHeader>

//           {/* Name */}
//           <div>
//             <Label>Name</Label>
//             <Input
//               value={userState.name}
//               onChange={(e) =>
//                 setUserState({ ...userState, name: e.target.value })
//               }
//               placeholder="Enter name"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <Label>Email</Label>
//             <Input
//               value={userState.email}
//               onChange={(e) =>
//                 setUserState({ ...userState, email: e.target.value })
//               }
//               placeholder="Enter email"
//               disabled={!!editingUserId} // email cannot be changed on edit
//             />
//           </div>

//           {/* PASSWORD ONLY IN CREATE MODE */}
//           {!editingUserId && (
//             <div>
//               <Label>Password</Label>
//               <Input
//                 value={userState.password}
//                 onChange={(e) =>
//                   setUserState({ ...userState, password: e.target.value })
//                 }
//                 placeholder="Enter Password"
//               />
//             </div>
//           )}

//           {/* Role */}
//           <div>
//             <Label>Role</Label>
//             <Input
//               value={userState.role}
//               onChange={(e) =>
//                 setUserState({ ...userState, role: e.target.value })
//               }
//               placeholder="Enter role"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <Label>Category</Label>
//             <Input
//               value={userState.category}
//               onChange={(e) =>
//                 setUserState({ ...userState, category: e.target.value })
//               }
//               placeholder="Enter category"
//             />
//           </div>

//           {/* SubCategory */}
//           <div>
//             <Label>SubCategory</Label>
//             <Input
//               value={userState.subCategory}
//               onChange={(e) =>
//                 setUserState({ ...userState, subCategory: e.target.value })
//               }
//               placeholder="Enter subcategory"
//             />
//           </div>

//           {/* Permissions */}
//           <div>
//             <Label>Permissions</Label>
//             <div className="flex flex-wrap gap-2 mt-1">
//               {permissionsList.map((p) => (
//                 <div key={p} className="flex items-center gap-1">
//                   <Checkbox
//                     checked={userState.permissions.includes(p)}
//                     onCheckedChange={(checked) => {
//                       if (checked) {
//                         setUserState({
//                           ...userState,
//                           permissions: [...userState.permissions, p],
//                         });
//                       } else {
//                         setUserState({
//                           ...userState,
//                           permissions: userState.permissions.filter((x) => x !== p),
//                         });
//                       }
//                     }}
//                   />
//                   <Label className="text-xs">{p}</Label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Address */}
//           <div>
//             <Label>Address</Label>
//             <ReactQuill
//               value={userState.address}
//               onChange={(val) =>
//                 setUserState({ ...userState, address: val })
//               }
//             />
//           </div>

//           {/* Avatar */}
//           <div>
//             <Label>Avatar</Label>
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setAvatarFile(e.target.files ? e.target.files[0] : null)
//               }
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-2 mt-4">
//             <Button onClick={handleSaveUser}>
//               {editingUserId ? "Save" : "Create"}
//             </Button>
//             <Button variant="outline" onClick={() => setDialogOpen(false)}>
//               Cancel
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }




import React, { useState, useMemo } from "react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAdminCreateUserMutation,
} from "@/api/authApi";

import TableList from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ReactQuill from "@/components/ReactQuill";

const permissionsList = ["CREATE", "READ", "UPDATE", "DELETE"];

export default function AuthenticationDashboard() {
  const { data: users = [], isLoading: loadingUsers } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [createUser] = useAdminCreateUserMutation();

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // ---------------------- ADDED → Row Click Dialog ----------------------
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  // ---------------------------------------------------------------------

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [userState, setUserState] = useState<any>({
    name: "",
    email: "",
    password: "",
    role: "",
    category: "",
    subCategory: "",
    permissions: [],
    address: "",
  });

  // ---------- OPEN EDIT ----------
  const startEdit = (user: any) => {
    setEditingUserId(user._id);

    setUserState({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      category: user.category || "",
      subCategory: user.subCategory || "",
      permissions: user.permissions || [],
      address: user.address || "",
    });

    setAvatarFile(null);
    setDialogOpen(true);
  };

  // ---------- OPEN CREATE ----------
  const startCreate = () => {
    setEditingUserId(null);

    setUserState({
      name: "",
      email: "",
      password: "",
      role: "",
      category: "",
      subCategory: "",
      permissions: [],
      address: "",
    });

    setAvatarFile(null);
    setDialogOpen(true);
  };

  // ---------- SAVE USER ----------
  const handleSaveUser = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userState.name);
      formData.append("email", userState.email);

      if (!editingUserId) formData.append("password", userState.password);

      formData.append("role", userState.role);
      formData.append("category", userState.category);
      formData.append("subCategory", userState.subCategory);
      formData.append("permissions", JSON.stringify(userState.permissions));
      formData.append("address", userState.address);

      if (avatarFile) formData.append("avatar", avatarFile);

      if (editingUserId) {
        await updateUser({ id: editingUserId, data: formData }).unwrap();
      } else {
        await createUser(formData).unwrap();
      }

      setDialogOpen(false);
      setEditingUserId(null);

      setUserState({
        name: "",
        email: "",
        password: "",
        role: "",
        category: "",
        subCategory: "",
        permissions: [],
        address: "",
      });

      setAvatarFile(null);
    } catch (err: any) {
      alert(err?.data?.message || "Save failed");
    }
  };

  // ---------- DELETE USER ----------
  const handleDelete = async (userId: string) => {
    if (!confirm("Delete this user?")) return;
    try {
      await deleteUser(userId).unwrap();
    } catch (err: any) {
      alert(err?.data?.message || "Delete failed");
    }
  };

  // ---------- TABLE DATA ----------
  const tableData = useMemo(() => {
    return users.map((u: any, idx: number) => ({
      serial: idx + 1,
      _id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      categoryName: u.category || "-",
      subCategoryName: u.subCategory || "-",
      permissionsText: u.permissions?.length ? u.permissions.join(", ") : "-",
      avatar: u.avatar,
      address: u.address,
      category: u.category,
      subCategory: u.subCategory,
      permissions: u.permissions,
      created: new Date(u.createdAt).toLocaleDateString(),
      updated: new Date(u.updatedAt).toLocaleDateString(),
    }));
  }, [users]);

  // ---------- TABLE COLUMNS ----------
  const columns: any[] = useMemo(
    () => [
      { header: "S.No", accessorKey: "serial" },

      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }: any) => (
          <div className="max-w-[150px] whitespace-nowrap overflow-x-scroll hide-scrollbar">
            {row.original.name}
          </div>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: ({ row }: any) => (
          <div className="max-w-[150px] whitespace-nowrap overflow-x-scroll hide-scrollbar">
            {row.original.email}
          </div>
        ),
      },

      { header: "Role", accessorKey: "role" },
      { header: "Category", accessorKey: "categoryName" },
      { header: "SubCategory", accessorKey: "subCategoryName" },
      { header: "Permissions", accessorKey: "permissionsText" },

      { header: "Created", accessorKey: "created" },
      { header: "Updated", accessorKey: "updated" },

      // {
      //   header: "Actions",
      //   cell: ({ row }: any) => (
      //     <div className="flex gap-2">
      //       <Button size="sm" onClick={() => startEdit(users.find((u) => u._id === row.original._id))}>
      //         Edit
      //       </Button>

      //       <Button
      //         size="sm"
      //         variant="destructive"
      //         onClick={() => handleDelete(row.original._id)}
      //       >
      //         Delete
      //       </Button>
      //     </div>
      //   ),
      // },
      {
        header: "Actions",
        cell: ({ row }: any) => (
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // 🚫 block row click
                startEdit(users.find((u) => u._id === row.original._id));
              }}
            >
              Edit
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation(); //  block row click
                handleDelete(row.original._id);
              }}
            >
              Delete
            </Button>
          </div>
        ),
      }

    ],
    [users]
  );

  // ---------------------- ADDED → Row Click Function ----------------------
  const handleRowClick = (rowData: any) => {
    setSelectedRowData(rowData);
    setViewDialogOpen(true);
  };
  // -----------------------------------------------------------------------

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Authentication / User Management</h1>
        <Button onClick={startCreate}>Create User</Button>
      </div>

      {/* Table */}
      <TableList
        data={tableData}
        columns={columns}
        showSearchInput
        showFilter
        onRowClick={handleRowClick} // ← ADDED
      />

      {/* ===================== MAIN USER EDIT/CREATE DIALOG ===================== */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl w-[90vw] p-6 space-y-4 max-h-[90vh] overflow-auto rounded-xl">
          <DialogHeader>
            <DialogTitle>{editingUserId ? "Edit User" : "Create User"}</DialogTitle>
          </DialogHeader>

          {/* FORM FIELDS */}
          <div>
            <Label>Name</Label>
            <Input value={userState.name} onChange={(e) => setUserState({ ...userState, name: e.target.value })} />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              value={userState.email}
              onChange={(e) => setUserState({ ...userState, email: e.target.value })}
              disabled={!!editingUserId}
            />
          </div>

          {!editingUserId && (
            <div>
              <Label>Password</Label>
              <Input
                value={userState.password}
                onChange={(e) => setUserState({ ...userState, password: e.target.value })}
              />
            </div>
          )}

          <div>
            <Label>Role</Label>
            <Input
              value={userState.role}
              onChange={(e) => setUserState({ ...userState, role: e.target.value })}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Input
              value={userState.category}
              onChange={(e) => setUserState({ ...userState, category: e.target.value })}
            />
          </div>

          <div>
            <Label>SubCategory</Label>
            <Input
              value={userState.subCategory}
              onChange={(e) => setUserState({ ...userState, subCategory: e.target.value })}
            />
          </div>

          <div>
            <Label>Permissions</Label>

            <div className="flex gap-2 flex-wrap">
              {permissionsList.map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <Checkbox
                    checked={userState.permissions.includes(p)}
                    onCheckedChange={(checked) =>
                      setUserState({
                        ...userState,
                        permissions: checked
                          ? [...userState.permissions, p]
                          : userState.permissions.filter((x) => x !== p),
                      })
                    }
                  />
                  <Label>{p}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Address</Label>

            <ReactQuill
              value={userState.address}
              onChange={(val) => setUserState({ ...userState, address: val })}
            />
          </div>

          <div>
            <Label>Avatar</Label>
            <Input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} />
          </div>

          <div className="flex justify-end gap-2">
            <Button onClick={handleSaveUser}>{editingUserId ? "Save" : "Create"}</Button>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===================== NEW ROW DETAILS DIALOG ===================== */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent
          className="
      max-w-xl p-6 space-y-6 rounded-xl bg-white shadow-lg
      transform transition-all duration-300 scale-95 opacity-0
      animate-dialog-in overflow-y-auto max-h-[90vh]
    "
        >
          {/* Header */}
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">User Details</DialogTitle>
            <p className="text-lg font-semibold text-gray-500 mt-1">
              Welcome to User Management Dashboard
            </p>
          </DialogHeader>

          {selectedRowData && (
            <div className="space-y-6">
              {/* Avatar */}
              {selectedRowData.avatar && (
                <div className="flex justify-center">
                  <img
                    src={selectedRowData.avatar}
                    className="w-28 h-28 rounded-full border-2 border-blue-300 shadow-md transition-transform duration-300 hover:scale-105"
                    alt="Avatar"
                  />
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                {[
                  ["Name", selectedRowData.name],
                  ["Email", selectedRowData.email],
                  ["Role", selectedRowData.role],
                  ["Category", selectedRowData.categoryName],
                  ["SubCategory", selectedRowData.subCategoryName],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="p-3 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-200 transition-colors duration-300"
                  >
                    <p className="text-xm text-gray-500">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}

                <div className="p-3 bg-blue-50 rounded-lg shadow-sm col-span-1 sm:col-span-2 hover:bg-blue-200 transition-colors duration-300">
                  <p className="text-m text-gray-400">Permissions</p>
                  <p className="font-medium">{selectedRowData.permissionsText}</p>
                </div>
              </div>

              {/* Address */}
              {selectedRowData.address && (
                <div className="p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-300 max-h-40 overflow-y-auto">
                  <p className="text-xs text-gray-400">Address</p>
                  <div
                    className="mt-1 text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: selectedRowData.address }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Close Button */}
          <Button
            className="w-full mt-4 bg-black text-white hover:bg-gray-800 transition-colors duration-300"
            onClick={() => setViewDialogOpen(false)}
          >
            Close
          </Button>
        </DialogContent>

        {/* Dialog Animation */}
        <style>
          {`
      @keyframes dialog-in {
        0% { opacity: 0; transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1); }
      }
      .animate-dialog-in {
        animation: dialog-in 0.25s ease-out forwards;
      }
    `}
        </style>
      </Dialog>


    </div>
  );
}