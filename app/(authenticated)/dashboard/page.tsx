"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Card from "@/components/Card";
import FleetMap from "@/components/FleetMap";
import { CircleDot, Plus } from "lucide-react";

type Device = {
  id: number;
  name: string;
  status: string;
  lastUpdate: string;
  model: string;
};

type Position = {
  id: number;
  deviceId: number;
  latitude: number;
  longitude: number;
  speed: number;
  address?: string;
  attributes: {
    motion?: boolean;
    ignition?: boolean;
    [key: string]: any;
  };
  deviceTime: string;
};

type CardData = {
  id: number;
  driverName: string;
  speed: string;
  status: "moving" | "idle";
  timeAgo: string;
  address: string;
  model: string;
};

export default function DashboardPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await fetch("/api/devices", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setDevices(data.devices || []);
      setPositions(data.positions || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const enrichedCards: CardData[] = positions
    .map((pos) => {
      const device = devices.find((d) => d.id === pos.deviceId);
      if (!device) return null as any;

      return {
        id: device.id,
        model: device.model,
        driverName: device.name || "Unknown",
        speed: `${(pos.speed * 1.852).toFixed(1)} km/h`,
        status: pos.attributes?.motion ? "moving" : "idle",
        timeAgo: getTimeAgo(device.lastUpdate),
        address: pos.address || "Unknown location",
      };
    })
    .filter(Boolean); // remove nulls

   const ONLINE_THRESHOLD_MINUTES = 10;
  const now = Date.now();

  const total = devices.length;

  const online = devices.filter((device) => {
    const last = new Date(device.lastUpdate).getTime();
    return (now - last) / 60000 < ONLINE_THRESHOLD_MINUTES;
  }).length;

    const offline = total - online;
  return (
    <div className="grid py-4 grid-cols-4 gap-4 h-full">
      {/* Left Column */}
      <div className="col-span-1 space-y-4 w-full max-w-sm">
        <Input placeholder="Search vehicles, locations or IDs" />

        {/* Buttons */}
        <div className="flex space-x-2 w-full">
          <button className="cursor-pointer flex items-center border border-[#05be46] bg-[#beebcd] text-sm px-3 py-2 rounded-md w-1/2">
            <CircleDot className="w-4 h-2 mr-2 fill-[#05be46]" />
            Live Updates
          </button>
          <button className="cursor-pointer flex items-center bg-indigo-600 text-white text-sm px-3 py-2 rounded-md w-1/2">
            <Plus className="w-4 h-4 mr-2 text-white" />
            Add Device
          </button>
        </div>

        {/* {loading ? (
          <div>Loading</div>
        ) : ( */}
        <div className="flex space-x-2 w-full">
          <StatButton
            label="Total"
            value={devices.length}
            bg="bg-indigo-100"
            text="text-blue-800"
          />
          <StatButton
            label="Online"
            value={devices.filter((d) => d.status === "online").length}
            bg="bg-green-100"
            text="text-green-800"
          />
          <StatButton
            label="Offline"
            value={offline}
            bg="bg-red-100"
            text="text-red-800"
          />
        </div>
        {/* )} */}

        {/* Stats */}

        <div className="border-t border-gray-200 my-4 w-full" />

        {/* Cards */}
        <div className="h-[60vh] overflow-y-auto px-2 space-y-4 custom-scrollbar">
          {loading ? (
            <div>Loading...</div>
          ) : (
            enrichedCards.map((card) => (
              <Card
                key={card.id}
                status={card.status}
                driverName={card.driverName}
                speed={card.speed}
                timeAgo={card.timeAgo}
                address={card.address}
                model={card.model}
              />
            ))
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-3 h-[80vh]">
        <FleetMap
          devices={devices}
          positions={positions}
          onRefresh={() => {
            setLoading(true);
            fetchData(); // re-fetch devices + positions
          }}
        />
      </div>
    </div>
  );
}

type StatButtonProps = {
  label: string;
  value: number;
  bg: string;
  text: string;
};

function StatButton({ label, value, bg, text }: StatButtonProps) {
  return (
    <button
      className={`flex-1 text-sm flex justify-between items-center ${bg} ${text} px-2 py-1 rounded`}
    >
      {label}
      <span
        className={`bg-white text-black text-xs px-2 py-0.5 rounded-md ml-1`}
      >
        {value}
      </span>
    </button>
  );
}

function getTimeAgo(isoTime: string): string {
  const now = Date.now();
  const past = new Date(isoTime).getTime();
  const diffMs = now - past;

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
}
