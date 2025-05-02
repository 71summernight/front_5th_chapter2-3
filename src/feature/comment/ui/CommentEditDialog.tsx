import { Button } from "../../../shared/ui/Button"
import { DialogContent, Textarea } from "../../../shared/ui"
import { Dialog } from "../../../shared/ui"
import { Comment as CommentType } from "../../../types/Comment/comment"
export default function CommentEditDialog({
  showEditCommentDialog,
  selectedComment,
  setSelectedComment,
  updateComment,
}: {
  showEditCommentDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
  selectedComment: CommentType | null
  setSelectedComment: (comment: CommentType) => void
  updateComment: (comment: CommentType) => void
}) {
  return (
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
  )
}
