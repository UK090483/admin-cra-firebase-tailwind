import * as React from "react";
import useUi from "hooks/useUi";
import { getSumIn100, round } from "helper/round";

export interface ISumProps {
  sum: number;
}

const Sum: React.FC<ISumProps> = (props) => {
  const { sum } = props;
  const { sumIn100 } = useUi();

  const prepared = sumIn100 ? getSumIn100(sum) : round(sum);

  return <div className="flex">{"∅" + prepared}</div>;
};

export default React.memo(Sum);
