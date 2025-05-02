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

export type NewCommentInput = {
  body: string
  postId?: number
  userId: number
}

export type CommentsMap = Record<number, Comment[]>

export type FetchCommentsResponse = {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}
