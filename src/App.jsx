import React from 'react'
import Weather from './Components/Weather'

function App() {
  
  return (
    <div className='app'>
      <Weather defaultcity="Delhi" />
      <Weather defaultcity="Mumbai"/>
      <Weather defaultcity="Bangalore"/>
    </div>
  )
}

export default App
