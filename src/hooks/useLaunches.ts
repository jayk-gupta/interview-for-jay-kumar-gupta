import { useEffect, useState } from "react";
import { getAllLaunches } from "@/services/spaceXAPI";
import type { Launch } from "@/components/columns";

export type FilterType = "all" | "upcoming" | "success" | "failed";

const stripTime = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

export function useLaunches(filter: FilterType, customDate: Date | null) {
  const [data, setData] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const launches = await getAllLaunches();
      setData(launches || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredData = data.filter((launch) => {
    const matchesStatus =
      filter === "all" ||
      (filter === "upcoming" && launch.upcoming) ||
      (filter === "success" && launch.success === true) ||
      (filter === "failed" && launch.success === false);

    const matchesDate =
      !customDate ||
      stripTime(new Date(launch.date_local)).getTime() >=
        stripTime(customDate).getTime();

    // Debug log (optional)
    console.log({
      launch: launch.date_local,
      customDate,
      launchTime: stripTime(new Date(launch.date_local)).toISOString(),
      customTime: customDate ? stripTime(customDate).toISOString() : null,
      result: matchesDate,
    });

    return matchesStatus && matchesDate;
  });

  return { data: filteredData, loading };
}
