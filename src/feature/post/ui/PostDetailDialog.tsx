import { DialogContent } from "../../../shared/ui"
import { Dialog } from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/lib/highlightText"
import { Post } from "../../../types/Post/post"
import Comment from "../../comment/ui/Comment"
import { Comment as CommentType } from "../../../types/Comment/comment"
export default function PostDetailDialog({
  showPostDetailDialog,
  selectedPost,
  setNewComment,
  showAddCommentDialog,
  showEditCommentDialog,
  setSelectedComment,
  searchQuery,
}: {
  showPostDetailDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
  showEditCommentDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
  selectedComment: CommentType | null
  selectedPost: Post | null
  setNewComment: React.Dispatch<React.SetStateAction<Omit<CommentType, "id" | "likes">>>
  showAddCommentDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
  setSelectedComment: (comment: CommentType | null) => void
  searchQuery: string
}) {
  return (
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
  )
}
