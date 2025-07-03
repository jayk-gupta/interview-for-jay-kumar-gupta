// src/components/columns.tsx

import type { ColumnDef } from "@tanstack/react-table";

export interface Launch {
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  rocket: string;
  launchpad: string;
  details?: string;
  links: {
    webcast?: string;
  };
  id: string;
}

export const columns: ColumnDef<Launch>[] = [
  {
    // Row Index as "No."
    id: "row",
    header: "No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "date_utc",
    header: "Launch Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toUTCString();
    },
  },
  {
    accessorKey: "launchpad",
    header: "Location",
    cell: ({ getValue }) => (
      <span className="text-xs">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Mission",
    cell: ({ getValue }) => (
      <span className="font-medium">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: "orbit",
    header: "Orbit",
    cell: () => <span className="text-gray-400">LEO</span>, 
  },
  {
    accessorKey: "success",
    header: "Launch Status",
    cell: ({ row }) => {
      const success = row.original.success;
      const upcoming = row.original.upcoming;

      if (upcoming) return <span className="text-yellow-500">Upcoming</span>;
      if (success) return <span className="text-green-600">Success</span>;
      return <span className="text-red-500">Failed</span>;
    },
  },
  {
    accessorKey: "rocket",
    header: "Rocket",
    cell: ({ getValue }) => (
      <span className="text-xs">{String(getValue())}</span>
    ),
  },
];
