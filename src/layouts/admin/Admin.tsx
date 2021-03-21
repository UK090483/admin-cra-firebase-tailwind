import Applications from "applications/views/Applications/Applications";
import ApplicationSingle from "applications/views/ApplicationSingle/ApplicationSingle";
import ApplicationUpdate from "applications/views/ApplicationSingle/ApplicationUpdate";
import Sidebar from "components/Sidebar/Sidebar";
import useUi from "hooks/useUi";
import Judge from "judges/views/Judge";
import Judges from "judges/views/Judges";
import JudgeUpdate from "judges/views/JudgeUpdate";
import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { Route, Switch } from "react-router-dom";
import UserCreate from "users/views/UserCreate";
import Users from "users/views/Users";
import UserUpdate from "users/views/UserUpdate";
import Dashboard from "../../dashbord/view/Dashbord";
import JudgeCreate from "../../judges/views/JudgeCreate";

import AdminNavbar from "./AdminNavbar";
import AssessmentUpdate from "../../assessments/views/assessmentUpdate";

const Admin: React.FC = () => {
  const { sidebarOpen } = useUi();

  useFirestoreConnect([{ collection: "judges" }]);
  useFirestoreConnect({ collection: "tableDoc", doc: "first" });

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

            <Route
              path="/assessment/:application_id/:judge_id/update"
              exact
              component={AssessmentUpdate}
            />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Admin;
