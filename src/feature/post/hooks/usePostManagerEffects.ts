import { useEffect } from "react"
import { useCommentStore } from "../../../stores/commentStore"
import { usePostStore } from "../../../stores/postStore"
import { Post } from "../../../types/Post/post"

export const usePostManagerEffects = (
  selectedPost: Post | null,
  showCommentDetailDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  },
) => {
  const fetchPosts = usePostStore((s) => s.fetchPosts)
  const fetchCommentsByPostId = useCommentStore((s) => s.fetchCommentsByPostId)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    if (selectedPost) {
      fetchCommentsByPostId(selectedPost.id)
      showCommentDetailDialog.open()
    }
  }, [fetchCommentsByPostId, selectedPost, selectedPost?.id, showCommentDetailDialog])
}
