import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Accueil from './Page/Accueil'
import ChatBody from './message/chatBody/ChatBody'
import Play from './play/Play'
import Annonces from './Page/Annonces';
import Details from './Page/Details';
import Login from './Page/Login'
// import Annonce from './annonce/Annonce'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Accueil/>}/>
        <Route path='/message' element={<Play Component={<ChatBody/>}/>}/>
        <Route path='/Annonce' element={<Play Component={<Annonces/>}/>}/>
        <Route path='/Detail/:id_annonce' element={<Play Component={<Details/>}/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
