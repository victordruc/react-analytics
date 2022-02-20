import Analytics from './analytics/Analytics';
import {useState} from 'react';
import './App.css'
import { Options } from './analytics/Analytics.type';

function App() {
  
  const options:Options = {
    endpoint: "api/analytics",
    events: ["click", "mousedown", "keydown"],
  }
  
  const [eventStatus, setEventStatus] = useState(false)
  return (
    <div>
      <button onClick={()=>setEventStatus((state)=>!state)}>Click to {eventStatus?"add":"remove"}</button>
       {eventStatus||<Analytics {...options}/>}
    </div>
  );
}

export default App;
