export type Reaction = {
  likes: number
  dislikes: number
}

export type User = {
  id: number
  username: string
  image: string
}

export type Post = {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reaction
  views: number
  userId: number
  author?: User
}

export type PostResponse = {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export type UserResponse = {
  users: User[]
  total: number
}

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
