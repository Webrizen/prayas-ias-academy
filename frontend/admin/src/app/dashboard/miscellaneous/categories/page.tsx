"use client";
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input, Textarea } from '@nextui-org/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'react-hot-toast';
import { useCookies } from 'next-client-cookies';

type Category = {
    _id: string;
    name: string;
    description: string;
};

export default function page() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof Category>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [newCategory, setNewCategory] = useState<Omit<Category, '_id'>>({ name: '', description: '' });
    const [loading, setLoading] = useState(false);
    const cookies = useCookies();
    const jwtToken = cookies.get('jwt');

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/categories`);
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching categories:", error);
                toast.error("Error fetching categories");
            }
        };

        fetchCategories();
    }, []);

    const handleSort = (column: keyof Category) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedCategories = [...categories].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredCategories = sortedCategories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);
            await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            setCategories(categories.filter(category => category._id !== id));
            setLoading(false);
            toast.success("Category deleted successfully");
        } catch (error) {
            setLoading(false);
            console.error("Error deleting category:", error);
            toast.error("Error deleting category");
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
    };

    const handleUpdate = async () => {
        if (editingCategory) {
            try {
                setLoading(true);
                await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/categories/${editingCategory._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify(editingCategory),
                });
                setCategories(categories.map(category =>
                    category._id === editingCategory._id ? editingCategory : category
                ));
                setEditingCategory(null);
                setLoading(false);
                toast.success("Category updated successfully");
            } catch (error) {
                setLoading(false);
                console.error("Error updating category:", error);
                toast.error("Error updating category");
            }
        }
    };

    const handleCreate = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(newCategory),
            });
            const createdCategory = await response.json();
            setCategories([...categories, createdCategory]);
            setNewCategory({ name: '', description: '' });
            setLoading(false);
            toast.success("Category created successfully");
        } catch (error) {
            setLoading(false);
            console.error("Error creating category:", error);
            toast.error("Error creating category");
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-left mb-8">Category Management</h1>

            <div className="flex justify-between items-center gap-x-3 mb-6">
                <div className="relative w-full">
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
                        <Button disabled={loading}>
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Category</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Input
                                id="name"
                                label="Name"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                className="col-span-3"
                                disabled={loading}
                            />
                            <Textarea
                                label="Description"
                                id="description"
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                className="col-span-3"
                                disabled={loading}
                            />
                        </div>
                        <Button onClick={handleCreate} disabled={loading}>Create Category</Button>
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
                            <TableHead className="cursor-pointer" onClick={() => handleSort('description')}>
                                Description {sortColumn === 'description' && (sortDirection === 'asc' ? <ChevronUp className="inline h-4 w-4" /> : <ChevronDown className="inline h-4 w-4" />)}
                            </TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCategories.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="icon" onClick={() => handleEdit(category)} disabled={loading}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Category</DialogTitle>
                                                </DialogHeader>
                                                {editingCategory && (
                                                    <div className="grid gap-4 py-4">
                                                        <Input
                                                            label="Name"
                                                            id="edit-name"
                                                            value={editingCategory.name}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                                            className="col-span-3"
                                                            disabled={loading}
                                                        />
                                                        <Textarea
                                                            label="Description"
                                                            id="edit-description"
                                                            value={editingCategory.description}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                                            className="col-span-3"
                                                            disabled={loading}
                                                        />
                                                    </div>
                                                )}
                                                <Button onClick={handleUpdate} disabled={loading}>Update Category</Button>
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="outline" size="icon" onClick={() => handleDelete(category._id)} disabled={loading}>
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