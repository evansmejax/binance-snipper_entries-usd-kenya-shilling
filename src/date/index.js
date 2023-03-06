import * as React from "react";

export default function LiveDate() {
  const [time, setTime] = React.useState();
  React.useEffect(() => {
    const timer = setInterval(() => {
      let x = new Date()
        .toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
      setTime(x);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <>{time}</>;
}
