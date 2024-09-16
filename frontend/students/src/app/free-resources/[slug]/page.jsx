import React from "react";

export default function page({ slug }) {
  return (
    <>
      <section className="flex-1">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[1fr_300px] lg:gap-12 lg:px-8 lg:py-20">
          <div className="w-full p-2 bg-[rgba(225,225,225,0.1)] backdrop-blur-2xl rounded-xl">
            <div className="w-full p-4 flex flex-row justify-between items-center border-b-3 dark:border-b-slate-700 border-b-slate-300">
              <div className="flex flex-col text-left">
                <h1 className="md:text-xl text-xl font-bold">
                  Free Resources Name
                </h1>
                <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                  Description
                </p>
              </div>
              <span className="w-min h-10 px-4 rounded-md dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.2)] hover:bg-[rgba(0,0,0,0.2)] cursor-pointer flex justify-center items-center">
                Share
              </span>
            </div>
            <div className="w-full p-4">Loading...</div>
          </div>
          <div className="space-y-6">
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <img
                src="https://placehold.co/600x400?text=Advertisement"
                alt="happy team"
                width={1850}
                height={1200}
                className="w-full lg:inset-x-0 object-cover lg:h-full rounded-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
