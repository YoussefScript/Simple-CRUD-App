// addpost.jsx

import PostForm from "./PostForm"
import { useMutation } from "@tanstack/react-query"
import { createPost } from "../api/Posts"
import { v4 as uuidv4 } from "uuid"
import { useQueryClient } from "@tanstack/react-query"

function AddPost() {

    const queryClient = useQueryClient()
    
    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            console.log("Post added successfully")
        }
    })

    const handleAddPost = (post) => {
        createPostMutation.mutate({
            id: uuidv4(),
            ...post
        })
    }

    return (
        <>
            <h2 className="mt-8 text-xl font-semibold text-blue-600 border-b pb-2 mb-4">Add new post</h2>
            <PostForm onSubmit={handleAddPost} initialValue={{}}/>
        </>
    )
}

export default AddPost