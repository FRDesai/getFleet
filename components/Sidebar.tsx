"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Send,
  History,
  LineChart,
  Zap,
  ChevronLeft,
  ChevronRight,
  ChartNoAxesGantt,
} from "lucide-react";
import { useState } from "react";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    href: "/flights",
    label: "Flights",
    icon: <Send size={20} />,
  },
  {
    href: "/activity",
    label: "Activity",
    icon: <History size={20} />,
  },
  {
    href: "/trading",
    label: "Trading",
    icon: <LineChart size={20} />,
  },
  {
    href: "/power",
    label: "Power",
    icon: <Zap size={20} />,
  },
];
type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  // const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`h-full bg-white shadow-md fixed top-0 left-0 transition-all duration-300 z-20 ${
        collapsed ? "w-14" : "w-44"
      }`}
    >
      {/* Toggle Button */}
      <div className="relative">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center shadow"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {!collapsed && (
          <div className="p-4 text-xl font-bold">
            Get<span className="text-indigo-600">Fleet</span>
          </div>
        )}
      </div>

      {/* Plane Icon Section */}

      {collapsed && (
        <>
          <div className="flex flex-col items-center px-2 pt-4">
            <ChartNoAxesGantt />
             <hr className="border-t border-gray-200 my-3 w-full" />
            <div className="text-indigo-600">
              <Send size={20} fill="currentColor" />
            </div>
            <hr className="border-t border-gray-200 my-3 w-full" />
          </div>
        </>
      )}

      {/* Navigation Links */}
      <nav className="flex flex-col px-2 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link key={link.href} href={link.href}>
              <div
                className={`flex items-center space-x-2 p-2 rounded transition cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-blue-100 text-gray-500"
                }`}
              >
                <span
                  className={`${isActive ? "text-white" : "text-gray-500"}`}
                >
                  {link.icon}
                </span>
                {!collapsed && (
                  <span
                    className={`${isActive ? "text-white" : "text-gray-700"}`}
                  >
                    {link.label}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Divider Line */}
      <div className="absolute bottom-4 left-0 w-full px-2">
        <hr className="border-t border-gray-200" />
      </div>
    </aside>
  );
}
