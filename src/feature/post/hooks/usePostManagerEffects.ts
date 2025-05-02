import { useEffect } from "react"
import { useCommentStore } from "../../../stores/commentStore"
import { usePostStore } from "../../../stores/postStore"
import { Post } from "../../../types/Post/post"

export const usePostManagerEffects = (selectedPost: Post | null) => {
  const fetchPosts = usePostStore((s) => s.fetchPosts)
  const fetchCommentsByPostId = useCommentStore((s) => s.fetchCommentsByPostId)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    fetchCommentsByPostId(selectedPost?.id || 0)
  }, [fetchCommentsByPostId, selectedPost?.id])
}
