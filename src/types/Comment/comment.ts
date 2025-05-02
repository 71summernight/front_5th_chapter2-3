export type CommentUser = {
  id: number
  username: string
  fullName: string
}

export type Comment = {
  id: number
  body: string
  postId: number
  user: CommentUser
  likes: number
}

export type CommentsMap = Record<number, Comment[]>
