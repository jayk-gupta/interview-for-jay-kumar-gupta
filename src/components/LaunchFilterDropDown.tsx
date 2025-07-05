import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export type LaunchFilterType = "all" | "upcoming" | "success" | "failed";

interface Props {
  value: LaunchFilterType;
  onChange: (val: LaunchFilterType) => void;
}

export default function LaunchFilterDropdown({ value, onChange }: Props) {
  const getLabel = () => {
    switch (value) {
      case "upcoming":
        return "Upcoming Launches";
      case "success":
        return "Successful Launches";
      case "failed":
        return "Failed Launches";
      default:
        return "All Launches";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-sm flex items-center gap-2">
          <img src="filter_icon.png" alt="filter" className="w-4 h-4" />
          {getLabel()}
          <img
            src="dropdown_icon.png"
            alt="dropdown"
            className="w-3 h-3 ml-1"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange("all")}>
          All Launches
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("upcoming")}>
          Upcoming Launches
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("success")}>
          Successful Launches
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("failed")}>
          Failed Launches
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
