import AddPost from "../components/AddPost";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchPosts, deletePost } from "../api/Posts";

function PostList() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    })

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
    })

    const handleDelete = (id) => {
        deletePostMutation.mutate(id);
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h1 className="text-2xl font-bold mb-6 text-blue-700 border-b pb-3">
                Posts List
            </h1>

            <AddPost />

            <div className="mt-6 space-y-4">
                {posts.map(post => (
                    <div onClick={() => navigate(`/post/${post.id}`)}
                        key={post.id}
                        className="cursor-pointer bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                    >
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                            {post.title}
                        </h4>

                        <p className="text-gray-600 mb-3">
                            {post.content}
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/post/${post.id}/edit`);
                                }}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition"
                            >
                                Edit
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(post.id);
                                }}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>)

}

export default PostList