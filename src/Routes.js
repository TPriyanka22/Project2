import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import CreateMovie from "./MovieBooking/AdminView/CreateMovie"
import AppliedRoute from "./containers/AppliedRoute";
import UserView from "./MovieBooking/UserView/UserView";
import AdminView from "./MovieBooking/AdminView/AdminView";
import RedirectPage from "./MovieBooking/RedirectPage";
import UpdateMovie from "./MovieBooking/AdminView/UpdateMovie";
import RenderMovie from "./MovieBooking/UserView/RenderMovie";
import UserBookings from "./MovieBooking/UserView/UserBookings";


export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/CreateMovie" exact component={CreateMovie} props={childProps} />
    <AppliedRoute path="/Redirect" exact component={RedirectPage} props={childProps} />   
    <AppliedRoute path="/UserView" exact component={UserView} props={childProps} />   
    <AppliedRoute path="/AdminView" exact component={AdminView} props={childProps} />
    <AppliedRoute path="/UpdateMovie/:id" exact component={UpdateMovie} props={childProps} />
    <AppliedRoute path="/BookEvent/:id" exact component={RenderMovie} props={childProps} />
    <AppliedRoute path="/UserBookings" exact component={UserBookings} props={childProps} />
    
  </Switch>;
