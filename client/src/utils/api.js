const URL = "http://localhost:4000";

export const api = (endpoint, config) => {
  const response = fetch(URL + endpoint, config).then((res) => res.json());
  return response;
};
