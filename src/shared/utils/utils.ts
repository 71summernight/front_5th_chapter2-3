import { NavigateFunction } from "react-router-dom"
export const syncPostQueryParams = (
  navigate: NavigateFunction,
  state: { skip: number; limit: number; selectedTag: string; sortBy?: string; sortOrder?: string; search?: string },
) => {
  const searchParams = new URLSearchParams()

  Object.entries(state).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value))
    }
  })

  navigate(`?${searchParams.toString()}`)
}

export const updateQueryParams = (
  navigate: NavigateFunction,
  currentParams: URLSearchParams,
  next: Record<string, string>,
) => {
  const params = new URLSearchParams(currentParams)
  Object.entries(next).forEach(([key, value]) => {
    params.set(key, value)
  })
  navigate(`?${params.toString()}`)
}
