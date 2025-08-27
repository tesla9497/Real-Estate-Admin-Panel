import * as Yup from "yup";

// Validation schema for adding/editing properties
export const PropertySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Property name must be at least 2 characters")
    .max(100, "Property name must be less than 100 characters")
    .required("Property name is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description is required"),
  location: Yup.string()
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location must be less than 100 characters")
    .required("Location is required"),
  price: Yup.number()
    .positive("Price must be positive")
    .min(1, "Price must be at least 1")
    .required("Price is required"),
  type: Yup.string().required("Property type is required"),
  status: Yup.string().required("Status is required"),
  builder: Yup.string()
    .min(2, "Builder name must be at least 2 characters")
    .max(100, "Builder name must be less than 100 characters")
    .required("Builder is required"),
});

// Validation schema for property search/filtering
export const PropertySearchSchema = Yup.object().shape({
  search: Yup.string().optional(),
  type: Yup.string().optional(),
  status: Yup.string().optional(),
  minPrice: Yup.number().positive("Minimum price must be positive").optional(),
  maxPrice: Yup.number().positive("Maximum price must be positive").optional(),
  location: Yup.string().optional(),
});

// Validation schema for property updates (partial updates)
export const PropertyUpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Property name must be at least 2 characters")
    .max(100, "Property name must be less than 100 characters")
    .optional(),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .optional(),
  location: Yup.string()
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location must be less than 100 characters")
    .optional(),
  price: Yup.number()
    .positive("Price must be positive")
    .min(1, "Price must be at least 1")
    .optional(),
  type: Yup.string().optional(),
  status: Yup.string().optional(),
  builder: Yup.string()
    .min(2, "Builder name must be at least 2 characters")
    .max(100, "Builder name must be less than 100 characters")
    .optional(),
});
