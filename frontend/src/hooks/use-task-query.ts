import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

export function useTaskQuery() {
  const [searchParams, setSearchParams] = useSearchParams()

  const title = searchParams.get('title')
  const status = searchParams.get('status')
  const page = z.coerce.number().parse(searchParams.get('page') ?? 1)

  return { title, status, page, setSearchParams }
}
