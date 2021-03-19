import * as React from "react";
import NavBar from "components/NavBar";
import UserDropdown from "components/Dropdowns/UserDropdown";
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

      <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
        <UserDropdown />
      </ul>
    </NavBar>
  );
};

export default JudgeNavBar;
