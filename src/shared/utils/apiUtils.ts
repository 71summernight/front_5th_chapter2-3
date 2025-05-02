import { BasicUser, Post, PostResponse } from "../../types/Post/post"
import { Comment, FetchCommentsResponse, NewCommentInput } from "../../types/Comment/comment"
import { apiClient } from "./apiClient"

export const commonApi = {
  // USER API
  async fetchUsers() {
    const res = await apiClient.get<{ users: BasicUser[] }>("/api/users?limit=0&select=username,image")
    return res.users
  },

  // TAG API
  fetchTags: async () => {
    const res = await apiClient.get("/api/posts/tags")
    return res
  },

  // POST API
  async fetchPosts(limit: number, skip: number) {
    return await apiClient.get<PostResponse>(`/api/posts?limit=${limit}&skip=${skip}`)
  },

  async fetchPostsByTag(tag: string, limit: number, skip: number) {
    return await apiClient.get<PostResponse>(`/api/posts/tag/${tag}?limit=${limit}&skip=${skip}`)
  },

  async addPost(post: Omit<Post, "id">) {
    return await apiClient.post<Post>("/api/posts/add", post)
  },

  async updatePost(post: Post) {
    return await apiClient.put<Post>(`/api/posts/${post.id}`, post)
  },

  async deletePost(id: number) {
    return await apiClient.delete(`/api/posts/${id}`)
  },

  async searchPosts(query: string) {
    return await apiClient.get<PostResponse>(`/api/posts/search?query=${query}`)
  },

  // COMMENT API
  async fetchComments(postId: number) {
    return await apiClient.get<FetchCommentsResponse>(`/api/comments/post/${postId}`)
  },

  async addComment(comment: NewCommentInput) {
    return await apiClient.post<Comment>("/api/comments/add", comment)
  },

  async updateComment(comment: Pick<Comment, "id" | "body">) {
    return await apiClient.put<Comment>(`/api/comments/${comment.id}`, { body: comment.body })
  },

  async deleteComment(id: number) {
    return await apiClient.delete(`/api/comments/${id}`)
  },

  async likeComment(id: number, likes: number) {
    return await apiClient.patch<Comment>(`/api/comments/${id}`, { likes })
  },
}
