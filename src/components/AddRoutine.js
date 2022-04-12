import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function AddRoutine() {
  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    goal: "",
    isPublic: null,
  });
  const { token } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://fitnesstrac-kr.herokuapp.com/api/routines`,
        { method: "POST", body: JSON.stringify({ routine: form }) }
      );

      const { success, data, error } = await response.json();

      if (success) {
        history.push("/routines");
      } else {
        throw new Error("error creating routine");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="addRoutineInputs">
      <h3>Create Custom Routine</h3>

      <form onSubmit={handleSubmit}>
        <div className="nameInput">
          <label style={{ marginRight: 5 + "px" }}>Name of Your Routine:</label>
          <input
            type="text"
            name="name"
            value={form.name} //"'value' prop on 'input' should not be null. Consider using an empty string to clear the component or 'undefined' for uncontrolled components."
            onChange={handleChange}
          />
        </div>
        <div className="goalInput">
          <label style={{ marginRight: 5 + "px" }}>
            What is the goal of this routine?
          </label>
          <input
            type="text"
            name="goal"
            value={form.goal}
            onChange={handleChange}
          />
        </div>
        <div className="isPublicInput">
          <label style={{ marginRight: 5 + "px" }}>
            Would you like to make this routine public?
          </label>
          <input
            type="text"
            name="isPublic"
            value={form.isPublic}
            onChange={handleChange}
          />
          <label style={{ marginLeft: 5 + "px" }}>(null by default)</label>
        </div>
        <input
          type="submit"
          value="Save Routine"
          className="addRoutineButton"
        />
      </form>
    </main>
  );
}
