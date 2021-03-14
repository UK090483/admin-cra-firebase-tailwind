import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "./AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";

// views

// import Dashboard from "views/admin/Dashboard";
// import Settings from "views/admin/Settings";
import Applications from "applications/views/Applications/Applications";
import ApplicationSingle from "applications/views/ApplicationSingle/ApplicationSingle";
import ApplicationUpdate from "applications/views/ApplicationSingle/ApplicationUpdate";

import Users from "users/views/Users";
import UserCreate from "users/views/UserCreate";
import UserUpdate from "users/views/UserUpdate";

import useUi from "hooks/useUi";

import Judges from "judges/views/Judges";
import Judge from "judges/views/Judge";
import JudgeCreate from "../../judges/views/JudgeCreate";
import JudgeUpdate from "judges/views/JudgeUpdate";

import Dashboard from "../../dashbord/view/dashbord";

const Admin: React.FC = () => {
  const { sidebarOpen } = useUi();
  return (
    <>
      <AdminNavbar />
      <Sidebar />

      <div
        data-testid="admin_layout"
        className={` transition-all ${
          sidebarOpen ? "md:ml-64 " : "md:ml-12"
        }  bg-gray-200 dark:bg-gray-700`}
      >
        <div className="px-4 md:px-10 mx-auto w-full  min-h-screen pt-24 pb-20">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/applications" exact component={Applications} />
            <Route
              path="/applications/:id"
              exact
              component={ApplicationSingle}
            />
            <Route
              path="/applications/:id/update"
              exact
              component={ApplicationUpdate}
            />

            <Route path="/users" exact component={Users} />
            <Route path="/users/create" exact component={UserCreate} />

            <Route path="/users/:id/update" exact component={UserUpdate} />

            <Route path="/judges" exact component={Judges} />
            <Route path="/judges/create" exact component={JudgeCreate} />
            <Route path="/judges/:id" exact component={Judge} />
            <Route path="/judges/:id/update" exact component={JudgeUpdate} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Admin;
