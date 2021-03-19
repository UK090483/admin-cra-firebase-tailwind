import * as React from "react";
import { IRow } from "components/Table/types";
import Popup from "reactjs-popup";

interface ITextPreviewProps {
  row: IRow;
  prevItemList: string[];
}

const TextPreview: React.FC<ITextPreviewProps> = ({ row, prevItemList }) => {
  const prevItems = Object.keys(row).filter((key) =>
    prevItemList.includes(key)
  );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popup
        contentStyle={{
          padding: "1rem",
        }}
        trigger={<div>PreView</div>}
        on="hover"
        position="left center"
      >
        {prevItems.map((key) => (
          <Popup
            contentStyle={{
              width: "fit-content",
              maxWidth: 800,
              padding: "1rem",
            }}
            key={key}
            nested
            trigger={<div>{key}</div>}
            on="hover"
            position="left center"
          >
            {row[key]}
          </Popup>
        ))}
      </Popup>
    </div>
  );
};

export default TextPreview;
