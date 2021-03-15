import React from "react";
import { ApplicationStatePre } from "applications/ApplicationTypes";
import ButtonGroupe from "components/Buttons/ButtonGroupe";
import { IRow } from "components/Table/types";
import useApplicationActions from "../../hooks/useApplicationActions";
import { useFirestore } from "react-redux-firebase";
import Loading from "../../../components/Spinner/Loading";
import { Spinner } from "components/Spinner/Spinner";

interface IActionProps {
  row: IRow;
  name: string;
}

const ApplicationSelectAction: React.FC<IActionProps> = ({ row, name }) => {
  const { updateApplication } = useApplicationActions();
  const firestore = useFirestore();

  const [updating, setUpdating] = React.useState(false);

  const handleUpdate = (state: ApplicationStatePre) => {
    if (state === row[name]) return;
    // updateApplication({ data: { [name]: state }, id: row.id });

    setUpdating(true);
    firestore
      .update(
        { collection: "tableDoc", doc: "first" },
        { [`${row.id}.${name}`]: state }
      )
      .then(() => {
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
