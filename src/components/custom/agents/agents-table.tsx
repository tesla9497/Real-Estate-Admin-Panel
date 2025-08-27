"use client";

import { useState, useMemo, useCallback, memo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import { ActionsCell } from "../table";
import { Badge, Button } from "@/components/ui";
import { formatDate } from "@/utils/formaters";
import { Agent, AgentsTableProps } from "@/types/agent";

const ITEMS_PER_PAGE = 10;

const roleColors: Record<string, string> = {
  "Senior Agent": "bg-blue-100 text-blue-800 border-blue-200",
  "Property Manager": "bg-purple-100 text-purple-800 border-purple-200",
  "Sales Agent": "bg-green-100 text-green-800 border-green-200",
  "Leasing Agent": "bg-orange-100 text-orange-800 border-orange-200",
  Default: "bg-gray-100 text-gray-800 border-gray-200",
};

const RoleBadge = memo(({ role }: { role: string }) => (
  <Badge className={`${roleColors[role] || roleColors.Default} border`}>
    {role}
  </Badge>
));
RoleBadge.displayName = "RoleBadge";

const AgentAvatar = memo(({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
      {initials}
    </div>
  );
});
AgentAvatar.displayName = "AgentAvatar";

const TableRow = memo(({ row }: { row: any }) => (
  <tr className="hover:bg-gray-50 transition-colors duration-150">
    {row.getVisibleCells().map((cell: any) => (
      <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    ))}
  </tr>
));
TableRow.displayName = "TableRow";

export const AgentsTable = memo(function AgentsTable({
  data,
}: AgentsTableProps) {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const handleDisplayCount = useCallback(() => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  const handleView = useCallback((id: string) => {
    console.log("View agent:", id);
    // TODO: Implement view functionality
  }, []);

  const handleEdit = useCallback((id: string) => {
    console.log("Edit agent:", id);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = useCallback((id: string) => {
    console.log("Delete agent:", id);
    // TODO: Implement delete functionality
  }, []);

  const columns = useMemo<ColumnDef<Agent>[]>(
    () => [
      {
        accessorKey: "agent_id",
        header: "AGENT ID",
        cell: ({ row }) => (
          <div className="font-mono text-xs text-left min-w-16 font-medium text-gray-900">
            #{row.getValue("agent_id")}
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "AGENT DETAILS",
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <AgentAvatar name={row.getValue("name")} />
            <div>
              <div className="font-semibold text-sm text-gray-900">
                {row.getValue("name")}
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(row.original.created_at)}
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "EMAIL",
        cell: ({ row }) => (
          <div className="text-sm text-gray-700">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "phone",
        header: "PHONE",
        cell: ({ row }) => (
          <div className="text-sm text-gray-700">{row.getValue("phone")}</div>
        ),
      },
      {
        accessorKey: "role",
        header: "ROLE",
        cell: ({ row }) => <RoleBadge role={row.getValue("role")} />,
      },
      {
        id: "actions",
        header: "ACTIONS",
        cell: ({ row }) => (
          <ActionsCell
            row={row}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ),
        enableSorting: false,
      },
    ],
    [handleView, handleEdit, handleDelete]
  );

  const displayData = useMemo(
    () => data.slice(0, displayCount),
    [data, displayCount]
  );
  const hasMore = useMemo(
    () => displayCount < data.length,
    [displayCount, data.length]
  );

  const table = useReactTable({
    data: displayData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center space-x-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!displayData.length ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No agents available.
                </td>
              </tr>
            ) : (
              table
                .getRowModel()
                .rows.map((row) => <TableRow key={row.id} row={row} />)
            )}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="flex justify-center bg-white px-4 py-3 rounded-lg border border-gray-200">
          <Button
            onClick={handleDisplayCount}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2"
          >
            Load More Agents
          </Button>
        </div>
      )}

      <div className="text-center text-sm text-gray-600">
        Showing {displayData.length} of {data.length} agents
      </div>
    </div>
  );
});
