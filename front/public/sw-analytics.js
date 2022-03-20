self.addEventListener("install", e=>{
    console.info("analytics: SW installed")
})

self.addEventListener("activate", e=>{
    console.info("analytics: SW activated")
    const dbConn = indexedDB.open("analytics")
    dbConn.onupgradeneeded = dbEvent => {
        console.info("DB opened successfully")
        const db = dbEvent.target.result
        db.createObjectStore("actions")
    }
})

self.addEventListener("fetch", e=>{
    if(e.request.url.endsWith("/api/analytics")) {
        if(!navigator.onLine) {
            e.request.json().then(data=>{
                console.info("SAVING offline data", data)
                const dbConn = indexedDB.open("analytics")
                dbConn.onsuccess = dbEvent=>{
                    const db = dbEvent.target.result
                    db.transaction("actions","readwrite")
                        .objectStore("actions")
                        .add(data, Date.now())
                }
            })
        } else {
            console.info("SENDING online data")
        }
    }
})