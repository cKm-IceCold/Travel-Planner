import { useState } from 'react'


import NavBar from './components/NavBar'
import DestinationList from "./components/DestinationList";
import destinations from "./components/data/Destination";

function App() {
 

  return (
    <>
     <NavBar />
    
     <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Destination</h1>
      <DestinationList destinations={destinations} />
    </div>
    </>
  )
}

export default App
