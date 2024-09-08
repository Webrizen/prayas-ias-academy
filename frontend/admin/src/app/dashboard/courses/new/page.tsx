"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  Input,
  Textarea,
  Select,
  Button,
  SelectItem,
} from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Plus,
  X,
} from "lucide-react";
import ImageSelectDialog from "@/components/system/image-select-dialog";
import ImageUpload from "@/components/system/ImageUpload";
import { useCookies } from 'next-client-cookies';

// TypeScript Interfaces
interface Category {
  _id: string;
  name: string;
}

interface Instructor {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Tag {
  _id: string;
  name: string;
}

// Fetch Data Functions
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/categories`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

const fetchInstructors = async (): Promise<Instructor[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/instructors`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch instructors");
  }
  return response.json();
};

const fetchTags = async (): Promise<Tag[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/tags`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tags");
  }
  return response.json();
};

// Main Component
export default function CreateCoursePage() {
  // State Definitions
  const [categories, setCategories] = useState<Category[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedInstructors, setSelectedInstructors] = useState<
    string[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const [enableLiveClasses, setEnableLiveClasses] =
    useState<string>("");
  const [schedule, setSchedule] = useState<Date | undefined>();
  const [scheduleEnd, setScheduleEnd] = useState<Date | undefined>();
  const [keyFeatures, setKeyFeatures] = useState<string[]>([""]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fee, setFee] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [perks, setPerks] = useState<string>("");
  const [images, setImages] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const cookies = useCookies();
  const jwtToken = cookies.get('jwt');

  // Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, instructorsData, tagsData] =
          await Promise.all([
            fetchCategories(),
            fetchInstructors(),
            fetchTags(),
          ]);
        setCategories(categoriesData);
        setInstructors(instructorsData);
        setTags(tagsData);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, []);

  // Handler Functions
  const addField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => [...prev, ""]);
  };

  const removeField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.map((item, i) => (i === index ? value : item))
    );
  };

  const handleImageSelect = (url: string) => {
    setImages(url);
  };

  const handleThumbnailUpload = (url: string) => {
    setImages(url);
  };

  // Form Validation Function
  const isFormValid = () => {
    return (
      title &&
      description &&
      selectedCategory &&
      mode &&
      enableLiveClasses &&
      (schedule !== undefined) &&
      keyFeatures.length > 0 &&
      fee !== "" &&
      discount !== "" &&
      images
    );
  };

  // Form Submission Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validation (Basic Example)
    if (!isFormValid()) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Convert date to required format
    const formattedSchedule = schedule ? schedule.toISOString() : undefined;
    const formattedScheduleEnd = scheduleEnd ? scheduleEnd.toISOString() : undefined;

    // Simplify data to avoid circular structures
    const courseData = {
      title,
      description,
      category: selectedCategory,
      instructors: selectedInstructors,
      tags: selectedTags,
      mode,
      enableLiveClasses,
      schedule: [
        {
          startDate: formattedSchedule,
          endDate: formattedScheduleEnd,
        },
      ],
      keyFeatures,
      feeStructure: {
        amount: typeof fee === "number" ? fee : 0,
      },
      discount: typeof discount === "number" ? discount : 0,
      perks,
      thumbnail: images,
    };

    console.log("Course Data to be sent:", courseData); // Log data to debug

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/courses`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      const result = await response.json();
      setSuccess("Course created successfully!");
      // Optionally, reset the form here
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <form
        className="space-y-8 w-full pt-1"
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader>
            <CardTitle>Create a New Course</CardTitle>
            <CardDescription>
              Fill in the details to create your new course.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="text-red-500 mb-4">{error}</div>
            )}
            {success && (
              <div className="text-green-500 mb-4">{success}</div>
            )}
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Details</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>
              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="title"
                    placeholder="Enter course title"
                    label="Course Title"
                    variant="underlined"
                    className="rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    id="description"
                    placeholder="Enter course description"
                    label="Description"
                    variant="underlined"
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex flex-row gap-x-3 items-center">
                  <Select
                    label="Category"
                    placeholder="Select a category"
                    radius="sm"
                    variant="underlined"
                    value={selectedCategory}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                      const newValue = event.target.value;
                      setSelectedCategory(newValue);
                    }}
                    required
                  >
                    {categories.map((category) => (
                      <SelectItem
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Instructors"
                    placeholder="Select Instructors"
                    radius="sm"
                    variant="underlined"
                    selectionMode="multiple"
                    value={selectedInstructors}
                    onSelectionChange={(keys) => {
                      const newValues = Array.from(keys) as string[];
                      setSelectedInstructors(newValues);
                    }}
                  >
                    {instructors.map((instructor) => (
                      <SelectItem
                        key={instructor._id}
                        value={instructor._id}
                      >
                        {instructor.firstName}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-row gap-x-2 items-end">
                  <Select
                    label="Tags"
                    placeholder="Select Tags"
                    radius="sm"
                    variant="underlined"
                    selectionMode="multiple"
                    value={selectedTags}
                    onSelectionChange={(keys) => {
                      const newValues = Array.from(keys) as string[];
                      setSelectedTags(newValues);
                    }}
                  >
                    {tags.map((tag) => (
                      <SelectItem
                        key={tag._id}
                        value={tag._id}
                      >
                        {tag.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => addField(setSelectedTags)}
                  >
                    Add Tag
                  </Button>
                </div>
                <div className="flex flex-row gap-x-3 items-center">
                  <Select
                    label="Mode"
                    placeholder="Select course mode"
                    radius="sm"
                    variant="underlined"
                    value={mode}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                      const newValue = event.target.value;
                      setMode(newValue);
                    }}
                    required
                  >
                    <SelectItem key="online" value="online">Online</SelectItem>
                    <SelectItem key="offline" value="offline">Offline</SelectItem>
                    <SelectItem key="hybrid" value="hybrid">Hybrid</SelectItem>
                  </Select>
                  <Select
                    label="Enable Live Classes"
                    placeholder="Select"
                    radius="sm"
                    variant="underlined"
                    value={enableLiveClasses}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                      const newValue = event.target.value;
                      setEnableLiveClasses(newValue);
                    }}
                    required
                  >
                    <SelectItem key="1" value="yes">Yes</SelectItem>
                    <SelectItem key="2" value="no">No</SelectItem>
                    <SelectItem key="3" value="n/a">N/A</SelectItem>
                  </Select>
                  <div className="space-y-2">
                    <Label className="whitespace-nowrap">Schedule - Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !schedule &&
                            "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {schedule
                            ? format(schedule, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={schedule}
                          onSelect={(date) =>
                            setSchedule(date || undefined)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label className="whitespace-nowrap">Schedule - End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !scheduleEnd &&
                            "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduleEnd
                            ? format(scheduleEnd, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduleEnd}
                          onSelect={(date) =>
                            setScheduleEnd(date || undefined)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Key Features</Label>
                  {keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      <Input
                        value={feature}
                        onChange={(e) =>
                          updateField(
                            index,
                            e.target.value,
                            setKeyFeatures
                          )
                        }
                        placeholder="Enter key feature"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                          removeField(index, setKeyFeatures)
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => addField(setKeyFeatures)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Key Feature
                  </Button>
                </div>
              </TabsContent>
              {/* Pricing Tab */}
              <TabsContent value="pricing" className="space-y-2">
                <div className="flex flex-row gap-x-5 items-center w-full">
                  <div className="space-y-2 w-full">
                    <Input
                      id="fee"
                      label="Course Fee"
                      type="number"
                      placeholder="0.00"
                      variant="underlined"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            ₹
                          </span>
                        </div>
                      }
                      value={fee !== "" ? fee.toString() : ""}
                      onChange={(e) =>
                        setFee(
                          e.target.value
                            ? parseFloat(e.target.value)
                            : ""
                        )
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Input
                      id="discount"
                      label="Discount"
                      type="number"
                      placeholder="Enter discount percentage"
                      variant="underlined"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            %
                          </span>
                        </div>
                      }
                      value={discount !== "" ? discount.toString() : ""}
                      onChange={(e) =>
                        setDiscount(
                          e.target.value
                            ? parseFloat(e.target.value)
                            : ""
                        )
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Textarea
                    label="Perks"
                    variant="underlined"
                    placeholder="Enter course perks (one per line)"
                    value={perks}
                    onChange={(e) => setPerks(e.target.value)}
                  />
                </div>
              </TabsContent>
              {/* Media Tab */}
              <TabsContent value="media" className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="thumbnail"
                    placeholder="Thumbnail URL"
                    label="Thumbnail"
                    variant='underlined'
                    disabled={loading}
                    value={images || ''}
                    readOnly
                  />
                  <div className="grid grid-cols-2 gap-x-4">
                    <ImageSelectDialog onSelect={handleImageSelect} />
                    <ImageUpload onImageUpload={handleThumbnailUpload} />
                  </div>
                  {images && (
                    <div className="mt-2 relative w-[600px] h-[400px] mx-auto">
                      <img src={images} alt="Profile Preview" className="w-full h-full object-cover rounded-lg" />
                      <Button
                        color="danger"
                        radius="sm"
                        className="absolute top-2 right-2 !p-1"
                        onClick={() => setImages(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end items-center">
            <Button
              type="submit"
              radius="sm"
              isLoading={loading}
              disabled={loading && !isFormValid}
            >
              Create Course
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}