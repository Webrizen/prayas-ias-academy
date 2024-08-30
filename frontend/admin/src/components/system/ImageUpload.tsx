"use client";
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ImageUpload({ onImageUpload }: { onImageUpload: (url: string) => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (file) {
            handleUpload();
        }
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    // Include any headers if required by your API
                },
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            const uploadedImageUrl = data.fileUrl; // Adjust according to the actual response structure
            setImageUrl(uploadedImageUrl);
            onImageUpload(uploadedImageUrl); // Notify parent component
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error('Error uploading image');
        } finally {
            setLoading(false);
        }
    };

    // Simulate progress update (you may want to replace this with actual progress from the server if supported)
    useEffect(() => {
        const simulateProgress = () => {
            if (loading) {
                const interval = setInterval(() => {
                    setProgress((prev) => {
                        if (prev < 100) return prev + 10;
                        clearInterval(interval);
                        return 100;
                    });
                }, 200); // Adjust timing as needed
            }
        };
        simulateProgress();
    }, [loading]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Upload Image</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Image</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div
                        className={`border-2 border-dashed cursor-pointer rounded-lg p-8 text-center transition-colors relative h-48`}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={loading}
                            className='w-full h-full absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer'
                        />
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                            Drag 'n' drop some files here, or click to select files
                        </p>
                    </div>
                    {loading && (
                        <Progress value={progress} />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}