// App.jsx

import { Routes, Route } from 'react-router-dom'
import PostList from './pages/postList'
import Post from './pages/Post'
import EditPost from './pages/EditPost'

function App() {

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-0 mb-10 bg-linear-to-r from-blue-500 to-blue-700 text-white py-6 shadow-lg">Simple Blog App</h1>
      <div className="max-w-4xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Routes>
      </div>
    </>
  )
}

export default App
