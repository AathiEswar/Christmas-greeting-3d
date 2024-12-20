import React from 'react'
import FleetCardMain from '../fleetstudio/fleet-card/FleetCardMain'
import InsideContext from '../fleetstudio/fleet-card/context/InsideContext'

function Home() {
  return (
    <InsideContext>
      <FleetCardMain />
    </InsideContext>
  )
}

export default Home
