import ButtonGroupe from "components/Buttons/ButtonGroupe";
import { IColumn, IRow, ITableFilterState } from "components/Table/types";
import React from "react";

interface ThirdRoundFilterProps {
  setFilter: (filter: ITableFilterState | null) => void;
  filter: ITableFilterState | null;
  columns: IColumn[];
  rows: IRow[];
}

const ThirdRoundFilter: React.FC<ThirdRoundFilterProps> = ({
  setFilter,
  rows,
  filter,
}) => {
  const count = React.useMemo(
    () => ({
      open: rows.filter((item) => !!!item.stateTree).length,
      all: rows.length,
      postponed: rows.filter((item) => item.stateTree === "postponed").length,
      no: rows.filter((item) => item.stateTree === "declined").length,
      yes: rows.filter((item) => item.stateTree === "accepted").length,
    }),
    [rows]
  );

  const handleUpdate = (id: string) => {
    switch (id) {
      case "open":
        return setFilter({ stateTree: [["===", undefined]] });
      case "all":
        return setFilter(null);
      case "postponed":
        return setFilter({ stateTree: [["===", "postponed"]] });
      case "no":
        return setFilter({ stateTree: [["===", "declined"]] });
      case "jes":
        return setFilter({ stateTree: [["===", "accepted"]] });
    }
  };

  const getActive = () => {
    if (!filter) {
      return "all";
    }

    if (filter.stateTree) {
      if (filter.stateTree.find((f) => f[1] === "postponed"))
        return "postponed";
      if (filter.stateTree.find((f) => f[1] === "declined")) return "no";
      if (filter.stateTree.find((f) => f[1] === "accepted")) return "jes";
      if (filter.stateTree.find((f) => f[1] === undefined)) return "open";
    }
  };
  return (
    <div className="mb-8">
      <ButtonGroupe
        activeIndex={getActive()}
        items={[
          {
            label: `Offen ${count.open}`,
            id: "open",
          },
          { label: `All ${count.all}`, id: "all" },
          { label: `Vielleicht ${count.postponed}`, id: "postponed" },
          { label: `Nein ${count.no}`, id: "no" },
          { label: `Ja ${count.yes}`, id: "jes" },
        ]}
        onClick={(i, id) => handleUpdate(id)}
      />
    </div>
  );
};

export default ThirdRoundFilter;
