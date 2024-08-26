"use client";
import { useState } from "react";
import { Input, Textarea, Select, Button, SelectItem } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";

export default function page() {
  const [instructors, setInstructors] = useState([''])
  const [tags, setTags] = useState([''])
  const [keyFeatures, setKeyFeatures] = useState([''])
  const [date, setDate] = useState<Date>()

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ''])
  }

  const removeField = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index))
  }

  const updateField = (index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.map((item, i) => i === index ? value : item))
  }
  return (
    <>
      <form className="space-y-8 w-full pt-1">
        <Card>
          <CardHeader>
            <CardTitle>Create a New Course</CardTitle>
            <CardDescription>Fill in the details to create your new course.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Input id="title" placeholder="Enter course title" label="Course Title" variant="underlined" className="rounded" />
                </div>
                <div className="space-y-2">
                  <Textarea id="description" placeholder="Enter course description" label="Description" variant="underlined" />
                </div>
                <div className="flex flex-row gap-x-3 items-center">
                  <Select
                    label="Category"
                    placeholder="Select a category"
                    selectionMode="multiple"
                    radius="sm"
                    variant="underlined"
                  >
                    <SelectItem key="1" value="programming">Programming</SelectItem>
                    <SelectItem key="2" value="design">Design</SelectItem>
                    <SelectItem key="3" value="business">Business</SelectItem>
                    <SelectItem key="4" value="marketing">Marketing</SelectItem>
                  </Select>
                  <Select
                    label="Instructors"
                    placeholder="Select Instructors"
                    selectionMode="multiple"
                    radius="sm"
                    variant="underlined"
                  >
                    <SelectItem key="1" value="Rohit">Rohit</SelectItem>
                      <SelectItem key="2" value="harshit">Harshit</SelectItem>
                      <SelectItem key="3" value="vikram">Vikram</SelectItem>
                      <SelectItem key="4" value="cristina">Cristina</SelectItem>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="details" className="space-y-4">
                <div className="flex flex-row gap-x-2 items-center">
                  <Select
                    label="Tags"
                    placeholder="Select Tags"
                    selectionMode="multiple"
                    radius="sm"
                    variant="underlined"
                  >
                    <SelectItem key="1" value="programming">Programming</SelectItem>
                    <SelectItem key="2" value="design">Design</SelectItem>
                    <SelectItem key="3" value="business">Business</SelectItem>
                    <SelectItem key="4" value="marketing">Marketing</SelectItem>
                  </Select>
                  <Button type="button" variant="ghost" onClick={() => addField(setTags)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Tag
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mode">Mode</Label>
                  <Select
                    label="Mode"
                    placeholder="Select course mode"
                    selectionMode="multiple"
                    radius="sm"
                  >
                    <SelectItem key="1" value="online">online</SelectItem>
                      <SelectItem key="2" value="offline">offline</SelectItem>
                      <SelectItem key="3" value="Hybrid">Hybrid</SelectItem>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Schedule</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Key Features</Label>
                  {keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateField(index, e.target.value, setKeyFeatures)}
                        placeholder="Enter key feature"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeField(index, setKeyFeatures)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="ghost" onClick={() => addField(setKeyFeatures)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Key Feature
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="pricing" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fee">Course Fee</Label>
                  <Input id="fee" type="number" placeholder="Enter course fee" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount</Label>
                  <Input id="discount" type="number" placeholder="Enter discount percentage" />
                </div>
                <div className="space-y-2">
                  <Label>Perks</Label>
                  <Textarea placeholder="Enter course perks (one per line)" />
                </div>
              </TabsContent>
              <TabsContent value="media" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <Input id="thumbnail" type="file" accept="image/*" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-video">Demo Video</Label>
                  <Input id="demo-video" type="file" accept="video/*" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-videos">Course Videos</Label>
                  <Input id="course-videos" type="file" accept="video/*" multiple />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="live-classes" />
                  <Label htmlFor="live-classes">Enable Live Classes</Label>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Create Course</Button>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}
