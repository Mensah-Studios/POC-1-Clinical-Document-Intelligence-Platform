import { useMediaQuery } from 'react-responsive'
import Mobile from './platforms/mobile/Mobile'
import Desktop from './platforms/desktop/Desktop'

function App() {
  const isMobile = useMediaQuery({'query':'(max-width: 800px)'})

  return isMobile ? <Mobile/> : <Desktop/>
}

export default App
