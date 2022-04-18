import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMe, useAuth, useMyRoutines, useActivities } from "../custom-hooks";
// import { useHistory } from "react-router-dom";

//reloads page - used with functions clickDelete, removeActivityFromRoutine, and addActivityToRoutine
function refresh() {
  window.location.reload();
}

export default function MyRoutines() {
  const { meData, setMeData } = useMe();
  const { myRoutines } = useMyRoutines();
  // console.log(myRoutines[0].isPublic);
  const { token } = useAuth();
  const { activities } = useActivities();
  const [activityName, setActivityName] = useState("any");
  // const history = useHistory();

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

        const success = await response.json();
        // console.log(success);  //doesn't return a true or false value! It returns an object with the deleted routine's id, creatorId, isPublic, name, and goal.

        if (success.id) {
          // console.log(`Routine #${success.id} was deleted.`);

          //might not be necessary code
          const filteredRoutines = myRoutines.map((routine) => {
            if (routine.id === routineId) {
              routine.isPublic = false;
            }

            return routine;
          });

          setMeData({ ...meData, routines: filteredRoutines });

          refresh();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // console.log("The post was not deleted.");
    }
  }

  async function removeActivityFromRoutine(rouActId) {
    try {
      // console.log("routine_activityID:", rouActId);

      const response = await fetch(
        `http://localhost:3000/api/routine_activities/${rouActId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      // const { routineId, activityId } = response.json();
      const success = response.json(); // Doesn't seem to really work, but ran out of time to troubleshoot

      if (success) {
        // console.log(
        //   `Activity #${activityId} was removed from routine #${routineId}.`
        // );
        refresh();
      } else {
        throw new Error("error editing this routine's activity");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function addActivityToRoutine(routineId) {
    const activityList = document.getElementById("select-activity");
    const gettingSelectedActivity =
      activityList.options[activityList.selectedIndex].innerHTML;
    const activityCount = document.getElementById(`count ${routineId}`).value;
    const activityDuration = document.getElementById(
      `duration ${routineId}`
    ).value;
    let selectedActivity = "";
    let activityId = "";

    //"if char #5 is a space, then the ID is single-digits case; if not, it's a double-digit"
    if (gettingSelectedActivity.charAt(5) === " ") {
      // console.log("space here!");

      selectedActivity = gettingSelectedActivity.slice(8);
      activityId = gettingSelectedActivity.charAt(4);
    } else {
      selectedActivity = gettingSelectedActivity.slice(9);
      const activityId1 = gettingSelectedActivity.charAt(4);
      const activityId2 = gettingSelectedActivity.charAt(5);
      activityId = activityId1.concat(activityId2);
    }

    // console.log(
    //   "activity name:",
    //   selectedActivity,
    //   ", routine ID:",
    //   routineId,
    //   ", count:",
    //   activityCount,
    //   ", duration:",
    //   activityDuration,
    //   ", activity ID:",
    //   activityId
    // );

    //if what you selected already exists in the list of activities for this routine, do nothing
    //ran out of time to implement, but thought it'd be a great idea!

    //makes sure a valid option is selected before doing proceeding
    if (selectedActivity !== "Add Created Activity") {
      try {
        const response = await fetch(
          `http://localhost:3000/api/routines/${routineId}/activities`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, //don't think this is used here but just in case
            },
            body: JSON.stringify({
              activityId: activityId,
              count: activityCount,
              duration: activityDuration,
            }),
          }
        );

        const success = response.json(); // Doesn't seem to really work, but ran out of time to troubleshoot

        if (success) {
          // console.log(`Routine ID #${duration} was successfully edited.`);
          refresh();
        } else {
          throw new Error("error editing routine");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <nav>
      <aside className="welcomeBlurb">
        Welcome to your profile, <b>{meData.username}</b>!
      </aside>

      <NavLink key="2" to="/newroutine" className="createNewRoutineButton">
        Create New Routine
      </NavLink>

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
                      Public Post: {routine.isPublic ? "true" : "false"}
                    </div>
                    <div>
                      {routine.activities.map(
                        ({
                          name,
                          description,
                          count,
                          duration,
                          id,
                          routineActivityId,
                        }) =>
                          id ? (
                            <ul>
                              {/* tried to make a "unique 'key' prop" using each activity's id, but it isn't gettting rid of the error */}
                              <li key={id}>
                                Do {name} - {description} - {count} times for{" "}
                                {duration} minutes
                              </li>
                              <li
                                className="removeActivityFromRoutineButton"
                                onClick={() =>
                                  removeActivityFromRoutine(routineActivityId)
                                }
                              >
                                REMOVE
                              </li>
                            </ul>
                          ) : (
                            "There are no activities for this routine."
                          )
                      )}
                    </div>
                    <section className="enterNewActivity">
                      <div>Add an Activity</div>
                      <div>
                        <select
                          name="activity"
                          id="select-activity"
                          value={activityName}
                          onChange={(e) => setActivityName(e.target.value)}
                        >
                          <option value="baseActivity">
                            Add Created Activity
                          </option>
                          {activities.map(({ name, id }) => {
                            return (
                              <option value={id} key={id}>
                                ID #{id} | {name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        Enter Count:
                        <input
                          type="number"
                          // id="count"
                          id={`count ${routine.id}`}
                          style={{ marginLeft: 5 + "px" }}
                        ></input>
                      </div>
                      <div>
                        Enter Duration:
                        <input
                          type="number"
                          // id="duration"
                          id={`duration ${routine.id}`}
                          style={{ marginLeft: 5 + "px" }}
                        ></input>
                      </div>
                    </section>
                  </div>

                  <button
                    className="addActivityToRoutineButton"
                    value="Get Selected Activity Value"
                    onClick={() => addActivityToRoutine(routine.id)}
                  >
                    Add Activity
                  </button>

                  <div>
                    <NavLink
                      key="1"
                      to={`/editroutine/?name=${routine.name}&goal=${routine.goal}&isPublic=${routine.isPublic}&creatorId=${routine.creatorId}&id=${routine.id}`}
                      className="editRoutineButton"
                    >
                      Edit Routine
                    </NavLink>

                    <button
                      className="deleteRoutineButton"
                      onClick={() => clickDelete(routine.id)}
                    >
                      Delete Routine
                    </button>
                  </div>
                </section>
              ))}
            </>
          )}
        </main>
      </section>
    </nav>
  );
}
