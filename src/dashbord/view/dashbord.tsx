import * as React from "react";
import { Scale, AcademicCap } from "heroicons-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers/RootReducer";
import useJudges from "../../judges/hooks/useJudges";
import useApplications from "../../applications/hooks/useApplications";

const Dashboard: React.FunctionComponent = () => {
  useJudges();
  useApplications();
  const { applicationCount, judgesCount, assessmentCount } = useSelector(
    (state: RootState) => ({
      applicationCount: state.applications.data
        ? Object.values(state.applications.data).length
        : "---",

      assessmentCount: state.applications.data
        ? Object.values(state.applications.data).reduce(
            (acc, application) =>
              application.assessments
                ? Object.keys(application.assessments).length + acc
                : acc,
            0
          )
        : "---",
      judgesCount: state.firestore.data.judges
        ? Object.values(state.firestore.data.judges).length
        : "---",
    })
  );

  return (
    <>
      <div className="w-full   text-actionColor-600 flex justify-evenly">
        <div className=" w-1/3 flex flex-col justify-center items-center shadow-2xl font-extrabold rounded-lg py-12 bg-white">
          <AcademicCap size={48} />

          <span className="text-8xl py-2">{applicationCount}</span>
          <span>Applications</span>
        </div>

        <div className=" w-1/3 flex flex-col justify-center items-center shadow-2xl mx-8 font-extrabold rounded-lg py-12 bg-white">
          <Scale size={48} />
          <span className="text-8xl py-2">{judgesCount}</span>
          <span>Judges</span>
        </div>
        <div className=" w-1/3 flex flex-col justify-center items-center shadow-2xl font-extrabold rounded-lg py-12 bg-white">
          <AcademicCap size={48} />
          <span className="text-8xl py-2">{assessmentCount}</span>
          <span>Assessments</span>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
