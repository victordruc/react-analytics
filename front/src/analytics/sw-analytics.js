import { postAction } from "./api";
const endpoint = "http://localhost:4000/api/analytics";

function DbIndex(dbName, dbColl) {
  return {
    upgradeneeded() {
      const dbConn = indexedDB.open(dbName);
      dbConn.onupgradeneeded = (dbEvent) => {
        console.info("DB opened successfully");
        const db = dbEvent.target.result;
        db.createObjectStore(dbColl);
      };
    },
    success(data) {
      const dbConn = indexedDB.open(dbName);
      dbConn.onsuccess = (dbEvent) => {
        const db = dbEvent.target.result;
        db.transaction(dbColl, "readwrite")
          .objectStore(dbColl)
          .add(data, Date.now());
      };
    },
    objectStore() {
      const dbConn = indexedDB.open(dbName);
      return new Promise((res) => {
        dbConn.onsuccess = (dbEvent) => {
          const db = dbEvent.target.result;
          res(db.transaction(dbColl, "readwrite").objectStore(dbColl));
        };
      });
    },
  };
}

const dbIndex = DbIndex("analytics", "actions");

self.addEventListener("install", (e) => {
  console.info("analytics: SW installed");
});

self.addEventListener("activate", (e) => {
  console.info("analytics: SW activated");
  dbIndex.upgradeneeded();
});

self.addEventListener("fetch", (e) => {
  if (e.request.url.endsWith("/api/analytics")) {
    if (!navigator.onLine) {
      e.request.json().then((data) => {
        console.info("SAVING offline data", data);
        dbIndex.success(data);
      });
    } else {
      console.info("SENDING online data");
      dbIndex.objectStore().then((res) => {
        res.getAll().onsuccess = (dbResponseEvent) => {
          const actions = dbResponseEvent.target.result;
          Promise.all(
            actions.map((userAction) => postAction(endpoint, userAction))
          ).then(()=>{
            dbIndex.objectStore().then(store=>store.clear())
          })
        };
      });
    }
  }
});
