// Common Component Types
export interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  color?: string;
  iconClassName?: string;
}

// Table Types
export interface ActionsCellProps<T extends { property_id: string } | { id: string | number }> {
  row: import('@tanstack/react-table').Row<T>;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
