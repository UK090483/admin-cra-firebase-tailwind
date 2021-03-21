import useJudges from "judges/hooks/useJudges";
import useUi from "hooks/useUi";
import Switch from "components/Buttons/Switch/Switch";
import { round, getSumIn100 } from "helper/round";
import { judgeType } from "judges/JudgeTypes";

type ChartProps = {
  judgeType: judgeType;
};
export function Chart(props: ChartProps) {
  const { judgeType } = props;
  const { judges, judgeAverages } = useJudges();

  const {
    sumIn100,
    toggleSumIn100,
    integrateJudgeAverages,
    toggleIntegrateJudgeAverages,
  } = useUi();

  if (!judges) {
    return <div>...</div>;
  }

  return (
    <div className=" bg-white rounded-xl shadow-2xl my-6 p-4">
      <div className="flex flex-wrap mb-2">
        {judgeAverages &&
          judges &&
          Object.entries(judgeAverages).map(([judgeId, average]) => {
            return judges[judgeId] &&
              judges[judgeId].judgeType === judgeType ? (
              <div
                key={judgeId}
                className={`${
                  judges[judgeId] ? judges[judgeId].color : ""
                } flex flex-col justify-center items-center p-3 m-1 text-white `}
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
