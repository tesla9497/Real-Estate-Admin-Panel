export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string | null;
}

export interface NotificationFormValues {
  emailNotifications: boolean;
  smsNotifications: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
}

export interface SecurityFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
