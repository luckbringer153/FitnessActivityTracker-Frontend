import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth, useMe } from "../custom-hooks";

export default function AddActivity() {
  const history = useHistory();
  const { meData } = useMe();
  // console.log("creatorId:", meData.creatorId);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const { token } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(form);

    try {
      const response = await fetch(`http://localhost:3000/api/activities`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const { id, name } = await response.json();

      if (id) {
        // console.log(`Success! You made the activity named "${name}".`);
        history.push("/activities");
      } else {
        throw new Error("error creating activity");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="addActivityInputs">
      <h3 className="addActivityHeader">Create Custom Routine</h3>

      <form onSubmit={handleSubmit}>
        <div className="nameInput">
          <label style={{ marginRight: 5 + "px" }}>
            Name of Your Activity:
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="descriptionInput">
          <label style={{ marginRight: 5 + "px" }}>
            What is the goal of this routine?
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Save Activity"
          className="addActivityButton"
        />
      </form>
    </main>
  );
}
