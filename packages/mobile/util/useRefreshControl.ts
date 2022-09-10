import React from "react";

export const useRefreshControl = (callback: any) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const response = await callback();
    if (response) setRefreshing(false);
  }, []);

  return { refreshing, handleRefresh };
};
