"use client";
import React, { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.png";
import Image from "next/image";

interface SidebarItem {
  href: string;
  title: string;
  icon: ReactNode;
}

interface SidebarProps {
  className?: string;
  items: SidebarItem[];
}

export default function Sidebar({ className, items, ...props }: SidebarProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-2 left-4 z-50 p-2.5 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
          />
        </svg>
      </button>
      <aside
        className={cn(
          "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 h-[85vh] py-3 overflow-hidden transition-all lg:-translate-x-0 border dark:border-[rgba(225,225,225,0.3)] border-slate-400 rounded-xl flex-col justify-between px-4 lg:transition-none ease-linear md:sticky fixed top-[60px] mt-6 z-50",
          isSidebarOpen ? "translate-x-0" : "-translate-x-[110%]",
          className
        )}
        {...props}
      >
        <div className="min-h-max py-2 border-b border-b-gray-100 dark:border-b-gray-900">
          <Link
            href="/"
            className="flex items-center gap-x-3 font-semibold text-sm text-gray-800 dark:text-gray-200"
          >
            <Image src={Logo} alt="Logo" width={500} height={500} className="w-10 h-10" />
            Prayas IAS Academy For Operations
          </Link>
        </div>
        <nav className="flex-1 pt-6">
          <ul className="text-gray-700 dark:text-gray-300 space-y-3">
            {items.map((item) => (
              <li
                className={cn(
                  pathname === item.href
                    ? "before:bg-[#00aeef]"
                    : "hover:bg-[rgba(225,225,225,0.3)]",
                  "relative before:absolute before:-left-4 before:w-1.5 before:h-4/5 before:rounded-r-md before:top-1/2 before:-translate-y-1/2 "
                )}
                key={item.href}
              >
                <Link
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? "text-[#00aeef] bg-gray-50 dark:bg-gray-900/80"
                      : "hover:bg-[rgba(225,225,225,0.01)] rounded-md",
                    "justify-start flex items-center px-4 py-2.5 gap-x-3 rounded-md"
                  )}
                  onClick={closeSidebar}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}