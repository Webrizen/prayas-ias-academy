"use client";
import React, { useState } from 'react';
import { Book, Edit, Eye, MoreVertical, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input, Textarea } from '@nextui-org/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from 'next/link';

interface Course {
    id: number;
    title: string;
    instructor: string;
    students: number;
    rating: number;
    status: 'Active' | 'Inactive';
}

interface CoursesManagementProps {
    // Define any props if needed
}

interface EditCourse extends Partial<Course> {
    id: number;
}

// Sample course data
const initialCourses: Course[] = [
    { id: 1, title: "Introduction to React", instructor: "John Doe", students: 150, rating: 4.8, status: "Active" },
    { id: 2, title: "Advanced JavaScript Concepts", instructor: "Jane Smith", students: 120, rating: 4.7, status: "Active" },
    { id: 3, title: "Python for Data Science", instructor: "Bob Johnson", students: 200, rating: 4.9, status: "Active" },
    { id: 4, title: "UX/UI Design Fundamentals", instructor: "Alice Brown", students: 80, rating: 4.5, status: "Inactive" },
    { id: 5, title: "Machine Learning Basics", instructor: "Charlie Wilson", students: 100, rating: 4.6, status: "Active" },
];

export default function page() {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [editingCourse, setEditingCourse] = useState<EditCourse | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
    const [viewingCourse, setViewingCourse] = useState<Course | null>(null);

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (course: Course) => {
        setEditingCourse({ ...course });
        setIsEditDialogOpen(true);
    };

    const handleView = (course: Course) => {
        setViewingCourse(course);
        setIsViewDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    const handleSaveEdit = (editedCourse: EditCourse) => {
        if (editedCourse.id !== undefined) {
            setCourses(courses.map(course => course.id === editedCourse.id ? { ...course, ...editedCourse } : course));
            setIsEditDialogOpen(false);
        }
    };

    return (
        <div className="p-0">
            <Card>
                <CardHeader>
                    <CardTitle>Course Management</CardTitle>
                    <CardDescription>Manage your courses, edit details, and view course information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4 gap-x-3">
                        <div className="relative w-full">
                            <Input
                                placeholder="Search courses..."
                                startContent={
                                    <Search className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                  }
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button asChild>
                            <Link href="/dashboard/courses/new"><Plus className="mr-2 h-4 w-4" /> Add New Course</Link>
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Instructor</TableHead>
                                <TableHead>Students</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCourses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell>{course.title}</TableCell>
                                    <TableCell>{course.instructor}</TableCell>
                                    <TableCell>{course.students}</TableCell>
                                    <TableCell>{course.rating}</TableCell>
                                    <TableCell>{course.status}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleView(course)}>
                                                    <Eye className="mr-2 h-4 w-4" /> View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleEdit(course)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(course.id)} className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Edit Course Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>Make changes to the course details here.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Input
                                id="title"
                                label="Title"
                                value={editingCourse?.title ?? ''}
                                onChange={(e) => setEditingCourse((prev: any) => prev ? { ...prev, title: e.target.value } : null)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Input
                                id="instructor"
                                label="Instructor"
                                value={editingCourse?.instructor ?? ''}
                                onChange={(e) => setEditingCourse((prev: any) => prev ? { ...prev, instructor: e.target.value } : null)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="status" className="text-right">
                                Status
                            </label>
                            <select
                                id="status"
                                value={editingCourse?.status ?? 'Active'}
                                onChange={(e) => setEditingCourse((prev: any) => prev ? { ...prev, status: e.target.value as 'Active' | 'Inactive' } : null)}
                                className="col-span-3"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={() => editingCourse && handleSaveEdit(editingCourse)}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Course Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Course Details</DialogTitle>
                        <DialogDescription>Comprehensive information about the course.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="col-span-1 font-bold">Title:</div>
                            <div className="col-span-3">{viewingCourse?.title}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="col-span-1 font-bold">Instructor:</div>
                            <div className="col-span-3">{viewingCourse?.instructor}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="col-span-1 font-bold">Students:</div>
                            <div className="col-span-3">{viewingCourse?.students}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="col-span-1 font-bold">Rating:</div>
                            <div className="col-span-3">{viewingCourse?.rating}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="col-span-1 font-bold">Status:</div>
                            <div className="col-span-3">{viewingCourse?.status}</div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
