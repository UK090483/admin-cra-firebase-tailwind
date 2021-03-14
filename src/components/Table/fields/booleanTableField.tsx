import { X, Check } from "heroicons-react";
import * as React from "react";
import { IRow } from "../types";

interface IBooleanTableFieldProps {
  row: IRow;
  field: string;
}

const BooleanTableField: React.FunctionComponent<IBooleanTableFieldProps> = (
  props
) => {
  const { field, row } = props;

  const res = row[field];

  return <>{res ? <Check /> : <X />}</>;
};

export default BooleanTableField;
