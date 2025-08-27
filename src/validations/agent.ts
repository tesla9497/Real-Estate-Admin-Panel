import * as Yup from "yup";

// Validation schema for adding/editing agents
export const AgentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Agent name must be at least 2 characters")
    .max(100, "Agent name must be less than 100 characters")
    .required("Agent name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters")
    .required("Phone number is required"),
  role: Yup.string().required("Role is required"),
});

// Validation schema for agent search/filtering
export const AgentSearchSchema = Yup.object().shape({
  search: Yup.string().optional(),
  role: Yup.string().optional(),
});

// Validation schema for agent updates (partial updates)
export const AgentUpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Agent name must be at least 2 characters")
    .max(100, "Agent name must be less than 100 characters")
    .optional(),
  email: Yup.string()
    .email("Please enter a valid email address")
    .optional(),
  phone: Yup.string()
    .matches(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters")
    .optional(),
  role: Yup.string().optional(),
});
