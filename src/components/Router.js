import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";  // 자동 import 됨
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigator from "components/Navigator";

const AppRouter = ({isLoggedIn}) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);  // don't use state on Ruuter
    return(
        <Router>
            {isLoggedIn && <Navigator />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </> 
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth /> 
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;