import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export function useMe() {
  const { token } = useAuth();
  const [meData, setMeData] = useState({});

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await fetch(`http://localhost:3000/api/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const meData = await response.json();
        // console.log({ meData });

        setMeData(meData);

        // if (success) {
        //   setMeData(data);
        // }
      } catch (error) {
        console.error(error);
      }
    }

    fetchMe();
  }, [token]);

  return { meData, setMeData };
}
