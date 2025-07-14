"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import {
  RefreshCw,
  Truck,
  CircleDot,
  Pause,
  Clock,
  Ban,
  RadioTower,
  LineChart,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

const truckIcon = new L.Icon({
  iconUrl: "/truck.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -28],
});

function FitBounds({ positions }: { positions: any[] }) {
  const map = useMap();

  useEffect(() => {
    const bounds: [number, number][] = positions
      .filter((p) => p.latitude && p.longitude)
      .map((p) => [p.latitude, p.longitude]);

    if (bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [positions, map]);

  return null;
}

export default function FleetMap({
  devices,
  positions,
  onRefresh,
}: {
  devices: any[];
  positions: any[];
  onRefresh?: () => void;
}) {
  // Utility to calculate stats
  const ONLINE_THRESHOLD_MINUTES = 10;
  const now = Date.now();

  const total = devices.length;

  const online = devices.filter((device) => {
    const last = new Date(device.lastUpdate).getTime();
    return (now - last) / 60000 < ONLINE_THRESHOLD_MINUTES;
  }).length;

  const transit = positions.filter((p) => p.attributes?.motion === true).length;
  const idle = positions.filter((p) => p.attributes?.motion === false).length;

  const offline = total - online;

  return (
    <div className="w-full h-full relative">
      {/* Map Container */}
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom
        className="w-full h-full rounded-md shadow z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds positions={positions} />
        {positions.map((pos) => {
          const device = devices.find((d) => d.id === pos.deviceId);
          if (!device || !pos.latitude || !pos.longitude) return null;

          return (
            <Marker
              key={pos.id}
              position={[pos.latitude, pos.longitude]}
              icon={truckIcon}
            >
              <Popup>
                <strong>{device.name}</strong>
                <br />
                Speed: {(pos.speed * 1.852).toFixed(2)} km/h
                <br />
                Ignition: {pos.attributes?.ignition ? "On" : "Off"}
                <br />
                Last Update: {new Date(pos.deviceTime).toLocaleString()}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Stat Boxes Overlay */}
      <div className="absolute bg-white m-1 p-2 rounded top-4 left-4 z-[1000] flex space-x-2">
        <StatBox
          label="Total Load"
          value={total}
          icon={<Truck className="w-8 h-8 text-blue-800" />}
          bg="bg-blue-100"
          text="text-blue-800"
        />
        <StatBox
          label="Online"
          value={online}
          icon={<RadioTower className="w-8 h-8 text-green-700" />}
          bg="bg-green-100"
          text="text-green-700"
        />
        <StatBox
          label="In-Transit"
          value={transit}
          icon={<LineChart className="w-8 h-8 text-purple-700" />}
          bg="bg-purple-100"
          text="text-purple-700"
        />
        <StatBox
          label="Idle"
          value={idle}
          icon={<Clock className="w-8 h-8 text-yellow-700" />}
          bg="bg-yellow-100"
          text="text-yellow-700"
        />
        <StatBox
          label="Offline"
          value={offline}
          icon={<Ban className="w-8 h-8 text-red-700" />}
          bg="bg-red-100"
          text="text-red-700"
        />
      </div>

      {/* Refresh Button Top-Right */}
      <button
        onClick={onRefresh}
        className="absolute top-4 right-4 z-[1000] p-2 rounded-md bg-white shadow hover:bg-gray-100 transition"
        title="Refresh"
      >
        <RefreshCw className="cursor-pointer w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}

function StatBox({
  label,
  value,
  icon,
  bg,
  text,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
  text: string;
}) {
  return (
    <div
      className={`w-30 h-20 flex items-center justify-start px-3 rounded ${bg} ${text} text-xs font-medium shadow-sm`}
    >
      <div className="mr-3">{icon}</div>
      <div className="flex flex-col justify-center">
        <span className="text-lg font-bold">{value}</span>
        <span className="text-[11px]">{label}</span>
      </div>
    </div>
  );
}
