import { notFound } from "next/navigation";
import { ChevronLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { legalCategories } from "@/utils/legalCategories";

export default function LegalCategoryPage({ params }) {
  const category = legalCategories[params.slug];

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/legal"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Legal Knowledge Hub
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          {category.title}
        </h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <p className="text-gray-700 mb-6">{category.content}</p>
            <h2 className="text-2xl font-semibold mb-4">Key Points</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              {category.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <h2 className="text-2xl font-semibold mb-4">Related Documents</h2>
            <ul className="space-y-2">
              {category.relatedDocuments.map((doc, index) => (
                <li key={index}>
                  <Link
                    href={doc.link}
                    className="text-blue-600 hover:underline"
                  >
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Need Assistance with {category.title}?
          </h2>
          <p className="text-gray-600 mb-4">
            Our legal team is here to help you navigate any complex issues or
            provide personalized advice regarding {category.title.toLowerCase()}
            .
          </p>
          <Button className="w-full sm:w-auto">
            <HelpCircle className="mr-2 h-4 w-4" />
            Contact Legal Support
          </Button>
        </div>
      </div>
    </div>
  );
}
