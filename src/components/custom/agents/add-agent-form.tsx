import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Input, Select, Label } from "@/components/ui";
import { Agent } from "@/types/agent";
import { AgentSchema } from "@/validations/agent";

interface AddAgentFormProps {
  onSubmit: (agent: Omit<Agent, "id" | "created_at">) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const initialValues = {
  name: "",
  email: "",
  phone: "",
  role: "",
};

export function AddAgentForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: AddAgentFormProps) {
  const roleOptions = [
    { value: "Senior Agent", label: "Senior Agent" },
    { value: "Property Manager", label: "Property Manager" },
    { value: "Sales Agent", label: "Sales Agent" },
    { value: "Leasing Agent", label: "Leasing Agent" },
  ];

  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    const agentData = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      role: values.role,
    };

    onSubmit(agentData);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AgentSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" required>
              Agent Name
            </Label>
            <Field
              as={Input}
              id="name"
              name="name"
              placeholder="Enter agent name"
              error={!!(errors.name && touched.name)}
              errorMessage={errors.name}
            />
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

          <div className="space-y-2">
            <Label htmlFor="role" required>
              Role
            </Label>
            <Select
              id="role"
              value={values.role}
              onChange={(value) => setFieldValue("role", value)}
              placeholder="Select role"
              options={roleOptions}
              error={!!(errors.role && touched.role)}
              errorMessage={errors.role}
            />
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
              {isLoading || isSubmitting ? "Adding..." : "Add Agent"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
