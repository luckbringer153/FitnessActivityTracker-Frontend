import { useState, useEffect } from "react";

export function useRoutines() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const response = await fetch(`http://localhost:3000/api/routines`, {
          headers: { "Content-Type": "application/json" },
        });

        const routines = await response.json();

        setRoutines(routines);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRoutines();
  }, []);

  return { routines, setRoutines };
}
