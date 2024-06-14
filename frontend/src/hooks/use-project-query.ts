import { useSearchParams } from 'react-router-dom'

export function useProjectQuery() {
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name')

  return { name, setSearchParams }
}
