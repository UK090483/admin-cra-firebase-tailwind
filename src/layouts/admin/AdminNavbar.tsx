import * as React from "react";
import NavBar from "components/NavBar";
import UserDropdown from "components/Dropdowns/UserDropdown";

export interface IAdminNavbarProps {}

const AdminNavBar: React.FC<IAdminNavbarProps> = (props) => {
  return (
    <NavBar>
      <div></div>

      <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
        <UserDropdown />
      </ul>
    </NavBar>
  );
};

export default AdminNavBar;
