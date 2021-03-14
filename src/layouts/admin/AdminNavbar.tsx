import * as React from "react";
import NavBar from "components/NavBar";
import UserDropdown from "components/Dropdowns/UserDropdown";
import ButtonGroupe from "components/Buttons/ButtonGroupe";
import useUi from "../../hooks/useUi";

export interface IAdminNavbarProps {}

const AdminNavBar: React.FC<IAdminNavbarProps> = (props) => {
  return (
    <NavBar>
      <a
        className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
        href="#pablo"
        onClick={(e) => e.preventDefault()}
      >
        Dashboard
      </a>

      <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
        <UserDropdown />
      </ul>
    </NavBar>
  );
};

export default AdminNavBar;
