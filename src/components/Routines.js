import React from "react";
// import { useRoutines } from "/custom-hooks/useRoutines";
// import { useAuth } from "/custom-hooks/useAuth";
import { useRoutines, useMe } from "../custom-hooks";
import { NavLink } from "react-router-dom";

export default function Routines() {
  const { routines } = useRoutines();
  const { meData } = useMe();
  // console.log(routines);
  // console.log(routines[0].activities[0].name);
  // 0: {id: 12, name: 'Dancing', description: 'Testing', duration: 2, count: 15, …}
  // 1: {id: 19, name: 'Ull Pups', description: 'Ull yourself pup, and lower yourself down.', duration: 1, count: 1, …}
  // length: 2

  // count: 15;
  // description: "Testing";
  // duration: 2;
  // id: 12;
  // name: "Dancing";
  // routineActivityId: 275;
  // routineId: 580;

  // Dancing

  return !routines ? (
    <main className="routinesList">
      <div>Sorry, no routines have been created! Check back later.</div>
    </main>
  ) : (
    <main className="routinesList">
      <NavLink
        key="2"
        to="/newroutine"
        className="createNewRoutineButton"
        // style={{ marginTop: 10 + "px" }} <-- tried to shift button down, but it wasn't going for some reason. Sigh!
      >
        Create New Routine
      </NavLink>
      {routines.map((routine) => {
        return (
          <section className="eachRoutine" key={routine.id}>
            {/* tried to make a "unique 'key' prop" using each routine's id, but it isn't gettting rid of the error */}
            <p>Routine ID #{routine.id}</p>
            <h2>{routine.name}</h2>
            <p>Goal: {routine.goal}</p>
            <p>Created by: {routine.creatorName}</p>
            <p style={{ textDecoration: "underline" }}>Activities</p>
            <div>
              {routine.activities.map(
                ({ name, description, count, duration, id }) =>
                  id ? (
                    <ul>
                      {/* tried to make a "unique 'key' prop" using each activity's id, but it isn't gettting rid of the error */}
                      <li key={id}>
                        Do {name} - {description} - {count} times for {duration}{" "}
                        minutes
                      </li>
                    </ul>
                  ) : (
                    "There are no activities for this routine."
                  )
              )}
            </div>
            <p>
              {routine.creatorId === meData.id ? (
                <NavLink
                  key="1"
                  to={`/editroutine/?name=${routine.name}&goal=${routine.goal}&isPublic=${routine.isPublic}&creatorId=${routine.creatorId}&id=${routine.id}`}
                  className="editActivityButtonforall"
                >
                  Edit My Routine
                </NavLink>
              ) : null}
            </p>
          </section>
        );
      })}
    </main>
  );
}
