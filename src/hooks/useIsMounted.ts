import { useEffect, useState } from "react";

function useIsMounted() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return mounted;
}

export default useIsMounted;
