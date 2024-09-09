import React from "react";
import { fetchCourseBySlug } from "@/utils/fetchCourses";
import Image from "next/image";
import { CalendarDays, CheckIcon, Clock, Globe, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { timeAgo } from "@/utils/timeAgo";

const Step = ({ title }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p>{title}</p>
    </li>
  );
};

export default async function page({ params }) {
  const course = await fetchCourseBySlug(params.slug);
  // Calculate discounted price and discount percentage
  const { amount } = course.feeStructure;
  const discountedPrice = amount - course.discounts;
  const discountPercentage = ((course.discounts / amount) * 100).toFixed(2);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">
              {course.title || "No title"}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {course.description || "No Description"}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {course.tags.map((tag) => (
                <Badge key={tag._id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Key Course Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {course.keyFeatures.map((feature, index) => (
                    <Step title={feature} key={index} />
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Course Schedule</CardTitle>
                <CardDescription>Plan your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                {course.schedule.map((scheduleItem, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm">
                        <p className="font-medium">Start Date</p>
                        <p className="text-muted-foreground">
                          {new Date(
                            scheduleItem.startDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="font-medium">End Date</p>
                        <p className="text-muted-foreground">
                          {new Date(scheduleItem.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="relative pt-4">
                      <div className="absolute top-0 left-0 w-full h-2 bg-muted rounded-full">
                        <div className="absolute top-0 left-0 w-1/3 h-full bg-blue-500 rounded-full" />
                      </div>
                      <div className="flex justify-between mt-2">
                        {Array.from({
                          length: Math.ceil(
                            (new Date(scheduleItem.endDate).getTime() -
                              new Date(scheduleItem.startDate).getTime()) /
                              (7 * 24 * 60 * 60 * 1000)
                          ),
                        }).map((_, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center"
                          >
                            <div className="w-2 h-2 rounded-full bg-blue-950 mb-1" />
                            <span className="text-xs text-muted-foreground">
                              W{index + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span>10 weeks</span>
                      <span>40 hours of content</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <h2 className="text-2xl font-semibold mb-4">Instructors</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {course.instructors.map((instructor) => (
                <div
                    key={instructor._id}
                    className="relative bg-gradient-blur rounded-lg overflow-hidden border border-slate-300 h-full"
                  >
                    <div className="h-32 bg-gradient-to-l from-slate-300 to-slate-400"></div>
                    <div className="absolute top-[35%] right-auto left-16 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                        <img
                          className="w-full h-full object-cover object-center"
                          src={
                            instructor.profilePicture ||
                            "https://placehold.co/500x500"
                          }
                          alt={instructor.firstName}
                        />
                      </div>
                    </div>
                    <div className="p-4 text-left relative z-10 mt-8">
                      <h3 className="text-xl font-semibold text-slate-700">
                        {instructor.firstName} {instructor.lastName}
                      </h3>
                      <p className="text-gray-400 mb-2 text-xs">
                        {instructor.experience[0]} years of experience
                      </p>
                      <p className="text-gray-400 mb-2 text-sm">
                        {instructor.bio}
                      </p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <Image
                  src={course.thumbnail || "https://placehold.co/600x400"}
                  alt="Course Thumbnail"
                  width={400}
                  height={200}
                  className="rounded-lg object-cover mb-4 aspect-video"
                />
                <CardTitle>Course Fee</CardTitle>
                <CardDescription>
                  Flexible payment options available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold">₹
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(discountedPrice)}</span>
                <span className="text-lg text-muted-foreground line-through">₹
                  {new Intl.NumberFormat("en-IN", {
                    maximumFractionDigits: 0,
                  }).format(course.feeStructure.amount)}</span>
                <span className="text-sm font-medium text-green-600">Save {discountPercentage}%</span>
              </div>
                <Button className="w-full mb-4">Enroll Now</Button>
                <Separator className="my-4" />
                <h3 className="font-semibold mb-2">This course includes:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {course.perks[0].split(",").map((perk, index) => (
                    <Step title={perk.trim()} key={index} />
                  ))}
                </ul>
                <Separator className="my-4" />
                <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
                  <p>Created: {timeAgo(course.createdAt)}</p>
                  <p>Last updated: {timeAgo(course.updatedAt)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
