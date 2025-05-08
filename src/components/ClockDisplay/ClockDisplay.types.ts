import { ClockData, GreetingTime, TimeData } from '@/types/time.types'

export interface ClockDisplayProps {
  clockData: ClockData
  timeData: TimeData
  greetingTime: GreetingTime
  isFooterExpanded: boolean
}
