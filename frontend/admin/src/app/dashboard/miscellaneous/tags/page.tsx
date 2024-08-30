"use client";
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from '@nextui-org/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'react-hot-toast';
import { useCookies } from 'next-client-cookies';

type Tag = {
    _id: string;
    name: string;
};

export default function page() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof Tag>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [editingTag, setEditingTag] = useState<Tag | null>(null);
    const [newTag, setNewTag] = useState<Omit<Tag, '_id'>>({ name: '' });
    const [loading, setLoading] = useState(false);
    const cookies = useCookies();
    const jwtToken = cookies.get('jwt');

    // Fetch tags from API
    useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/tags`);
                const data = await response.json();
                setTags(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching tags:", error);
                toast.error("Error fetching tags");
            }
        };

        fetchTags();
    }, []);

    const handleSort = (column: keyof Tag) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedTags = [...tags].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredTags = sortedTags.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);
            await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/tags/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setTags(tags.filter(tag => tag._id !== id));
            setLoading(false);
            toast.success("Tag deleted successfully");
        } catch (error) {
            setLoading(false);
            console.error("Error deleting tag:", error);
            toast.error("Error deleting tag");
        }
    };

    const handleEdit = (tag: Tag) => {
        setEditingTag(tag);
    };

    const handleUpdate = async () => {
        if (editingTag) {
            try {
                setLoading(true);
                await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/tags/${editingTag._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify(editingTag),
                });
                setTags(tags.map(tag =>
                    tag._id === editingTag._id ? editingTag : tag
                ));
                setEditingTag(null);
                setLoading(false);
                toast.success("Tag updated successfully");
            } catch (error) {
                setLoading(false);
                console.error("Error updating tag:", error);
                toast.error("Error updating tag");
            }
        }
    };

    const handleCreate = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/tags`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(newTag),
            });
            const createdTag = await response.json();
            setTags([...tags, createdTag]);
            setNewTag({ name: '' });
            setLoading(false);
            toast.success("Tag created successfully");
        } catch (error) {
            setLoading(false);
            console.error("Error creating tag:", error);
            toast.error("Error creating tag");
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-left mb-8">Tag Management</h1>

            <div className="flex justify-between items-center gap-x-3 mb-6">
                <div className="relative w-full">
                    <Input
                        type="search"
                        placeholder="Search tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                        startContent={<Search className="h-4 w-4 text-gray-500 mr-2" />}
                    />
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button disabled={loading}>
                            <Plus className="mr-2 h-4 w-4" /> Add Tag
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Tag</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Input
                                id="name"
                                label="Name"
                                value={newTag.name}
                                onChange={(e) => setNewTag({ name: e.target.value })}
                                className="col-span-3"
                                disabled={loading}
                            />
                        </div>
                        <Button onClick={handleCreate} disabled={loading}>Create Tag</Button>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort('name')}>
                                Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
                            </TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTags.map((tag) => (
                            <TableRow key={tag._id}>
                                <TableCell className="font-medium">{tag.name}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="icon" onClick={() => handleEdit(tag)} disabled={loading}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Tag</DialogTitle>
                                                </DialogHeader>
                                                {editingTag && (
                                                    <div className="grid gap-4 py-4">
                                                        <Input
                                                            label="Name"
                                                            id="edit-name"
                                                            value={editingTag.name}
                                                            onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
                                                            className="col-span-3"
                                                            disabled={loading}
                                                        />
                                                    </div>
                                                )}
                                                <Button onClick={handleUpdate} disabled={loading}>Update Tag</Button>
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="outline" size="icon" onClick={() => handleDelete(tag._id)} disabled={loading}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}