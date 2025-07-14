"use client";

import { Bell, Search } from "lucide-react";
import Input from "./Input";

type NavbarProps = {
  collapsed: boolean;
};

export default function Navbar({ collapsed }: NavbarProps) {
  const sidebarWidth = collapsed ? "w-14" : "w-64";

  return (
    <header
      className={`h-16 bg-gray-100 border-gray-200 border-b flex items-center px-4 fixed top-0 right-0 z-10 transition-all duration-300 ${
        collapsed ? "left-14" : "left-44"
      }`}
    >
      {/* Flex container inside navbar */}
      <div className="flex items-center justify-between w-full gap-4">
        {/* Left */}
        <div className="text-indigo-600 font-semibold text-lg whitespace-nowrap">
          Fleet Dashboard
        </div>

        {/* Center */}
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search vehicles, locations or IDs"
            icon={<Search size={16} />}
          />
        </div>

        {/* Right */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="relative">
            <Bell className="text-gray-600 cursor-pointer" size={25} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </div>
          <div className="flex items-center space-x-3 rounded-md bg-indigo-100 px-3 py-1 text-left leading-tight text-sm shadow-sm">
            {/* Profile Image */}
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Name and Email */}
            <div>
              <div className="font-bold text-indigo-600">test01</div>
              <div className="text-gray-600 text-xs">test@getfleet.ai</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
