import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog";
import type { Launch } from "./columns";

interface LaunchDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  launch: Launch | null;
}

export const LaunchDetailModal: React.FC<LaunchDetailModalProps> = ({
  isOpen,
  onClose,
  launch,
}) => {
  if (!launch) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/40 backdrop-blur-sm fixed inset-0 z-50" />
      <DialogContent className="bg-white max-w-xl w-full rounded-xl p-6 z-50">
        {/* Top Section */}
        <div className="flex items-start gap-4 border-b pb-4">
          <img
            src={launch.links?.patch?.small || "/fallback.png"}
            alt={launch.name}
            className="w-20 h-20 object-contain"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{launch.name}</h2>
              {launch.upcoming ? (
                <span className="bg-yellow-200 text-yellow-700 text-xs px-2 py-1 rounded">
                  Upcoming
                </span>
              ) : launch.success ? (
                <span className="bg-green-200 text-green-700 text-xs px-2 py-1 rounded">
                  Success
                </span>
              ) : (
                <span className="bg-red-200 text-red-700 text-xs px-2 py-1 rounded">
                  Failed
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm">
              {launch.details || "No details available."}{" "}
              {launch.links?.wikipedia && (
                <a
                  href={launch.links.wikipedia}
                  target="_blank"
                  className="text-blue-500 underline"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                </a>
              )}
            </p>
          </div>
        </div>

        {/* Launch Info */}
        <div className="mt-4 text-sm flex flex-col gap-4 ">
          <div>
            <span className="text-gray-500">Flight Number:</span>{" "}
            {launch.flight_number}
          </div>
          <div>
            <span className="text-gray-500">Mission Name:</span> {launch.name}
          </div>
          <div>
            <span className="text-gray-500">Rocket Type:</span> {launch.rocket}
          </div>
          <div>
            <span className="text-gray-500">Rocket Name:</span>{" "}
            {launch.launchpad}
          </div>
          <div>
            <span className="text-gray-500">Manufacturer</span>
            SpaceX
          </div>
          <div>
            <span className="text-gray-500">Nationality:</span> SpaceX
          </div>
          <div>
            <span className="text-gray-500">Launch Date</span>{" "}
            {new Date(launch.date_utc).toLocaleString()}
          </div>
          <div>
            <span className="text-gray-500">Payload Type:</span> {launch.rocket}
          </div>
          <div>
            <span className="text-gray-500">Orbit :</span> orbit
          </div>
          <div>
            <span className="text-gray-500">Launch Site:</span>
            site
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
