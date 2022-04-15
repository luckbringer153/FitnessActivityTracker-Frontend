import React from "react";
import { NavLink } from "react-router-dom";
import { useMe, useAuth, useMyRoutines } from "../custom-hooks";

export default function MyRoutines() {
  const { meData, setMeData } = useMe();
  const { myRoutines } = useMyRoutines();
  const { token } = useAuth();

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
          // console.log(`Routine #${routineId} was deleted.`);

          const filteredRoutines = myRoutines.map((routine) => {
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
      // console.log("The post was not deleted.");
    }
  }

  return (
    <nav>
      <aside className="welcomeBlurb">
        Welcome to your profile, <b>{meData.username}</b>!
      </aside>

      <section className="myRoutinesListWhole">
        <h4 className="routinesCreatedBlurb">Routines You Have Created</h4>
        <main className="myRoutinesList">
          {!myRoutines ? (
            "You've made no routines yet."
          ) : (
            <>
              {myRoutines.map((routine) => (
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
                    <div>
                      {routine.activities.map(
                        ({ name, description, count, duration, id }) =>
                          id ? (
                            <ul>
                              <li key={id}>
                                Do {name} - {description} - {count} times for{" "}
                                {duration} minutes
                              </li>
                            </ul>
                          ) : (
                            "There are no activities for this routine."
                          )
                      )}
                    </div>
                  </div>
                  {/* add dropdown menu labeled "Add Activity", where dropdown items are the names of all activites */}
                  {/* put "edit routine" button here */}
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
