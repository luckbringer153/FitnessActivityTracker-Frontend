import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./custom-hooks";
import {
  Title,
  Nav,
  Routines,
  Activities,
  LoginOrRegister,
  MyRoutines,
  AddRoutine,
  EditActivity,
  EditRoutine,
} from "./components";

function App() {
  const { token, isLoggedIn, logout } = useAuth();

  return (
    <Router>
      <Title />

      <Nav />

      <Switch>
        {/* routes for if you're not logged in */}
        {!isLoggedIn && (
          <>
            {/* <Route path="/home" component={Home} /> */}

            <Route path="/routines" component={Routines} />

            <Route path="/activities" component={Activities} />

            <Route path="/login" component={LoginOrRegister} />

            <Route path="/register" component={LoginOrRegister} />
          </>
        )}

        {/* routes for if you are logged in */}
        {isLoggedIn && (
          <>
            {/* <Route path="/home" component={Home} /> */}

            <Route path="/routines" component={Routines} />

            <Route path="/myroutines" component={MyRoutines} />

            <Route path="/newroutine" component={AddRoutine} />

            <Route path="/editroutine" component={EditRoutine} />

            <Route path="/activities" component={Activities} />

            <Route path="/editactivity" component={EditActivity} />
          </>
        )}

        {/* catches errors */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
