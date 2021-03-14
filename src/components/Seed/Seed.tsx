import * as React from "react";
import Popup from "reactjs-popup";

import { LightningBolt, Wifi } from "heroicons-react";
import { SeedFirebase } from "seed/seedFirebase";
import { useDispatch } from "react-redux";
import { fetchApplicationList } from "../../applications/state/applicationsReducer";

interface ISeedProps {}

const Seed: React.FunctionComponent<ISeedProps> = (props) => {
  return (
    <div className="pl-2 mt-auto">
      <Popup
        contentStyle={{
          padding: "1rem",
        }}
        trigger={<LightningBolt size={30} className="text-red-500" />}
        on="click"
        position="left top"
      >
        {/* <SeedButton label="clear" seedFunction={SeedFirebase.clear} /> */}
        <SeedButton label="start" seedFunction={SeedFirebase.start} />

        <SeedButton label="Accept 100" seedFunction={SeedFirebase.accept} />
        <SeedButton label="add Judges" seedFunction={SeedFirebase.addJudges} />

        <SeedButton
          label="make some pre Judges judge "
          seedFunction={() => SeedFirebase.preJudgesJudge(true)}
        />
        <SeedButton
          label="make all pre Judges judge "
          seedFunction={SeedFirebase.preJudgesJudge}
        />

        <SeedButton
          label="make main Judges judge "
          seedFunction={() => SeedFirebase.mainJudgesJudge()}
        />
      </Popup>
    </div>
  );
};

export default Seed;

interface ISeedButtonProps {
  seedFunction: () => void;
  label: string;
}

const SeedButton: React.FC<ISeedButtonProps> = ({ label, seedFunction }) => {
  const dispatch = useDispatch();

  const [isActive, SetIsActive] = React.useState(false);
  const handleClick = async () => {
    SetIsActive(true);
    await seedFunction();
    dispatch(fetchApplicationList({ refresh: true }));
    SetIsActive(false);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-400 px-2 py-1 mt-1 w-full text-white flex  content-center"
    >
      {isActive && <Wifi className="animate-pulse" />}
      {!isActive && label}
    </button>
  );
};
