export type CommentUser = {
  id: number
  username: string
  fullName: string
}

export type Comment = {
  id: number
  body: string
  postId?: number
  user: CommentUser
  likes: number
}

export type NewCommentInput = Omit<Comment, "id" | "likes">

export type CommentsMap = Record<number, Comment[]>

export type FetchCommentsResponse = {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}
