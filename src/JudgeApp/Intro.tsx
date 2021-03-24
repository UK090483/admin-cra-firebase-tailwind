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
          data-testid="introShow"
          onClick={() => {
            dispatch(toggleInfoAction());
          }}
          className="bg-customer-lightBlue rounded-full w-10 h-10 flex justify-center items-center text-xl text-white cursor-pointer ml-auto"
        >
          i
        </div>
      )}

      {showIntro && (
        <div
          data-testid="intro"
          className="bg-customer-lightBlue text-white  shadow-xl rounded-2xl p-6 mb-6 relative"
        >
          <div
            data-testid="introClickAway"
            onClick={() => {
              dispatch(toggleInfoAction());
            }}
            className="absolute top-6 right-6 cursor-pointer"
          >
            <XCircle />
          </div>

          <div className=" text-xl align-middle  flex flex-col justify-center items-center    w-full  md:w-4/6 mx-auto p-6 py-16 text-center">
            <p className="py-8 font-extrabold">
              Thank you for participating in the Future Hamburg Award jury!
            </p>
            <p>
              To make the assessment as straightforward and accessible as
              possible, you can submit all evaluations via this jury tool. You
              can find a video tutorial on how to use the tool here{" "}
              <a className="font-extrabold ">link</a>. To get started with
              scoring, simply click on a startup in the list below. If you have
              any questions or technical problems, please feel free to contact
              us at award@future.hamburg Many interesting and innovative
              startups are waiting for you – the decision will not be easy!
              <p>Thank you for your support!</p>
            </p>
          </div>

          <div className="flex justify-center flex-wrap">
            <div className="bg-white w-full md:w-1/3  p-8 shadow-xl rounded-2xl mb-6 md:mr-6 flex flex-col justify-center items-center">
              <ThumbUp className="text-green-300 mb-10" size={75} />
              <p className="text-black">You already rated {done} startups </p>
            </div>

            <div className="bg-white w-full md:w-1/3 p-8 shadow-xl rounded-2xl mb-6  md:ml-6 flex flex-col justify-center items-center">
              <Heart className="text-red-500 mb-10" size={75} />
              <p className="text-black">
                There are {actionNeeded} startups left that need your attention
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
