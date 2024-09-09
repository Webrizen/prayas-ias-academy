"use client";
import React, { useEffect, useState } from 'react';
import { Book, Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from '@nextui-org/react';
import Link from 'next/link';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useCookies } from 'next-client-cookies';

interface Course {
    _id: number;
    title: string;
    description: string;
    category: string;
    instructors: string[];
    tags: string[];
    mode: string;
    enableLiveClasses: string;
    schedule: { startDate: string; endDate: string }[];
    keyFeatures: string[];
    fee: number;
    discount: number;
    perks: string;
    thumbnail: string;
}

export default function Page() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const cookies = useCookies();
    const jwtToken = cookies.get('jwt');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/courses`);
                if (Array.isArray(response.data.data)) {
                    setCourses(response.data.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                    setError('Failed to fetch courses. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Failed to fetch courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);
    
    const filteredCourses = (courses || []).filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );    

    const handleDelete = async (courseId: number) => {
        if (confirm('Are you sure you want to delete this course?')) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_BASEURL}/courses/${courseId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });
                toast.success("Course deleted successfully");
                setCourses(courses.filter(course => course._id !== courseId));
            } catch (error) {
                console.error('Error deleting course:', error);
                setError('Failed to delete course. Please try again later.');
                toast.error("Error deleting course");
            }
        }
    };

    return (
        <div className="p-4">
            <Toaster position='bottom-center' />
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Course Management</h1>
                <p className="text-gray-600">Manage your courses, edit details, and view course information.</p>
            </header>

            <div className="flex justify-between items-center mb-6 gap-x-3">
                <div className="relative w-full">
                    <Input
                        placeholder="Search courses..."
                        startContent={
                            <Search className="text-xl text-gray-400 pointer-events-none flex-shrink-0" />
                        }
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button asChild>
                    <Link href="/dashboard/courses/new"><Plus className="mr-2 h-4 w-4" /> Add New Course</Link>
                </Button>
            </div>

            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <div className="space-y-4">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <div key={course._id} className="p-4 border rounded-lg shadow-sm">
                                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                                <p className="text-gray-700 mb-4">{course.description}</p>
                                <div className="flex gap-x-2">
                                    <Button asChild>
                                        <Link href={`/dashboard/courses/${course._id}`}><Eye className="mr-2 h-4 w-4" /> View</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={`/dashboard/courses/edit/${course._id}`}><Edit className="mr-2 h-4 w-4" /> Edit</Link>
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleDelete(course._id)}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No courses found</div>
                    )}
                </div>
            )}
        </div>
    );
}