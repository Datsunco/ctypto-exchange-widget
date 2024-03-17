import Exchange from './components/custom/ExchangeWidget'
import { ArrowRightLeft } from 'lucide-react'

function App() {

  return (
    <div className='flex'>
      <Exchange/>
      <ArrowRightLeft/>
      <Exchange/>
    </div>
  )
}


export default App
