import PageLoading from "components/Spinner/PageLoading";
import { AcademicCap, Scale } from "heroicons-react";
import * as React from "react";
import useApplications from "../../applications/hooks/useApplications";
import useJudges from "../../judges/hooks/useJudges";

const Dashboard: React.FunctionComponent = () => {
  const { judgesOrdered } = useJudges();
  const { ordered, isLoaded } = useApplications();

  const applicationCount = ordered && ordered.length;
  const assessmentCount = judgesOrdered
    ? judgesOrdered.reduce((acc, judge) => {
        if (!judge.assessments) return acc;

        return acc + Object.keys(judge.assessments).length;
      }, 0)
    : "Loading...";

  const judgesCount = judgesOrdered ? judgesOrdered.length : 0;

  if (!isLoaded) {
    <PageLoading />;
  }

  return (
    <>
      <div className="w-full   text-actionColor-600 flex justify-evenly">
        <div className=" w-1/3 flex flex-col justify-center items-center shadow-2xl font-extrabold rounded-lg py-12 bg-white">
          <AcademicCap size={48} />

          <span className="text-8xl py-2">
            {ordered ? applicationCount : 0}
          </span>
          <span>Applications</span>
        </div>

        <div className=" w-1/3 flex flex-col justify-center items-center shadow-2xl mx-8 font-extrabold rounded-lg py-12 bg-white">
          <Scale size={48} />
          <span className="text-8xl py-2">{judgesCount}</span>
          <span>Judges</span>
        </div>
        <div className=" w-1/3 flex flex-col justify-center items-center shadow-2xl font-extrabold rounded-lg py-12 bg-white">
          <AcademicCap size={48} />
          <span className="text-8xl py-2">{ordered ? assessmentCount : 0}</span>
          <span>Assessments</span>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
