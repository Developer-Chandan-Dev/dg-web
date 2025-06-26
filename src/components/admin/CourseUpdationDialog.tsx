"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {SquarePen} from "lucide-react";
import {useEffect, useState, useTransition} from "react";
import {updatePdfCourseAction} from "@/lib/actions/dg.actions";

export function CourseUpdationDialog({ pdf, onClose }: { pdf: any; onClose: () => void }) {
    const [pending, startTransition] = useTransition();
    const [file, setFile] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        setTitle(pdf.title)
        setDescription(pdf.description)
        setPrice(pdf.price)
    },[pdf])

    const handleUpload = () => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("thumbnail", thumbnail); // ✅ correct key
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        startTransition(() => {
            updatePdfCourseAction(pdf.id, formData)
                .then(() => alert("Updated ✅"))
                .catch((err) => alert(err.message))
                .finally(()=>{
                    setThumbnail(null);
                    setFile(null);
                    setTitle("");
                    setDescription("");
                    setPrice("");
                })
        });

    };

    return (
        <Dialog open onOpenChange={onClose}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="cursor-pointer">
                        <SquarePen />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update PDF Course</DialogTitle>
                        <DialogDescription>
                            Edit details and click save to update.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} defaultValue={pdf.title} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} defaultValue={pdf.description} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} defaultValue={pdf.price} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="pdf">Course Pdf</Label>
                            <Input type="file" id="pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="thumbnail">Pdf Thumbnail</Label>
                            <Input type="file" id="thumbnail" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleUpload} disabled={pending}>
                            {pending ? "Updating..." : "Update"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}