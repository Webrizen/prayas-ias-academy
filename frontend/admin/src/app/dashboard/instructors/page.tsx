import React from 'react';
import { Button } from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const gradients = [
    "bg-gradient-to-r from-violet-600 to-indigo-600",
    "bg-gradient-to-r from-emerald-500 to-emerald-900",
    "bg-gradient-to-r from-rose-400 to-red-500",
    "bg-gradient-to-r from-purple-500 to-purple-900",
    "bg-gradient-to-r from-pink-500 to-rose-500",
    "bg-gradient-to-r from-stone-500 to-stone-700",
    "bg-gradient-to-r from-blue-200 to-cyan-200",
    "bg-gradient-to-r from-teal-200 to-teal-500",
    "bg-gradient-to-r from-red-500 to-orange-500",
    "bg-gradient-to-r from-violet-200 to-pink-200",
];

function formatTimeAgo(timestamp: string | number | Date): string {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);
    const diffMilliseconds = currentDate.getTime() - createdAtDate.getTime();

    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
        return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
    } else if (diffMonths > 0) {
        return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    } else if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else {
        return `${diffSeconds} second${diffSeconds > 1 ? "s" : ""} ago`;
    }
}

export default async function Page() {
    let data = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/instructors`);
    let instructors = await data.json();

    const getRandomGradient = () => {
        const randomIndex = Math.floor(Math.random() * gradients.length);
        return gradients[randomIndex];
    };

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Instructors</h1>
                <Link href="/dashboard/instructors/new">
                    <Button>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Instructor
                    </Button>
                </Link>
            </div>
            <div className='w-full grid grid-cols-3 gap-4'>
                {instructors.map((instructor: {
                    profilePicture: string;
                    _id: string;
                    firstName: string;
                    lastName: string;
                    createdAt: string | number | Date;
                    bio: string;
                }, index: number) => (
                    <div className="w-full flex flex-col gap-2" key={index}>
                        <div
                            className={`h-[150px] w-full rounded-xl ${getRandomGradient()} relative overflow-hidden`}
                        >
                            <div
                                className="absolute top-0 right-0 p-2 cursor-pointer bg-red-50 hover:bg-red-100 text-red-500 rounded-bl-xl z-50"
                                title="Delete"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                            </div>
                            <Avatar className='absolute w-32 h-32 bottom-0 top-0 my-auto left-2'>
                                <AvatarImage src={instructor.profilePicture || "https://github.com/shadcn.png"} />
                                <AvatarFallback>N/A</AvatarFallback>
                            </Avatar>
                            <Link
                                href={`/dashboard/instructors/${instructor._id}`}
                                className="absolute top-0 bottom-0 w-[40px] flex justify-center items-center h-[40px] my-auto right-0 p-2 cursor-pointer bg-orange-50 hover:bg-orange-100 text-orange-500 rounded-bl-xl rounded-tl-xl z-50"
                                title="Edit"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                    />
                                </svg>
                            </Link>
                            <Link
                                href={`/dashboard/instructors/${instructor._id}`}
                                className="absolute bottom-0 right-0 p-2 cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-br-xl rounded-tl-xl z-50"
                                title="View"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-1 px-1">
                            <div className='flex flex-row items-center gap-x-3'>
                                <p className="text-xl font-semibold">{instructor.firstName} {instructor.lastName}</p>
                                <span>•</span>
                                <p className="text-xs text-muted-foreground">{formatTimeAgo(instructor.createdAt)}</p>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-3">{instructor.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}