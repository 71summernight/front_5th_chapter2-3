// store/postStore.ts
import { create } from "zustand"
import type { Post, Tag, BasicUser } from "../types/Post/post"
import { commonApi } from "../shared/utils/apiUtils"

interface PostStore {
  posts: Post[]
  total: number
  skip: number
  limit: number
  tags: Tag[]
  selectedTag: string
  loading: boolean
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSelectedTag: (tag: string) => void
  fetchPosts: () => Promise<void>
  fetchTags: () => Promise<void>
  fetchPostsByTag: (tag: string) => Promise<void>
  addPost: (post: Omit<Post, "id">) => Promise<void>
  updatePost: (post: Post) => Promise<void>
  deletePost: (id: number) => Promise<void>
  syncFromQueryParams: (params: URLSearchParams) => void
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  total: 0,
  skip: 0,
  limit: 10,
  tags: [],
  selectedTag: "",
  loading: false,

  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),

  fetchPosts: async () => {
    set({ loading: true })
    try {
      const { limit, skip } = get()
      const [postsData, users] = await Promise.all([commonApi.fetchPosts(limit, skip), commonApi.fetchUsers()])

      const postsWithAuthor = postsData.posts.map((post: Post) => ({
        ...post,
        author: users.find((user: BasicUser) => user.id === post.userId),
      }))

      set({ posts: postsWithAuthor, total: postsData.total })
    } catch (err) {
      console.error("fetchPosts error", err)
    } finally {
      set({ loading: false })
    }
  },

  fetchTags: async () => {
    try {
      const tags = await commonApi.fetchTags()
      set({ tags: tags.map((tag: string) => ({ name: tag, slug: tag, url: `/posts/tag/${tag}` })) })
    } catch (err) {
      console.error("fetchTags error", err)
    }
  },

  fetchPostsByTag: async (tag: string) => {
    set({ loading: true })
    const { limit, skip } = get()
    if (!tag || tag === "all") {
      await get().fetchPosts()
      return
    }

    try {
      const [postsData, users] = await Promise.all([
        commonApi.fetchPostsByTag(tag, limit, skip),
        commonApi.fetchUsers(),
      ])

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: users.find((user: BasicUser) => user.id === post.userId),
      }))

      set({ posts: postsWithUsers, total: postsData.total })
    } catch (error) {
      console.error("fetchPostsByTag error:", error)
    } finally {
      set({ loading: false })
    }
  },

  addPost: async (newPost) => {
    try {
      const data = await commonApi.addPost(newPost)
      set({ posts: [data, ...get().posts] })
    } catch (e) {
      console.error("게시물 추가 실패", e)
    }
  },

  updatePost: async (updatedPost) => {
    try {
      const data = await commonApi.updatePost(updatedPost)
      set({
        posts: get().posts.map((post) => (post.id === data.id ? data : post)),
      })
    } catch (e) {
      console.error("게시물 수정 실패", e)
    }
  },

  deletePost: async (id) => {
    try {
      await commonApi.deletePost(id)
      set({ posts: get().posts.filter((post) => post.id !== id) })
    } catch (e) {
      console.error("게시물 삭제 실패", e)
    }
  },

  syncFromQueryParams: (params: URLSearchParams) => {
    set({
      limit: Number(params.get("limit") || 10),
      skip: Number(params.get("skip") || 0),
      selectedTag: params.get("tag") || "",
    })
  },
}))
