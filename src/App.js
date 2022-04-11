import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./custom-hooks";
import { default as Title } from "./components/Title";
import { default as Nav } from "./components/Nav";
import { default as Routines } from "./components/Routines";
import { default as Activities } from "./components/Activities";
import { default as LoginOrRegister } from "./components/LoginOrRegister";
import { default as MyRoutines } from "./components/MyRoutines";
//why can't I use import {.......} from "./components", using the components' index file to export everything as default??

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
