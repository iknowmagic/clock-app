import { QuoteResponse } from '@/types/api.types'

export interface QuoteSectionProps {
  quote: QuoteResponse
  loaded: boolean
  refreshing: boolean
  onRefresh: () => void
  visible: boolean
}
