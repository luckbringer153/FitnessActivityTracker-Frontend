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

            <Route path="/myroutines/newroutine" component={AddRoutine} />

            <Route path="/activities" component={Activities} />
          </>
        )}

        {/* catches errors */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
