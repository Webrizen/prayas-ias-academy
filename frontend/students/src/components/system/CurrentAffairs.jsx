"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { timeAgo } from "@/utils/timeAgo";

export default function CurrentAffairs({ CurrentAffair }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // Filter current affairs based on search term and selected date
  const filteredAffairs = CurrentAffair.filter((affair) => {
    const matchesSearch =
      affair?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affair?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affair?.categories?.some(category =>
        category?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesDate = selectedDate
      ? format(new Date(affair.publishedAt), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <>
      <div className="text-center space-y-6 w-full mx-auto md:mx-0 md:text-left">
        {/* Title and Introduction */}
        <div className="text-center md:text-left space-y-5">
          <span className="rounded-lg bg-blue-100 dark:bg-gray-900 px-2.5 py-1 text-xs font-semibold tracking-wide text-blue-800 dark:text-gray-100">
            Daily Current Affairs
          </span>
          <h2 className="text-3xl font-semibold text-blue-950 dark:text-gray-200 md:text-4xl xl:text-5xl leading-tight">
            From our latest Current Affairs
          </h2>
        </div>

        {/* Search and Date Filter */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full">
            <Input
              placeholder="Search current affairs..."
              variant="underline"
              value={searchTerm}
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-min whitespace-nowrap justify-start text-left font-normal ${
                  !selectedDate && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Render No Results if Nothing is Found */}
        {filteredAffairs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl font-semibold">No results found.</p>
            <p className="text-gray-500">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAffairs.map((affair, index) => (
              <Link
                key={affair?._id}
                href={`/free-resources/current-affairs/${affair?.slug?.current}`}
              >
                <Card
                  className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    index % 2 === 0 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <CardTitle className="text-lg">{affair?.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-left gap-2 items-center">
                      <span className="text-xs">
                        By {affair?.author?.name || "Unknown"}
                      </span>
                      <span>·</span>
                      <span className="text-xs">
                        Posted {timeAgo(affair?.publishedAt)}
                      </span>
                    </div>
                    <p className="text-md line-clamp-4">
                      {affair?.description || "No description available."}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}