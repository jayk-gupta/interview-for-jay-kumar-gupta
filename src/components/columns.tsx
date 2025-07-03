import type { ColumnDef } from "@tanstack/react-table";

export interface Launch {
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  rocket: string;
  flight_number: number;
  launchpad: string;
  details?: string;
  links: {
    patch: {
      small: string;
      large: string;
    };
    webcast: string;
    wikipedia: string;
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

      if (upcoming)
        return (
          <span className="text-yellow-700 bg-yellow-100 px-2 p1 rounded-xl">
            Upcoming
          </span>
        );
      if (success)
        return (
          <span className="text-green-700 bg-green-100 px-2 p1 rounded-xl">
            Success
          </span>
        );
      return (
        <span className="text-red-700 bg-red-100 px-2 p1 rounded-xl">
          Failed
        </span>
      );
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
