// EditPost.jsx

import PostForm from "../components/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost, updatedPost } from "../api/Posts";

function EditPost() {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { id } = useParams();

    const { data: post, isLoading, isError, error } = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPost(id)
    })

    const updatedPostMutation = useMutation({
        mutationFn: updatedPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            navigate("/");
        }
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>

    const handleSubmit = (updatedPost) => {
        updatedPostMutation.mutate({ id, ...updatedPost });
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-xl mx-auto">
            <PostForm onSubmit={handleSubmit} initialValue={post} />
        </div>
    )
}

export default EditPost
