import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import CategoryDashboard from "../commonComponent/CategoryDashboard";
import SubCategoryDashboard from "../commonComponent/SubCategoryDashboard";
import ProductDashboard from "../commonComponent/ProductDashboard";
import { FaUserCircle, FaFolder, FaTags, FaBox } from "react-icons/fa";
import AuthenticationDashboard from "../commonComponent/AthenticationDashboard";
import { getCurrentUser } from "@/api/AxiosInstace";

const UserManagment = () => {
    const [activeTab, setActiveTab] = useState<"categories" | "subcategories" | "products">("categories");

    // Logged-in user from localStorage
    //   const user = JSON.parse(localStorage.getItem("user") || "null");
      //get data from memory we have create a function inside axios instance
    const user = getCurrentUser()
    return (
        <div className="p-6 space-y-6">

            {/* TOP BAR */}
            <Card className="bg-white shadow-md rounded-lg">
                <CardContent className="flex items-center justify-between">
                    {/* Left: Dashboard Title */}
                    <h1 className="text-3xl font-bold text-gray-900">User Management Dashboard</h1>
                    {/* Right: User Info */}
                    {user && (
                        <div className="flex items-center gap-3">
                            <FaUserCircle className="text-4xl text-black" />
                            <div className="text-right">
                                {/* <p className="text-sm text-gray-500">Welcome</p>
                 */}
                                <h2 className="text-lg font-semibold text-black-600">{user.name}</h2>
                                {/* <p className="text-lg text-gray-400">{user.role}</p> */}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* TABS */}
            <Card className="bg-white shadow-md rounded-lg">
                <CardContent className="flex gap-3">
                    <Button
                        size="sm"
                        variant={activeTab === "categories" ? "default" : "outline"}
                        onClick={() => setActiveTab("categories")}
                        className="flex items-center gap-2"
                    >
                        <FaFolder /> All Users
                    </Button>

                    <Button
                        size="sm"
                        variant={activeTab === "subcategories" ? "default" : "outline"}
                        onClick={() => setActiveTab("subcategories")}
                        className="flex items-center gap-2"
                    >
                        <FaTags /> Permission
                    </Button>

                    <Button
                        size="sm"
                        variant={activeTab === "products" ? "default" : "outline"}
                        onClick={() => setActiveTab("products")}
                        className="flex items-center gap-2"
                    >
                        <FaBox /> Products
                    </Button>
                </CardContent>
            </Card>

            {/* DASHBOARD CONTENT */}
            <Card className="bg-white shadow-lg rounded-lg">
                <CardContent>
                    {activeTab === "categories" && <AuthenticationDashboard />}
                    {activeTab === "subcategories" && <SubCategoryDashboard />}
                    {activeTab === "products" && <ProductDashboard />}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserManagment;
