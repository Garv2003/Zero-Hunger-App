import { useRef, useEffect } from "react";

function useDetectClickOutside(handler, capturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, capturing);
    return () => document.removeEventListener("click", handleClick, capturing); // capturing phase
  }, [handler]);
  return { ref };
}

export default useDetectClickOutside;
