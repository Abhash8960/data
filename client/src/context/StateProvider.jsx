import React, { createContext, useState } from 'react'

export const StateContext = createContext()

const StateProvider = ({children}) => {
    const [allData, setAlldata] = useState([])
    const [downloaUrl, setDownloaUrl] = useState()
    

  return (
    <StateContext.Provider value={{allData, setAlldata,downloaUrl, setDownloaUrl}}>{children}</StateContext.Provider>
  )
}

export default StateProvider
