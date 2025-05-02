// store/commentStore.ts
import { create } from "zustand"
import type { Comment } from "../types/Comment/comment"
import { commonApi } from "../shared/utils/apiUtils"

interface CommentStore {
  comments: Record<number, Comment[]>
  selectedComment: Comment | null
  setSelectedComment: (comment: Comment | null) => void
  fetchCommentsByPostId: (postId: number) => Promise<void>
  addComment: (comment: Omit<Comment, "id" | "likes">) => Promise<void>
  updateComment: (comment: Pick<Comment, "id" | "body">) => Promise<void>
  deleteComment: (id: number, postId: number) => Promise<void>
  likeComment: (id: number, postId: number, likes: number) => Promise<void>
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: {},
  selectedComment: null,

  setSelectedComment: (comment) => set({ selectedComment: comment }),

  fetchCommentsByPostId: async (postId) => {
    try {
      const data = await commonApi.fetchComments(postId)
      set((state) => ({
        comments: { ...state.comments, [postId]: data },
      }))
    } catch (e) {
      console.error("댓글 조회 실패", e)
    }
  },

  addComment: async (comment) => {
    try {
      const data = await commonApi.addComment(comment)
      set((state) => ({
        comments: {
          ...state.comments,
          [data.postId]: [...(state.comments[data.postId] || []), data],
        },
      }))
    } catch (e) {
      console.error("댓글 추가 실패", e)
    }
  },

  updateComment: async (comment) => {
    try {
      const data = await commonApi.updateComment(comment)
      set((state) => ({
        comments: {
          ...state.comments,
          [data.postId]: state.comments[data.postId].map((c) => (c.id === data.id ? data : c)),
        },
      }))
    } catch (e) {
      console.error("댓글 수정 실패", e)
    }
  },

  deleteComment: async (id, postId) => {
    try {
      await commonApi.deleteComment(id)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].filter((c) => c.id !== id),
        },
      }))
    } catch (e) {
      console.error("댓글 삭제 실패", e)
    }
  },

  likeComment: async (id, postId, likes) => {
    try {
      const data = await commonApi.likeComment(id, likes)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].map((c) => (c.id === id ? { ...c, likes: data.likes } : c)),
        },
      }))
    } catch (e) {
      console.error("댓글 좋아요 실패", e)
    }
  },
}))
