import { ThumbUp } from "heroicons-react";
import React from "react";

import { useJudgeApp } from "./hooks/useJudgeApp";
import { useJudgeActions } from "./hooks/useJudgeActions";

interface AllDonePanelProps {}

const AllDonePanel: React.FC<AllDonePanelProps> = () => {
  const { allDone, checkedOut, showPanel } = useJudgeApp();
  const { checkOut } = useJudgeActions();

  return (
    <div
      className={`${checkedOut ? "bg-red-300" : "bg-green-500"} ${
        showPanel ? "h-28" : "h-0 overflow-hidden"
      }  fixed top-0 w-full z-20  mt-14 flex justify-center items-center text-xl text-white transition-all shadow-2xl`}
    >
      {checkedOut ? (
        <div>You are checked out!!!</div>
      ) : (
        <>
          <ThumbUp size={30} />
          <span className="mx-6 font-extrabold ">You did It ! </span>

          <button
            onClick={checkOut}
            className="font-extrabold px-4 py-2 rounded-md border-4 shadow-xl hover:shadow-2xl"
          >
            Check Out
          </button>
        </>
      )}
    </div>
  );
};

export default AllDonePanel;
