import { useMemo } from "react"
import { Plus } from "lucide-react"
import { Button, Card } from "../shared/ui"
import { useLocation } from "react-router-dom"
import { useCommentStore } from "../stores/commentStore"
import UserDetailDialog from "../feature/user/ui/UserDetailDialog"
import { PostSearchFilter, PostTable, PostPageNation, PostAddDialog, PostEditDialog } from "../feature/post/ui"
import { CommentAddDialog, CommentEditDialog } from "../feature/comment/ui"
import { usePostManagerEffects } from "../feature/post/hooks/usePostManagerEffects"
import { usePostDialogState } from "../feature/post/hooks/usePostDialogState"
import useCommentDialogState from "../feature/comment/hooks/useCommentDialogState"
import { usePostManagerState } from "../feature/post/hooks/usePostManagerState"
import CommentDetailDialog from "../feature/comment/ui/CommentDetailDialog"
import { usePostStore } from "../stores/postStore"

const PostsManager = () => {
  const { selectedComment, setSelectedComment, updateComment } = useCommentStore()
  const { skip, limit } = usePostStore()

  const location = useLocation()
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const searchQuery = queryParams.get("search") || ""

  const { selectedPost, setSelectedPost, newComment, setNewComment, selectedTag } = usePostManagerState()
  const { showAddDialog, showEditDialog } = usePostDialogState()
  const { showAddCommentDialog, showEditCommentDialog, showCommentDetailDialog } = useCommentDialogState()
  usePostManagerEffects(selectedPost, selectedTag, skip, limit)

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
          <PostSearchFilter searchQuery={searchQuery} />
          <PostTable
            setSelectedPost={setSelectedPost}
            searchQuery={searchQuery}
            showEditDialog={showEditDialog}
            showCommentDetailDialog={showCommentDetailDialog}
          />
          <PostPageNation />
        </div>
      </Card.Content>
      <PostAddDialog showAddDialog={showAddDialog} />
      <PostEditDialog showEditDialog={showEditDialog} selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
      <CommentAddDialog
        showAddCommentDialog={showAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
      />
      <CommentEditDialog
        showEditCommentDialog={showEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={updateComment}
      />
      <CommentDetailDialog
        showCommentDetailDialog={showCommentDetailDialog}
        selectedPost={selectedPost}
        setNewComment={setNewComment}
        selectedComment={selectedComment}
        showAddCommentDialog={showAddCommentDialog}
        showEditCommentDialog={showEditCommentDialog}
        setSelectedComment={setSelectedComment}
        searchQuery={searchQuery}
      />
      <UserDetailDialog />
    </Card>
  )
}

export default PostsManager
