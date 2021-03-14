import * as React from "react";

interface IListFieldProps {
  label: string;
  list: string[];
}

const ListField: React.FunctionComponent<IListFieldProps> = (props) => {
  const { label, list } = props;

  if (!Array.isArray(list)) {
    return <div>Input needs to be Array</div>;
  }

  return (
    <div className="bg-gray-300 p-4 rounded-md mb-2">
      <h4 className="font-bold text-lg pb-3">{label}</h4>
      <p>
        {list.map((item, index) => {
          return index !== 0 ? ", " + item : item;
        })}
      </p>
    </div>
  );
};

export default ListField;
