import { useState, useEffect } from "react";
import { useMe, useAuth } from "../custom-hooks";

export function useMyRoutines() {
  const [myRoutines, setMyRoutines] = useState([]);
  const { meData } = useMe();
  const { token } = useAuth();

  useEffect(() => {
    async function fetchMyRoutines() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${meData.username}/routines`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response);
        const myRoutines = await response.json();
        // console.log(myRoutines);

        setMyRoutines(myRoutines);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMyRoutines();
  }, [meData.username, token]);

  return { myRoutines, setMyRoutines };
}
