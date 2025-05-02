import { useState } from "react"
import { Post } from "../../../types/Post/post"
import { NewCommentInput } from "../../../types/Comment/comment"
export const usePostManagerState = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState<NewCommentInput>({
    body: "",
    postId: selectedPost?.id || undefined,
    // TODO: 유저 정보 추가
    user: {
      id: 1,
      username: "",
      fullName: "",
    },
  })

  return { selectedPost, setSelectedPost, newComment, setNewComment }
}
