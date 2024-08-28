"use client";
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Search, Upload, X, Maximize2 } from 'lucide-react';
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

// Mock data for demonstration
const initialMedia = [
  { id: 1, name: 'image1.jpg', type: 'image', url: 'https://placehold.co/500x500' },
  { id: 2, name: 'document.pdf', type: 'document', url: 'https://placehold.co/500x500' },
  { id: 3, name: 'video.mp4', type: 'video', url: 'https://placehold.co/500x500' },
]

export default function page() {
  const [media, setMedia] = useState(initialMedia)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMedia, setSelectedMedia] = useState(null)

  const onDrop = useCallback((acceptedFiles: any[]) => {
    // Handle file upload logic here
    const newMedia = acceptedFiles.map((file: Blob | MediaSource, index: number) => ({
      id: media.length + index + 1,
      name: file.name,
      type: file.type.split('/')[0],
      url: URL.createObjectURL(file)
    }))
    setMedia([...media, ...newMedia])
  }, [media])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const filteredMedia = media.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <Dialog>
          <DialogTrigger asChild>
            <Button>Upload New Media</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
              <DialogDescription>
                Drag and drop files here or click to select files
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
            <div className="absolute left-0 right-0 bottom-0 top-0 my-auto mx-auto w-full h-full inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMedia(item)}
                className="text-white"
              >
                <Maximize2 className="h-6 w-6" />
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
  )
}