import { useEffect, useRef } from "react";

export function useAutoSessionSync(key, data) {
  const prevRef = useRef();

  useEffect(() => {
    const hasChanged = JSON.stringify(prevRef.current) !== JSON.stringify(data);
    if (hasChanged) {
      sessionStorage.setItem(key, JSON.stringify(data));
      prevRef.current = data;
    }
  }, [data, key]);
}
