import { useState } from 'react'
import BlogList from "./components/BlogList.tsx";
import BlogDetail from "./components/BlogDetail.tsx";
import CreateBlog from "./components/CreateBlog.tsx";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Blog List */}
      <div className="w-2/5 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blog Manager</h1>
              <p className="text-sm text-gray-600 mt-1">Create and manage your blog posts</p>
            </div>
          </div>
          <div className="mt-4 ">
            <CreateBlog />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">All Posts</h2>
          <BlogList onSelect={setSelectedId} selectedId={selectedId} />
        </div>
      </div>

      {/* Right Panel - Blog Detail */}
      <div className="flex-1 overflow-y-auto">
        <BlogDetail id={selectedId} />
      </div>
    </div>
  );
}

export default App
