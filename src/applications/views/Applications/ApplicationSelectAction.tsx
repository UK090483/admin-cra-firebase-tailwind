import { ApplicationStatePre } from "applications/ApplicationTypes";
import ButtonGroupe from "components/Buttons/ButtonGroupe";
import { IRow } from "components/Table/types";
import useApplicationActions from "../../hooks/useApplicationActions";

interface IActionProps {
  row: IRow;
  name: string;
}

const ApplicationSelectAction: React.FC<IActionProps> = ({ row, name }) => {
  const { updateApplication } = useApplicationActions();

  const handleUpdate = (state: ApplicationStatePre) => {
    updateApplication({ data: { [name]: state }, id: row.id });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
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
