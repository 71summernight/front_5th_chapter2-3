import { Dialog, Input, Textarea } from "../../../shared/ui"
import { Button } from "../../../shared/ui/Button"
import { Post } from "../../../types/Post/post"
import { usePostStore } from "../../../stores/postStore"

export default function PostEditDialog({
  showEditDialog,
  selectedPost,
  setSelectedPost,
}: {
  showEditDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
  selectedPost: Post | null
  setSelectedPost: (post: Post) => void
}) {
  const { updatePost } = usePostStore()
  return (
    <Dialog open={showEditDialog.isOpen} onOpenChange={showEditDialog.toggle}>
      <Dialog.Content>
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
      </Dialog.Content>
    </Dialog>
  )
}
