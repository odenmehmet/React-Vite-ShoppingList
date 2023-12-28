import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import ShoppingListApp from './ShoppingListApp.jsx'

function App() {
  const [notes, setNotes] = useState([0]);

  return (
    <>
      <div className='container'>
        <ShoppingListApp/>
      </div>
    </>
  )
}

export default App
