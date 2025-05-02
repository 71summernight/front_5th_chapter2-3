import { useState } from "react"
import { Post } from "../../../types/Post/post"
import { NewCommentInput } from "../../../types/Comment/comment"

export const usePostManagerState = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [newComment, setNewComment] = useState<NewCommentInput>({
    body: "",
    postId: selectedPost?.id || undefined,
    userId: 1,
  })

  return { selectedPost, setSelectedPost, newComment, setNewComment, selectedTag, setSelectedTag }
}
