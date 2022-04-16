import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMe, useAuth, useMyRoutines, useActivities } from "../custom-hooks";
import { useHistory } from "react-router-dom";

export default function MyRoutines() {
  const { meData, setMeData } = useMe();
  const { myRoutines } = useMyRoutines();
  const { token } = useAuth();
  const { activities } = useActivities();
  const [activityName, setActivityName] = useState("any");
  const history = useHistory();

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

          //might not be necessary code
          const filteredRoutines = myRoutines.map((routine) => {
            if (routine.id === routineId) {
              routine.isPublic = false;
            }

            return routine;
          });

          setMeData({ ...meData, routines: filteredRoutines });

          //I wanted the page to reload on its own once a routine has been deleted. I tried all the options below, no luck. Sigh!
          // history.push("./myroutines");
          // document.location.reload();
          // window.location.reload();
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
      //do the call to the api that deletes an activity from a routine without deleting it from the activities table
      //how do I pass "in" the routineActivityId (id in table routine_activities) based on which activity I "clicked" on??
      const response = await fetch(
        `http://localhost:3000/api/routine_activities/${rouActId}`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      );
      const { routineId, activityId } = response.json();
      if (routineId) {
        console.log(
          `Activity #${activityId} was removed from routine #${routineId}.`
        );
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

    const activityCount = document.getElementById("count").value;
    const activityDuration = document.getElementById("duration").value;
    let selectedActivity = "";
    let activityId = "";

    //"if char #5 is a space, then the ID is single-digits case; if not, it's a double-digit
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

    console.log(
      "activity name:",
      selectedActivity,
      ", routine ID:",
      routineId,
      ", count:",
      activityCount,
      ", duration:",
      activityDuration,
      ", activity ID:",
      activityId
    );

    //tried to test with this curl:
    // curl http://localhost:3000/api/16/activities -X POST -H 'Content-Type:application/json' -d '{"activityId":"7","count":"2","duration":"5"}'
    if (selectedActivity !== "Add Created Activity") {
      try {
        const response = await fetch(
          `http://localhost:3000/api/${routineId}/activities`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,  //don't think this is used here but just in case
            },
            body: JSON.stringify({
              activityId: activityId,
              activityCount: activityCount,
              activityDuration: activityDuration,
            }),
          }
        );

        const editedRoutine = response.json();
        // const { duration } = response.json();

        console.log(editedRoutine, editedRoutine.duration); //"Promise {<pending>} undefined"

        if (editedRoutine.routineId) {
          console.log(
            `Routine ID #${editedRoutine.routineId} was successfully edited.`
          );
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
                      isPublic: {routine.isPublic}
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
                              <li key={id}>
                                Do {name} - {description} - {count} times for{" "}
                                {duration} minutes
                              </li>
                              <li
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
                          id="count"
                          style={{ marginLeft: 5 + "px" }}
                        ></input>
                      </div>
                      <div>
                        Enter Duration:
                        <input
                          type="number"
                          id="duration"
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
