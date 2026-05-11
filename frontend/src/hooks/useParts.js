import { useQuery } from '@tanstack/react-query'
import { getParts, getPartById } from '../lib/api.js'

export const useParts = (params) => useQuery({
  queryKey: ['parts', params],
  queryFn:  () => getParts(params),
  placeholderData: (prev) => prev,
})

export const usePart = (id) => useQuery({
  queryKey: ['part', id],
  queryFn:  () => getPartById(id),
  enabled:  !!id,
})