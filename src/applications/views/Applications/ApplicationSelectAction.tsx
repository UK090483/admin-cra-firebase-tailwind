import { ApplicationStatePre } from "applications/ApplicationTypes";

import ButtonGroupe from "components/Buttons/ButtonGroupe";
import { Spinner } from "components/Spinner/Spinner";
import { IRow } from "components/Table/types";
import { useActions } from "hooks/useActions";
import React from "react";

interface IActionProps {
  row: IRow;
  name: string;
}

const ApplicationSelectAction: React.FC<IActionProps> = ({ row, name }) => {
  const [updating, setUpdating] = React.useState(false);

  const { updateApplicationAssessments } = useActions();

  const handleUpdate = (state: ApplicationStatePre) => {
    if (state === row[name]) return;
    setUpdating(true);
    updateApplicationAssessments({ state, id: row.id, name }).then(() => {
      setUpdating(false);
    });
  };

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {updating && (
        <div className="absolute  top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
          <Spinner size="1/4"></Spinner>
        </div>
      )}
      <ButtonGroupe
        activeIndex={row[name]}
        onClick={(i, id: ApplicationStatePre) => {
          handleUpdate(id);
        }}
        items={[
          { label: "Ja", id: "accepted" },
          { label: "Nein", id: "declined" },
          { label: "Vielleicht", id: "postponed" },
        ]}
      />
    </div>
  );
};

export default ApplicationSelectAction;
