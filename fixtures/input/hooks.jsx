import { useEffect, useState } from "react";

export function Hi() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(count + 1);
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button onClick={setCount((c) => c + 1)}>+1</button>
    </div>
  );
}
