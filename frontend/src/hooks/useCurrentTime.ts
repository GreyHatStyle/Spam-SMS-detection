import { useState, useEffect } from "react";

function getCurrentTimeString(){
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function useCurrentTime(){
    const [currentTime, setCurrentTime] = useState<string>(getCurrentTimeString());


    useEffect(() => {
      // Calculate ms until next minute
      const now = new Date();
      const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      const timeout = setTimeout(() => {
        setCurrentTime(getCurrentTimeString());

        const interval = setInterval(() => {
          setCurrentTime(getCurrentTimeString());
        }, 60000);

        // Save interval id to clear later
        (window as any)._phoneDisplayInterval = interval;
      }, msToNextMinute);

      return () => {
        clearTimeout(timeout);
        if ((window as any)._phoneDisplayInterval) {
          clearInterval((window as any)._phoneDisplayInterval);
        }
      };
    }, [])

    return currentTime;
}