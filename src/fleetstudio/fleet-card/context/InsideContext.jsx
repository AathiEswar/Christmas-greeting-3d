import React, { createContext, useContext, useState } from 'react'

const insideContext = createContext();
export const useInsideContext = () => useContext(insideContext)

function InsideContext({ children }) {
  const [inside, setInside] = useState(false);
  const value = {
    inside,
    setInside,
  }
  return (
    <insideContext.Provider value={value}>
      {
        children
      }
    </insideContext.Provider>
  )
}

export default InsideContext
