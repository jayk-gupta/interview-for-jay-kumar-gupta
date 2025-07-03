import { useEffect, useState } from "react";
import { getAllLaunches } from "@/services/spaceXAPI";
import { DataTable } from "./ui/DataTable";
import { columns } from "./columns";
import type { Launch } from "./columns";
import LaunchTableSkeleton from "./ui/LaunchTableSkeleton";
import { LaunchDetailModal } from "./LaunchDetailModal";

function LaunchTable() {
  const [data, setData] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const launches = await getAllLaunches();
      setData(launches || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / pageSize);
  const currentPageData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full mt-6">
      {data.length === 0 && loading ? (
        <LaunchTableSkeleton />
      ) : (
        <>
          <DataTable
            data={currentPageData}
            columns={columns}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            onRowClick={setSelectedLaunch}
          />
          <LaunchDetailModal
            isOpen={!!selectedLaunch}
            onClose={() => setSelectedLaunch(null)}
            launch={selectedLaunch}
          />
        </>
      )}
    </div>
  );
}

export default LaunchTable;
