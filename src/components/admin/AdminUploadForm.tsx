"use client";
import {useState, useTransition} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import { createNewCourse } from "@/lib/actions/pdf_courses.actions";

export function AdminUploadForm() {
    const [pending, startTransition] = useTransition();
    const [file, setFile] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleUpload = () => {
        if (!file) return;
        const formData = new FormData();

        formData.append("file", file);
        if (thumbnail) {
            formData.append("thumbnail", thumbnail); // ✅ correct key
        }
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);

        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }

        startTransition(() => {
            createNewCourse(formData)
                .then(() => {
                    alert("Uploaded ✅");
                    setThumbnail(null);
                    setFile(null);
                    setTitle("");
                    setDescription("");
                    setPrice("");
                })
                .catch((err) => alert(err.message));
        });

    };

    return (
        <div className="space-y-2">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <label className="block text-sm py-2">Course Pdf</label>
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <label className="block text-sm py-2">Pdf Thumbnail</label>
            <Input type="file" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} />
            <Button onClick={handleUpload} disabled={pending}>
                {pending ? "Uploading..." : "Upload PDF"}
            </Button>
        </div>
    );
}
