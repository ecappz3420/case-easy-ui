import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import Profile from './components/profile'
import Buttonrow from './components/Buttonrow'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Body from './components/Body';


const App = () => {
  return (
      <div className='bg-slate-100 p-2 monsterrat'>
        <Profile />
        <Buttonrow />
        <Body />
      </div>

  )
}

export default App
