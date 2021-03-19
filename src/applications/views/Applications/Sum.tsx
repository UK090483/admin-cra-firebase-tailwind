import * as React from "react";
import useUi from "hooks/useUi";

export interface ISumProps {
  sum: number;
}

const Sum: React.FC<ISumProps> = (props) => {
  const { sum } = props;
  const { sumIn100 } = useUi();

  const prepared = Math.round((sumIn100 ? (sum / 64) * 100 : sum) * 100) / 100;

  return <div className="flex">{"∅" + prepared}</div>;
};

export default React.memo(Sum);
