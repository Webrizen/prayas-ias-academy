import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchCourses } from "@/utils/fetchCourses";
import Link from "next/link";
import { Calendar, Clock, DollarSign, IndianRupee } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingSkeleton() {
  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="w-full h-[200px] rounded-lg" />
          <Skeleton className="w-3/4 h-6 mt-4 rounded-lg" />
          <Skeleton className="w-1/2 h-6 mt-2 rounded-lg" />
          <Skeleton className="w-full h-[20px] mt-4 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default async function page() {
  const courses = await fetchCourses();
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto container px-6 lg:px-8">
          <div className="mx-auto text-center max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Our Expert-Led Courses
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Unlock your potential with our curated courses designed to
              inspire, educate, and equip you with real-world skills.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:max-w-7xl lg:grid-cols-3">
            <Suspense fallback={<LoadingSkeleton />}>
              {courses.map((course, index) => {
                // Calculate discounted price
                const originalPrice = course.feeStructure.amount;
                const discount = course.discounts || 0;
                const discountedPrice =
                  originalPrice - (originalPrice * discount) / 100;

                // Calculate weeks between startDate and endDate
                const startDate = new Date(course.schedule[0]?.startDate);
                const endDate = new Date(course.schedule[0]?.endDate);
                const diffTime = Math.abs(endDate - startDate);
                const weeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
                return (
                  <Link href={`/courses/${course.slug || null}`} key={index}>
                    <Card className="w-full h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                      <div className="relative">
                        <img
                          src={
                            course.thumbnail || "https://placehold.co/600x400"
                          }
                          alt="Course thumbnail"
                          className="w-full h-48 object-cover aspect-video bg-blue-100"
                        />
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                          {course.discounts || 0}% OFF
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary">
                          {course.title || "No Title"}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground line-clamp-3">
                          {course.description || "No Description"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(
                              course.schedule[0]?.startDate
                            ).toLocaleDateString()}
                          </span>
                          <span className="mx-3">-</span>
                          <span>
                            {new Date(
                              course.schedule[0]?.endDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{weeks || 0} weeks</span>
                          <span className="mx-3">•</span>
                          <Badge>{course.category.name || "NO Category"}</Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center bg-secondary/10 p-4">
                        <div className="flex items-center space-x-2">
                          <IndianRupee className="w-5 h-5 text-primary" />
                          <span className="text-2xl font-bold text-primary">
                            {new Intl.NumberFormat("en-IN", {
                              maximumFractionDigits: 0,
                            }).format(discountedPrice)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            INR
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
                          Enroll Now
                        </button>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </Suspense>
          </div>
        </div>
      </div>

      <pre className="mt-2 w-3xl h-[500px] rounded-md bg-slate-950 p-4 overflow-auto">
        <code className="text-white">{JSON.stringify(courses, null, 2)}</code>
      </pre>
    </>
  );
}
