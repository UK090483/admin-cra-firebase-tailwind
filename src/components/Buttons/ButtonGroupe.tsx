import * as React from "react";
import Button from "./Button";

interface ButtonGroupeItem {
  label: string;
  id?: string;
}

interface IButtonGroupeProps {
  items: ButtonGroupeItem[];
  activeIndex?: number | string;
  onClick?: (index: number, id: any) => void;
}

const ButtonGroupe: React.FunctionComponent<IButtonGroupeProps> = (props) => {
  const { items, activeIndex, onClick, ...rest } = props;
  return (
    <div className="my-0.5 group ">
      {items.map((item, index) => (
        <Button
          key={index}
          onClick={() => {
            onClick && onClick(index, item.id);
          }}
          active={item.id ? activeIndex === item.id : activeIndex === index}
          className="mr-2"
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default React.memo(ButtonGroupe);
