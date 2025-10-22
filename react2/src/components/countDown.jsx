import { useEffect, useState } from "react";

function Countdown() {
  const [iszero, setIszero] = useState(false);
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        return setCount((prev) => {
          if (prev === 1) {
            setIszero(true);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h1>{iszero ? "Time's up!" : count}</h1>;
}
export default Countdown;
