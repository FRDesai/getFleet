"use client";

import {
  MapPin,
  Truck,
  User,
  Hourglass,
  TrendingUp,
  Clock,
} from "lucide-react";

type CardProps = {
  status: "moving" | "idle";
  driverName: string;
  speed: string;
  timeAgo: string;
  address?: string;
  model: string;
};

export default function Card({
  status,
  driverName,
  speed,
  timeAgo,
  address,
  model,
}: CardProps) {
  const isMoving = status === "moving";

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full space-y-2">
      {/* Top Row: Name + Status */}
      <div className="flex justify-between items-start">
        <div>
          <div className="font-bold text-gray-800">{model}</div>
          <div className="text-sm text-gray-400">#{driverName.slice(0, 6)}</div>
        </div>
        <button
          className={`flex items-center text-xs px-3 py-1 rounded-full font-medium text-white space-x-1 ${
            isMoving
              ? "bg-[#e1e1ff] border border-indigo-600"
              : "bg-[#f5f5f5] border border-[#d77305]"
          }`}
        >
          {isMoving ? (
            <>
              <TrendingUp size={12} className="text-indigo-600" />
              <span className="text-indigo-600">Moving</span>
            </>
          ) : (
            <>
              <Clock size={12} className="text-[#d77305]" />
              <span className="text-[#d77305]">Idle</span>
            </>
          )}
        </button>
      </div>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-600 space-x-2">
        <MapPin size={16} className="text-gray-500" />
        <span>{address || "Location unavailable"}</span>
      </div>

      {/* Truck + Progress Line with Speed */}
      <div className="flex items-center justify-between">
        <div className="flex items-center w-3/4 space-x-2">
          <Hourglass size={14} className="text-gray-500 mt-[6px]" />
          <div className="relative w-full">
            <Truck
              size={15}
              className={`absolute -top-2 ${
                isMoving
                  ? "left-1/2 -translate-x-1/2 text-indigo-600"
                  : "left-0 text-[#d77305]"
              }`}
            />
            <div className="flex items-center w-full h-1 mt-2">
              {isMoving ? (
                <>
                  <div className="w-1/2 bg-indigo-600 h-1 rounded-l-full" />
                  <div className="w-1/2 bg-gray-400 h-1 rounded-r-full" />
                </>
              ) : (
                <div className="w-full border-t-2 border-dotted border-[#d77305]" />
              )}
            </div>
          </div>
        </div>
        <div className="w-1/4 text-sm text-gray-700 text-right mt-1">
          {speed}
        </div>
      </div>

      <div className="border-t border-gray-200 my-2 w-full" />

      {/* Driver Info Row */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <User size={16} />
          <span>{driverName}</span>
        </div>
        <span className="text-xs">{timeAgo}</span>
      </div>
    </div>
  );
}
