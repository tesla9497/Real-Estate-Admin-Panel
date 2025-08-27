"use client";
import { useState, useMemo, useCallback } from "react";
import { CheckCircle, DollarSign, Home, Plus } from "lucide-react";

import { SummaryCard } from "@/components/custom/common";
import { MainLayout } from "@/components/layout/main-layout";
import {
  PropertiesTable,
  AddPropertyForm,
} from "@/components/custom/properties";
import { ActionBar } from "@/components/custom/properties/action-bar";
import { Button, Modal } from "@/components/ui";
import { useDebounce } from "@/hooks";

import propertiesData from "@/data/properties.json";
import { Property } from "@/types/property";

export default function PropertiesPage() {
  const [searchProperty, setSearchProperty] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const debouncedSearchProperty = useDebounce(searchProperty, 300);

  const {
    totalProperties,
    availableProperties,
    soldProperties,
    totalRevenue,
    uniqueLocations,
    uniqueTypes,
  } = useMemo(() => {
    const total = propertiesData.length;
    const available = propertiesData.filter(
      (p) => p.status === "Available"
    ).length;
    const sold = propertiesData.filter((p) => p.status === "Sold").length;
    const revenue = propertiesData
      .filter((p) => p.status === "Sold")
      .reduce((sum, p) => sum + p.price, 0);

    const locations = [...new Set(propertiesData.map((p) => p.location))];
    const types = [...new Set(propertiesData.map((p) => p.type))].map(
      (type) => ({
        value: type,
        label: type,
      })
    );

    return {
      totalProperties: total,
      availableProperties: available,
      soldProperties: sold,
      totalRevenue: revenue,
      uniqueLocations: locations,
      uniqueTypes: types,
    };
  }, []);

  const filteredProperties = useMemo(() => {
    return propertiesData.filter((p) => {
      const matchesSearch =
        !debouncedSearchProperty ||
        p.name.toLowerCase().includes(debouncedSearchProperty.toLowerCase());
      const matchesLocation =
        !selectedLocation || p.location === selectedLocation;
      const matchesType = !selectedType || p.type === selectedType;

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [debouncedSearchProperty, selectedLocation, selectedType]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchProperty(value);
  }, []);

  const handleLocationChange = useCallback((location: string) => {
    setSelectedLocation(location);
  }, []);

  const handleTypeChange = useCallback((type: string) => {
    setSelectedType(type);
  }, []);

  const handleAddProperty = useCallback(
    async (
      propertyData: Omit<Property, "id" | "property_id" | "created_at">
    ) => {
      setIsSubmitting(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Adding new property:", propertyData);
        setIsAddModalOpen(false);
      } catch (error) {
        console.error("Error adding property:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const openAddModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const closeAddModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);

  return (
    <MainLayout title="Properties Management">
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Properties"
            value={totalProperties.toString()}
            icon={Home}
            iconClassName="text-amber-500"
            color="bg-amber-50"
            trend={{ value: 12, isPositive: true }}
          />
          <SummaryCard
            title="Available Properties"
            value={availableProperties.toString()}
            icon={CheckCircle}
            iconClassName="text-green-500"
            color="bg-green-50"
            trend={{ value: 8, isPositive: true }}
          />
          <SummaryCard
            title="Sold Properties"
            value={soldProperties.toString()}
            icon={CheckCircle}
            iconClassName="text-red-500"
            color="bg-red-50"
            trend={{ value: 3, isPositive: true }}
          />
          <SummaryCard
            title="Total Revenue"
            value={
              totalRevenue >= 1000000
                ? `$${(totalRevenue / 1000000).toFixed(1)}M`
                : `$${(totalRevenue / 1000).toFixed(0)}K`
            }
            icon={DollarSign}
            iconClassName="text-blue-500"
            color="bg-blue-50"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="flex flex-wrap flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <Button
            className="bg-primary text-white px-6 py-2"
            onClick={openAddModal}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Property
          </Button>
          <ActionBar
            uniqueLocations={uniqueLocations}
            uniqueTypes={uniqueTypes}
            searchProperty={searchProperty}
            setSearchProperty={handleSearchChange}
            selectedLocation={selectedLocation}
            setSelectedLocation={handleLocationChange}
            selectedType={selectedType}
            setSelectedType={handleTypeChange}
          />
        </div>

        {/* Properties Table */}
        <PropertiesTable data={filteredProperties} />

        {/* Add Property Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          title="Add New Property"
        >
          <AddPropertyForm
            onSubmit={handleAddProperty}
            onCancel={closeAddModal}
            isLoading={isSubmitting}
          />
        </Modal>
      </div>
    </MainLayout>
  );
}
