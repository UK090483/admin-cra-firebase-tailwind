import { Heart, ThumbUp, XCircle } from "heroicons-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Reducers/RootReducer";
import { toggleInfoAction } from "./state/JudgeAppReducer";

interface IntroProps {
  applications: any[];
}
const Intro: React.FC<IntroProps> = ({ applications }) => {
  const { name, showIntro } = useSelector((state: RootState) => ({
    name: state.fb.auth.displayName,
    showIntro: state.judgeApp.showIntro,
  }));

  const actionNeeded = applications.filter(
    (item) => item.applicationState !== "completed"
  ).length;

  const done = applications.length - actionNeeded;
  const dispatch = useDispatch();

  return (
    <div>
      {!showIntro && (
        <div
          onClick={() => {
            dispatch(toggleInfoAction());
          }}
          className="bg-actionColor-500 rounded-full w-10 h-10 flex justify-center items-center text-xl text-white cursor-pointer ml-auto"
        >
          i
        </div>
      )}

      {showIntro && (
        <div className=" bg-actionColor-400  shadow-xl rounded-2xl p-28 mb-6 relative">
          <div
            onClick={() => {
              dispatch(toggleInfoAction());
            }}
            className="absolute top-6 right-6 cursor-pointer"
          >
            <XCircle />
          </div>

          <div className=" text-xl align-middle w-full flex flex-col justify-center items-center p-12 px-48">
            <p className="text-3xl pb-6">Hey !!!</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="bg-white w-1/3 p-8 shadow-xl rounded-2xl mr-6 flex flex-col justify-center items-center">
              <ThumbUp className="text-green-300 mb-10" size={75} />
              <p>You allready rated {done} Applications </p>
            </div>

            <div className="bg-white w-1/3 p-8 shadow-xl rounded-2xl  ml-6 flex flex-col justify-center items-center">
              <Heart className="text-red-500 mb-10" size={75} />
              <p>
                But there are still {actionNeeded} Applications that need Your
                Love
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
