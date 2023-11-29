import React from "react";

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => unknown
) => {
  const result = store(callback) as F;
  const [data, setData] = React.useState<F>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setData(result);
    setLoading(false);
  }, [result]);

  return {data, loading};
};

export default useStore;
