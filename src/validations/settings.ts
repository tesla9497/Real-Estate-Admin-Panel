import * as Yup from "yup";

// Validation schema for profile settings
export const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters")
    .required("Phone number is required"),


});

// Validation schema for notification settings
export const NotificationSchema = Yup.object().shape({
  emailNotifications: Yup.boolean().required(),
  smsNotifications: Yup.boolean().required(),
  weeklyReports: Yup.boolean().required(),
  monthlyReports: Yup.boolean().required(),
});

// Validation schema for security settings
export const SecuritySchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),


});
