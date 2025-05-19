export const fetchWithAuth = async (input: RequestInfo, init: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem("accessToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(input, {
    ...init,
    headers,
  });
};
