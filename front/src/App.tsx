import {Analytics, AnalyticsProvider, withAnalyticsHOC} from './analytics/Analytics';
import {useState} from 'react';
import './App.css'
import { Options } from './analytics/Analytics.type';

function App() {
  
  const options:Options = {
    endpoint: "http://localhost:4000/api/analytics",
    events: ["click", "mousedown", "keydown"],
    batch: 20,
  }
  
  const [eventStatus, setEventStatus] = useState(false)
  return (
    <div>
      <button onClick={()=>setEventStatus((state)=>!state)}>Click to {eventStatus?"add":"remove"}</button>
       {eventStatus||<Analytics {...options}/>}
    </div>
  );
}

// function App() {
//   const options:Options = {
//     endpoint: "api/analytics",
//     events: ["click", "mousedown", "keydown"],
//   }
  
//   return (
//        <AnalyticsProvider options={options}>
//          <div></div>
//        </AnalyticsProvider>
//   );
// }

// function App() {
//   return (
//       <div>
//         Event
//       </div>
//   );
// }


// export default withAnalyticsHOC(App, {
//   endpoint: "api/analytics",
//   events: ["click", "mousedown", "keydown"],
// });
export default App;
