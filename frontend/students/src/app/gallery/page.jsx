"use client";
import { Unbounded } from "next/font/google";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function page() {

  return (
    <section className="py-20 min-h-max relative">
      <div className="relative mx-auto pt-10 pb-0 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center space-y-8">
        <h1
          className={`text-gray-900 dark:text-white mx-auto max-w-5xl font-bold text-4xl/tight sm:text-5xl/tight lg:text-6xl/tight xl:text-7xl/tight ${unbounded.className}`}
        >
          <span className="inline bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 bg-clip-text font-display tracking-tight text-transparent">
            Shaping
          </span>{" "}
          Tomorrow's{" "}
          <span className="inline bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-400 to-indigo-900 bg-clip-text font-display tracking-tight text-transparent">
            Leaders
          </span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mx-auto max-w-2xl">
          Join Prayas IAS Academy – Where Excellence Meets Commitment. Prepare
          for UPSC and BPSC exams with top educators, comprehensive study
          materials, and personalized mentorship to elevate your civil services
          journey.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
          <div className="-m-1 flex flex-wrap md:-m-2 w-full">
            <div className="flex w-1/2 flex-wrap">
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://placehold.co/500x500"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://placehold.co/500x500"
                />
              </div>
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://placehold.co/500x500"
                />
              </div>
            </div>
            <div className="flex w-1/2 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://placehold.co/500x500"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://placehold.co/500x500"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src="https://placehold.co/500x500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
