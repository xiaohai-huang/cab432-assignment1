import React, { useState } from "react";

import ImageUploader from "./components/ImageUploader";
import useStudentNumber from "./utils/useStudentNumber";

function App() {
  const [base64, setBase64] = useState("");
  const { sNumber, loading, error } = useStudentNumber(base64);
  const [pwd, setPwd] = useState("");

  return (
    <div>
      <ImageUploader getBase64={setBase64} />
      {base64 && (
        <img alt="id card" src={base64} width="300px" height="400px" />
      )}
      <h3>
        QUT Student Number: {loading && "..."} {error} {sNumber}
      </h3>
      <label htmlFor="passowrd">Passowrd: </label>
      <input
        name="password"
        type="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <button
        style={{ display: "block" }}
        onClick={() => {
          console.log({ sNumber, pwd });
        }}
        disabled={!sNumber || sNumber === -1 || !pwd}
      >
        Search
      </button>
    </div>
  );
}

export default App;
