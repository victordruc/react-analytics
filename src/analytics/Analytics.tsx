import { useEffect } from "react";
import { Options } from "./Analytics.type";

class UserAction {
    constructor(private type:string) {}
}

const Analytics = (options:Options) => {

    // const options:Options = {
    //     endpoint: "api/analytics",
    //     events: ["click", "mousedown", "keydown"],
    // }
    
    const {endpoint, events} = options

    const eventListener = (e:Event) => {
        console.log("User has", e.type)
        const userAction = new UserAction(e.type)
        fetch(endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userAction)
        })
    }

    useEffect(()=>{
        events.forEach(event=>{
            window.addEventListener(event, eventListener)
        })
        
        return () => {
            events.forEach(event=>{
                window.removeEventListener(event, eventListener)
            })
        }
    }, [])

    return (
        <div>
            Event Listener: {events.map(el=>el+"; ")}
        </div>
    )
}

export default Analytics