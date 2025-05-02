import { Dialog, Textarea } from "../../../shared/ui"
import { Button } from "../../../shared/ui/Button"
import {  NewCommentInput } from "../../../types/Comment/comment"
import { useCommentStore } from "../../../stores/commentStore"
export default function CommentAddDialog({
  showAddCommentDialog,
  newComment,
  setNewComment,
}: {
  showAddCommentDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
  newComment: NewCommentInput
  setNewComment: (comment: NewCommentInput) => void
}) {
  const { addComment } = useCommentStore()
  return (
    <Dialog open={showAddCommentDialog.isOpen} onOpenChange={showAddCommentDialog.toggle}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 댓글 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button
            onClick={() => {
              addComment(newComment).then(() => {
                showAddCommentDialog.close()
              })
            }}
          >
            댓글 추가
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
