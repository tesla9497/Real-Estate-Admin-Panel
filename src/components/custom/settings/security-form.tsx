import React from "react";
import { Formik, Form, Field } from "formik";
import { Lock } from "lucide-react";

import { Button, Input, Label } from "@/components/ui";
import { SecuritySchema } from "@/validations/settings";

interface SecurityFormProps {
  onSubmit: (values: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialValues?: any;
}

const defaultInitialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function SecurityForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialValues = defaultInitialValues,
}: SecurityFormProps) {
  const handleSubmit = (values: typeof defaultInitialValues) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SecuritySchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="space-y-6">
          {/* Password Change Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <h4 className="text-lg font-semibold">Change Password</h4>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPassword" required>
                Current Password
              </Label>
              <Field
                as={Input}
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
                error={!!(errors.currentPassword && touched.currentPassword)}
                errorMessage={errors.currentPassword}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" required>
                New Password
              </Label>
              <Field
                as={Input}
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                error={!!(errors.newPassword && touched.newPassword)}
                errorMessage={errors.newPassword}
              />
              <p className="text-xs text-gray-600">
                Password must contain at least 8 characters with uppercase,
                lowercase, number, and special character.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" required>
                Confirm New Password
              </Label>
              <Field
                as={Input}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                error={!!(errors.confirmPassword && touched.confirmPassword)}
                errorMessage={errors.confirmPassword}
              />
            </div>
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
              {isLoading ? "Updating..." : "Update Security Settings"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
