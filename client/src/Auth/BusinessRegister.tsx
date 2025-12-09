"use client";
import React, { useState, useEffect } from "react";

// API HOOKS
import { useGetCategoriesQuery } from "@/api/categoryApi";
import { useGetSubCategoriesQuery } from "@/api/subCategoryApi";
import { useGetUsersQuery } from "@/api/authApi";

// UI
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Upload } from "lucide-react";
import { getCurrentUser } from "@/api/AxiosInstace";
import { Button } from "@/components/ui/button";

// ShadCN Layout Components
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const BusinessRegister = () => {
  const { data: catData } = useGetCategoriesQuery();
  const { data: subData } = useGetSubCategoriesQuery();

  const categories = Array.isArray(catData)
    ? catData
    : catData?.categories || [];

  const subCategories = Array.isArray(subData)
    ? subData
    : subData?.subCategories || [];

  const storedUser = getCurrentUser();
  const { data: userData } = useGetUsersQuery();
  const activeUser = userData?.user || storedUser || { name: "", email: "" };

  const [form, setForm] = useState({
    name: activeUser.name,
    email: activeUser.email,
    category: "",
    subCategory: "",
    address: "",
    latitude: "",
    longitude: "",
    imageFile: null,
    pdfFile: null,
    videoFile: null,
  });

  const [addressQuery, setAddressQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [liveLocation, setLiveLocation] = useState("");

  // LIVE LOCATION
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        if (form.address) return;

        const { latitude, longitude } = pos.coords;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await res.json();
        setLiveLocation(data.display_name || `Lat: ${latitude}, Lon: ${longitude}`);
      },
      () => console.log("Live location denied"),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [form.address]);

  // ADDRESS AUTOCOMPLETE
  useEffect(() => {
    if (!addressQuery || addressQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoadingAddress(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${addressQuery}&addressdetails=1&limit=5`
      );

      const data = await res.json();
      setSuggestions(data);
      setLoadingAddress(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [addressQuery]);

  const handleSubmit = () => {
    console.log(form);
    alert("Business Registered Successfully!");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-12 px-4 flex justify-center">
      <div className="w-full max-w-8xl space-y-10">

        {/* MAIN TITLE CARD */}
        <Card className="shadow-md transition-all duration-500 hover:shadow-xl hover:scale-[1.02] animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-black-700 text-center">
              Business Registration
            </CardTitle>
            <CardDescription className="text-center text-xl font-medium">
              Fill the form below to register your business.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* PERSONAL DETAILS */}
        <Card className="shadow-md transition-all duration-500 hover:shadow-xl hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-100">
          <CardHeader>
            <CardTitle className="text-2xl">Personal Details</CardTitle>
            <CardDescription>Your personal profile information</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">

              <div>
                <Label className="pb-2">Your Name</Label>
                <Input value={form.name} readOnly className="bg-muted transition-all duration-300 focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <Label className="pb-2" >Your Email</Label>
                <Input value={form.email} readOnly className="bg-muted transition-all duration-300 focus:ring-2 focus:ring-blue-500" />
              </div>

            </div>
          </CardContent>
        </Card>

        {/* BUSINESS DETAILS */}
        <Card className="shadow-md transition-all duration-500 hover:shadow-xl hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
          <CardHeader>
            <CardTitle >Business Details</CardTitle>
            <CardDescription>Select your business type</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* CATEGORY */}
              <div>
                <Label className="pb-2">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm({ ...form, category: v, subCategory: "" })
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* SUB-CATEGORY */}
              <div>
                <Label className="pb-2">SubCategory</Label>
                <Select
                  value={form.subCategory}
                  onValueChange={(v) =>
                    setForm({ ...form, subCategory: v })
                  }
                >
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select SubCategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories
                      .filter((s) => s.category?._id === form.category)
                      .map((s) => (
                        <SelectItem key={s._id} value={s._id}>
                          {s.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* LOCATION */}
        <Card className="shadow-md transition-all duration-500 hover:shadow-xl hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
          <CardHeader>
            <CardTitle>Business Location</CardTitle>
            <CardDescription>Search or auto-detect your location</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="relative">
              <Label className="pb-2">Search Address</Label>
              <Input
                placeholder="Search your location..."
                value={addressQuery}
                onChange={(e) => {
                  setAddressQuery(e.target.value);
                  setForm({ ...form, address: e.target.value });
                  if (liveLocation) setLiveLocation("");
                }}
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />

              {!form.address && liveLocation && (
                <p
                  className="mt-1 text-blue-600 text-sm cursor-pointer hover:underline transition-all duration-300 hover:text-blue-800"
                  onClick={() => {
                    setForm({ ...form, address: liveLocation });
                    setAddressQuery(liveLocation);
                    setLiveLocation("");
                  }}
                >
                  📍 Use Current Location: {liveLocation}
                </p>
              )}

              {suggestions.length > 0 && (
                <div className="absolute bg-white border rounded-md shadow-lg mt-1 w-full z-30 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                  {loadingAddress && (
                    <p className="p-2 text-sm text-gray-500">Loading...</p>
                  )}

                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setForm({
                          ...form,
                          address: item.display_name,
                          latitude: item.lat,
                          longitude: item.lon,
                        });
                        setAddressQuery(item.display_name);
                        setSuggestions([]);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm transition-colors duration-200"
                    >
                      {item.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* FILE UPLOAD – STATIC ICONS */}
        <Card className="shadow-md transition-all duration-500 hover:shadow-xl hover:scale-[1.02] animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>Upload image, video or pdf documents</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* IMAGE UPLOAD */}
              <label className="border p-6 rounded-xl flex flex-col items-center cursor-pointer hover:bg-blue-50 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                <Upload className="h-10 w-10 text-gray-600 transition-colors duration-300 group-hover:text-blue-600" />
                <p className="mt-2 text-sm transition-colors duration-300 group-hover:text-blue-600">Upload Image</p>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setForm({ ...form, imageFile: e.target.files[0] })
                  }
                />

                {form.imageFile && (
                  <img
                    src={URL.createObjectURL(form.imageFile)}
                    className="mt-3 h-24 rounded-md shadow animate-in zoom-in-50 duration-300"
                    alt="preview"
                  />
                )}
              </label>

              {/* PDF UPLOAD */}
              <label className="border p-6 rounded-xl flex flex-col items-center cursor-pointer hover:bg-blue-50 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                <Upload className="h-10 w-10 text-gray-600 transition-colors duration-300 group-hover:text-blue-600" />
                <p className="mt-2 text-sm transition-colors duration-300 group-hover:text-blue-600">Upload PDF</p>

                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) =>
                    setForm({ ...form, pdfFile: e.target.files[0] })
                  }
                />

                {form.pdfFile && (
                  <p className="mt-3 text-xs text-green-600 animate-in fade-in-0 duration-300">
                    ✔ {form.pdfFile.name}
                  </p>
                )}
              </label>

              {/* VIDEO UPLOAD */}
              <label className="border p-6 rounded-xl flex flex-col items-center cursor-pointer hover:bg-blue-50 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                <Upload className="h-10 w-10 text-gray-600 transition-colors duration-300 group-hover:text-blue-600" />
                <p className="mt-2 text-sm transition-colors duration-300 group-hover:text-blue-600">Upload Video</p>

                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) =>
                    setForm({ ...form, videoFile: e.target.files[0] })
                  }
                />

                {form.videoFile && (
                  <p className="mt-3 text-xs text-green-600 animate-in fade-in-0 duration-300">
                    ✔ {form.videoFile.name}
                  </p>
                )}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* SUBMIT */}
        <Button
          className="w-full py-3 bg-black text-white rounded-md font-semibold shadow-md transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-700"
          onClick={handleSubmit}
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
};

export default BusinessRegister;
