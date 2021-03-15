import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  openSideBar,
  closeSideBar,
  toggleSideBar,
  setStage,
  setState,
} from "redux/Reducers/UIReducer";
import { stage } from "types";
import { RootState } from "../redux/Reducers/RootReducer";

const useUi = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const state = useSelector((state: RootState) => state.ui);
  const stage = useSelector((state: RootState) => state.ui.stage);
  const sumIn100 = useSelector((state: RootState) => state.ui.sumIn100);
  const integrateJudgeAverages = useSelector(
    (state: RootState) => state.ui.integrateJudgeAverages
  );

  const firstRender = React.useRef(true);

  React.useEffect(() => {
    const presistedState = window.localStorage.getItem("stage");
    if (presistedState) {
      dispatch(setStage(JSON.parse(presistedState)));
    }
  }, []);

  React.useEffect(() => {
    if (!firstRender.current) {
      return window.localStorage.setItem("stage", JSON.stringify(stage));
    }

    firstRender.current = false;
  }, [stage]);

  return {
    stage,
    setStage: (stage: stage) => {
      dispatch(setStage(stage));
    },
    sidebarOpen: state.sidebarOpen,
    toggleSideBar: () => {
      dispatch(toggleSideBar());
    },
    sumIn100,
    toggleSumIn100: () => {
      dispatch(setState({ ...state, sumIn100: !state.sumIn100 }));
    },
    integrateJudgeAverages,
    toggleIntegrateJudgeAverages: () => {
      dispatch(
        setState({
          ...state,
          integrateJudgeAverages: !state.integrateJudgeAverages,
        })
      );
    },
  };
};

export default useUi;

export { useUi };
