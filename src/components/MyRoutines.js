import React from "react";
import { NavLink } from "react-router-dom";
import { useMe, useAuth } from "../custom-hooks";

export default function MyRoutines() {
  const links = [{ id: 1, to: "/newroutine", name: "Create New Routine" }];

  const { meData, setMeData } = useMe();
  const { routines } = meData || {};
  const { token } = useAuth();

  //this is likely wrong
  const publicRoutines = routines
    ? routines.filter((routine) => routine.active)
    : [];

  async function clickDelete(routineId) {
    let answer = false;

    answer = window.confirm(
      "Are you sure you want to delete this routine? This action cannot be undone."
    );

    if (answer) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/routines/${routineId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { success } = await response.json();

        if (success) {
          console.log(`Routine #${routineId} was deleted.`);

          const filteredRoutines = routines.map((routine) => {
            if (routine.id === routineId) {
              routine.isPublic = false; //check with Daniel what we should be "changing" here, there's no active/non-active tags on the routines, just if it's public or not
            }

            return routine;
          });

          setMeData({ ...meData, routines: filteredRoutines });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("The post was not deleted.");
    }
  }

  return (
    <nav>
      {links.map(({ id, to, name }) => (
        <NavLink key={id} to={to} className="myRoutinesLinks">
          {name}
        </NavLink>
      ))}

      {/* "meData" is empty here; either fix meData or find username somewhere else */}
      <aside className="welcomeBlurb">
        Welcome to your profile, <b>{meData.username}</b>!
      </aside>

      <section className="myRoutinesListWhole">
        <h4>Routines You Have Created</h4>
        <main className="myRoutinesList">
          {!routines ? (
            "You've made no routines yet."
          ) : (
            <>
              {publicRoutines &&
                publicRoutines.map((routine) => (
                  <section className="routineBlock" key={routine.id}>
                    <div className="eachMyRoutines">
                      <div className="eachMyRoutinesID">
                        Routine ID: {routine.id}
                      </div>
                      <div className="eachMyRoutinesName">
                        Post Name: {routine.name}
                      </div>
                      <div className="eachMyRoutinesGoal">
                        Routine Goal: {routine.goal}
                      </div>
                      <div className="eachMyRoutinesisPublic">
                        isPublic: {routine.isPublic}
                      </div>
                      <div className="eachMyRoutinesActivities">
                        Activities: {routine.activities}
                      </div>
                    </div>
                    <button
                      className="deleteRoutineButton"
                      onClick={() => clickDelete(routine.id)}
                    >
                      Delete
                    </button>
                  </section>
                ))}
            </>
          )}
        </main>
      </section>
    </nav>
  );
}
