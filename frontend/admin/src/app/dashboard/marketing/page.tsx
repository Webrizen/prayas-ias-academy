"use client";
import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Upload, X, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import toast, { Toaster } from 'react-hot-toast'

type Banner = {
    id: string
    url: string
    startDate: Date
    endDate: Date
    active: boolean
}

export default function page() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/marketing/active-banners`)
                const data = await response.json()
                setBanners(data)
            } catch (error) {
                toast.error('Error fetching banners')
                console.error('Error fetching banners:', error)
            }
        }

        fetchBanners()
    }, [])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0])
        console.log(acceptedFiles[0])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 1
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault()
        if ( !file || !startDate || !endDate) {
            toast.error('Please fill in all fields')
            setLoading(false)
            return
        }
        if (startDate > endDate) {
            toast.error('End date must be after start date')
            setLoading(false)
            return
        }

        const formData = new FormData()
        formData.append('bannerImage', file as File)
        formData.append('startDate', startDate.toISOString())
        formData.append('endDate', endDate.toISOString())

        const toastId = toast.loading('Uploading banner...')

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/marketing/upload-banner`, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to upload banner')
            }

            const newBanner = await response.json()
            setBanners([...banners, newBanner])
            toast.success('Banner uploaded successfully!', { id: toastId })
            setFile(null)
            setStartDate(undefined)
            setEndDate(undefined)
        } catch (error: any) {
            toast.error(error.message || 'An error occurred while uploading the banner', { id: toastId })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        setLoading(true)
        const toastId = toast.loading('Deleting banner...')
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/marketing/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete banner')
            }

            setBanners(banners.filter(banner => banner.id !== id))
            toast.success('Banner deleted successfully!', { id: toastId })
        } catch (error: any) {
            toast.error('Error deleting banner: ' + error.message, { id: toastId })
        } finally {
            setLoading(false)
        }
    }

    const handleToggleActive = (id: string) => {
        setBanners(banners.map(banner =>
            banner.id === id ? { ...banner, active: !banner.active } : banner
        ))
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Marketing Banner Upload</h1>
            <Toaster position="bottom-center" />
            <Card className="mb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardHeader>
                        <CardTitle>Upload New Banner</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Label>Banner Image</Label>
                            <div
                                {...getRootProps()}
                                className={cn(
                                    "border-2 border-dashed rounded-md p-8 text-center cursor-pointer",
                                    isDragActive ? "border-primary" : "border-muted-foreground"
                                )}
                            >
                                <input {...getInputProps()} />
                                {file ? (
                                    <div className="flex items-center justify-center">
                                        <img src={URL.createObjectURL(file)} alt="Preview" className="max-h-40 object-contain" />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="ml-2"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setFile(null)
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                        <p>Drag 'n' drop a banner image here, or click to select one</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1 space-y-4">
                                <Label>Start Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !startDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={startDate}
                                            onSelect={setStartDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex-1 space-y-4">
                                <Label>End Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !endDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={endDate}
                                            onSelect={setEndDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={loading}>
                            <Upload className="mr-2 h-4 w-4" /> Upload Banner
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Existing Banners</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Preview</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {banners.map((banner) => (
                                <TableRow key={banner.id}>
                                    <TableCell>
                                        <img src={banner.url} alt="Banner Alt." className="max-h-16 object-contain" />
                                    </TableCell>
                                    <TableCell>{format(new Date(banner.startDate), 'PPP')}</TableCell>
                                    <TableCell>{format(new Date(banner.endDate), 'PPP')}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant={banner.active ? "ghost" : "secondary"}
                                            onClick={() => handleToggleActive(banner.id)}
                                            disabled={loading}
                                        >
                                            {banner.active ? "Active" : "Inactive"}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(banner.id)} disabled={loading}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                            <Button variant="ghost" size="icon" disabled={loading}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}