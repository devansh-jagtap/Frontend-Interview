import { useQuery } from "@tanstack/react-query";
import BlogListSkeleton from "./BlogListSkeleton ";
import { Card } from "@/components/ui/card";

const fetchBlogs = async () => {
  const res = await fetch("http://localhost:3001/blogs");
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

interface BlogListProps {
  onSelect: (id: number) => void;
  selectedId: number | null;
}

export default function BlogList({ onSelect, selectedId }: BlogListProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) return <BlogListSkeleton />;

  if (error instanceof Error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 text-sm">{error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">No blog posts yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((blog: any) => (
        <Card
          key={blog.id}
          onClick={() => onSelect(blog.id)}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedId === blog.id 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {blog.category && blog.category.length > 0 && (
            <div className="flex gap-2 mb-2">
              {blog.category.map((cat: string, idx: number) => (
                <span 
                  key={idx}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{blog.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{blog.description || blog.content}</p>
        </Card>
      ))}
    </div>
  );
}
