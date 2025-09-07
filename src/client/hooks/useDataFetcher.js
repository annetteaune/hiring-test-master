import { useEffect } from "react";

export const useDataFetcher = (list, loading, loadAction) => {
  useEffect(() => {
    if (list.length === 0 && !loading) {
      loadAction();
    }
  }, [list.length, loading, loadAction]);
};
