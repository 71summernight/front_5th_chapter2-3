import { Dialog, Textarea } from "../../../shared/ui"
import { Button } from "../../../shared/ui/Button"
import { DialogContent } from "../../../shared/ui"
import { Comment as CommentType } from "../../../types/Comment/comment"
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
  newComment: Omit<CommentType, "id" | "likes">
  setNewComment: (comment: Omit<CommentType, "id" | "likes">) => void
}) {
  const { addComment } = useCommentStore()
  return (
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
  )
}
