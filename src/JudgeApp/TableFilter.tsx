import { IColumn, ITableFilterState, IRow } from "components/Table/types";
import React from "react";
import ButtonGroupe from "components/Buttons/ButtonGroupe";

interface TableFilterProps {
  setFilter: (filter: ITableFilterState | null) => void;
  filter: ITableFilterState | null;
  columns: IColumn[];
  rows: IRow[];
}

const TableFilter: React.FC<TableFilterProps> = ({
  setFilter,
  rows,
  filter,
}) => {
  const count = React.useMemo(
    () => ({
      open: rows.filter((item) => item.applicationState !== "completed").length,
      all: rows.length,
      completed: rows.filter((item) => item.applicationState === "completed")
        .length,
    }),
    [rows]
  );

  // "processed" : "completed") : "assigned";

  const handleUpdate = (id: string) => {
    switch (id) {
      case "all":
        return setFilter(null);
      case "open":
        return setFilter({ applicationState: [["!==", "completed"]] });

      case "completed":
        return setFilter({ applicationState: [["===", "completed"]] });
    }
  };

  const getActive = () => {
    if (!filter) {
      return "all";
    }
    if (filter.applicationState) {
      if (filter.applicationState.find((f) => f[0] === "!==")) return "open";
      if (filter.applicationState.find((f) => f[0] === "==="))
        return "completed";
    }
  };

  return (
    <div className="mb-8">
      <ButtonGroupe
        activeIndex={getActive()}
        items={[
          { label: `All ${count.all}`, id: "all" },
          {
            label: `Zu Bearbeiten ${count.open}`,
            id: "open",
          },
          { label: `Abgeschlossen ${count.completed}`, id: "completed" },
        ]}
        onClick={(i, id) => handleUpdate(id)}
      />
    </div>
  );
};

export default TableFilter;
