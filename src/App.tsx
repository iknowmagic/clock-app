import { LazyMotion, domAnimation } from 'framer-motion'
import ClockApp from '@/components/ClockApp/ClockApp'

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <ClockApp />
    </LazyMotion>
  )
}

export default App
