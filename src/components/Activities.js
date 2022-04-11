import React, { useState, useEffect } from "react";
import { useActivities, useAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

export default function Activities() {
  const { activities, setActivities } = useActivities();

  return !activities ? (
    <main className="activitiesList">
      <div>Sorry, no activities have been created. Check back later.</div>
    </main>
  ) : (
    <main className="activitiesList">
      {activities.map((activity) => {
        return (
          <section className="eachActivity" key={activity.id}>
            <h2>{activity.name}</h2>
            <h4>{activity.description}</h4>
          </section>
        );
      })}
    </main>
  );
}
