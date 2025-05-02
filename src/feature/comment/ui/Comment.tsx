import { Button } from "../../../shared/ui"
import { Plus, Edit2, Trash2, ThumbsUp } from "lucide-react"
import { highlightText } from "../../../shared/ui/lib/highlightText"
import { useCommentStore } from "../../../stores/commentStore"
import { Comment as CommentType } from "../../../types/Comment/comment"
import { shallow } from "zustand/shallow"
import { useStoreWithEqualityFn } from "zustand/traditional"

export default function Comment({
  setNewComment,
  postId,
  showAddCommentDialog,
  showEditCommentDialog,
  setSelectedComment,
  searchQuery,
}: {
  setNewComment: React.Dispatch<React.SetStateAction<Omit<CommentType, "id" | "likes">>>
  postId: number
  showAddCommentDialog: { open: () => void; close: () => void }
  showEditCommentDialog: { open: () => void; close: () => void }
  setSelectedComment: (comment: CommentType | null) => void
  searchQuery: string
}) {
  const { comments, likeComment, deleteComment } = useStoreWithEqualityFn(
    useCommentStore,
    (state) => ({
      comments: state.comments,
      likeComment: state.likeComment,
      deleteComment: state.deleteComment,
    }),
    shallow,
  )

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId: postId }))
            showAddCommentDialog.open()
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment: CommentType) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId, comment.likes)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  showEditCommentDialog.open()
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
