import React, { useState, useEffect } from "react";
// import { useRoutines } from "/custom-hooks/useRoutines";
// import { useAuth } from "/custom-hooks/useAuth";
import { useRoutines, useAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

export default function Routines() {
  const { routines, setRoutines } = useRoutines();

  return !routines ? (
    <main className="routinesList">
      <div>Sorry, no routines have been created! Check back later.</div>
    </main>
  ) : (
    <main className="routinesList">
      {routines.map((routine) => {
        return (
          <section className="eachRoutine" key={routine.id}>
            <h2>{routine.name}</h2>
            <h4>Created by: {routine.creatorName}</h4>
            <h4>Goal: {routine.goal}</h4>
            <p>Activities:</p>
            <ol>
              <li>{routine.activities[1]}</li>
            </ol>
          </section>
        );
      })}
    </main>
  );
}
