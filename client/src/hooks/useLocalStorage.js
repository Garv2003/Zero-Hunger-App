import { useEffect, useState } from "react";

function useLocalStorage() {
  const [data, setData] = useState(() => {
    const ifexists = localStorage.getItem("user");
    return ifexists ? JSON.parse(ifexists) : null;
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return () => localStorage.removeItem("user");
  }, [data]);
  return { data, setData };
}

export default useLocalStorage;
