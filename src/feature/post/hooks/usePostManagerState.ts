import { useState } from "react"
import { Post } from "../../../types/Post/post"
import { Comment as CommentType } from "../../../types/Comment/comment"
export const usePostManagerState = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState<Omit<CommentType, "id" | "likes">>({
    body: "",
    postId: selectedPost?.id || undefined,
    user: {
      id: 1,
      username: "",
      fullName: "",
    },
  })

  return { selectedPost, setSelectedPost, newComment, setNewComment }
}
