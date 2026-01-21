import { useQuery } from "@tanstack/react-query";
import BlogDetailSkeleton from "./BlogDetailSkeleton.tsx";

const fetchBlogById = async (id: number) => {
  const res = await fetch(`http://localhost:3001/blogs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
};

export default function BlogDetail({ id }: { id: number | null }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id as number),
    enabled: !!id,
  });

  if (!id) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg">Select a blog post to view details</p>
        </div>
      </div>
    );
  }
  
  if (isLoading) return <BlogDetailSkeleton />;
  
  if (error instanceof Error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {data.coverImage && (
        <img 
          src={data.coverImage} 
          alt={data.title}
          className="rounded-lg w-full h-96 object-cover mb-8 shadow-lg" 
        />
      )}
      
      {data.category && data.category.length > 0 && (
        <div className="flex gap-2 mb-4">
          {data.category.map((cat: string, idx: number) => (
            <span 
              key={idx}
              className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium"
            >
              {cat}
            </span>
          ))}
        </div>
      )}
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
      
      {data.description && (
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">{data.description}</p>
      )}
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{data.content}</p>
      </div>
    </div>
  );
}
