"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from '@nextui-org/react';
import { PlusCircle, X, Trash2 } from "lucide-react";
import ImageUpload from '@/components/system/ImageUpload';
import toast, { Toaster } from 'react-hot-toast';
import ImageSelectDialog from '@/components/system/image-select-dialog';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function Page() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [qualifications, setQualifications] = useState(['']);
    const [experience, setExperience] = useState(['']);
    const [socialLinks, setSocialLinks] = useState<{ linkedin: string; twitter: string }>({ linkedin: '', twitter: '' });
    const cookies = useCookies();
    const jwtToken = cookies.get('jwt');

    const handleQualificationChange = (index: number, value: string) => {
        const newQualifications = [...qualifications];
        newQualifications[index] = value;
        setQualifications(newQualifications);
    };

    const handleExperienceChange = (index: number, value: string) => {
        const newExperience = [...experience];
        newExperience[index] = value;
        setExperience(newExperience);
    };

    const handleProfilePictureUpload = (url: string) => {
        setProfilePicture(url);
    };

    const removeQualification = (index: number) => {
        if (qualifications.length > 1) {
            const newQualifications = qualifications.filter((_, i) => i !== index);
            setQualifications(newQualifications);
        }
    };

    const removeExperience = (index: number) => {
        if (experience.length > 1) {
            const newExperience = experience.filter((_, i) => i !== index);
            setExperience(newExperience);
        }
    };

    const handleImageSelect = (url: string) => {
        setProfilePicture(url);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/instructors`, {
                firstName,
                lastName,
                bio,
                profilePicture,
                experience,
                qualifications,
                socialLinks,
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                toast.success('Instructor added successfully');
                setFirstName('');
                setLastName('');
                setBio('');
                setProfilePicture(null);
                setQualifications(['']);
                setExperience(['']);
                setSocialLinks({ linkedin: '', twitter: '' });
            }
        } catch (error) {
            toast.error('Failed to add instructor');
            console.error('Error adding instructor:', error);
        }
    };

    return (
        <>
            <Toaster position="bottom-center" />
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Add New Instructor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Input
                                id="firstName"
                                placeholder="Enter first name"
                                label="First Name"
                                variant='underlined'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                id="lastName"
                                placeholder="Enter last name"
                                label="Last Name"
                                variant='underlined'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Textarea
                            id="bio"
                            placeholder="Enter instructor's bio"
                            className="min-h-[150px]"
                            label="Bio"
                            variant='underlined'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Input
                            id="ProfilePicture"
                            placeholder="Profile Picture URL"
                            label="Profile Picture"
                            variant='underlined'
                            value={profilePicture || ''}
                            readOnly
                        />
                        <div className="grid grid-cols-2 gap-x-4">
                            <ImageSelectDialog onSelect={handleImageSelect} />
                            <ImageUpload onImageUpload={handleProfilePictureUpload} />
                        </div>
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
                        <div className="grid grid-cols-2 gap-x-2">
                            <Input
                                placeholder="LinkedIn URL"
                                label="LinkedIn URL"
                                variant='underlined'
                                value={socialLinks.linkedin}
                                onChange={(e) => setSocialLinks(prev => ({ ...prev, linkedin: e.target.value }))}
                            />
                            <Input
                                placeholder="Twitter URL"
                                label="Twitter URL"
                                variant='underlined'
                                value={socialLinks.twitter}
                                onChange={(e) => setSocialLinks(prev => ({ ...prev, twitter: e.target.value }))}
                            />
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
                    <Button className="w-full" onClick={handleSubmit}>
                        Add Instructor
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}