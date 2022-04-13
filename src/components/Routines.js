import React, { useState, useEffect } from "react";
// import { useRoutines } from "/custom-hooks/useRoutines";
// import { useAuth } from "/custom-hooks/useAuth";
import { useRoutines, useAuth, useMe } from "../custom-hooks";
import { NavLink } from "react-router-dom";

export default function Routines() {
  const { token } = useAuth();
  const { routines, setRoutines } = useRoutines();
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
      {routines.map((routine) => {
        return (
          <section className="eachRoutine" key={routine.id}>
            <p>Routine ID #{routine.id}</p>
            <h2>{routine.name}</h2>
            <p>Goal: {routine.goal}</p>
            <p>Created by: {routine.creatorName}</p>
            <p>Should this be public? {routine.isPublic ? "true" : "false"}</p>
            <p style={{ textDecoration: "underline" }}>Activities</p>
            <div>
              {routine.activities
                ? routine.activities.map(
                    ({ name, description, count, duration, id }) => (
                      <ul>
                        <li key={id}>
                          Do {name} - {description} - {count} times for{" "}
                          {duration} minutes
                        </li>
                      </ul>
                    )
                  )
                : "There are no activities for this routine."}
            </div>
            <p>
              {routine.creatorId === meData.id ? (
                <NavLink
                  key="1"
                  to={`/editpost/?name=${routine.name}&goal=${routine.goal}&isPublic=${routine.isPublic}&creatorId=${routine.creatorId}$id=${routine.id}`}
                  className="editRoutineButton"
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
