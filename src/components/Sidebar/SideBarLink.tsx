import * as React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export interface IAppProps {
  route: string;
  label: string;
  Icon: React.ElementType;
}

export default function SidebarLink(props: IAppProps) {
  const { route, label, Icon } = props;
  return (
    <li data-testid={label} className="items-center">
      <Link
        className={
          "text-xs uppercase py-3 font-bold h-20  flex items-center    " +
          (window.location.href.indexOf(route) !== -1
            ? "text-actionColor-500 hover:text-actionColor-900"
            : "text-gray-800 hover:text-gray-600")
        }
        to={route}
      >
        <Icon className="mr-4 inline w-12" />
        <span>{label}</span>
      </Link>
    </li>
  );
}
