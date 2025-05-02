type PostQueryParams = {
  search?: string
  sortBy?: string
  sortOrder?: string
  tag?: string
}

import { usePostStore } from "../../stores/postStore"
import { useNavigate } from "react-router-dom"
import { syncPostQueryParams } from "../utils/utils"

export const usePostQuerySync = () => {
  const navigate = useNavigate()
  const { skip, limit, selectedTag } = usePostStore()
  return (extra: PostQueryParams) => {
    syncPostQueryParams(navigate, { skip, limit, selectedTag, ...extra })
  }
}
