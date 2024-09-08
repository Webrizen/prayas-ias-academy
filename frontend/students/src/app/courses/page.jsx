import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchCourses } from "@/utils/fetchCourses";
import Link from "next/link";
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
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <Suspense fallback={<LoadingSkeleton />}>
              {courses.map((course, index) => (
                <Link href={`/courses/${course.slug || null}`} key={index}>
                  <Card className="relative w-full rounded-lg h-full">
                    <CardContent className="w-full p-0 overflow-hidden">
                      <div className="w-full h-[200px] overflow-hidden">
                        <img
                          src={
                            course.thumbnail || "https://placehold.co/600x400"
                          }
                          alt="courses thambnail"
                          width={600}
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=="
                          height={400}
                          className="w-full h-full object-cover bg-blue-100 rounded-t-lg"
                        />
                      </div>
                      <Badge className="absolute top-2 left-auto right-2">
                        {course.category.name || "NO Category"}
                      </Badge>
                      <Badge className="absolute px-5 py-2 -top-4 left-3 bg-gradient-to-l from-amber-400 via-orange-500 to-red-600">
                        ₹{course.feeStructure.amount || "0"}
                      </Badge>
                    </CardContent>
                    <CardHeader>
                      <CardTitle>{course.title || "No Title"}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description || "No Description"}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </Suspense>
          </div>
        </div>
      </div>

      {/* <pre className="mt-2 w-3xl h-[500px] rounded-md bg-slate-950 p-4 overflow-auto">
        <code className="text-white">{JSON.stringify(courses, null, 2)}</code>
      </pre> */}
    </>
  );
}
