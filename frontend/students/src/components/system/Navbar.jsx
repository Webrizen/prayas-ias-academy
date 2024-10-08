"use client";
import { useCallback, useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnimatedLink from "@/components/helpers/AnimatedLink";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { Book, FileText, Globe, PenTool, TestTube } from "lucide-react";
import { fetchCourseTitlesAndSlugs } from "@/utils/fetchCourses";
import { Spinner } from "@nextui-org/spinner";

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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadCourses = useCallback(async () => {
    try {
      const courseData = await fetchCourseTitlesAndSlugs();
      setCourses(courseData.slice(0, 6));
    } catch (error) {
      console.error("Failed to fetch course data:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return (
    <>
      <header
        className="bg-[rgba(225,225,225,0.1)] backdrop-blur-2xl"
        style={{ zIndex: 9999999 }}
      >
        <div className="container mx-auto flex flex-row flex-wrap p-3 justify-between items-center">
          <Link
            href="/"
            className="h-10 w-auto flex gap-2 justify-start md:mr-8 items-center p-1 rounded-md hover:bg-[rgba(225,225,225,0.05)]"
          >
            <Image
              src={Logo}
              placeholder="blur"
              alt="PRAYAS IAS ACADEMY Logo"
              width={500}
              height={500}
              className="h-full w-auto"
            />
            <span className="md:block hidden text-sm">Prayas IAS Academy</span>
          </Link>
          <nav
            className={`hidden lg:flex lg:flex-row flex-col justify-center md:relative absolute md:w-auto w-full left-0 right-0 md:top-auto top-16 z-50 text-sm items-center`}
          >
            <AnimatedLink title="Home" link="/" />
            <AnimatedLink title="About" link="/about" />
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="lg:inline-flex !bg-transparent dark:!bg-transparent !px-3 !py-0 rounded-full text-slate-700 dark:text-slate-300 dark:hover:text-blue-300 items-center hover:text-blue-500 justify-center hover:bg-slate-100 dark:hover:!bg-[rgba(225,225,225,0.1)]">
                    <Link href="/courses">Courses</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2 flex flex-col gap-1 whitespace-nowrap bg-white dark:bg-transparent shadow-lg rounded-lg">
                    {isLoading ? (
                      <div className="flex justify-center gap-3 items-center w-full">
                        <Spinner size="sm" />
                        <span className="text-sm">Loading :/</span>
                      </div>
                    ) : hasError ? (
                      <p className="text-red-500">Failed to load courses</p>
                    ) : (
                      courses.map((course) => (
                        <Link
                          key={course.slug}
                          href={`/courses/${course.slug}`}
                          legacyBehavior
                          passHref
                        >
                          <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                            {course.title}
                          </NavigationMenuLink>
                        </Link>
                      ))
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="lg:inline-flex !bg-transparent dark:!bg-transparent !px-3 !py-0 rounded-full text-slate-700 dark:text-slate-300 dark:hover:text-blue-300 items-center hover:text-blue-500 justify-center hover:bg-slate-100 dark:hover:!bg-[rgba(225,225,225,0.1)]">
                    <Link href="/free-resources">Free Resources</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2 flex flex-col gap-1 whitespace-nowrap bg-white dark:bg-transparent shadow-lg rounded-lg">
                    {resources.map((resource) => (
                      <Link
                        href={`/free-resources/${resource.slug}`}
                        key={resource.slug}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                          {resource.title}
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <AnimatedLink title="Blogs" link="/blogs" />
            <AnimatedLink title="Contact" link="/contact" />
          </nav>

          <div className="flex justify-end items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <span className="sr-only">Make Call</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50">
                <DropdownMenuItem>+91 8818810183</DropdownMenuItem>
                <DropdownMenuItem>+91 8818810184</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    भाषा
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Hindi</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="relative inline-flex overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-950 backdrop-blur-3xl">
                Download App
              </span>
            </Button>
            <button
              className="inline-flex w-10 h-10 justify-center items-center hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
          <nav
            className={`lg:hidden ${isMenuOpen ? "grid" : "hidden"} w-full grid-cols-2 gap-2 bg-white border-b border-b-slate-400 py-4 px-2 z-50`}
            style={{ zIndex: 99999999999999 }}
          >
            <AnimatedLink title="Home" link="/" />
            <AnimatedLink title="About" link="/about" />
            <AnimatedLink title="Blogs" link="/blogs" />
            <AnimatedLink title="Contact" link="/contact" />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="w-full px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                  Courses
                </AccordionTrigger>
                <AccordionContent className="flex flex-col w-full gap-0">
                  {isLoading ? (
                    <div className="flex justify-center gap-3 items-center w-full">
                      <Spinner size="sm" />
                      <span className="text-sm">Loading :/</span>
                    </div>
                  ) : hasError ? (
                    <p className="text-red-500">Failed to load courses</p>
                  ) : (
                    courses.map((course) => (
                      <Link key={course.slug} href={`/courses/${course.slug}`}>
                        <Button variant="ghost">{course.title}</Button>
                      </Link>
                    ))
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-2">
                <AccordionTrigger className="w-full px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                  Free Resources
                </AccordionTrigger>
                <AccordionContent className="flex flex-col w-full gap-0">
                  {resources.map((resource) => (
                    <Link
                      key={resource.slug}
                      href={`/resources/${resource.slug}`}
                      passHref
                    >
                      <Button variant="ghost">
                        <resource.icon className="w-4 h-4 mr-2" />{" "}
                        {resource.title}
                      </Button>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
        </div>
      </header>
    </>
  );
}
