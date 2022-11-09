import React from "react";
import { Switch } from "react-router-dom";
import AdminHome from "./Components/AdminHome";
import AppliedRoute from "./Components/AppliedRoute";
import CreateSlot from "./Components/CreateSlot";
import MorePage from "./Components/MorePage";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={AdminHome} />
    <AppliedRoute path="/create-slot" exact component={CreateSlot} />
    <AppliedRoute path="/more" exact component={MorePage} />
  </Switch>;