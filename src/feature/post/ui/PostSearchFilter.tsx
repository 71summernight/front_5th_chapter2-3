import { Search } from "lucide-react"
import React, { useMemo } from "react"
import { Input } from "../../../shared/ui/Input"
import { Tag } from "../../../types/Post/post"
import { updateQueryParams } from "../../../shared/utils/utils"
import { Select } from "../../../shared/ui/Select"
import { useLocation, useNavigate } from "react-router-dom"
import { usePostStore } from "../../../stores/postStore"

export default function PostSearchFilter({ searchQuery }: { searchQuery: string }) {
  const selectedTag = usePostStore((s) => s.selectedTag)
  const fetchPostsByTag = usePostStore((s) => s.fetchPostsByTag)
  const setSelectedTag = usePostStore((s) => s.setSelectedTag)
  const searchPosts = usePostStore((s) => s.searchPosts)
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const sortBy = queryParams.get("sortBy") || ""
  const sortOrder = queryParams.get("sortOrder") || ""
  const tags = usePostStore((s) => s.tags)

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateQueryParams(navigate, queryParams, { search: e.target.value })
            }
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && searchPosts(searchQuery)}
          />
        </div>
      </div>
      <Select
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value)
          fetchPostsByTag(value)
        }}
      >
        <Select.Trigger className="w-[180px]">
          <Select.Value placeholder="태그 선택" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="all">모든 태그</Select.Item>
          {tags?.length > 0 &&
            tags?.map((tag: Tag) => (
              <Select.Item key={tag.url} value={tag.slug}>
                {tag.name}
              </Select.Item>
            ))}
        </Select.Content>
      </Select>
      <Select value={sortBy} onValueChange={(value) => updateQueryParams(navigate, queryParams, { sortBy: value })}>
        <Select.Trigger className="w-[180px]">
          <Select.Value placeholder="정렬 기준" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="none">없음</Select.Item>
          <Select.Item value="id">ID</Select.Item>
          <Select.Item value="title">제목</Select.Item>
          <Select.Item value="reactions">반응</Select.Item>
        </Select.Content>
      </Select>
      <Select
        value={sortOrder}
        onValueChange={(value) => updateQueryParams(navigate, queryParams, { sortOrder: value })}
      >
        <Select.Trigger className="w-[180px]">
          <Select.Value placeholder="정렬 순서" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="asc">오름차순</Select.Item>
          <Select.Item value="desc">내림차순</Select.Item>
        </Select.Content>
      </Select>
    </div>
  )
}
