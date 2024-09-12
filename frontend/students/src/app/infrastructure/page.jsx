"use client";
import { useState, useEffect } from "react";
import {
  Building2,
  Users,
  Laptop,
  BookOpen,
  Award,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function page() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentFacultyIndex, setCurrentFacultyIndex] = useState(0);

  const infrastructureItems = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Modern Classrooms",
      description:
        "Spacious, well-lit classrooms equipped with smart boards for interactive learning",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Faculty",
      description:
        "Experienced educators dedicated to guiding you through UPSC and BPSC preparations",
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Online Learning Platform",
      description:
        "Access courses anytime, anywhere through our user-friendly mobile app",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Extensive Library",
      description:
        "A vast collection of study materials, books, and periodicals for comprehensive preparation",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Mock Tests & Evaluations",
      description:
        "Regular assessments to track your progress and improve performance",
    },
    {
      icon: <PhoneCall className="h-8 w-8" />,
      title: "24/7 Support",
      description:
        "Round-the-clock assistance for both offline and online students",
    },
  ];

  const facultyMembers = [
    {
      name: "Dr. Rajesh Kumar",
      position: "UPSC Expert",
      image: "https://placehold.co/500x500",
      description:
        "With over 15 years of experience in UPSC coaching, Dr. Kumar has guided numerous successful candidates.",
    },
    {
      name: "Prof. Anita Sharma",
      position: "BPSC Specialist",
      image: "https://placehold.co/500x500",
      description:
        "A former BPSC topper herself, Prof. Sharma brings practical insights to her teaching methodology.",
    },
    {
      name: "Mr. Vikram Singh",
      position: "Current Affairs Expert",
      image: "https://placehold.co/500x500",
      description:
        "Mr. Singh's daily current affairs sessions are a favorite among students preparing for both UPSC and BPSC.",
    },
    {
      name: "Dr. Meera Patel",
      position: "Economics Faculty",
      image: "https://placehold.co/500x500",
      description:
        "With a Ph.D. in Economics, Dr. Patel simplifies complex economic concepts for aspirants.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFacultyIndex(
        (prevIndex) => (prevIndex + 1) % facultyMembers.length
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextFaculty = () => {
    setCurrentFacultyIndex(
      (prevIndex) => (prevIndex + 1) % facultyMembers.length
    );
  };

  const prevFaculty = () => {
    setCurrentFacultyIndex(
      (prevIndex) =>
        (prevIndex - 1 + facultyMembers.length) % facultyMembers.length
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center mb-4">
          Our Infrastructure
        </h2>
        <p className="text-xl text-gray-700 text-center mb-16 font-light">
          Empowering aspirants for{" "}
          <span className="font-semibold text-indigo-600">5 years</span> with
          state-of-the-art facilities
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {infrastructureItems.map((item, index) => (
            <InfrastructureItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
        <Testimonial />

        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center mt-20 mb-4">
          Our Expert Faculty
        </h2>
        <p className="text-xl text-gray-700 text-center mb-16 font-light">
          Learn from the best in the field
        </p>
        <div className="relative">
          <button
            onClick={prevFaculty}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-75 transition duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={nextFaculty}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 z-10 hover:bg-opacity-75 transition duration-300"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentFacultyIndex * 100}%)`,
              }}
            >
              {facultyMembers.map((faculty, index) => (
                <FacultyMember key={index} {...faculty} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfrastructureItem({
  icon,
  title,
  description,
  isHovered,
  onHover,
  onLeave,
}) {
  return (
    <div
      className={`bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform ${
        isHovered ? "scale-105 shadow-xl" : ""
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors duration-300 ${
          isHovered
            ? "bg-gradient-to-r from-purple-500 to-pink-500"
            : "bg-indigo-100"
        }`}
      >
        <div
          className={`transition-colors duration-300 ${
            isHovered ? "text-white" : "text-indigo-600"
          }`}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Testimonial() {
  return (
    <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 text-center">
      <div className="text-4xl text-indigo-600 mb-4">"</div>
      <p className="text-xl text-gray-700 mb-4">
        The infrastructure at this institute is top-notch. From the
        well-equipped classrooms to the comprehensive online platform, every
        aspect is designed for success.
      </p>
      <div className="font-semibold text-gray-900">Priya Sharma</div>
      <div className="text-indigo-600">UPSC 2022 Rank 56</div>
    </div>
  );
}

function FacultyMember({ name, position, image, description }) {
  return (
    <div className="w-full flex-shrink-0 px-4">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="w-full h-full p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{name}</h3>
          <div className="text-indigo-600 mb-4">{position}</div>
          <p className="text-gray-600">{description}</p>
          <div className="grid gap-6 sm:grid-cols-2 mt-10">
            <a
              href="tel:+243"
              className="flex gap-x-6 items-start bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.08)] justify-center p-2 rounded-lg"
              rel="noreferer"
            >
              <span className="p-3 md:p-3.5 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex w-max">
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
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </span>
              <div className="space-y-0.5 flex flex-col flex-1">
                <p className="text-foreground">Call us</p>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">
                  +243 xx xx xx xxx
                </p>
              </div>
            </a>
            <a
              href="mailto:"
              className="flex gap-x-6 items-start bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.08)] justify-center p-2 rounded-lg"
              rel="noreferer"
            >
              <span className="p-3 md:p-3.5 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex w-max">
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
                    d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                  />
                </svg>
              </span>
              <div className="space-y-0.5 flex flex-col flex-1">
                <p className="text-foreground">Send us a mail</p>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">
                  +243 xx xx xx xxx
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
