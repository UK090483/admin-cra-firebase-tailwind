import { IColumn, ITableFilterState, IRow } from "components/Table/types";
import React from "react";
import ButtonGroupe from "components/Buttons/ButtonGroupe";

interface FirstRoundFilterProps {
  setFilter: (filter: ITableFilterState | null) => void;
  filter: ITableFilterState | null;
  columns: IColumn[];
  rows: IRow[];
}

const FirstRoundFilter: React.FC<FirstRoundFilterProps> = ({
  setFilter,
  rows,
  filter,
}) => {
  const count = React.useMemo(
    () => ({
      open: rows.filter((item) => !!!item.statePre).length,
      all: rows.length,
      postponed: rows.filter((item) => item.statePre === "postponed").length,
      no: rows.filter((item) => item.statePre === "declined").length,
      yes: rows.filter((item) => item.statePre === "accepted").length,
    }),
    [rows]
  );

  const handleUpdate = (id: string) => {
    switch (id) {
      case "open":
        return setFilter({ statePre: [["===", undefined]] });
      case "all":
        return setFilter(null);
      case "postponed":
        return setFilter({ statePre: [["===", "postponed"]] });
      case "no":
        return setFilter({ statePre: [["===", "declined"]] });
      case "jes":
        return setFilter({ statePre: [["===", "accepted"]] });
    }
  };

  const getActive = () => {
    if (!filter) {
      return "all";
    }

    if (filter.statePre) {
      if (filter.statePre.find((f) => f[1] === "postponed")) return "postponed";
      if (filter.statePre.find((f) => f[1] === "declined")) return "no";
      if (filter.statePre.find((f) => f[1] === "accepted")) return "jes";
      if (filter.statePre.find((f) => f[1] === undefined)) return "open";
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

export default FirstRoundFilter;
