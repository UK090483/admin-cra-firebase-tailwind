import * as React from "react";
import { database } from "@firebase/rules-unit-testing";

export interface IDateFieldProps {
  date: string | number;
}

export function DateField(props: IDateFieldProps) {
  const { date } = props;
  const parsedDate = React.useMemo(() => yyyymmdd(date), [date]);
  return <div>{date ? parsedDate.toLocaleString() : "N.N."}</div>;
}

function yyyymmdd(date: string | number) {
  const dateIn = new Date(date);
  var yyyy = dateIn.getFullYear();
  var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
  var dd = dateIn.getDate();
  // return String(10000 * yyyy + 100 * mm + dd);

  return `${yyyy}/${mm}`;
}
