import React, { useState, useEffect } from "react";
// import { useRoutines } from "/custom-hooks/useRoutines";
// import { useAuth } from "/custom-hooks/useAuth";
import { useRoutines, useAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

export default function Routines() {
  const { routines, setRoutines } = useRoutines();
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
            <p>Created by: {routine.creatorName}</p>
            <p>Goal: {routine.goal}</p>
            <p style={{ textDecoration: "underline" }}>Activities</p>
            {/* if this specific routine has no activities, give message saying as such */}
            {/* however, if there are activities, do this: map over each activity in this specific routine to genereate li items */}
            <p>
              {!routine.activites
                ? "There aren't any activities in this routine."
                : `There are ${routine.activities} activities for this routine.`}
            </p>
            {/* map over the activities to generate li items */}
            {/* <div>
              <ul>
                {routines.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </div> */}
            {/* {routines.map((routine) => {
              return (
                <div>
                  <ol>
                    {routines.map((activity) => (
                      <li key={activity.id}>{activity}</li>
                    ))}
                  </ol>
                </div>
                // <ol className="activityList" key={routine.id}>
                //   <li>{routine.activity}</li>
                // </ol>
              );
            })} */}
            {/* <ol>
              <li>{routine.activities}</li>
            </ol> */}
          </section>
        );
      })}
    </main>
  );
}
