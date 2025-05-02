import { Trash2, Edit2, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react"
import { Button, Table } from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/lib/highlightText"
import { usePostStore } from "../../../stores/postStore"
import { useToggle } from "../../../shared/hooks/useToggle"
import { useLocation } from "react-router-dom"
import { useMemo } from "react"
import { usePostQuerySync } from "../../../shared/hooks/usePostQuerySync"

export default function PostTable() {
  const { posts, loading, selectedTag, deletePost, setSelectedTag } = usePostStore()

  const editDialog = useToggle()
  const detailDialog = useToggle()
  const syncQuery = usePostQuerySync()
  const location = useLocation()

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const searchQuery = queryParams.get("search") || ""
  const sortBy = queryParams.get("sortBy") || ""
  const sortOrder = queryParams.get("sortOrder") || ""

  if (loading) return <div>로딩중...</div>

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
        {posts.map((post) => (
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
                onClick={() => post.author && detailDialog.open()}
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
                <Button variant="ghost" size="sm" onClick={() => detailDialog.open()}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={editDialog.open}>
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
