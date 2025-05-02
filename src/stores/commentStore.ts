// store/commentStore.ts
import { create } from "zustand"
import type { Comment, NewCommentInput } from "../types/Comment/comment"
import { commonApi } from "../shared/utils/apiUtils"

export interface CommentStore {
  comments: Record<number, Comment[]>
  selectedComment: Comment | null
  setSelectedComment: (comment: Comment | null) => void
  fetchCommentsByPostId: (postId: number) => Promise<void>
  addComment: (comment: NewCommentInput) => Promise<void>
  updateComment: (comment: Pick<Comment, "id" | "body">) => Promise<void>
  deleteComment: (id: number, postId: number) => Promise<void>
  likeComment: (id: number, postId: number, likes: number) => Promise<void>
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: {},
  selectedComment: null,

  setSelectedComment: (comment) => set({ selectedComment: comment }),

  fetchCommentsByPostId: async (postId) => {
    if (postId == null) return
    try {
      const data = await commonApi.fetchComments(postId)
      set((state) => ({
        comments: { ...state.comments, [postId]: data.comments },
      }))
    } catch (e) {
      console.error("댓글 조회 실패", e)
    }
  },

  addComment: async (comment: NewCommentInput) => {
    try {
      const data: Comment = await commonApi.addComment(comment)

      const postId = data.postId
      if (typeof postId !== "number") {
        console.log("postId가 유효하지 않아 댓글을 추가하지 않습니다.")
        return
      }

      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), data],
        },
      }))
    } catch (e) {
      console.error("댓글 추가 실패", e)
    }
  },

  updateComment: async (comment) => {
    try {
      const data = await commonApi.updateComment(comment)
      if (typeof data.postId !== "number") {
        console.log("postId가 유효하지 않아 댓글 수정을 건너뜁니다.")
        return
      }

      set((state) => ({
        comments: {
          ...state.comments,
          [data.postId!]: state.comments[data.postId!].map((comment: Comment) =>
            comment.id === data.id ? data : comment,
          ),
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
    if (!postId) {
      console.warn("postId가 없어 좋아요 요청을 무시합니다.")
      return
    }

    try {
      const data = await commonApi.likeComment(id, likes)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].map((c) => (c.id === id ? { ...c, likes: data.likes + 1 } : c)),
        },
      }))
    } catch (e) {
      console.error("댓글 좋아요 실패", e)
    }
  },
}))
