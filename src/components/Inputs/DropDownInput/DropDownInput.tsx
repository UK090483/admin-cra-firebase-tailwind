import * as React from "react";

interface IDropDownInputProps {}

const DropDownInput: React.FunctionComponent<IDropDownInputProps> = (props) => {
  return (
    <label className="block">
      <span className="text-gray-700">What type of event is it?</span>
      <select className="block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
        <option>Corporate event</option>
        <option>Wedding</option>
        <option>Birthday</option>
        <option>Other</option>
      </select>
    </label>
  );
};

// export default DropDownInput;
export { DropDownInput };
