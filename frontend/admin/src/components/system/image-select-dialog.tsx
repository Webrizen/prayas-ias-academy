'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { ChevronLeft, ChevronRight, Grid, Image as ImageIcon, Search, X } from "lucide-react";

interface Image {
  id: number;
  src: string;
  alt: string;
}

export default function ImageSelectDialog({ onSelect }: { onSelect: (url: string) => void }) {
  const [images, setImages] = useState<Image[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Track the modal open state

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/upload/all`);
        const fetchedImages: Image[] = response.data.files.map((url: string, index: number) => ({
          id: index, // Use index as ID or generate a unique ID if necessary
          src: url,
          alt: url.split('/').pop() || 'Unknown',
        }));
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = images.filter(image =>
    image.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = (id: number) => {
    setSelectedImage(prevSelected => prevSelected === id ? null : id);
  }

  const handleSelectImage = () => {
    if (selectedImage !== null) {
      const image = images.find(img => img.id === selectedImage);
      if (image) {
        onSelect(image.src);
        setIsOpen(false); // Close the modal after selecting an image
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Select Image</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select an Image</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-8"
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Toggle
            aria-label="Toggle view"
            pressed={isGridView}
            onPressedChange={setIsGridView}
          >
            {isGridView ? <Grid className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
          </Toggle>
        </div>
        <div className="flex-grow overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading...</p>
            </div>
          ) : isGridView ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden aspect-square ${
                    selectedImage === image.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleImageClick(image.id)}
                >
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                  {selectedImage === image.id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <X className="h-8 w-8 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative h-full">
              <div className="flex overflow-x-auto space-x-4 snap-x snap-mandatory h-full items-center px-8">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className={`flex-shrink-0 w-64 h-64 snap-center ${
                      selectedImage === image.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleImageClick(image.id)}
                  >
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-lg" />
                    {selectedImage === image.id && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <X className="h-8 w-8 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto')
                  if (container) container.scrollBy({ left: -256, behavior: 'smooth' })
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={() => {
                  const container = document.querySelector('.overflow-x-auto')
                  if (container) container.scrollBy({ left: 256, behavior: 'smooth' })
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {selectedImage ? `Image ${selectedImage} selected` : 'No image selected'}
          </p>
          <Button 
            onClick={handleSelectImage}
            disabled={selectedImage === null}
          >
            Select Image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}