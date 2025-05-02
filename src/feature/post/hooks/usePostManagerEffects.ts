import { useEffect } from "react"
import { useCommentStore } from "../../../stores/commentStore"
import { usePostStore } from "../../../stores/postStore"
import { Post } from "../../../types/Post/post"

export const usePostManagerEffects = (
  selectedPost: Post | null,
  selectedTag: string | null,
  skip: number,
  limit: number,
) => {
  const fetchPosts = usePostStore((s) => s.fetchPosts)
  const fetchTags = usePostStore((s) => s.fetchTags)
  const fetchPostsByTag = usePostStore((s) => s.fetchPostsByTag)
  const fetchCommentsByPostId = useCommentStore((s) => s.fetchCommentsByPostId)

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
  }, [skip, limit, selectedTag, fetchPostsByTag, fetchPosts])

  useEffect(() => {
    if (selectedPost) {
      fetchCommentsByPostId(selectedPost.id)
    }
  }, [fetchCommentsByPostId, selectedPost, selectedPost?.id])
}
