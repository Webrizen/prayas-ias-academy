import { Search, Book, Scale, FileText, HelpCircle, AlertTriangle, Shield, Users } from 'lucide-react';
import { Input } from '@nextui-org/react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function page() {
  const legalCategories = [
    { slug: "student-rights", title: "Student Rights", icon: <Users className="h-6 w-6" />, color: "bg-blue-500" },
    { slug: "academic-policies", title: "Academic Policies", icon: <Book className="h-6 w-6" />, color: "bg-green-500" },
    { slug: "campus-regulations", title: "Campus Regulations", icon: <AlertTriangle className="h-6 w-6" />, color: "bg-yellow-500" },
    { slug: "privacy-policies", title: "Privacy Policies", icon: <Shield className="h-6 w-6" />, color: "bg-purple-500" },
    { slug: "disciplinary-procedures", title: "Disciplinary Procedures", icon: <Scale className="h-6 w-6" />, color: "bg-red-500" },
    { slug: "contracts-and-agreements", title: "Contracts & Agreements", icon: <FileText className="h-6 w-6" />, color: "bg-indigo-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Legal Knowledge Hub</h1>
        
        <div className="max-w-xl mx-auto mb-12">
          <div className="flex items-center bg-white rounded-lg border border-slate-300 overflow-hidden">
            <Input 
              className="flex-grow border-none focus:ring-0" 
              placeholder="Search legal topics..."
              radius='none'
              type="search"
            />
            <Button variant="ghost">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {legalCategories.map((category, index) => (
            <Link href={`/legal/${category.slug}`} key={index} className="block">
            <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className={`p-5 ${category.color}`}>
                <div className="flex items-center justify-between">
                  <div className="text-white text-xl font-semibold">{category.title}</div>
                  {category.icon}
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 mb-4">Access important information about {category.title.toLowerCase()} and related legal matters.</p>
                <Button className="w-full" variant="outline">Explore</Button>
              </div>
            </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Need Legal Assistance?</h2>
          <p className="text-gray-600 mb-4">Our legal team is here to help you navigate any complex issues or provide personalized advice.</p>
          <Button className="w-full sm:w-auto">
            <HelpCircle className="mr-2 h-4 w-4" />
            Contact Legal Support
          </Button>
        </div>
      </div>
    </div>
  )
}