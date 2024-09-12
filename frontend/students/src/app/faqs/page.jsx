"use client";
import { useState } from "react"
import { ChevronDownIcon, BookOpenIcon, SmartphoneIcon, AwardIcon, ClockIcon, UserIcon } from "lucide-react"

const faqs = [
  {
    question: "What courses do you offer?",
    answer: "We offer comprehensive courses for UPSC (Union Public Service Commission) and BPSC (Bihar Public Service Commission) examinations, catering to aspirants preparing for civil services.",
    icon: <BookOpenIcon className="h-5 w-5" />
  },
  {
    question: "Is there a mobile app available for online learning?",
    answer: "Yes, we have a dedicated mobile app that provides access to all our course materials, live classes, and practice tests. It's available for both iOS and Android devices.",
    icon: <SmartphoneIcon className="h-5 w-5" />
  },
  {
    question: "What is your success rate?",
    answer: "Over the last 5 years, we've maintained an average success rate of 68% for UPSC and 72% for BPSC examinations. Many of our students have secured top ranks in these competitive exams.",
    icon: <AwardIcon className="h-5 w-5" />
  },
  {
    question: "How long are the courses?",
    answer: "Our courses typically run for 12-18 months, depending on the exam and the student's preparation level. We also offer intensive 6-month crash courses for experienced candidates.",
    icon: <ClockIcon className="h-5 w-5" />
  },
  {
    question: "Do you offer personalized mentoring?",
    answer: "Yes, we provide one-on-one mentoring sessions with experienced faculty members. These sessions are designed to address individual doubts and provide personalized study strategies.",
    icon: <UserIcon className="h-5 w-5" />
  }
]

export default function page() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 ease-in-out"
            >
              <button
                className="flex items-center justify-between w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="flex items-center space-x-3">
                  {faq.icon}
                  <span className="font-medium">{faq.question}</span>
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}