import { useToggle } from "../../../shared/hooks/useToggle"

export default function useCommentDialogState() {
  const showAddCommentDialog = useToggle(false)
  const showEditCommentDialog = useToggle(false)
  const showCommentDetailDialog = useToggle(false)
  return {
    showAddCommentDialog,
    showEditCommentDialog,
    showCommentDetailDialog,
  }
}
