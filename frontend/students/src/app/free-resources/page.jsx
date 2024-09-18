import { Book, FileText, Globe, PenTool, TestTube } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Free UPSC & BPSC Study Resources",
  description:
    "Access comprehensive free study materials for UPSC and BPSC exams. Previous year papers, current affairs, test series, and more to boost your exam preparation.",
  openGraph: {
    title: "Free UPSC & BPSC Study Resources",
    description:
      "Access comprehensive free study materials for UPSC and BPSC exams. Previous year papers, current affairs, test series, and more to boost your exam preparation.",
  },
};

const FeatureItem = ({ title, description, slug, icon: Icon, key }) => {
  return (
    <div key={key} className="flex flex-col justify-between space-y-4 bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.02)] hover:backdrop-blur-xl transition-all p-4 h-full rounded relative">
      <h1 className="flex text-lg font-semibold capitalize text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-sm font-light text-gray-700 dark:text-gray-300">
        {description}
      </p>
      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4 absolute right-2 left-auto bottom-2 top-auto">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <Link
        href={`/free-resources/${slug}`}
        className="text-sky-700 dark:text-sky-500 flex items-center gap-x-3 w-full"
      >
        Access Now
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
};

const resources = [
  {
    title: "Previous Year Question Papers",
    description:
      "Access question papers from the last 5 years for UPSC and BPSC exams.",
    icon: FileText,
    slug: "previous-year-papers",
  },
  {
    title: "Current Affairs",
    description:
      "Stay updated with the latest current affairs relevant to your exams.",
    icon: Globe,
    slug: "current-affairs",
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

const page = () => {
  return (
    <section className="py-20 bg-[url('/bg-steps.svg')] bg-right-top bg-cover bg-no-repeat">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <div className="flex flex-col gap-5">
          <div className="space-y-4 max-w-6xl">
            <span className="rounded-lg bg-blue-50 dark:bg-gray-900 px-2.5 py-1 text-xs font-semibold tracking-wide text-sky-800 dark:text-gray-100">
              Free Learning Resources
            </span>
            <h1 className="text-3xl font-semibold text-blue-950 dark:text-gray-200 md:text-6xl leading-tight">
              Streamline your Study and simplify your preparation.
            </h1>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Explore our collection of free online learning resources designed to
            elevate your brain functionality and learning experience. From , we
            have everything you need to enhance your knowladge.
          </p>
        </div>
        <div className="mt-16 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10 xl:gap-14">
          <div className="w-full lg:items-center grid sm:grid-cols-4 gap-4">
            {resources.map((resource) => (
              <FeatureItem key={resource.id} {...resource} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
