import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export function useRoutines() {
  const [routines, setRoutines] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const response = await fetch(
          `https://fitnesstrac-kr.herokuapp.com/api/routines`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { success, error, data } = await response.json();

        if (success) {
          setRoutines(data.routines);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchRoutines();
  }, [routines]);

  return { routines, setRoutines };
}
