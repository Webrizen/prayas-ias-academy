"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ChevronRight,
  GraduationCap,
  Trophy,
  CheckCircle2,
  FileText,
  CreditCard,
  ClipboardCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Admission Process",
    description: "Overview of the admission process",
    icon: <ClipboardCheck className="h-6 w-6" />,
    content:
      "The admission process consists of four main steps: filling out the application form, document verification, payment of fees, and final enrollment. Each step is crucial for securing your place in the desired course.",
  },
  {
    title: "Fill Form",
    description: "Complete the application form",
    icon: <FileText className="h-6 w-6" />,
    content:
      "Fill out the comprehensive application form with your personal details, academic history, and course preferences. Ensure all information is accurate and up-to-date to avoid any delays in the admission process.",
  },
  {
    title: "Document Verification",
    description: "Submit and verify your documents",
    icon: <CheckCircle2 className="h-6 w-6" />,
    content:
      "Upload all required documents such as academic transcripts, identification proof, and any additional certificates. Our team will verify these documents to ensure eligibility for the chosen course.",
  },
  {
    title: "Payment",
    description: "Pay the admission fees",
    icon: <CreditCard className="h-6 w-6" />,
    content:
      "Once your documents are verified, proceed to pay the admission fees. We offer various payment methods including credit/debit cards and bank transfers. Ensure to keep the payment receipt for your records.",
  },
];

export default function page() {
  const [course, setCourse] = useState("UPSC");
  const [mode, setMode] = useState("offline");
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-gray-900">
                Elevate Your <span className="text-blue-600">Career</span>
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Join the elite ranks of civil servants. Our premium coaching
                program is your gateway to success in UPSC and BPSC exams.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                <Trophy className="w-12 h-12 text-yellow-500 mr-4" />
                <div>
                  <h3 className="font-bold text-gray-900">98%</h3>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                <Users className="w-12 h-12 text-blue-500 mr-4" />
                <div>
                  <h3 className="font-bold text-gray-900">10,000+</h3>
                  <p className="text-sm text-gray-600">Students Enrolled</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                <GraduationCap className="w-12 h-12 text-green-500 mr-4" />
                <div>
                  <h3 className="font-bold text-gray-900">50+</h3>
                  <p className="text-sm text-gray-600">Expert Faculties</p>
                </div>
              </div>
            </div>

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Course Admission Wizard</CardTitle>
                <CardDescription>
                  Follow the steps to complete your admission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center ${
                          index <= currentStep
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.icon}
                        <span className="text-xs mt-1">{step.title}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {steps[currentStep].title}
                  </h3>
                  <p>{steps[currentStep].content}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  {isLastStep ? "Complete Enrollment" : "Next"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Begin Your Journey
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <p className="block text-sm font-medium text-gray-700">
                  Select Course
                </p>
                <div className="mt-1 flex space-x-4">
                  {["UPSC", "BPSC"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCourse(option)}
                      className={`px-4 py-2 rounded-md transition duration-300 ${
                        course === option
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="block text-sm font-medium text-gray-700">
                  Mode of Learning
                </p>
                <div className="mt-1 flex space-x-4">
                  {[
                    { value: "offline", label: "Offline" },
                    { value: "online", label: "Online (Mobile App)" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setMode(option.value)}
                      className={`px-4 py-2 rounded-md transition duration-300 ${
                        mode === option.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Number
                </label>
                <input
                  id="contact"
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your contact number"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-8 py-3 bg-blue-600 text-white rounded-md font-semibold text-lg shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center group"
              >
                Secure Your Spot Now
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
            <p className="mt-4 text-xs text-center text-gray-500">
              By submitting, you agree to our terms and privacy policy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
