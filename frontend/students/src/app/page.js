"use client";
import React from "react";
import { Unbounded } from "next/font/google";
import { ArrowRight, BookOpen, Scale, Trophy, Users, Book, Lightbulb, CheckCircle } from "lucide-react";
import RetroGrid from "@/components/magicui/retro-grid";
import { SwipeCarousel } from "@/components/system/SwipeCarousel";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Contact from "@/components/system/Contact";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <section className="w-full min-h-screen bg-gray-50 bg-[url('/hero-bg.svg')] bg-center bg-cover flex gap-y-6 flex-col items-center justify-center p-4">
        <h1
          className={`text-gray-900 dark:text-white text-center mx-auto max-w-6xl font-bold text-3xl/tight sm:text-5xl/tight lg:text-6xl/tight ${unbounded.className}`}
        >
          <span className="inline bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 bg-clip-text font-display tracking-tight text-transparent">
            Welcome
          </span>{" "}
          to{" "}
          <span className="inline bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-400 to-indigo-900 bg-clip-text font-display tracking-tight text-transparent">
            Prayas IAS Academy
          </span>
        </h1>
        <Badge className="text-2xl !bg-blue-500 !px-3 text-center">
          Learn From Renowned & Experienced Faculties
        </Badge>
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* UPSC Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 hover:bg-gray-100 transition-colors duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Scale className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">UPSC</h2>
              <p className="text-gray-600 mb-6">
                Prepare for the Union Public Service Commission exams. Your
                gateway to central government services.
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                Explore UPSC
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-200 mx-4"></div>

            {/* BPSC Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 hover:bg-gray-100 transition-colors duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">BPSC</h2>
              <p className="text-gray-600 mb-6">
                Prepare for the Bihar Public Service Commission exams. Your path
                to state government opportunities.
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
                Explore BPSC
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-max relative">
        <RetroGrid />
        <div className="relative mx-auto pt-20 pb-0 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center space-y-8">
          <h1
            className={`text-gray-900 dark:text-white mx-auto max-w-5xl font-bold text-4xl/tight sm:text-5xl/tight lg:text-6xl/tight xl:text-7xl/tight ${unbounded.className}`}
          >
            <span className="inline bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 bg-clip-text font-display tracking-tight text-transparent">
              Achieve
            </span>{" "}
            Your IAS Dream with the Best Guidance in{" "}
            <span className="inline bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-indigo-400 to-indigo-900 bg-clip-text font-display tracking-tight text-transparent">
              Patna
            </span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mx-auto max-w-2xl">
            Join Prayas IAS Academy – Where Excellence Meets Commitment. Prepare
            for UPSC and BPSC exams with top educators, comprehensive study
            materials, and personalized mentorship to elevate your civil
            services journey.
          </p>
          <div className="text-left grid lg:grid-cols-3 p-6 rounded-2xl backdrop-blur-3xl border-2 border-gray-200 dark:border-gray-800 max-w-7xl mx-auto lg:divide-x divide-y lg:divide-y-0 divide-gray-300 dark:divide-gray-800">
            <div className="flex items-start gap-6 lg:pr-6 pb-6 lg:pb-0">
              <div className="w-10">
                <span className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 flex w-max text-gray-800 dark:text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-gray-900 dark:text-white font-semibold text-lg">
                  Expert Faculty
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Our team of experienced IAS and BPSC mentors provides in-depth
                  knowledge, covering every aspect of the exam, ensuring you get
                  the best guidance and support throughout your journey.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 lg:px-6 py-6 lg:py-0">
              <div className="w-10">
                <span className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 flex w-max text-gray-800 dark:text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-gray-900 dark:text-white font-semibold text-lg">
                  Complete Study Materials
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Access well-researched and regularly updated study materials,
                  along with curated notes, to make your preparation more
                  focused and effective.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 pt-6 lg:pt-0 lg:pl-6">
              <div className="w-10">
                <span className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 flex w-max text-gray-800 dark:text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                    />
                  </svg>
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-gray-900 dark:text-white font-semibold text-lg">
                  Personalized Mentorship
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Receive tailored mentorship sessions to address your strengths
                  and weaknesses, ensuring that your preparation is aligned with
                  your goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-max flex flex-col justify-center items-start">
        <div className="container mx-auto">
          <SwipeCarousel />
        </div>
        <div className="container mx-auto grid md:grid-cols-2 grid-cols-1 gap-3 md:px-10 px-2">
          <CardSpotlight className="h-max w-full">
            <Card className="relative !bg-[rgba(225,225,225,0.1)] backdrop-blur-xl border-none">
              <Badge className="absolute -top-2 right-0 left-0 mx-auto w-min">
                English
              </Badge>
              <CardHeader>
                <CardTitle className="text-center">
                  Prayas IAS Academy
                </CardTitle>
                <CardDescription className="text-center">
                  Big Learnings Made Easy
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 text-center">
                <Button>General Studies</Button>
                <Button>Optional</Button>
                <Button>AIM</Button>
                <Button>Test Series</Button>
                <Button>CSAT Course</Button>
                <Button>Current Affairs</Button>
              </CardContent>
              <CardFooter className="flex justify-center items-center">
                <Button variant="secondary">Explore English Courses</Button>
              </CardFooter>
            </Card>
          </CardSpotlight>

          <CardSpotlight className="h-max w-full">
            <Card className="relative !bg-[rgba(225,225,225,0.1)] backdrop-blur-xl border-none">
              <Badge className="absolute -top-2 right-0 left-0 mx-auto w-min">
                हिंदी
              </Badge>
              <CardHeader>
                <CardTitle className="text-center">
                  Prayas IAS Academy
                </CardTitle>
                <CardDescription className="text-center">
                  बड़ी सीखें सरल बनाएं
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 text-center">
                <Button>सामान्य अध्ययन</Button>
                <Button>वैकल्पिक</Button>
                <Button>AIM (हिंदी)</Button>
                <Button>टेस्ट सीरीज</Button>
                <Button>CSAT कोर्स</Button>
                <Button>करेंट अफेयर्स</Button>
              </CardContent>
              <CardFooter className="flex justify-center items-center">
                <Button variant="secondary">हिंदी कोर्सेज देखें</Button>
              </CardFooter>
            </Card>
          </CardSpotlight>
        </div>
        <div className="container mx-auto overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s] mx-auto">
            <Badge>Delhi Centre</Badge>
            <Badge>Jaipur Centre</Badge>
            <Badge>Prayagraj Centre</Badge>
            <Badge>Bhopal Centre</Badge>
          </Marquee>
        </div>
      </section>
      <section className="min-h-max relative">
        <div className="px-8 pb-0 pt-16">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            Student's Testimonials
          </h4>

          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            Hear from our dedicated students about their transformative
            experiences. Each journey is unique, but the results speak for
            themselves: increased confidence, personalized mentorship, and a
            roadmap to success.
          </p>
          <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={people} />
          </div>
        </div>
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border-none bg-none">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-black"></div>
        </div>
      </section>
      <section className="min-h-max relative py-10 lg:py-20">
        <div className="px-8 mb-16">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            Elevate Your UPSC Journey with <br /> Unmatched Resources
          </h4>

          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            From expert mentorship to cutting-edge study materials, Prayas IAS
            Academy equips you with everything you need to conquer the UPSC and
            BPSC exams.
          </p>
          <div className="flex md:flex-row flex-col justify-center space-x-4 space-y-4 items-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800">
              <Trophy className="w-5 h-5 mr-2" />
              98% Success Rate
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800">
              <Users className="w-5 h-5 mr-2" />
              10,000+ Students Coached
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-lg border border-slate-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${
                index === 0 ? 'lg:col-span-2' : ''
              } ${index === 3 ? 'lg:col-span-3' : ''}`}
            >
              <feature.icon className="w-16 h-16 text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
}

const Skeleton = ({ gradient }) => (
  <div
    className={`flex flex-1 w-full h-full rounded-xl border border-transparent dark:border-white/[0.2] ${gradient} blur-3xl`}
  ></div>
);

const features = [
  {
    icon: Book,
    title: "Comprehensive Study Material",
    description: "Access meticulously curated content covering every aspect of the UPSC/BPSC syllabus, designed to give you a competitive edge in your preparation.",
    bulletPoints: [
      "Regularly updated study materials aligned with the latest exam patterns",
      "Extensive question banks with detailed explanations",
      "Specialized notes for quick revision and last-minute preparation",
      "Access to digital library with thousands of relevant e-books and journals"
    ]
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description: "Learn from a team of experienced educators and former civil servants who bring real-world insights and expertise to your preparation journey.",
    bulletPoints: [
      "Lectures by IAS, IPS, and other top-ranked officers",
      "One-on-one mentoring sessions with subject matter experts",
      "Guest lectures by prominent administrators and policymakers",
      "Regular doubt-clearing sessions and personalized guidance"
    ]
  },
  {
    icon: Trophy,
    title: "Proven Track Record",
    description: "Our consistently high success rate in UPSC and BPSC examinations speaks volumes about our teaching methodology and unwavering student support.",
    bulletPoints: [
      "Over 500 selections in various civil services in the last 5 years",
      "Rank holders in top 10 positions for consecutive years",
      "98% success rate in preliminary examinations",
      "Dedicated support for interview preparation and personality development"
    ]
  },
  {
    icon: Lightbulb,
    title: "Innovative Teaching Methods",
    description: "Experience a perfect blend of traditional and modern learning techniques designed to enhance your understanding, retention, and application of concepts.",
    bulletPoints: [
      "Interactive live online classes with real-time doubt resolution",
      "AI-powered personalized learning paths and performance analytics",
      "Virtual reality simulations for mock interviews and group discussions",
      "Gamified learning modules for engaging and effective study sessions",
      "Mobile app for on-the-go learning and quick revision"
    ]
  }
]

const reviews = [
  {
    name: "Ananya Sharma",
    username: "@ananya_civil_aspirant",
    body: "The personalized approach and focused study materials have completely transformed my preparation strategy. I finally feel confident about my UPSC journey!",
    img: "https://avatar.vercel.sh/ananya",
  },
  {
    name: "Rohit Kumar",
    username: "@rohit_ias_hustle",
    body: "This coaching truly goes above and beyond. The mentorship I received was exactly what I needed to stay motivated and on track. Highly recommend it!",
    img: "https://avatar.vercel.sh/rohit",
  },
  {
    name: "Priya Singh",
    username: "@priya_prepares",
    body: "The resources and guidance are unmatched. I owe so much of my progress to the faculty here who genuinely care about each student's success.",
    img: "https://avatar.vercel.sh/priya",
  },
  {
    name: "Amit Verma",
    username: "@amit_ias_dream",
    body: "What sets this place apart is the level of detail in their materials and the one-on-one sessions. It's like having a personal roadmap to success!",
    img: "https://avatar.vercel.sh/amit",
  },
  {
    name: "Simran Kaur",
    username: "@simran_scholar",
    body: "From daily quizzes to mock tests, the rigorous practice sessions have sharpened my skills beyond what I imagined. I feel ready for the challenge!",
    img: "https://avatar.vercel.sh/simran",
  },
  {
    name: "Aditya Patel",
    username: "@aditya_upsc_grind",
    body: "The dedication of the faculty is incredible. They don't just teach—they mentor, inspire, and push you to go beyond your limits.",
    img: "https://avatar.vercel.sh/aditya",
  },
];

const people = [
  {
    id: 1,
    name: "Ashok Kumar",
    designation: "IAS Officer - District Magistrate",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Neha Sharma",
    designation: "IPS Officer - Superintendent of Police",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Rajesh Singh",
    designation: "IRS Officer - Commissioner of Income Tax",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Anjali Verma",
    designation: "IFS Officer - Ambassador",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Arun Patel",
    designation: "IAS Officer - Chief Secretary",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Pooja Rao",
    designation: "IRS Officer - Deputy Commissioner",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-[400px] cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};
