"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RoutePath } from "../entities/RoutePath";

interface SidebarProps {
  items: RoutePath[];
}

const Sidebar: React.FC<SidebarProps> = ({ items = [] }) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className="bg-white min-h-128 w-fit md:w-52 border-r border-gray-300 py-4 px-2">
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex flex-row align-center hover:bg-gray-100 py-2 px-1 md:px-4 cursor-pointer rounded-md ${
              path === item?.route ? " text-primaryColor" : ""
            }`}
            onClick={() => router.push(item?.route)}
          >
            <item.icon className="pr-1" fontSize="medium"></item.icon>
            <div className="font-light text-sm hidden md:block">
              {item?.label}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
