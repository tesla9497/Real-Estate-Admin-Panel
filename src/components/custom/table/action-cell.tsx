import { Eye, Edit, Trash2 } from "lucide-react";
import { Button, DropdownMenu } from "@/components/ui";
import { ActionsCellProps } from "@/types";

export function ActionsCell<
  T extends { property_id: string } | { id: string | number }
>({ row, onView, onEdit, onDelete }: ActionsCellProps<T>) {
  const getRowId = () => {
    const original = row.original;
    if ("property_id" in original) {
      return original.property_id;
    }
    if ("id" in original) {
      const id = (original as { id: string | number }).id;
      return typeof id === "string" ? id : id.toString();
    }
    return "";
  };

  const dropdownItems = [
    {
      label: "View",
      icon: <Eye className="h-3 w-3 text-amber-600" />,
      onClick: () => onView(getRowId()),
      variant: "default" as const,
    },
    {
      label: "Edit",
      icon: <Edit className="h-3 w-3 text-blue-600" />,
      onClick: () => onEdit(getRowId()),
      variant: "default" as const,
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-3 w-3 text-red-600" />,
      onClick: () => onDelete(getRowId()),
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
          onClick={() => onView(getRowId())}
        >
          <Eye className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 bg-blue-50 text-blue-600 hover:bg-blue-100"
          onClick={() => onEdit(getRowId())}
        >
          <Edit className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 bg-red-50 text-red-600 hover:bg-red-100"
          onClick={() => onDelete(getRowId())}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Small/Medium screen: Show dots menu */}
      <div className="lg:hidden">
        <DropdownMenu items={dropdownItems} triggerIcon="dots" align="right" />
      </div>
    </div>
  );
}
ActionsCell.displayName = "ActionsCell";
