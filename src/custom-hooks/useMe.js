import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export function useMe() {
  const { token } = useAuth();
  const [meData, setMeData] = useState({});

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch(
          `http://fitnesstrac-kr.herokuapp.com/api/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { success, error, data } = await response.json();

        if (success) {
          setMeData(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchMe();
  }, [token]);

  return { meData, setMeData };
}
