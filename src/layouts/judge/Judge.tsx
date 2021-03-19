import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import JudgeNavBar from "./JudgeNavbar";

import ApplicationTable from "JudgeApp/ApplicationTable";
import JudgeAppApplicationSingle from "JudgeApp/AssessmentView";
import { useFirestoreConnect } from "react-redux-firebase";

interface IJudgeProps {}

const Judge: React.FunctionComponent<IJudgeProps> = (props) => {
  useFirestoreConnect({ collection: "tableDoc", doc: "first" });

  return (
    <div>
      <JudgeNavBar></JudgeNavBar>

      <div
        data-testid="judge_layout"
        className="px-4 md:px-10 mx-auto w-full  min-h-screen pt-24 pb-20"
      >
        <Switch>
          <Route path="/" exact component={ApplicationTable} />

          <Route
            path="/applications/:id"
            exact
            component={JudgeAppApplicationSingle}
          />
          <Redirect to="/"></Redirect>
        </Switch>
      </div>
    </div>
  );
};

export default Judge;
