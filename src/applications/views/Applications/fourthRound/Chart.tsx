import { IApplicationRecord } from "applications/ApplicationTypes";
import useJudges from "judges/hooks/useJudges";
import { useSelector } from "react-redux";
import { RootState } from "redux/Reducers/RootReducer";
import useUi from "hooks/useUi";
import Switch from "components/Buttons/Switch/Switch";
import { round, getSumIn100 } from "../../../../helper/round";

export interface IChartProps {
  rows: IApplicationRecord[];
}
export function Chart(props: IChartProps) {
  const { rows } = props;
  const { judges, judgeAverages } = useJudges();

  const {
    sumIn100,
    toggleSumIn100,
    integrateJudgeAverages,
    toggleIntegrateJudgeAverages,
  } = useUi();

  return (
    <div className=" bg-white rounded-xl shadow-2xl my-6 p-4">
      <div className="flex flex-wrap mb-2">
        {judgeAverages &&
          judges &&
          Object.entries(judgeAverages).map(([judgeId, average]) => {
            return judges[judgeId] ? (
              <div
                key={judgeId}
                className={`${
                  judges[judgeId] ? judges[judgeId].color : ""
                } w-50 p-3`}
              >
                <h5>{judges[judgeId].name}</h5>
                {average &&
                  (sumIn100
                    ? "∅" + getSumIn100(average)
                    : "∅" + round(average))}
              </div>
            ) : null;
          })}
      </div>
      <div className="flex w-1/4 justify-between mb-2">
        <span>Sum to 100</span>
        <Switch active={sumIn100} onClick={toggleSumIn100} />
      </div>

      <div className="flex w-1/4 justify-between">
        <span>Integrate Judge Average</span>
        <Switch
          active={integrateJudgeAverages}
          onClick={toggleIntegrateJudgeAverages}
        ></Switch>
      </div>
    </div>
  );
}
