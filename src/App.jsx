import React,{useState,createContext} from 'react'
import Nav from './components/Nav'
import Display from './components/Display'
export const  UserContext = createContext();
const App = () => {
  const [displayType,setDisplaytype]=useState('user');
  return (
    < UserContext.Provider value={{displayType,setDisplaytype}}>
    <Nav/>
    <Display/>
    </ UserContext.Provider>
  )
}

export default App;