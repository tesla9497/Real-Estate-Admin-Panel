import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Input, Label } from "@/components/ui";
import { ProfileSchema } from "@/validations/settings";
import { Camera, User } from "lucide-react";

interface ProfileFormProps {
  onSubmit: (values: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialValues?: any;
}

const defaultInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profileImage: null,
};

export function ProfileForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialValues = defaultInitialValues,
}: ProfileFormProps) {
  const [profileImage, setProfileImage] = useState<string | null>(
    initialValues.profileImage || null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: typeof defaultInitialValues) => {
    onSubmit({ ...values, profileImage });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProfileSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Profile Photo</p>
              <p className="text-xs text-gray-500">
                JPG or PNG only. Max size 2MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" required>
                First Name
              </Label>
              <Field
                as={Input}
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                error={!!(errors.firstName && touched.firstName)}
                errorMessage={errors.firstName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" required>
                Last Name
              </Label>
              <Field
                as={Input}
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                error={!!(errors.lastName && touched.lastName)}
                errorMessage={errors.lastName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" required>
              Email Address
            </Label>
            <Field
              as={Input}
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              error={!!(errors.email && touched.email)}
              errorMessage={errors.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" required>
              Phone Number
            </Label>
            <Field
              as={Input}
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              error={!!(errors.phone && touched.phone)}
              errorMessage={errors.phone}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
