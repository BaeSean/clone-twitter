import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";  // 자동 import 됨
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigator from "components/Navigator";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);  // don't use state on Ruuter
    return (
        <Router>
            {isLoggedIn && <Navigator userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (

                    <div
                        style={{
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 80,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser} />
                        </Route>
                    </div>
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