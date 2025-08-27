import { memo, useCallback } from "react";
import { Search, MapPin, Home } from "lucide-react";

import { Input, Select } from "@/components/ui";

export const ActionBar = memo(function ActionBar({
  searchProperty,
  setSearchProperty,
  uniqueLocations,
  uniqueTypes,
  selectedLocation,
  setSelectedLocation,
  selectedType,
  setSelectedType,
}: {
  searchProperty: string;
  setSearchProperty: (searchProperty: string) => void;
  uniqueLocations: string[];
  uniqueTypes: { value: string; label: string }[];
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}) {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchProperty(e.target.value);
    },
    [setSearchProperty]
  );

  const handleLocationChange = useCallback(
    (location: string) => {
      setSelectedLocation(location);
    },
    [setSelectedLocation]
  );

  const handleTypeChange = useCallback(
    (type: string) => {
      setSelectedType(type);
    },
    [setSelectedType]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full md:w-auto">
      <Input
        placeholder="Search properties..."
        startIcon={<Search className="h-4 w-4" />}
        value={searchProperty}
        onChange={handleSearchChange}
      />

      {/* <div className="flex flex-col md:flex-row gap-1 w-full md:w-auto"> */}
      <Select
        placeholder="All Locations"
        startIcon={<MapPin className="h-4 w-4" />}
        ariaLabel="Filter properties by location"
        options={[
          { value: "", label: "All Locations" },
          ...uniqueLocations.map((location) => ({
            value: location,
            label: location,
          })),
        ]}
        value={selectedLocation}
        onChange={handleLocationChange}
      />

      <Select
        placeholder="All Types"
        startIcon={<Home className="h-4 w-4" />}
        ariaLabel="Filter properties by type"
        options={[{ value: "", label: "All Types" }, ...uniqueTypes]}
        value={selectedType}
        onChange={handleTypeChange}
      />
      {/* </div> */}
    </div>
  );
});
