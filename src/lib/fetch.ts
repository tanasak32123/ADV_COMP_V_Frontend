type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetchData = (
  url: string,
  method: Method,
  config?: RequestInit
) => {
  try {
    return fetch(url, { method: method, ...config });
  } catch (error: unknown) {
    console.log(`Fetch Error: ${error}`);
    throw error;
  }
};

export const fetchJson = async <T>(
  url: string,
  method: Method,
  config?: RequestInit
) => {
  try {
    const data = await fetchData(url, method, {
      headers: {
        "Content-type": "application/json",
      },
      ...config,
    });
    return data.json() as T;
  } catch (error: unknown) {
    throw error;
  }
};
