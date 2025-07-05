import { useState } from "react";
import { useLaunches } from "@/hooks/useLaunches";
import type { FilterType } from "@/hooks/useLaunches";
import { DataTable } from "./ui/DataTable";
import { columns } from "./columns";
import LaunchTableSkeleton from "./ui/LaunchTableSkeleton";
import { LaunchDetailModal } from "./LaunchDetailModal";
import DateFilterModal from "./DateFilterModal";
import LaunchFilterDropdown from "./LaunchFilterDropDown";

function LaunchTable() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [customDate, setCustomDate] = useState<Date | null>(null);
  const [customRangeLabel, setCustomRangeLabel] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedLaunchId, setSelectedLaunchId] = useState<string | null>(null);
  const [filtering, setFiltering] = useState(false);
  const [paging, setPaging] = useState(false);

  const pageSize = 10;
  const { data, loading } = useLaunches(filter, customDate);

  const handleFilterChange = (newFilter: FilterType) => {
    if (newFilter === filter) return;
    setFilter(newFilter);
    setFiltering(true);
    setPage(1);
    setTimeout(() => setFiltering(false), 400);
  };

  const handlePageChange = (newPage: number) => {
    setPaging(true);
    setPage(newPage);
    setTimeout(() => setPaging(false), 400);
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const currentPageData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full mt-6">
      {(loading && data.length === 0) || filtering || paging ? (
        <LaunchTableSkeleton />
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <DateFilterModal
              selectedDate={customDate}
              selectedLabel={customRangeLabel}
              onApply={(date, label) => {
                setCustomDate(date);
                setCustomRangeLabel(label);
                setFiltering(true);
                setPage(1);
                setTimeout(() => setFiltering(false), 400);
              }}
            />
            <LaunchFilterDropdown
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
          <DataTable
            data={currentPageData}
            columns={columns}
            page={page}
            setPage={handlePageChange}
            totalPages={totalPages}
            onRowClick={(launch) => setSelectedLaunchId(launch.id)}
          />
          <LaunchDetailModal
            isOpen={!!selectedLaunchId}
            onClose={() => setSelectedLaunchId(null)}
            launchId={selectedLaunchId}
          />
        </>
      )}
    </div>
  );
}

export default LaunchTable;
