import { useToggle } from "../../../shared/hooks/useToggle"

export const usePostDialogState = () => {
  const showAddDialog = useToggle(false)
  const showEditDialog = useToggle(false)
  const showPostDetailDialog = useToggle(false)

  return {
    showAddDialog,
    showEditDialog,
    showPostDetailDialog,
  }
}
