
import{ useEffect, useState } from "react";
import { getAllLaunches } from "@/services/spaceXAPI";
import { DataTable } from "./ui/DataTable";
import { columns } from "./columns";
import type { Launch } from "./columns";

function LaunchTable() {
  const [data, setData] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
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
      <h2 className="text-xl font-semibold mb-4">SpaceX Launches</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <DataTable
          data={currentPageData}
          columns={columns}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default LaunchTable;
