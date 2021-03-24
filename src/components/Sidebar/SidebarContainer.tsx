/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import useUi from "hooks/useUi";
import { ArrowLeft, ArrowRight } from "heroicons-react";

interface ISidebarContainer {}

const SidebarContainer: React.FC<ISidebarContainer> = (props) => {
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  const { sidebarOpen, toggleSideBar } = useUi();

  return (
    <>
      <button
        className="fixed flex items-center justify-center left-12 w-8 h-14 cursor-pointer text-gray-700 z-50 "
        type="button"
        onClick={toggleSideBar}
      >
        <ArrowRight className="text-white" />
      </button>
      <nav
        className={`transition-all md:left-0 md:block md:fixed md:top-0 dark:bg-gray-900  md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-2xl bg-white flex flex-wrap items-center justify-between relative ${
          sidebarOpen ? "md:w-64" : "md:w-12"
        }  z-50 pb-4`}
      >
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <div className="flex justify-between  h-14">
            <Link
              className="flex items-center  text-gray-700  dark:text-gray-300 mr-0  whitespace-no-wrap text-sm uppercase font-bold  pl-4"
              to="/"
            >
              {sidebarOpen ? "SWAN JUDGENATOR" : "SJ"}
            </Link>

            <button
              className="cursor-pointer text-gray-700   text-xl leading-none bg-transparent rounded border border-solid border-transparent pr-4"
              type="button"
              onClick={toggleSideBar}
            >
              <ArrowLeft />
            </button>
          </div>

          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Notus React
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {props.children}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SidebarContainer;
