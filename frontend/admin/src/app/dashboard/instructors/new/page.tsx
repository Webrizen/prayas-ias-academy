"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from '@nextui-org/react';
import { PlusCircle, X, Trash2 } from "lucide-react";

export default function page() {
    const [qualifications, setQualifications] = useState([''])
    const [experience, setExperience] = useState([''])
    const [profilePicture, setProfilePicture] = useState<string | null>(null)

    const handleQualificationChange = (index: number, value: string) => {
        const newQualifications = [...qualifications]
        newQualifications[index] = value
        setQualifications(newQualifications)
    }

    const handleExperienceChange = (index: number, value: string) => {
        const newExperience = [...experience]
        newExperience[index] = value
        setExperience(newExperience)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePicture(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeQualification = (index: number) => {
        if (qualifications.length > 1) {
            const newQualifications = qualifications.filter((_, i) => i !== index)
            setQualifications(newQualifications)
        }
    }

    const removeExperience = (index: number) => {
        if (experience.length > 1) {
            const newExperience = experience.filter((_, i) => i !== index)
            setExperience(newExperience)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Add New Instructor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Input id="firstName" placeholder="Enter first name" label="First Name" variant='underlined' />
                    </div>
                    <div className="space-y-2">
                        <Input id="lastName" placeholder="Enter last name" label="Last Name" variant='underlined' />
                    </div>
                </div>

                <div className="space-y-2">
                    <Textarea id="bio" placeholder="Enter instructor's bio" className="min-h-[150px]" label="Bio" variant='underlined' />
                </div>

                <div className="space-y-2">
                    <Input id="profilePicture" type="file" accept="image/*" onChange={handleFileChange} label="Profile Picture" variant='underlined' />
                    {profilePicture && (
                        <div className="mt-2 relative w-32 h-32">
                            <img src={profilePicture} alt="Profile Preview" className="w-full h-full object-cover rounded-full" />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-0 right-0 rounded-full"
                                onClick={() => setProfilePicture(null)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    {qualifications.map((qualification, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Input
                                value={qualification}
                                onChange={(e) => handleQualificationChange(index, e.target.value)}
                                placeholder={`Qualification ${index + 1}`}
                                label="Qualifications" variant='underlined'
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeQualification(index)}
                                disabled={qualifications.length === 1}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            {index === qualifications.length - 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQualifications([...qualifications, ''])}
                                >
                                    <PlusCircle className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="space-y-2">
                    <div className="space-y-2">
                        <Input placeholder="LinkedIn URL" label="Social Links" variant='underlined' />
                        <Input placeholder="Twitter URL" label="Social Links" variant='underlined' />
                    </div>
                </div>

                <div className="space-y-2">
                    {experience.map((exp, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Input
                                value={exp}
                                onChange={(e) => handleExperienceChange(index, e.target.value)}
                                placeholder={`Experience ${index + 1}`}
                                label="Experience" variant='underlined'
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeExperience(index)}
                                disabled={experience.length === 1}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            {index === experience.length - 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setExperience([...experience, ''])}
                                >
                                    <PlusCircle className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Add Instructor</Button>
            </CardFooter>
        </Card>
    )
}