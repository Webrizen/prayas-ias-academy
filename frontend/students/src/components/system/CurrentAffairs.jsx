import React from "react";

export default function CurrentAffairs() {
  return (
    <>
      <div className="text-center space-y-6 w-full mx-auto md:mx-0 md:text-left">
        <div className="text-center md:text-left space-y-5">
          <span className="rounded-lg bg-blue-100 dark:bg-gray-900 px-2.5 py-1 text-xs font-semibold tracking-wide text-blue-800 dark:text-gray-100">
          Daily Current Affairs
          </span>
          <h2 className="text-3xl font-semibold text-blue-950 dark:text-gray-200 md:text-4xl xl:text-5xl leading-tight">
            From our latest Current Affairs
          </h2>
        </div>
      </div>
    </>
  );
}
