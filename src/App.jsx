import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FleetCardMain from './fleetstudio/fleet-card/FleetCardMain'
import InsideContext from './fleetstudio/fleet-card/context/InsideContext'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'
          element={
            <InsideContext>
              <FleetCardMain />
            </InsideContext>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
