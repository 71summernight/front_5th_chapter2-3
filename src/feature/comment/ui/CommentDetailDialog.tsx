import { Dialog } from "../../../shared/ui"
import { highlightText } from "../../../shared/ui/lib/highlightText"
import { Post } from "../../../types/Post/post"
import Comment from "./Comment"
import { Comment as CommentType } from "../../../types/Comment/comment"
export default function CommentDetailDialog({
  selectedPost,
  setNewComment,
  showAddCommentDialog,
  showEditCommentDialog,
  setSelectedComment,
  searchQuery,
  showCommentDetailDialog,
}: {
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
  showCommentDetailDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
  setSelectedComment: (comment: CommentType | null) => void
  searchQuery: string
}) {
  return (
    <Dialog open={showCommentDetailDialog.isOpen} onOpenChange={showCommentDetailDialog.toggle}>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>{highlightText(selectedPost?.title || "", searchQuery)}</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
          {selectedPost && (
            <Comment
              postId={selectedPost.id}
              setNewComment={setNewComment}
              showAddCommentDialog={showAddCommentDialog}
              showEditCommentDialog={showEditCommentDialog}
              setSelectedComment={setSelectedComment}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
