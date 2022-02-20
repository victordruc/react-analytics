import React, { useEffect } from "react";
import { Options, Props } from "./Analytics.type";

class UserAction {
  constructor(private type: string) {}
}

export const Analytics = (options: Options) => {
  const { endpoint, events } = options;

  const eventListener = (e: Event) => {
    console.log("User has", e.type);
    const userAction = new UserAction(e.type);
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userAction),
    });
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, eventListener);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, eventListener);
      });
    };
  }, []);

  return <div>Event Listener: {events.map((el) => el + "; ")}</div>;
};

// Wrapper Type ---------------------------------->
export const AnalyticsProvider = ({ options, children }: Props) => {
  // const options:Options = {
  //     endpoint: "api/analytics",
  //     events: ["click", "mousedown", "keydown"],
  // }

  const { endpoint, events } = options;

  const eventListener = (e: Event) => {
    console.log("User has", e.type);
    const userAction = new UserAction(e.type);
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userAction),
    });
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, eventListener);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, eventListener);
      });
    };
  }, []);

  return <>{children}</>;
};
// Wrapper Type ----------------------------------<

// HOC Type ---------------------------------->
export const withAnalyticsHOC =
  (Component: React.ComponentType, options: Options) => () => {
    const { endpoint, events } = options;

    const eventListener = (e: Event) => {
      console.log("User has", e.type);
      const userAction = new UserAction(e.type);
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAction),
      });
    };

    useEffect(() => {
      events.forEach((event) => {
        window.addEventListener(event, eventListener);
      });

      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, eventListener);
        });
      };
    }, []);

    return <Component />;
  };
// HOC Type ----------------------------------<
