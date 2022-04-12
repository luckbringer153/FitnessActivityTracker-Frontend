import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export function useActivities() {
  const [activities, setActivities] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(
          `http://fitnesstrac-kr.herokuapp.com/api/activities`,
          { headers: { "Content-Type": "application/json" } }
        );

        const activities = await response.json();

        setActivities(activities);
      } catch (error) {
        console.error(error);
      }
    }

    fetchActivities();
  }, []);

  return { activities, setActivities };
}
