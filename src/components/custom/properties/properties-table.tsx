"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  Row,
  Cell,
} from "@tanstack/react-table";
import { Building2 } from "lucide-react";
import Image from "next/image";

import { ActionsCell } from "../table";
import { Badge, Button } from "@/components/ui";
import { formatDate, formatCurrency } from "@/utils/formaters";
import { Property, PropertiesTableProps } from "@/types/property";

const ITEMS_PER_PAGE = 10;

const statusColors: Record<string, string> = {
  Available: "bg-green-100 text-green-800 border-green-200",
  Sold: "bg-red-100 text-red-800 border-red-200",
  "Under Construction": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Pending: "bg-orange-100 text-orange-800 border-orange-200",
  Rented: "bg-blue-100 text-blue-800 border-blue-200",
  Default: "bg-gray-100 text-gray-800 border-gray-200",
};

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
  e.currentTarget.nextElementSibling?.classList.remove("hidden");
};

const StatusBadge = memo(({ status }: { status: string }) => (
  <Badge className={`${statusColors[status] || statusColors.Default} border`}>
    {status}
  </Badge>
));
StatusBadge.displayName = "StatusBadge";

const PropertyImage = memo(({ src, alt }: { src: string; alt: string }) => {
  const hasValidImage = src && src !== "https://via.placeholder.com/150";

  return (
    <div className="h-10 w-10 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
      {hasValidImage ? (
        <>
          <Image
            src={src}
            alt={alt}
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-cover"
            onError={handleImageError}
          />
          <Building2 className="h-6 w-6 text-gray-400 hidden" />
        </>
      ) : (
        <Building2 className="h-6 w-6 text-gray-400" />
      )}
    </div>
  );
});
PropertyImage.displayName = "PropertyImage";

const TableRow = memo(({ row }: { row: Row<Property> }) => (
  <tr className="hover:bg-gray-50 transition-colors duration-150">
    {row.getVisibleCells().map((cell: Cell<Property, unknown>) => (
      <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    ))}
  </tr>
));
TableRow.displayName = "TableRow";

export const PropertiesTable = memo(function PropertiesTable({
  data,
}: PropertiesTableProps) {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const handleDisplayCount = useCallback(() => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  const handleView = useCallback((id: string) => {
    console.log("View property:", id);
    // TODO: Implement view functionality
  }, []);

  const handleEdit = useCallback((id: string) => {
    console.log("Edit property:", id);
    // TODO: Implement edit functionality
  }, []);

  const handleDelete = useCallback((id: string) => {
    console.log("Delete property:", id);
    // TODO: Implement delete functionality
  }, []);

  const columns = useMemo<ColumnDef<Property>[]>(
    () => [
      {
        accessorKey: "property_id",
        header: "PROPERTY ID",
        cell: ({ row }) => (
          <div className="font-mono text-xs text-left min-w-24 font-medium text-gray-900">
            #{row.getValue("property_id")}
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "PROPERTY DETAILS",
        cell: ({ row }) => (
          <div className="flex items-center space-x-3">
            <PropertyImage
              src={row.original.image}
              alt={row.getValue("name")}
            />
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
        accessorKey: "location",
        header: "LOCATION",
        cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-700">
              {row.getValue("location")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "price",
        header: "PRICE",
        cell: ({ row }) => (
          <div className="font-semibold text-xs text-gray-900">
            {formatCurrency(row.getValue("price"))}
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: "TYPE",
        cell: ({ row }) => (
          <div className="text-xs font-medium text-gray-700">
            {row.getValue("type")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
      },
      {
        accessorKey: "builder",
        header: "BUILDER",
        cell: ({ row }) => (
          <div className="text-xs font-medium text-primary">
            {row.getValue("builder")}
          </div>
        ),
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
                  No properties available.
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
            Load More Properties
          </Button>
        </div>
      )}

      <div className="text-center text-sm text-gray-600">
        Showing {displayData.length} of {data.length} properties
      </div>
    </div>
  );
});
