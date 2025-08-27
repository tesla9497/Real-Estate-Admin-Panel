import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Input, Select, Label, Textarea } from "@/components/ui";
import { Property } from "@/types/property";
import { PropertySchema } from "@/validations";

interface AddPropertyFormProps {
  onSubmit: (
    property: Omit<Property, "id" | "property_id" | "created_at">
  ) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const initialValues = {
  name: "",
  description: "",
  location: "",
  price: "",
  type: "",
  status: "Available",
  builder: "",
};

export function AddPropertyForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: AddPropertyFormProps) {
  const propertyTypes = [
    { value: "Apartment", label: "Apartment" },
    { value: "House", label: "House" },
    { value: "Condo", label: "Condo" },
    { value: "Townhouse", label: "Townhouse" },
    { value: "Villa", label: "Villa" },
  ];

  const statusOptions = [
    { value: "Available", label: "Available" },
    { value: "Sold", label: "Sold" },
    { value: "Under Contract", label: "Under Contract" },
  ];

  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    const propertyData = {
      name: values.name.trim(),
      description: values.description.trim(),
      image: "https://via.placeholder.com/400x300?text=Property+Image",
      location: values.location.trim(),
      price: Number(values.price),
      type: values.type,
      status: values.status,
      builder: values.builder.trim(),
    };

    onSubmit(propertyData);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PropertySchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" required>
              Property Name
            </Label>
            <Field
              as={Input}
              id="name"
              name="name"
              placeholder="Enter property name"
              error={!!(errors.name && touched.name)}
              errorMessage={errors.name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" required>
              Description
            </Label>
            <Field
              as={Textarea}
              id="description"
              name="description"
              placeholder="Enter property description"
              rows={3}
              error={!!(errors.description && touched.description)}
              errorMessage={errors.description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" required>
              Location
            </Label>
            <Field
              as={Input}
              id="location"
              name="location"
              placeholder="Enter property location"
              error={!!(errors.location && touched.location)}
              errorMessage={errors.location}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" required>
                Price
              </Label>
              <Field
                as={Input}
                id="price"
                name="price"
                type="number"
                placeholder="Enter price"
                startIcon="$"
                error={!!(errors.price && touched.price)}
                errorMessage={errors.price}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" required>
                Type
              </Label>
              <Select
                id="type"
                value={values.type}
                onChange={(value) => setFieldValue("type", value)}
                placeholder="Select type"
                options={propertyTypes}
                error={!!(errors.type && touched.type)}
                errorMessage={errors.type}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={values.status}
                onChange={(value) => setFieldValue("status", value)}
                options={statusOptions}
                error={false}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="builder" required>
                Builder
              </Label>
              <Field
                as={Input}
                id="builder"
                name="builder"
                placeholder="Enter builder name"
                error={!!(errors.builder && touched.builder)}
                errorMessage={errors.builder}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading || isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="bg-primary text-white"
            >
              {isLoading || isSubmitting ? "Adding..." : "Add Property"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
