import * as React from "react";

export interface ISumProps {
  sum: number;
}

const Sum: React.FC<ISumProps> = (props) => {
  const { sum } = props;

  return <div className="flex">{"∅" + sum}</div>;
};

export default React.memo(Sum);
