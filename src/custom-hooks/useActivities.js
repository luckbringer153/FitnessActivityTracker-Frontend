import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export function useActivities() {
  const [activities, setActivities] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchActivities() {
      try {
        const reponse = await fetch(
          `http://fitnesstrac-kr.herokuapp.com/api/activities`,
          { headers: { "Content-Type": "application/son" } }
        );
      } catch (error) {
        console.error(error);
      }
    }

    fetchActivities();
  }, [activities]);

  return { activities, setActivities };
}
