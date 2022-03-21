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
    }
  }
});
