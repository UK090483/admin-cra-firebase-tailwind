import * as React from "react";

export interface INavBarProps {}

const NavBar: React.FC<INavBarProps> = (props) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-customer-blue dark:bg-gray-900 md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4 shadow-xl">
      <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
        {props.children}
      </div>
    </nav>
  );
};

export default NavBar;
