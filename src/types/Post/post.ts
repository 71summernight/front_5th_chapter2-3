export type Reaction = {
  likes: number
  dislikes: number
}

export type BasicUser = {
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
  author?: BasicUser
}

export type Tag = {
  name: string
  slug: string
  url: string
}

export type PostResponse = {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export type UserResponse = {
  users: BasicUser[]
  total: number
}
