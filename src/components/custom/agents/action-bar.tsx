import { memo, useCallback } from "react";
import { Search, Briefcase } from "lucide-react";

import { Input, Select } from "@/components/ui";

export const ActionBar = memo(function ActionBar({
  searchAgent,
  setSearchAgent,
  uniqueRoles,
  selectedRole,
  setSelectedRole,
}: {
  searchAgent: string;
  setSearchAgent: (searchAgent: string) => void;
  uniqueRoles: { value: string; label: string }[];
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}) {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchAgent(e.target.value);
    },
    [setSearchAgent]
  );

  const handleRoleChange = useCallback(
    (role: string) => {
      setSelectedRole(role);
    },
    [setSelectedRole]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full md:w-auto">
      <Input
        placeholder="Search agents..."
        startIcon={<Search className="h-4 w-4" />}
        value={searchAgent}
        onChange={handleSearchChange}
      />

      <Select
        placeholder="All Roles"
        startIcon={<Briefcase className="h-4 w-4" />}
        ariaLabel="Filter agents by role"
        options={[{ value: "", label: "All Roles" }, ...uniqueRoles]}
        value={selectedRole}
        onChange={handleRoleChange}
      />
    </div>
  );
});
