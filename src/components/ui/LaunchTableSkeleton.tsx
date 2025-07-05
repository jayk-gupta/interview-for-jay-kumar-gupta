import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function LaunchTableSkeleton() {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="min-w-[800px] w-full">
        {/* Table Header */}
        <TableHeader className="bg-gray-100 text-base">
          <TableRow>
            {[
              "No.",
              "Launch Date",
              "Location",
              "Mission",
              "Orbit",
              "Launch Status",
              "Rocket",
            ].map((_, i) => (
              <TableHead
                key={i}
                className="text-gray-800 font-semibold border-r px-4 py-3 text-sm sm:text-base"
              >
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Skeleton Rows */}
        <TableBody>
          {Array.from({ length: 10 }).map((_, rowIdx) => (
            <TableRow key={rowIdx} className="border-t">
              {Array.from({ length: 7 }).map((_, colIdx) => (
                <TableCell
                  key={colIdx}
                  className="border-r px-4 py-3 text-sm sm:text-base"
                >
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
