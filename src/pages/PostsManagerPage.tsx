import { useEffect, useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"
import { Comment as CommentType } from "../types/Comment/comment"
import { Post, Tag } from "../types/Post/post"
import { User } from "../types/User/user"
import { Button, Card, Dialog, DialogContent, Input, Select, Textarea } from "../shared/ui"
import PostTable from "../feature/post/ui/PostTable"
import { highlightText } from "../shared/ui/lib/highlightText"
import { usePostStore } from "../stores/postStore"
import { useLocation, useNavigate } from "react-router-dom"
import { updateQueryParams } from "../shared/utils/utils"
import { useCommentStore } from "../stores/commentStore"
import { useToggle } from "../shared/hooks/useToggle"
import Comment from "../feature/comment/ui/Comment"

const PostsManager = () => {
  const {
    tags,
    total,
    skip,
    limit,
    selectedTag,
    loading,
    setSkip,
    setLimit,
    setSelectedTag,
    syncFromQueryParams,
    fetchPostsByTag,
    addPost,
    fetchPosts,
    updatePost,
  } = usePostStore()

  const { fetchCommentsByPostId, selectedComment, setSelectedComment, addComment, updateComment } = useCommentStore()

  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const searchQuery = queryParams.get("search") || ""
  const sortBy = queryParams.get("sortBy") || ""
  const sortOrder = queryParams.get("sortOrder") || ""

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const showAddDialog = useToggle(false)
  const showEditDialog = useToggle(false)
  const [newPost, setNewPost] = useState<Omit<Post, "id">>({
    title: "",
    body: "",
    userId: 1,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
  })

  const [newComment, setNewComment] = useState<Omit<CommentType, "id" | "likes">>({
    body: "",
    postId: selectedPost?.id || undefined,
    user: {
      id: 1,
      username: "",
      fullName: "",
    },
  })

  const showAddCommentDialog = useToggle(false)
  const showEditCommentDialog = useToggle(false)
  const showPostDetailDialog = useToggle(false)
  const showUserModal = useToggle(false)

  const [selectedUser] = useState<User | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  useEffect(() => {
    fetchCommentsByPostId(selectedPost?.id || 0)
  }, [fetchCommentsByPostId, selectedPost?.id])

  useEffect(() => {
    syncFromQueryParams(new URLSearchParams(location.search))
  }, [location.search, syncFromQueryParams])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={showAddDialog.open}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateQueryParams(navigate, queryParams, { search: e.target.value })
                  }
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && fetchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                setSelectedTag(value)
                fetchPostsByTag(value)
                syncFromQueryParams(new URLSearchParams(location.search))
              }}
            >
              <Select.Trigger className="w-[180px]">
                <Select.Value placeholder="태그 선택" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="all">모든 태그</Select.Item>
                {tags.map((tag: Tag) => (
                  <Select.Item key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value) => updateQueryParams(navigate, queryParams, { sortBy: value })}
            >
              <Select.Trigger className="w-[180px]">
                <Select.Value placeholder="정렬 기준" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="none">없음</Select.Item>
                <Select.Item value="id">ID</Select.Item>
                <Select.Item value="title">제목</Select.Item>
                <Select.Item value="reactions">반응</Select.Item>
              </Select.Content>
            </Select>
            <Select
              value={sortOrder}
              onValueChange={(value) => updateQueryParams(navigate, queryParams, { sortOrder: value })}
            >
              <Select.Trigger className="w-[180px]">
                <Select.Value placeholder="정렬 순서" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="asc">오름차순</Select.Item>
                <Select.Item value="desc">내림차순</Select.Item>
              </Select.Content>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <Select.Trigger className="w-[180px]">
                  <Select.Value placeholder="10" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="10">10</Select.Item>
                  <Select.Item value="20">20</Select.Item>
                  <Select.Item value="30">30</Select.Item>
                </Select.Content>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </Card.Content>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog.isOpen} onOpenChange={showAddDialog.toggle}>
        <DialogContent>
          <Dialog.Header>
            <Dialog.Title>새 게시물 추가</Dialog.Title>
          </Dialog.Header>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={() => addPost(newPost)}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog.isOpen} onOpenChange={showEditDialog.toggle}>
        <DialogContent>
          <Dialog.Header>
            <Dialog.Title>게시물 수정</Dialog.Title>
          </Dialog.Header>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => {
                if (!selectedPost) return
                setSelectedPost({ ...selectedPost, title: e.target.value })
              }}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => {
                if (!selectedPost) return
                setSelectedPost({ ...selectedPost, body: e.target.value })
              }}
            />
            <Button onClick={() => updatePost(selectedPost!)}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog.isOpen} onOpenChange={showAddCommentDialog.toggle}>
        <DialogContent>
          <Dialog.Header>
            <Dialog.Title>새 댓글 추가</Dialog.Title>
          </Dialog.Header>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={() => addComment(newComment)}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog.isOpen} onOpenChange={showEditCommentDialog.toggle}>
        <DialogContent>
          <Dialog.Header>
            <Dialog.Title>댓글 수정</Dialog.Title>
          </Dialog.Header>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => {
                if (!selectedComment) return
                setSelectedComment({ ...selectedComment, body: e.target.value })
              }}
            />
            <Button onClick={() => updateComment(selectedComment!)}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog.isOpen} onOpenChange={showPostDetailDialog.toggle}>
        <DialogContent className="max-w-3xl">
          <Dialog.Header>
            <Dialog.Title>{highlightText(selectedPost?.title || "", searchQuery)}</Dialog.Title>
          </Dialog.Header>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
            <Comment
              postId={selectedPost?.id || 0}
              setNewComment={setNewComment}
              showAddCommentDialog={showAddCommentDialog}
              showEditCommentDialog={showEditCommentDialog}
              setSelectedComment={setSelectedComment}
              searchQuery={searchQuery}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 */}
      <Dialog open={showUserModal.isOpen} onOpenChange={showUserModal.toggle}>
        <DialogContent>
          <Dialog.Header>
            <Dialog.Title>사용자 정보</Dialog.Title>
          </Dialog.Header>
          <div className="space-y-4">
            <img src={selectedUser?.image} alt={selectedUser?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{selectedUser?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {selectedUser?.firstName} {selectedUser?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {selectedUser?.age}
              </p>
              <p>
                <strong>이메일:</strong> {selectedUser?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {selectedUser?.phone}
              </p>
              <p>
                <strong>주소:</strong> {selectedUser?.address?.address}, {selectedUser?.address?.city},{" "}
                {selectedUser?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {selectedUser?.company?.name} - {selectedUser?.company?.title}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PostsManager
