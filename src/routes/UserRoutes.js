import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import CreateEvaluation from "../pages/CreateEvaluation";
import NotFound from "../pages/NotFound";
import BlackJack from "../pages/BlackJack";

const UserRoutes = () => {

    return (
        <Switch>

                <Route exact path="/">
                    <Home />
                </Route>

                <Route exact path="/Profile">
                    <Profile />
                </Route>

                <Route exact path="/CreateEvaluation">
                    <CreateEvaluation />
                </Route>

                <Route exact path="/BlackJack">
                    <BlackJack />
                </Route>

                <Route>
                    <NotFound />
                </Route>

        </Switch>
    );
}

export default UserRoutes;
