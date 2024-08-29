"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios, { AxiosProgressEvent } from 'axios';
import { Search, Upload, Maximize2, Trash } from 'lucide-react';
import { Input } from '@nextui-org/react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import toast from 'react-hot-toast';

// Define the media type
interface MediaItem {
  id: number;
  name: string;
  type: string;
  url: string;
}

export default function Page() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [progress, setProgress] = useState<number>(0); // Upload progress state
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Fetch media items from the backend
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/upload/all`);
        // Map response data to MediaItem
        const fetchedMedia = response.data.files.map((url: string, index: number) => ({
          id: index,  // Use index as ID or generate a unique ID if necessary
          name: url.split('/').pop() || 'Unknown',  // Extract file name from URL
          type: url.split('.').pop() || 'unknown',  // Extract file type from URL
          url: url
        }));
        setMedia(fetchedMedia);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching media:', error);
        toast.error('Failed to fetch media.');
      }
    };

    fetchMedia();
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const formData = new FormData();
      acceptedFiles.forEach(file => {
        formData.append('file', file);
      });
  
      const uploadConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(progress);
            console.log(`Progress: ${progress}%`);
          }
        }
      };
  
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/upload`, formData, uploadConfig);
  
      console.log(response.data);
      const newMedia = response.data.fileUrl;
      setMedia(prevMedia => [
        ...prevMedia,
        { id: Date.now(), name: acceptedFiles[0].name, type: 'file', url: newMedia }
      ]);
      setIsDialogOpen(false); // Close the modal after successful upload
      setProgress(0); // Reset the progress to 0
      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setProgress(0); // Reset the progress to 0 on error
      toast.error('Failed to upload file.');
    }
  }, []);  

  const deleteMedia = async (item: MediaItem) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASEURL}/upload`, {
        data: { fileUrl: item.url }
      });
      setMedia(prevMedia => prevMedia.filter(mediaItem => mediaItem.id !== item.id));
      toast.success('File deleted successfully!');
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const filteredMedia = media.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Media Library</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <Input
            type="search"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            startContent={<Search className="h-4 w-4 text-gray-500 mr-2" />}
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Upload New Media</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
              <DialogDescription>
                Drag and drop files here or click to select files
                {progress > 0 && <Progress value={progress} className='mt-3' />}
              </DialogDescription>
            </DialogHeader>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select files'}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map((item) => (
          <div key={item.id}>
            <div className="relative group">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
              <div className="absolute left-0 right-0 bottom-0 top-0 my-auto mx-auto w-full h-full inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedMedia(item)}
                  className="text-white"
                >
                  <Maximize2 className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMedia(item)}
                  className="text-white"
                >
                  <Trash className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <p className="mt-2 text-sm truncate">{item.name}</p>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedMedia.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <img
                src={selectedMedia.url}
                alt={selectedMedia.name}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}