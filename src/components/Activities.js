import React from "react";
import { useActivities, useAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

export default function Activities() {
  const { activities } = useActivities();
  const { token } = useAuth();

  return !activities ? (
    <main className="activitiesList">
      <div>Sorry, no activities have been created. Check back later.</div>
    </main>
  ) : (
    <main className="activitiesList">
      <div>
        {token ? (
          <NavLink
            key="2"
            to={`/addactivity`}
            className="addActivityButtonforall"
          >
            Add Activity
          </NavLink>
        ) : null}
      </div>
      {activities.map((activity) => {
        return (
          <section className="eachActivity" key={activity.id}>
            <p>Activity ID #{activity.id}</p>
            {/* unregistered user: must be able to click an activity name and see a list of all public routines which feature it */}
            <h4>{activity.name}</h4>
            <p>{activity.description}</p>
            <p>
              {token ? (
                <NavLink
                  key="1"
                  to={`/editactivity/?id=${activity.id}&name=${activity.name}&description=${activity.description}`}
                  className="editActivityButtonforall"
                >
                  Edit Activity
                </NavLink>
              ) : null}
            </p>
          </section>
        );
      })}
    </main>
  );
}
