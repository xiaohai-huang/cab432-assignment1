const PORT = process.env.REACT_APP_PORT || 3000;
const DEV_URL = `http://localhost:${PORT}`;
const URL = process.env.NODE_ENV === "production" ? "" : DEV_URL;

export const api = (endpoint, config) => {
  const response = fetch(URL + endpoint, config).then((res) => res.json());
  return response;
};

export const getAssessments = (sNumber, password) => {
  return api("/api/Assessments", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentNumber: sNumber, password }),
  });
};

export const getNews = async (unitNames) => {
  const requests = unitNames.map(async (unitName) => {
    return await api(`/api/News?unitName=${unitName}`);
  });

  return (await Promise.all(requests)) || [];
};
