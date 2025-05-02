import { Trash2, Edit2, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react"
import { Button, Table } from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/lib/highlightText"
import { usePostStore } from "../../../stores/postStore"
import { useLocation } from "react-router-dom"
import { useMemo } from "react"
import { usePostQuerySync } from "../../../shared/hooks/usePostQuerySync"
import { Post } from "../../../types/Post/post"
import { useCommentStore } from "../../../stores/commentStore"

export default function PostTable({
  searchQuery,
  showEditDialog,
  showCommentDetailDialog,
  setSelectedPost,
}: {
  searchQuery: string
  showCommentDetailDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
  showEditDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
  setSelectedPost: (post: Post) => void
}) {
  const { posts, loading, selectedTag, deletePost, setSelectedTag } = usePostStore()
  const fetchCommentsByPostId = useCommentStore((s) => s.fetchCommentsByPostId)
  const syncQuery = usePostQuerySync()
  const location = useLocation()

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const sortBy = queryParams.get("sortBy") || ""
  const sortOrder = queryParams.get("sortOrder") || ""

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [posts, searchQuery],
  )

  if (loading) return <div className="flex justify-center p-4">로딩 중...</div>

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-[50px]">ID</Table.Head>
          <Table.Head>제목</Table.Head>
          <Table.Head className="w-[150px]">작성자</Table.Head>
          <Table.Head className="w-[150px]">반응</Table.Head>
          <Table.Head className="w-[150px]">작업</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {filteredPosts.map((post) => (
          <Table.Row key={post.id}>
            <Table.Cell>{post.id}</Table.Cell>
            <Table.Cell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        syncQuery({ search: searchQuery, sortBy, sortOrder, tag })
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => post.author && showCommentDetailDialog.open()}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    fetchCommentsByPostId(post.id)
                    showCommentDetailDialog.open()
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={showEditDialog.open}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
