// Agent Form Types
export interface AddAgentFormProps {
  onSubmit: (values: Omit<import('./agent').Agent, 'id' | 'created_at'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialValues?: Omit<import('./agent').Agent, 'id' | 'created_at'>;
}

// Property Form Types
export interface AddPropertyFormProps {
  onSubmit: (values: Omit<import('./property').Property, 'id' | 'property_id' | 'created_at'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialValues?: Omit<import('./property').Property, 'id' | 'property_id' | 'created_at'>;
}

// Settings Form Types
export interface ProfileFormProps {
  onSubmit: (values: import('./settings').ProfileFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialValues?: import('./settings').ProfileFormValues;
}

export interface NotificationFormProps {
  onSubmit: (values: import('./settings').NotificationFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialValues?: import('./settings').NotificationFormValues;
}

export interface SecurityFormProps {
  onSubmit: (values: import('./settings').SecurityFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialValues?: import('./settings').SecurityFormValues;
}
