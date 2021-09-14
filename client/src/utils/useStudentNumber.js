import { useEffect, useState } from "react";
import { api } from "./api";

function useStudentNumber(base64) {
  const [sNumber, setSNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Use the API to extract student number from the image
    if (base64) {
      (async () => {
        setLoading(true);
        setSNumber("");
        setError(null);
        const { number, error } = await api("/api/GetStudentNumber", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ImageBase64: base64 }),
        });

        setSNumber(number);
        setError(error);
        setLoading(false);
      })();
    }
  }, [base64]);
  return { sNumber, error, loading };
}

export default useStudentNumber;
