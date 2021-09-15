import React, { useState } from "react";


import LoginForm from "./components/Login";

function App() {
  const [assessments, setAssessments] = useState([]);

  // const handleSearch = () => {
  //   api("/api/Assessments", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ studentNumber: sNumber, password: pwd }),
  //   }).then((response) => setAssessments(response));
  // };

  console.log(assessments);

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default App;
