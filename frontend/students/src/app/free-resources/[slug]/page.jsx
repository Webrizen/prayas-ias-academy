import React from "react";
import { Book, FileText, Globe, PenTool, TestTube } from "lucide-react";
import PreviousYearQuestionPapers from "@/components/system/PreviousYearQuestionPapers";
import CurrentAffairs from "@/components/system/CurrentAffairs";
import { fetchCurrentAffair } from "@/utils/fetchCurrentAffairs";

const CurrentAffair = await fetchCurrentAffair();

const resources = [
  {
    title: "Previous Year Question Papers",
    description:
      "Access question papers from the last 5 years for UPSC and BPSC exams.",
    icon: FileText,
    slug: "previous-year-papers",
    component: <PreviousYearQuestionPapers/>,
  },
  {
    title: "Current Affairs",
    description:
      "Stay updated with the latest current affairs relevant to your exams.",
    icon: Globe,
    slug: "current-affairs",
    component: <CurrentAffairs CurrentAffair={CurrentAffair} />
  },
  {
    title: "Test Series",
    description:
      "Practice with our comprehensive test series to evaluate your preparation.",
    icon: TestTube,
    slug: "test-series",
  },
  {
    title: "Study Materials",
    description:
      "Access curated study materials covering all subjects for UPSC and BPSC.",
    icon: Book,
    slug: "study-materials",
  },
  {
    title: "Mock Tests",
    description:
      "Take full-length mock tests simulating the actual exam environment.",
    icon: PenTool,
    slug: "mock-tests",
  },
];

function getToolBySlug(slug) {
  return resources.find((resource) => resource.slug === slug);
}

export async function generateMetadata({ params }) {
  const tool = getToolBySlug(params.slug);
  return {
    title: tool.title,
    description: tool.description,
    publisher: "Webrizen",
  };
}

export default function page({ params }) {
  const resourcess = resources.find((resource) => resource.slug === params.slug);
  if (!resourcess) {
    return (
      <main className="flex-1">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[1fr_300px] lg:gap-12 lg:px-8 lg:py-20">
          <div className="w-full p-2 bg-[rgba(225,225,225,0.1)] backdrop-blur-2xl rounded-xl">
            <h1 className="p-4 md:text-6xl text-3xl font-bold">
              It seems like there's no such tool you're looking for!
            </h1>
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
      </main>
    );
  }
  return (
    <>
      <section className="flex-1 -z-50">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[1fr_300px] lg:gap-12 lg:px-8 lg:py-20">
          <div className="w-full p-2 bg-[rgba(225,225,225,0.1)] backdrop-blur-2xl rounded-xl">
            <div className="w-full p-4 flex flex-row justify-between items-center border-b-3 dark:border-b-slate-700 border-b-slate-300">
              <div className="flex flex-col text-left">
                <h1 className="md:text-xl text-xl font-bold">
                {resourcess.title || "NO resources Name Found"}
                </h1>
                <p className="text-sm font-light text-gray-700 dark:text-gray-300">
                {resourcess.description || "No resources Description Found"}
                </p>
              </div>
              <span className="w-min h-10 px-4 rounded-md dark:bg-[rgba(225,225,225,0.1)] bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(225,225,225,0.2)] hover:bg-[rgba(0,0,0,0.2)] cursor-pointer flex justify-center items-center">
                Share
              </span>
            </div>
            <div className="w-full p-4">{resourcess.component || "Loading..."}</div>
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
