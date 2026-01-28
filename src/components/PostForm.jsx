// PostForm.jsx

import { useState } from "react"

function PostForm({onSubmit, initialValue}) {

    const [post, setPost] = useState({
        title: initialValue?.title || "",
        content: initialValue?.content || "",
    })  

    const renderField = (label) => {
        
        

        const handleChange = (e) => { 
            setPost({
                ...post,
                [e.target.name]: e.target.value
            })
        }

        return (
            <>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    name={label.toLowerCase()}
                    value={post[label.toLowerCase()]}
                    onChange={handleChange}/>
            </>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(post)
        setPost({
            title: "",
            content: ""
            })
        }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-2">
                {renderField("Title")}
                {renderField("Content")}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition" type="submit">Submit</button>
            </form>
        </>
    )
}

export default PostForm