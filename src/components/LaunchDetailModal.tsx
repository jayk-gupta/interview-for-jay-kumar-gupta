import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog";
import {
  getLaunchById,
  getLaunchpadById,
  getRocketById,
  getPayloadById,
} from "@/services/spaceXAPI";
import { ExternalLink, Youtube, Globe } from "lucide-react";

interface LaunchDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  launchId: string | null;
}

export const LaunchDetailModal: React.FC<LaunchDetailModalProps> = ({
  isOpen,
  onClose,
  launchId,
}) => {
  const [loading, setLoading] = useState(true);
  const [launch, setLaunch] = useState<any>(null);
  const [rocket, setRocket] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [launchpad, setLaunchpad] = useState<any>(null);

  useEffect(() => {
    if (!launchId) return;

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const launchRes = await getLaunchById(launchId);
        setLaunch(launchRes);

        const [rocketRes, launchpadRes, payloadRes] = await Promise.all([
          getRocketById(launchRes.rocket),
          getLaunchpadById(launchRes.launchpad),
          getPayloadById(launchRes.payloads?.[0]),
        ]);

        setRocket(rocketRes);
        setLaunchpad(launchpadRes);
        setPayload(payloadRes);
      } catch (err) {
        console.error("Error fetching launch modal data:", err);
      }
      setLoading(false);
    };

    fetchAllData();
  }, [launchId]);

  if (!isOpen || loading || !launch) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/40 backdrop-blur-sm fixed inset-0 z-50" />
      <DialogContent className="bg-white max-w-lg w-full rounded-xl p-6 z-50 overflow-y-auto max-h-[90vh] shadow-lg">
        <div className="flex items-start flex-col gap-4 pb-4">
          <div className="flex gap-4">
            <img
              src={launch.links?.patch?.small || "/fallback.png"}
              alt={launch.name}
              className="w-20 h-20 object-contain rounded border"
            />
            <div className="flex flex-col  items-start">
              <div className="flex gap-4">
                <h2 className="text-lg font-semibold leading-tight">
                  {launch.name}
                </h2>
                <span
                  className={`text-xs px-2 py-1  font-medium rounded-full ${
                    launch.upcoming
                      ? "bg-yellow-100 text-yellow-700"
                      : launch.success
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {launch.upcoming
                    ? "Upcoming"
                    : launch.success
                    ? "Success"
                    : "Failed"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{rocket?.name || ""}</p>
              {/* icons */}
              <div className="flex gap-1">
                {launch.links?.article && (
                  <a
                    href={launch.links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/spaceX_icon.png"
                      alt="SpaceX article"
                      className="w-5 h-5"
                    />
                  </a>
                )}
                {launch.links?.wikipedia && (
                  <a
                    href={launch.links.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/wikipedia_icon.png"
                      alt="Wikipedia"
                      className="w-5 h-5"
                    />
                  </a>
                )}
                {launch.links?.webcast && (
                  <a
                    href={launch.links.webcast}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/youtube_icon.png"
                      alt="YouTube"
                      className="w-5 h-5"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
          <p className="text-gray-700 text-sm mt-1">
            {launch.details || "No details available."}{" "}
            {launch.links?.wikipedia && (
              <a
                href={launch.links.wikipedia}
                target="_blank"
                className="inline-flex items-center text-blue-500 underline ml-1"
                rel="noopener noreferrer"
              >
                Wikipedia <ExternalLink size={14} className="ml-1" />
              </a>
            )}
          </p>
        </div>

        {/* Info Grid */}
        <div className="mt-4 text-sm flex flex-col gap-2">
          <InfoRow label="Flight Number" value={launch.flight_number} />
          <InfoRow label="Mission Name" value={launch.name} />
          <InfoRow label="Rocket Type" value={rocket?.type} />
          <InfoRow label="Rocket Name" value={rocket?.name} />
          <InfoRow label="Manufacturer" value="SpaceX" />
          <InfoRow label="Nationality" value="SpaceX" />
          <InfoRow
            label="Launch Date"
            value={new Date(launch.date_utc).toLocaleString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          />
          <InfoRow label="Payload Type" value={payload?.name} />
          <InfoRow label="Orbit" value={payload?.orbit} />
          <InfoRow label="Launch Site" value={launchpad?.name} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoRow = ({ label, value }: { label: string; value: any }) => (
  <div className="flex justify-between border-b py-2">
    <span className="text-gray-500 font-medium w-1/2">{label}</span>
    <span className="text-gray-800 text-right w-1/2">{value || "N/A"}</span>
  </div>
);

export default LaunchDetailModal;
