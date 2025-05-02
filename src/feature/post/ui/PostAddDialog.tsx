import { Dialog } from "../../../shared/ui/Dialog"
import { Button } from "../../../shared/ui/Button"
import { Input } from "../../../shared/ui/Input"
import { Textarea } from "../../../shared/ui/TextArea"
import { DialogContent } from "../../../shared/ui"
import { useState } from "react"
import { Post } from "../../../types/Post/post"
import { usePostStore } from "../../../stores/postStore"

export default function PostAddDialog({
  showAddDialog,
}: {
  showAddDialog: {
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
  }
}) {
  const { addPost } = usePostStore()
  const [newPost, setNewPost] = useState<Omit<Post, "id">>({
    title: "",
    body: "",
    userId: 1,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
  })

  return (
    <Dialog open={showAddDialog.isOpen} onOpenChange={showAddDialog.toggle}>
      <DialogContent>
        <Dialog.Header>
          <Dialog.Title>새 게시물 추가</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={() => addPost(newPost)}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
