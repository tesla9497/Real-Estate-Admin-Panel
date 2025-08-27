import { memo } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button, DropdownMenu } from "@/components/ui";

export const ActionsCell = memo(
  ({
    row,
    onView,
    onEdit,
    onDelete,
  }: {
    row: any;
    onView: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  }) => {
    const dropdownItems = [
      {
        label: "View",
        icon: <Eye className="h-3 w-3 text-amber-600" />,
        onClick: () => onView(row.original.property_id),
        variant: "default" as const,
      },
      {
        label: "Edit",
        icon: <Edit className="h-3 w-3 text-blue-600" />,
        onClick: () => onEdit(row.original.property_id),
        variant: "default" as const,
      },
      {
        label: "Delete",
        icon: <Trash2 className="h-3 w-3 text-red-600" />,
        onClick: () => onDelete(row.original.property_id),
        variant: "destructive" as const,
      },
    ];

    return (
      <div className="relative">
        {/* Large screen: Show all buttons */}
        <div className="hidden lg:flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 bg-amber-50 text-amber-600 hover:bg-amber-100"
            onClick={() => onView(row.original.property_id)}
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 bg-blue-50 text-blue-600 hover:bg-blue-100"
            onClick={() => onEdit(row.original.property_id)}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 bg-red-50 text-red-600 hover:bg-red-100"
            onClick={() => onDelete(row.original.property_id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>

        {/* Small/Medium screen: Show dots menu */}
        <div className="lg:hidden">
          <DropdownMenu
            items={dropdownItems}
            triggerIcon="dots"
            align="right"
          />
        </div>
      </div>
    );
  }
);
ActionsCell.displayName = "ActionsCell";
