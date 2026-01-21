import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function CreateBlog() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [description , setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: async (blog: any) => {
      return fetch("http://localhost:3001/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setTitle("");
      setCategory("");
      setDescription("");
      setCoverImage("");
      setContent("");
      setOpen(false);
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    mutation.mutate({ 
      title, 
      content, 
      category: category ? category.split(',').map(c => c.trim()).filter(c => c) : [],
      coverImage: coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
      description,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-black hover:bg-gray-950 text-white" size="lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl p-0 gap-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
          <DialogTitle className="text-xl font-semibold">Create New Post</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <Input 
              placeholder="Post title" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              className="text-base"
            />
          </div>
          
          <div>
            <Input 
              placeholder="Categories (comma-separated, e.g. Tech, Programming)" 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="text-sm"
            />
          </div>
          
          <div>
            <Input 
              placeholder="Cover image URL (optional)" 
              value={coverImage} 
              onChange={e => setCoverImage(e.target.value)}
              className="text-sm"
            />
          </div>
           <div>
            <Textarea 
              placeholder="Write your description..." 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              className="min-h-32 resize-none"
              rows={3}
            />
          </div>
          
          <div>
            <Textarea 
              placeholder="Write your content..." 
              value={content} 
              onChange={e => setContent(e.target.value)}
              className="min-h-32 resize-none"
              rows={6}
            />
          </div>
        </div>

        <div className="flex gap-2 px-6 pb-6 pt-4 border-t border-gray-200 shrink-0">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={mutation.isPending}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={mutation.isPending || !title.trim() || !content.trim()}
            className="flex-1"
          >
            {mutation.isPending ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
