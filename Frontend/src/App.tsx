import { useMediaQuery } from 'react-responsive'
import Mobile from './platforms/Mobile'
import Desktop from './platforms/Desktop'

function App() {
  const isMobile = useMediaQuery({maxWidth: 700})

  return isMobile ? <Mobile/> : <Desktop/>
}

export default App
