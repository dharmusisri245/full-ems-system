import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationProps {
  onLocationSearch: (location: string) => void;
}

const Location: React.FC<LocationProps> = ({ onLocationSearch }) => {
  const [locationInput, setLocationInput] = useState("");

  const handleSearch = () => {
    if (locationInput.trim() !== "") {
      onLocationSearch(locationInput);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#290c29ca] p-4 rounded-md shadow-md">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Label */}
        <label className="text-white text-sm sm:pr-2">Location</label>

        {/* Input with icon and button */}
        <div className="relative flex-grow w-full">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 pr-20 w-full"
            placeholder="Enter your location"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            className="absolute right-1 top-1/2 -translate-y-1/2 h-[calc(100%-4px)] px-4 bg-orange-400 hover:bg-amber-500 rounded"
            onClick={handleSearch}
          >
            <Search className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Location;
