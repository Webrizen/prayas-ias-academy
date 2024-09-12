"use client";
import { useState } from 'react'
import { Bell, Filter, ChevronDown } from 'lucide-react';

const notifications = [
  {
    id: 1,
    date: '2023-05-15',
    title: 'UPSC Prelims 2023 Date Announced',
    description: 'The UPSC Prelims 2023 exam is scheduled for September 24, 2023. Prepare accordingly.',
    course: 'UPSC',
    type: 'Important'
  },
  {
    id: 2,
    date: '2023-05-10',
    title: 'New BPSC Study Material Available',
    description: 'Updated study materials for BPSC Mains 2023 are now available in the app. Download them now!',
    course: 'BPSC',
    type: 'General'
  },
  {
    id: 3,
    date: '2023-05-05',
    title: 'Mock Test Series for UPSC CSE',
    description: 'Join our comprehensive mock test series for UPSC CSE starting from June 1, 2023.',
    course: 'UPSC',
    type: 'Important'
  },
  {
    id: 4,
    date: '2023-04-28',
    title: 'BPSC Interview Preparation Workshop',
    description: 'Attend our exclusive BPSC interview preparation workshop on May 20-21, 2023.',
    course: 'BPSC',
    type: 'General'
  },
  {
    id: 5,
    date: '2023-04-20',
    title: 'UPSC Essay Writing Contest',
    description: 'Participate in our UPSC essay writing contest and win exciting prizes. Last date: May 31, 2023.',
    course: 'UPSC',
    type: 'General'
  }
]

export default function NotificationsPage() {
  const [courseFilter, setCourseFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const filteredNotifications = notifications.filter(
    (notification) =>
      (courseFilter === 'All' || notification.course === courseFilter) &&
      (typeFilter === 'All' || notification.type === typeFilter)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold mb-4 md:mb-0">Notifications</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="All">All Courses</option>
                <option value="UPSC">UPSC</option>
                <option value="BPSC">BPSC</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Important">Important</option>
                <option value="General">General</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{notification.date}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  notification.type === 'Important' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {notification.type}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{notification.title}</h3>
              <p className="text-gray-600">{notification.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  notification.course === 'UPSC' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {notification.course}
                </span>
                <button className="text-primary hover:text-primary-dark transition-colors duration-200">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}