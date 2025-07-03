import { Skeleton } from "@/components/ui/skeleton";

export default function LaunchTableSkeleton() {
  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="min-w-[800px] w-full">
        <thead className="bg-gray-100">
          <tr>
            {[
              "No.",
              "Launch Date",
              "Location",
              "Mission",
              "Orbit",
              "Launch Status",
              "Rocket",
            ].map((title, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r"
              >
                <Skeleton className="h-4 w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-t">
              {Array.from({ length: 7 }).map((_, colIdx) => (
                <td key={colIdx} className="px-4 py-3 border-r">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
