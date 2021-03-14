import * as React from "react";
import NavBar from "components/NavBar";
import UserDropdown from "components/Dropdowns/UserDropdown";
import { Spinner } from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers/RootReducer";
import { Link } from "react-router-dom";

const JudgeNavBar: React.FC = () => {
  return (
    <NavBar>
      <Link
        to="/"
        className=" text-sm uppercase hidden lg:inline-block font-semibold"
      >
        SWAN JUDGENATOR
      </Link>

      <LoadingIndicator />

      <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
        <UserDropdown />
      </ul>
    </NavBar>
  );
};

export default JudgeNavBar;

const LoadingIndicator: React.FC = () => {
  const loading = useSelector((state: RootState) => state.judgeApp.loading);
  return (
    <div className="h-10 w-10 overflow-hidden">
      {loading && <Spinner size="2/3" />}
    </div>
  );
};
