// Post.jsx

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../api/Posts";
import { useNavigate } from "react-router-dom";

function Post() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPost(id)
    })

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error: {error.message}</div>


    return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        
        <button 
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
            ← Back To Posts List
        </button>

        <p className="text-2xl font-bold text-gray-800 mb-3">
            {posts.title}
        </p>

        <p className="text-gray-600 leading-relaxed">
            {posts.content}
        </p>

    </div>)

}

export default Post