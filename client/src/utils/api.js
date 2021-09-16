const PORT = process.env.REACT_APP_PORT || 3000;
const DEV_URL = `http://localhost:${PORT}`;
const URL = process.env.NODE_ENV === "production" ? "" : DEV_URL;

export const api = (endpoint, config) => {
  const response = fetch(URL + endpoint, config).then((res) => res.json());
  return response;
};
