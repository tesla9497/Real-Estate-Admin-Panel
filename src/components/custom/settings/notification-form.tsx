import React from "react";
import { Formik, Form } from "formik";
import { Mail, MessageSquare, BarChart3, Calendar } from "lucide-react";

import { Button, Label, Switch } from "@/components/ui";
import { NotificationSchema } from "@/validations/settings";
import { NotificationFormValues, NotificationFormProps } from "@/types";

const defaultInitialValues: NotificationFormValues = {
  emailNotifications: true,
  smsNotifications: false,
  weeklyReports: false,
  monthlyReports: true,
};

export function NotificationForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialValues = defaultInitialValues,
}: NotificationFormProps) {
  const handleSubmit = (values: typeof defaultInitialValues) => {
    onSubmit(values);
  };

  const notificationOptions = [
    {
      name: "emailNotifications",
      label: "Email Notifications",
      description: "Receive notifications via email",
      icon: Mail,
    },
    {
      name: "smsNotifications",
      label: "SMS Notifications",
      description: "Receive notifications via SMS",
      icon: MessageSquare,
    },
    {
      name: "weeklyReports",
      label: "Weekly Reports",
      description: "Receive weekly summary reports",
      icon: BarChart3,
    },
    {
      name: "monthlyReports",
      label: "Monthly Reports",
      description: "Receive monthly detailed reports",
      icon: Calendar,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NotificationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="space-y-4">
            {notificationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.name}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label
                        htmlFor={option.name}
                        className="text-base font-medium"
                      >
                        {option.label}
                      </Label>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Switch
                      id={option.name}
                      checked={
                        values[option.name as keyof typeof values] as boolean
                      }
                      onCheckedChange={(checked) =>
                        setFieldValue(option.name, checked)
                      }
                      size="md"
                    />
                  </div>
                </div>
              );
            })}
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
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
