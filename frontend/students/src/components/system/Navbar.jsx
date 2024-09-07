"use client";
import { useState } from "react";
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header
        className="bg-[rgba(225,225,225,0.1)] backdrop-blur-2xl sticky top-0"
        style={{ zIndex: "9" }}
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
            className={`lg:flex lg:flex-row flex-col justify-center md:relative absolute md:w-auto w-full left-0 right-0 md:top-auto top-16 z-50 text-sm items-center ${
              isMenuOpen
                ? "grid grid-cols-2 bg-white dark:bg-slate-900 p-4"
                : " hidden"
            }`}
          >
            <AnimatedLink title="Home" link="/" />
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="lg:inline-flex !bg-transparent dark:!bg-transparent !px-3 !py-0 rounded-full text-slate-700 dark:text-slate-300 dark:hover:text-blue-300 items-center hover:text-blue-500 justify-center hover:bg-slate-100 dark:hover:!bg-[rgba(225,225,225,0.1)]">
                    Courses
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2 flex flex-col gap-1 whitespace-nowrap bg-white dark:bg-transparent shadow-lg rounded-lg">
                    <Link href="/courses/ias-prelims" legacyBehavior passHref>
                      <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                        IAS Prelims Intensive Course
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/courses/ias-mains" legacyBehavior passHref>
                      <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                        IAS Mains Advanced Course
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/courses/ias-interview" legacyBehavior passHref>
                      <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                        IAS Interview Preparation Course
                      </NavigationMenuLink>
                    </Link>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="w-full px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                          Optional Subjects
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col w-full gap-0">
                          <Link
                            href="/courses/ias-geography"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              IAS Geography Optional Course
                            </NavigationMenuLink>
                          </Link>
                          <Link
                            href="/courses/ias-public-administration"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              IAS Public Administration Optional Course
                            </NavigationMenuLink>
                          </Link>
                          <Link
                            href="/courses/ias-sociology"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              IAS Sociology Optional Course
                            </NavigationMenuLink>
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="w-full px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                          Foundation Courses
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col w-full gap-0">
                          <Link
                            href="/courses/ias-foundation"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              IAS Foundation Course
                            </NavigationMenuLink>
                          </Link>
                          <Link
                            href="/courses/ias-ethics"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              IAS Ethics Course
                            </NavigationMenuLink>
                          </Link>
                          <Link
                            href="/courses/ias-essay"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              IAS Essay Writing Course
                            </NavigationMenuLink>
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="lg:inline-flex !bg-transparent dark:!bg-transparent !px-3 !py-0 rounded-full text-slate-700 dark:text-slate-300 dark:hover:text-blue-300 items-center hover:text-blue-500 justify-center hover:bg-slate-100 dark:hover:!bg-[rgba(225,225,225,0.1)]">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-2 flex flex-col gap-1 whitespace-nowrap bg-white dark:bg-transparent shadow-lg rounded-lg">
                    <Link
                      href="/resources/study-materials"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                        Study Materials
                      </NavigationMenuLink>
                    </Link>
                    <Link
                      href="/resources/personal-consultation"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                        Personal Consultation
                      </NavigationMenuLink>
                    </Link>
                    <Link
                      href="/resources/previous-papers"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                        Previous Years’ Papers
                      </NavigationMenuLink>
                    </Link>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="w-full px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                          Study Guides
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col w-full gap-0">
                          <Link
                            href="/resources/study-guides/general"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              General Study Guides
                            </NavigationMenuLink>
                          </Link>
                          <Link
                            href="/resources/study-guides/subject-wise"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              Subject-Wise Study Guides
                            </NavigationMenuLink>
                          </Link>
                          <Link
                            href="/resources/study-guides/current-affairs"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              Current Affairs Guides
                            </NavigationMenuLink>
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="w-full px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                          Tools & Templates
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col w-full gap-0">
                          <Link
                            href="/resources/tools/timemanagement"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              Time Management Tools
                            </NavigationMenuLink>
                          </Link>
                          <Link
                            href="/resources/tools/notes-template"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              Notes Templates
                            </NavigationMenuLink>
                          </Link>
                          <Link
                            href="/resources/tools/study-plans"
                            legacyBehavior
                            passHref
                          >
                            <NavigationMenuLink className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
                              Study Plans & Schedules
                            </NavigationMenuLink>
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
                      className="svg-elem-1"
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
                        d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                      />
                    </svg>
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
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
