import { Dialog } from "../../../shared/ui/Dialog"
import { DialogContent } from "../../../shared/ui"
import { useToggle } from "../../../shared/hooks/useToggle"
import { User } from "../../../types/User/user"
import { useRef } from "react"

export default function UserDetailDialog() {
  const showUserModal = useToggle(false)
  const selectedUser = useRef<User | null>(null)

  return (
    <Dialog open={showUserModal.isOpen} onOpenChange={showUserModal.toggle}>
      <DialogContent>
        <Dialog.Header>
          <Dialog.Title>사용자 정보</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <img
            src={selectedUser.current?.image}
            alt={selectedUser.current?.username}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold text-center">{selectedUser.current?.username}</h3>
          <div className="space-y-2">
            <p>
              <strong>이름:</strong> {selectedUser.current?.firstName} {selectedUser.current?.lastName}
            </p>
            <p>
              <strong>나이:</strong> {selectedUser.current?.age}
            </p>
            <p>
              <strong>이메일:</strong> {selectedUser.current?.email}
            </p>
            <p>
              <strong>전화번호:</strong> {selectedUser.current?.phone}
            </p>
            <p>
              <strong>주소:</strong> {selectedUser.current?.address?.address}, {selectedUser.current?.address?.city},{" "}
              {selectedUser.current?.address?.state}
            </p>
            <p>
              <strong>직장:</strong> {selectedUser.current?.company?.name} - {selectedUser.current?.company?.title}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
