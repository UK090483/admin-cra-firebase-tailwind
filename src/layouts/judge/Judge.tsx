import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import JudgeNavBar from "./JudgeNavbar";

import ApplicationTable from "JudgeApp/ApplicationTable";
import JudgeAppApplicationSingle from "JudgeApp/AssessmentView";
import { useFirestoreConnect } from "react-redux-firebase";
import AllDonePanel from "../../JudgeApp/AllDonePannel";
import { useJudgeApp } from "JudgeApp/hooks/useJudgeApp";

interface IJudgeProps {}

const Judge: React.FunctionComponent<IJudgeProps> = (props) => {
  useFirestoreConnect({ collection: "tableDoc", doc: "first" });
  const { allDone, checkedOut } = useJudgeApp();

  console.log(allDone);
  return (
    <div>
      <JudgeNavBar></JudgeNavBar>
      <AllDonePanel />;
      <div
        data-testid="judge_layout"
        className={`px-4 md:px-10 mx-auto w-full  min-h-screen ${
          allDone ? "pt-48" : "pt-24"
        }  pb-20`}
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
