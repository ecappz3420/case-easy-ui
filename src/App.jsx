import React, { useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Profile from './components/Profile'
import Buttonrow from './components/Buttonrow'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Body from './components/Body';
import { useDispatch } from 'react-redux';
import { setClient } from './store/slices/clientSlice';
import fetchRecordByID from './api/fetch';


const App = () => {
const dispatch = useDispatch();
  useEffect(() => {
    const runApi = async () => {
      await ZOHO.CREATOR.init();
      const queryParams = await ZOHO.CREATOR.UTIL.getQueryParams();
      const result = await fetchRecordByID(queryParams.lead);
      dispatch(setClient(result));
    }
    runApi();

  }, [dispatch])
  return (
    <div className='bg-slate-100 p-2 monsterrat'>
      <Profile />
      <Buttonrow />
      <Body />
    </div>

  )
}

export default App
